
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

  
const sequelizeInstance = getDbInstance();
  
export class RolesModel extends Model {
  declare sys_role_id: number;
  declare sys_role_name: TNullableString;
  declare sys_role_description: TNullableString;
  declare sys_role_name_slug_i_value: TNullableString;
  declare sys_role_is_deleted: TNullableNumber;
  declare sys_role_create_date: TNullableDate;
  declare sys_role_update_date: TNullableDate;
  declare sys_role_update_id_user: TNullableNumber;
  declare sys_role_created_id_user: TNullableNumber;
}
  
RolesModel.init(
  {
    sys_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    sys_role_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_role_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_role_name_slug_i_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_role_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    sys_role_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_role_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_role_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sys_role_created_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'sys_roles',
    timestamps: true,
    createdAt: "sys_role_create_date",
    updatedAt: "sys_role_update_date",
    defaultScope: {
      where: {
        sys_role_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          sys_role_is_deleted: true
        }
      }
    }
  }
);