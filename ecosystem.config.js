module.exports = {
  apps: [
    {
      name: "2020mall.com",
      script: "pnpm",
      args: "start",
      cwd: "/var/www/frontend/2020mall.com",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_YANDEX_API_KEY: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
        NEXT_PUBLIC_API_URL: "https://api.monera.uz/api/v1"
      },
    },
  ],
};