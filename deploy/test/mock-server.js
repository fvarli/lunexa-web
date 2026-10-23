// Test double for deploy/smoke-check.sh: stands in for the API or the web
// process on a local port. Configured entirely through the environment.
//
//   MOCK_KIND      api | web
//   MOCK_PORT      port to listen on (127.0.0.1)
//   MOCK_DELAY_MS  wait this long before listening, to simulate a slow start
//   MOCK_RESPONSE_DELAY_MS  accept, then answer only after this long (a hung process)
//   MOCK_STATUS    status for /api/health (api) or / (web); default 200
//   MOCK_OK        api: "true" | "false"; default "true"
//   MOCK_DB        api: db field; default "ok"
//   MOCK_COMMIT    api: commit field; "null" or unset sends null
//   MOCK_BUILD_ID  web: the only build id whose _buildManifest.js is served
const http = require("http");

const env = process.env;
const status = Number(env.MOCK_STATUS || 200);

const respond = (req, res) => {
  if (env.MOCK_KIND === "api") {
    if (req.url !== "/api/health") {
      res.writeHead(404);
      res.end();
      return;
    }
    const commit = !env.MOCK_COMMIT || env.MOCK_COMMIT === "null" ? null : env.MOCK_COMMIT;
    res.writeHead(status, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        ok: (env.MOCK_OK || "true") === "true",
        status: "ok",
        db: env.MOCK_DB || "ok",
        environment: "production",
        commit,
        version: null,
      }),
    );
    return;
  }

  if (req.url === "/") {
    res.writeHead(status);
    res.end("home");
    return;
  }
  if (env.MOCK_BUILD_ID && req.url === `/_next/static/${env.MOCK_BUILD_ID}/_buildManifest.js`) {
    res.writeHead(200);
    res.end("self.__BUILD_MANIFEST={}");
    return;
  }
  res.writeHead(404);
  res.end();
};

const server = http.createServer((req, res) => {
  setTimeout(() => respond(req, res), Number(env.MOCK_RESPONSE_DELAY_MS || 0));
});

setTimeout(() => server.listen(Number(env.MOCK_PORT), "127.0.0.1"), Number(env.MOCK_DELAY_MS || 0));
