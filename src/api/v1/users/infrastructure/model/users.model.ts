
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";
  
const sequelizeInstance = getDbInstance();
  
export class UsersModel extends Model {
  declare sys_user_id: number;
  declare sys_user_id_profile_photo: TNullableNumber;
  declare sys_user_id_role: TNullableNumber;
  declare sys_user_name: TNullableString;
  declare sys_user_lastname: TNullableString;
  declare sys_user_email: TNullableString;
  declare sys_user_password: TNullableString;
  declare sys_user_is_deleted: TNullableNumber;
  declare sys_user_create_date: TNullableDate;
  declare sys_user_create_id_user: TNullableNumber;
  declare sys_user_update_date: TNullableDate;
  declare sys_user_update_id_user: TNullableNumber;
}
  
UsersModel.init(
  {
    sys_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    sys_user_id_profile_photo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sys_user_id_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sys_user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_user_lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_user_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_user_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_user_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    sys_user_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_user_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sys_user_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_user_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'sys_users',
    timestamps: true,
    createdAt: "sys_user_create_date",
    updatedAt: "sys_user_update_date",
    defaultScope: {
      where: {
        sys_user_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          sys_user_is_deleted: true
        }
      }
    }
  }
);