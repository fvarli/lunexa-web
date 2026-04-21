import "dotenv/config";
import { createApp } from "./app";

const app = createApp();
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.NODE_ENV === "production" ? "127.0.0.1" : "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`API listening on ${HOST}:${PORT}`);
});
