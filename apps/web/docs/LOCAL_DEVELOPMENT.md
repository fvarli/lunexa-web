# Local development — HTTPS `.test` stack

Local development runs behind the machine's own nginx on trusted HTTPS, with
both dev servers owned by systemd rather than by a terminal window:

```
Browser → https://lunexa.test      → nginx :443 → 127.0.0.1:4320 → apps/web (next dev)
Browser → https://api.lunexa.test  → nginx :443 → 127.0.0.1:8420 → apps/api (tsx watch)
```

Closing the terminal does not stop anything. If a dev server crashes, systemd
restarts it, so `https://lunexa.test` recovers on its own instead of answering
502 until someone notices.

They are user units, so they start with your graphical session and stop when you
log out — they are not system services and do not run headless. Lingering
(`loginctl enable-linger`) would change that; it is deliberately left off, both
because a dev server has no business outliving the session and to match the
other local stacks on this machine.

| | Frontend | API |
|---|---|---|
| Hostname | `https://lunexa.test` | `https://api.lunexa.test` |
| Port | `127.0.0.1:4320` | `127.0.0.1:8420` |
| Unit | `lunexa-frontend.service` | `lunexa-api.service` |
| Logs | `journalctl --user -u lunexa-frontend -f` | `journalctl --user -u lunexa-api -f` |

Both upstreams bind loopback only. Nothing on the LAN can reach them; nginx is
the only way in.

## Everyday use

```bash
systemctl --user status lunexa-frontend lunexa-api
systemctl --user restart lunexa-frontend
journalctl --user -u lunexa-api -f
```

Install or refresh the units after pulling, changing Node, or editing a template
in `deploy/systemd/`:

```bash
bin/install-service              # install, enable, start both
bin/install-service --uninstall  # stop, disable, remove both
```

`bin/install-service` resolves the absolute path of whatever `node` is on your
PATH and writes it into the units, because systemd starts them with no shell and
no nvm. It refuses to install against Node older than 22. Nothing global is
changed — switch Node, re-run the script.

## First-time machine setup

The parts below need root and only have to be done once.

**1. Host entries**

```
127.0.0.1 lunexa.test
127.0.0.1 api.lunexa.test
```

**2. Certificates** — [mkcert](https://github.com/FiloSottile/mkcert), whose CA
your browser already trusts:

One certificate per hostname — `mkcert lunexa.test api.lunexa.test` would emit a
single combined `lunexa.test+1.pem`, which is not what the vhosts reference:

```bash
mkcert lunexa.test
mkcert api.lunexa.test
sudo install -o root -g root -m 644 lunexa.test.pem      /etc/nginx/ssl/lunexa.test.pem
sudo install -o root -g root -m 600 lunexa.test-key.pem  /etc/nginx/ssl/lunexa.test-key.pem
# …same for api.lunexa.test
```

Private keys live in `/etc/nginx/ssl/`, mode 600, root-owned. They never enter
this repository.

**3. nginx vhosts** — one file per hostname in `/etc/nginx/sites-available/`,
symlinked into `sites-enabled/`, then `sudo nginx -t && sudo systemctl reload
nginx`. Each vhost redirects :80 → :443, terminates TLS, and proxies to its
`127.0.0.1` port. The frontend vhost also carries the websocket `Upgrade`
headers and a 1-day read timeout, without which Fast Refresh connects once and
then silently dies.

## Environment

`apps/web/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.lunexa.test
```

A page served over `https://` cannot call an `http://` API; the browser blocks
it as mixed content.

`apps/api/.env`:

```
PORT=8420
HOST=127.0.0.1
CORS_ORIGIN=https://lunexa.test,…
```

`https://lunexa.test` has to be listed explicitly. The API auto-allows
`localhost` and `127.0.0.1` origins outside production, but a `.test` origin is
not covered by that pattern.

Both files are git-ignored. Neither the units nor nginx hold any secret: the
API calls `dotenv/config` on boot and reads `.env` itself.

## Why `-H localhost` and not `-H 127.0.0.1`

`lunexa-frontend.service` starts Next with `-H localhost`. The two are not
interchangeable, even though both bind the same loopback socket.

Passing the literal IP makes Next canonicalize its own origin and serialize
`proxy.ts`'s locale rewrite as an **absolute** URL:

```
x-middleware-rewrite: http://localhost:4320/en/work
```

Next treats an absolute rewrite as external and answers `307` back to the path
the request came from — so `/` and `/work` become redirect loops, while `/tr`
and `/es` keep working because they pass through without a rewrite. That
asymmetry is the tell.

With `-H localhost` the rewrite stays relative (`/en/work`) and the site behaves
exactly as it does in production.

## Diagnosing a 502

502 means nginx is up and the upstream is not. Work from the inside out:

```bash
systemctl --user status lunexa-frontend     # is the process alive?
journalctl --user -u lunexa-frontend -n 50  # why did it die?
ss -ltnp | grep -E ':4320|:8420'            # is the port held, and by 127.0.0.1?
curl -I http://127.0.0.1:4320/              # app reachable without nginx?
curl -I https://lunexa.test/                # app reachable through nginx?
sudo nginx -t && sudo journalctl -u nginx -n 30
```

If the direct `127.0.0.1` call works and the HTTPS one does not, the problem is
nginx or TLS. If neither works, it is the app.

A brief 502 during `systemctl --user restart` is expected — the port is
genuinely unbound for a moment. A persistent one is not.

## Health

```bash
curl https://api.lunexa.test/api/health
```

Without `DATABASE_URL` set this reports `"status":"degraded"` and `"db":"error"`
and still returns HTTP 200 — outside production the endpoint does not treat a
missing database as fatal. The contact and newsletter flows need Postgres and
SMTP; everything else runs without them.
