
import { Model, DataTypes } from 'sequelize';
import { getDbInstance } from '@app/app/database';
import { TNullableNumber, TNullableDate } from "@app/utils/shared/types";

const sequelizeInstance = getDbInstance();
  
export class MovieByTheatersModel extends Model {
  declare movies_by_theater_id: number;
  declare movies_by_theater_id_movie: TNullableNumber;
  declare movies_by_theater_id_theater: TNullableNumber;
  declare movies_by_theater_is_deleted: TNullableNumber;
  declare movies_by_theater_create_date: TNullableDate;
  declare movies_by_theater_update_date: TNullableDate;
  declare movies_by_theater_id_user: TNullableNumber;
  declare movies_by_theater_update_id_user: TNullableNumber;
  declare movies_by_theater_create_id_user: TNullableNumber;
}
  
MovieByTheatersModel.init(
  {
    movies_by_theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    movies_by_theater_id_movie: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    movies_by_theater_id_theater: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    movies_by_theater_is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    movies_by_theater_create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    movies_by_theater_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    movies_by_theater_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    movies_by_theater_update_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    movies_by_theater_create_id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeInstance,
    tableName: 'movies_by_theaters',
    timestamps: true,
    createdAt: "movies_by_theater_create_date",
    updatedAt: "movies_by_theater_update_date",
    defaultScope: {
      where: {
        movies_by_theater_is_deleted: false
      }
    },
    scopes: {
      deleted: {
        where: {
          movies_by_theater_is_deleted: true
        }
      }
    }
  }
);