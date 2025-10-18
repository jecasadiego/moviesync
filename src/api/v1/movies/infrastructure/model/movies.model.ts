
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";
import { UrlsMoviesImagesModel } from '@app/api/v1/urlsMoviesImages/infrastructure/model/urlsMoviesImages.model';
import { GenericUrlsModel } from '@app/api/v1/genericUrls/infrastructure/model/genericUrls.model';

  
const sequelizeInstance = getDbInstance();
  
export class MoviesModel extends Model {
  declare movie_id: number;
  declare movie_id_image_default: TNullableNumber;
  declare movie_id_status: number;
  declare movie_title: string;
  declare movie_description: string;
  declare movie_is_deleted: TNullableNumber;
  declare movie_create_date: Date;
  declare movie_update_date: TNullableDate;
  declare movie_create_id_user: number;
  declare movie_update_id_user: TNullableNumber;

  static associate() { 
    this.belongsTo(GenericUrlsModel, { foreignKey: 'movie_id_image_default', as: 'image_default' });
    this.hasMany(UrlsMoviesImagesModel, { foreignKey: 'url_movies_id_movie', as: 'images_movies' });
  }
}
  
MoviesModel.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    movie_id_image_default: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    movie_id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    movie_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    movie_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    movie_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    movie_create_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    movie_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    movie_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    movie_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'movies',
    timestamps: true,
    createdAt: "movie_create_date",
    updatedAt: "movie_update_date",
    defaultScope: {
      where: {
        movie_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          movie_is_deleted: true
        }
      }
    }
  }
);

MoviesModel.associate();