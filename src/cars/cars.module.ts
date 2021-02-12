import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Mark } from '../marks/entities/mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Mark])],
  providers: [CarsService, CarsResolver],
})
export class CarsModule {}
