import { Sequelize, Options } from "sequelize";
import config from "@app/config";
import { isMainThread } from "worker_threads";

const cn = config.database.connection;

let sequelizeInstance: Sequelize | null = null;

const createInstanceDb = () => {
  if (!cn?.database || !cn?.user || cn?.password === undefined || !cn?.host || !cn?.port) {
    throw new Error("Database configuration is incomplete. Please check your environment variables.");
  }

  const options: Options = {
    host: cn.host,
    port: Number(cn.port ?? 3306),
    dialect: "mysql",
    pool: { min: 2, max: 10, acquire: 10000, idle: 10000 },
    define: {
      timestamps: false,
    },
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    logging: false,
  };

  sequelizeInstance = new Sequelize(cn.database, cn.user, cn.password, options);

  sequelizeInstance
    .authenticate()
    .then(() => {
      if (isMainThread) {
        console.info("✅ Connected to MySQL successfully in port", cn.port);
        console.log("--------------------------");
      }
    })
    .catch((error) => {
      console.error("❌ Failed to connect to MySQL:", error);
    });
};

export const getDbInstance = (): Sequelize => {
  if (!sequelizeInstance) createInstanceDb();
  if (!sequelizeInstance) throw new Error("Failed to create a Sequelize instance.");
  return sequelizeInstance;
};

export const closeDbInstance = async () => {
  if (sequelizeInstance) {
    await sequelizeInstance.close();
    sequelizeInstance = null;
  }
};

createInstanceDb();
