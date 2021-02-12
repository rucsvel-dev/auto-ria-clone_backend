import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsResolver } from './publications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Search } from './entities/search.dto';
import { User } from '../users/entities/user.entity';
import { Mark } from '../marks/entities/mark.entity';
import { Car } from '../cars/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication, Search, Mark, Car, User])],
  providers: [PublicationsService, PublicationsResolver],
})
export class PublicationsModule {}
