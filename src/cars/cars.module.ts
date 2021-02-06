import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Model } from './entities/model.entity';
import { Mark } from '../marks/entities/mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Model, Mark])],
  providers: [CarsService, CarsResolver]
})
export class CarsModule {}
