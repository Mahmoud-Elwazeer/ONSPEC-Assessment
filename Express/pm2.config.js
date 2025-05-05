// pm2.config.js
module.exports = {
    apps: [
      {
        name: 'app',
        script: 'dist/server.js',
        env: {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DATABASE_URL: process.env.DATABASE_URL,
            REDIS_HOST: process.env.REDIS_HOST,
            REDIS_PORT: process.env.REDIS_PORT ,
            ExpiryTimeForCache: process.env.ExpiryTimeForCache,
            SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
            GOOGLE_MAIL: process.env.GOOGLE_MAIL,
            GOOGLE_PASS: process.env.GOOGLE_PASS,
        }
      },
    ],
  };