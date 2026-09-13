import "dotenv/config";
import { createApp } from "./app";

const app = createApp();
const PORT = Number(process.env.PORT) || 4000;
// Production is always loopback-only — nginx is the sole way in. Development
// still defaults to 0.0.0.0 so a phone on the LAN can reach a dev server, but
// HOST overrides it: the local .test stack puts nginx in front here too, and an
// upstream that answers on every interface would quietly undo that.
const HOST =
  process.env.HOST ||
  (process.env.NODE_ENV === "production" ? "127.0.0.1" : "0.0.0.0");

app.listen(PORT, HOST, () => {
  console.log(`API listening on ${HOST}:${PORT}`);
});
