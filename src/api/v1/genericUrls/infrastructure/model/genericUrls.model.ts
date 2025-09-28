
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString, TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { FileTypesModel } from '@api/fileTypes/infrastructure/model/fileTypes.model';
  
const sequelizeInstance = getDbInstance();
  
export class GenericUrlsModel extends Model {
  declare gene_url_id: number;
  declare gene_url_file_type: TNullableNumber;
  declare gene_url_value: TNullableString;
  declare gene_url_format: TNullableString;
  declare gene_url_size: number;
  declare gene_url_is_deleted: TNullableNumber;
  declare gene_url_create_date: TNullableDate;
  declare gene_url_update_date: TNullableDate;
  declare gene_url_update_id_user: TNullableNumber;
  declare gene_url_create_id_user: TNullableNumber;

  static associate() {
    this.belongsTo(FileTypesModel, {
      foreignKey: "gene_url_file_type",
      as: "fileType",
    });
  }
}
  
GenericUrlsModel.init(
  {
    gene_url_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    gene_url_file_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    gene_url_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gene_url_format: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gene_url_size: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    gene_url_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    gene_url_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    gene_url_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    gene_url_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    gene_url_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'generic_urls',
    timestamps: true,
    createdAt: "gene_url_create_date",
    updatedAt: "gene_url_update_date",
    defaultScope: {
      where: {
        gene_url_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          gene_url_is_deleted: true
        }
      }
    }
  }
);

GenericUrlsModel.associate();