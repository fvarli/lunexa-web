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
      cwd: "./apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "400M",
      autorestart: true,
    },
  ],
};
