
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";


const sequelizeInstance = getDbInstance();

export class TheatersModel extends Model {
  declare theater_id: number;
  declare theater_name: TNullableString;
  declare theater_latitude: number;
  declare theater_longitude: number;
  declare theater_description: TNullableString;
  declare theater_is_deleted: TNullableNumber;
  declare theater_create_date: TNullableDate;
  declare theater_update_date: TNullableDate;
  declare theater_create_id_user: TNullableNumber;
  declare theater_update_id_user: TNullableNumber;
}

TheatersModel.init(
  {
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    theater_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    theater_latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    theater_longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    theater_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    theater_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    theater_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    theater_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    theater_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    theater_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'theaters',
    timestamps: true,
    createdAt: "theater_create_date",
    updatedAt: "theater_update_date",
    defaultScope: {
      where: {
        theater_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          theater_is_deleted: true
        }
      }
    }
  }
);