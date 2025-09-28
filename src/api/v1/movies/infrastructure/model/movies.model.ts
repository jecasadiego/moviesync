
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableString,  TNullableNumber, TNullableDate } from "@app/utils/shared/types";

  
const sequelizeInstance = getDbInstance();
  
export class MoviesModel extends Model {
  declare movie_id: number;
  declare movie_id_image_default: TNullableNumber;
  declare movie_id_status: TNullableNumber;
  declare movie_title: TNullableString;
  declare movie_description: TNullableString;
  declare movie_is_deleted: TNullableNumber;
  declare movie_create_date: TNullableDate;
  declare movie_update_date: TNullableDate;
  declare movie_create_id_user: TNullableNumber;
  declare movie_update_id_user: TNullableNumber;
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
      allowNull: true,
      defaultValue: 1,
    },

    movie_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    movie_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    movie_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    movie_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    movie_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    movie_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
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