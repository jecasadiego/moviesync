
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";

  
const sequelizeInstance = getDbInstance();
  
export class LanguagesByMoviesModel extends Model {
  declare language_by_movie_id: number;
  declare language_by_movie_id_language: TNullableNumber;
  declare language_by_movie_id_movie: TNullableNumber;
  declare language_by_movie_id_url_sound: TNullableNumber;
  declare language_by_movie_is_deleted: TNullableNumber;
  declare language_by_movie_create_date: TNullableDate;
  declare language_by_movie_update_date: TNullableDate;
  declare language_by_movie_create_id_user: TNullableNumber;
  declare language_by_movie_update_id_user: TNullableNumber;

}
  
LanguagesByMoviesModel.init(
  {
    language_by_movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    language_by_movie_id_language: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_by_movie_id_movie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_by_movie_id_url_sound: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_by_movie_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    language_by_movie_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    language_by_movie_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    language_by_movie_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    language_by_movie_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'languages_by_movies',
    timestamps: true,
    createdAt: "language_by_movie_create_date",
    updatedAt: "language_by_movie_update_date",
    defaultScope: {
      where: {
        language_by_movie_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          language_by_movie_is_deleted: true
        }
      }
    }
  }
);