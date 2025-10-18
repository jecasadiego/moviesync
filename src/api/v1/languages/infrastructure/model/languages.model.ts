
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";

  
const sequelizeInstance = getDbInstance();
  
export class LanguagesModel extends Model {
  declare language_id: number;
  declare language_name: TNullableString;
  declare language_description: TNullableString;
  declare language_is_deleted: TNullableNumber;
  declare language_create_date: TNullableDate;
  declare language_update_date: TNullableDate;
  declare language_create_id_user: TNullableNumber;
  declare language_update_id_user: TNullableNumber;
  declare language_slug_name: TNullableString
}
  
LanguagesModel.init(
  {
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    language_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    language_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    language_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    language_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    language_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    language_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_slug_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'languages',
    timestamps: true,
    createdAt: "language_create_date",
    updatedAt: "language_update_date",
    defaultScope: {
      where: {
        language_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          language_is_deleted: true
        }
      }
    }
  }
);