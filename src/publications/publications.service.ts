import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { SearchPublicationsDto, SearchPublicationsOutput } from './dtos/search-publications.dto';
import { User } from '../users/entities/user.entity';
import { Search } from './entities/search.dto';
import { CreatePublicationDto, CreatePublicationOutput } from './dtos/create-publication.dto';
import { PUBLICATION_PRICE } from '../common/common.constants';
import { Mark } from '../marks/entities/mark.entity';
import { Car } from '../cars/entities/car.entity';
import { DeletePublicationDto, DeletePublicationOutput } from './dtos/delete-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication) private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(Search) private readonly searchRepository: Repository<Search>,
    @InjectRepository(Mark) private readonly markRepository: Repository<Mark>,
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async searchPublications(
    user: User,
    { carType }: SearchPublicationsDto,
  ): Promise<SearchPublicationsOutput> {
    try {
      //TODO
      const publications = await this.publicationRepository.find({ where: { carType: carType } });
      if (user) {
        await this.searchRepository.save(this.searchRepository.create({ carType, user }));
      }
      return { ok: true, publications };
    } catch (err) {
      return { ok: true, error: 'TODO' };
    }
  }

  async createPublication(
    user: User,
    { markId, carId, ...rest }: CreatePublicationDto,
  ): Promise<CreatePublicationOutput> {
    try {
      const mark = await this.markRepository.findOne({ id: markId });
      const car = await this.carRepository.findOne({ id: carId });
      if (user.oneFreePublication) {
        user.oneFreePublication = false;
        await this.userRepository.save(user);
        await this.publicationRepository.save(
          this.publicationRepository.create({ user, mark, car, ...rest }),
        );
      } else if (user.balance >= PUBLICATION_PRICE) {
        user.balance -= PUBLICATION_PRICE;
        await this.userRepository.save(user);
        await this.publicationRepository.save(
          this.publicationRepository.create({ user, mark, car, ...rest }),
        );
      } else {
        return { ok: false, error: 'Not enough money' };
      }
      return { ok: true };
    } catch (err) {
      return { ok: true, error: 'TODO' };
    }
  }

  async deletePublication(
    user: User,
    { publicationId }: DeletePublicationDto,
  ): Promise<DeletePublicationOutput> {
    try {
      const publication = await this.publicationRepository.findOne({ id: publicationId });
      if (!publication) {
        return { ok: false, error: 'Not found' };
      }
      if (publication.ownerId !== user.id) {
        return { ok: false, error: "Can't delete, you don't own it" };
      }
      await this.publicationRepository.delete(publication);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Could not delete publication' };
    }
  }
}
