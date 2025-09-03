import { version } from "../../package.json";

export default {
  port: process.env.PORT ?? 8080,
  node: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL,
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
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT_02),
    port01: Number(process.env.SMTP_PORT_01),
    port02: Number(process.env.SMTP_PORT_02),
    port03: Number(process.env.SMTP_PORT_03),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    fromEmail: process.env.SMTP_FROM_EMAIL,
    fromName: process.env.SMTP_FROM_NAME,
  },
};
