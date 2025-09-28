
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

  
const sequelizeInstance = getDbInstance();
  
export class FileTypesModel extends Model {
  declare sys_file_type_id: number;
  declare sys_file_type_name: TNullableString;
  declare sys_file_type_description: TNullableString;
  declare sys_file_type_is_deleted: TNullableNumber;
  declare sys_file_type_create_date: TNullableDate;
  declare sys_file_type_uptade_date: TNullableDate;
  declare sys_file_type_update_id_user: TNullableNumber;
  declare sys_file_type_create_id_user: TNullableNumber;
}
  
FileTypesModel.init(
  {
    sys_file_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    sys_file_type_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_file_type_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sys_file_type_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    sys_file_type_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_file_type_uptade_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sys_file_type_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sys_file_type_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'sys_file_types',
    timestamps: true,
    createdAt: "sys_file_type_create_date",
    updatedAt: false,
    defaultScope: {
      where: {
        sys_file_type_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          sys_file_type_is_deleted: true
        }
      }
    }
  }
);