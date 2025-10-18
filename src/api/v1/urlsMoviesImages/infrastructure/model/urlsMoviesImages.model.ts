
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { GenericUrlsModel } from '@app/api/v1/genericUrls/infrastructure/model/genericUrls.model';

const sequelizeInstance = getDbInstance();

export class UrlsMoviesImagesModel extends Model {
  declare url_movies_id: number;
  declare url_movies_id_movie: TNullableNumber;
  declare url_movies_id_images: TNullableNumber;
  declare url_movies_create_date: TNullableDate;
  declare url_movies_update_date: TNullableDate;
  declare url_movies_create_id_user: TNullableNumber;
  declare url_movies_update_id_user: TNullableNumber

  static associate() {
    this.belongsTo(GenericUrlsModel, {
      foreignKey: 'url_movies_id_images',
      as: 'images',
    })
  }
}

UrlsMoviesImagesModel.init(
  {
    url_movies_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    url_movies_id_movie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    url_movies_id_images: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    url_movies_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    url_movies_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    url_movies_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    url_movies_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'url_movies_images',
    timestamps: true,
    createdAt: "url_movies_create_date",
    updatedAt: "url_movies_update_date",
  }
);

UrlsMoviesImagesModel.associate();