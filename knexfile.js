

module.exports = {
  development: {
      client: 'pg',
      connection: {
        database: "Q4_POSTGRES",
        host: "localhost"
      },
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
        },
    },
  production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      database: process.env.RDS_DB,
      host:process.env.RDS_HOST,
      user:process.env.RDS_USER,
      password:process.env.RDS_PASSWORD,
      port:process.env.RDS_PORT,
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds/production',
        },
    },
};
