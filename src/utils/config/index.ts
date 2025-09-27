import { version } from "../../package.json";

export default {
  port: process.env.PORT,
  node: process.env.NODE_ENV,
  apiVersion: version,
  database: {
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE_NAME,
      ssl: true,
      options: {
        //instanceName: process.env.DB_PORT_INSTANCE_NAME_DEV,
        encrypt: true, // Set to true if using SSL/TLS
        trustServerCertificate: true, // Set to true if using a self-signed certificate
      },
    },
  },
  bcrypt: {
    saltOrRouds: process.env.JWT_SALT_OR_RAUNDS ?? "12",
  },
  jwt: {
    expirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
    expirationIntervalRefresh: process.env.JWT_EXPIRATION_INTERVAL_REFRESH,
    secret: process.env.JWT_SECRET_KEY,
    issuer: process.env.JWT_ISSUER,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    from_email: process.env.SMTP_FROM_EMAIL,
    from_name: process.env.SMTP_FROM_NAME,
  },
  swagger: {
    serverLocal: process.env.SWAGGER_SERVER_LOCAL,
    serverCloud: process.env.SWAGGER_SERVER_CLOUD,
  },
  AZURE_STORAGE: {
    accountName: process.env.AZURE_STORAGE_NAME,
    accountKey: process.env.AZURE_STORAGE_KEY,
    connection: process.env.AZURE_STORAGE_CONNECTION_STRING,
  }
};
