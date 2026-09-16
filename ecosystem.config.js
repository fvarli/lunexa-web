module.exports = {
  apps: [
    {
      name: "lunexa-api",
      cwd: "./apps/api",
      script: "dist/server.js",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "300M",
      autorestart: true,
    },
    {
      name: "lunexa-web",
      // Built in CI and shipped as a standalone artifact — the production box
      // no longer runs `next build`. `web-current` is a symlink to the active
      // release under web-releases/<sha>, so this path never changes.
      cwd: __dirname,
      script: "./web-current/server.js",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      max_memory_restart: "400M",
      autorestart: true,
    },
  ],
};
