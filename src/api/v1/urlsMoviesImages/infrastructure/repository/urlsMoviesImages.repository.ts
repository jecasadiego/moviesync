
import { IUrlsMoviesImagesRepository } from '@api/urlsMoviesImages/domain/urlsMoviesImages.entity';
import { UrlsMoviesImagesModel } from '@api/urlsMoviesImages/infrastructure/model/urlsMoviesImages.model';
import { GenericUrlsModel } from '@app/api/v1/genericUrls/infrastructure/model/genericUrls.model';
import { Transaction } from 'sequelize';

export class UrlsMoviesImagesRepository implements IUrlsMoviesImagesRepository {
  async findAll(): Promise<UrlsMoviesImagesModel[]> {
    return await UrlsMoviesImagesModel.findAll();
  }

  async findById(id: number): Promise<UrlsMoviesImagesModel | null> {
    return await UrlsMoviesImagesModel.findByPk(id);
  }

  async findAllByMovieId(id: number): Promise<UrlsMoviesImagesModel[]> {
    return await UrlsMoviesImagesModel.findAll({
      where: { url_movies_id_movie: id },
      include: [{ model: GenericUrlsModel, as: 'images', attributes: ['gene_url_value'] }]
    });
  }

  async create(urlsMoviesImagesData: Partial<UrlsMoviesImagesModel>, transaction?: Transaction): Promise<UrlsMoviesImagesModel> {
    return await UrlsMoviesImagesModel.create(urlsMoviesImagesData, { transaction });
  }

  async update(id: number, urlsMoviesImagesData: Partial<UrlsMoviesImagesModel>): Promise<UrlsMoviesImagesModel> {
    const urlsmoviesimages = await UrlsMoviesImagesModel.findByPk(id);
    if (!urlsmoviesimages) throw new Error('UrlsMoviesImages not found');
    return await urlsmoviesimages.update(urlsMoviesImagesData);
  }

}
