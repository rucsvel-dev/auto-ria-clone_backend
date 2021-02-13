import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto, CreateCarOutput } from './dtos/create-car.dto';
import { Mark } from '../marks/entities/mark.entity';
import { GetAllCarsDto, GetAllCarsOutput } from './dtos/get-all-cars.dto';
import { User } from '../users/entities/user.entity';
import {
  DeletePublicationDto,
  DeletePublicationOutput,
} from '../publications/dtos/delete-publication.dto';
import { DeleteCarDto, DeleteCarOutput } from './dtos/delete-car.dto';
import { GetAllCarsByMarkDto, GetAllCarsByMarkOutput } from './dtos/get-all-cars-by-mark.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    @InjectRepository(Mark) private readonly marksRepository: Repository<Mark>,
  ) {}

  private PER_PAGE_RESULT = 10;

  async getAllCars({ page }: GetAllCarsDto): Promise<GetAllCarsOutput> {
    try {
      const [cars, carsCount] = await this.carsRepository.findAndCount({
        skip: (page - 1) * this.PER_PAGE_RESULT,
        take: this.PER_PAGE_RESULT,
        relations: ['mark'],
      });
      return {
        ok: true,
        cars,
        totalPages: Math.ceil(carsCount / this.PER_PAGE_RESULT),
        totalResults: carsCount,
      };
    } catch (err) {
      return { ok: false, error: 'Could not load cars' };
    }
  }

  async getAllCarsByMark({ markId, page }: GetAllCarsByMarkDto): Promise<GetAllCarsByMarkOutput> {
    try {
      const [cars, carsCount] = await this.carsRepository.findAndCount({
        where: { markId },
        skip: (page - 1) * this.PER_PAGE_RESULT,
        take: this.PER_PAGE_RESULT,
        relations: ['mark'],
      });
      return {
        ok: true,
        cars,
        totalPages: Math.ceil(carsCount / this.PER_PAGE_RESULT),
        totalResults: carsCount,
      };
    } catch (err) {
      return { ok: false, error: 'Could not load cars' };
    }
  }

  async createCar({ name, yearOfCreation, markId }: CreateCarDto): Promise<CreateCarOutput> {
    try {
      const existsCar = await this.carsRepository.findOne({ name });
      const existsMark = await this.marksRepository.findOne({ id: markId });
      if (existsCar) {
        return { ok: false, error: 'There is a car with that name already' };
      }
      if (existsMark) {
        const car = this.carsRepository.create({ name, yearOfCreation });
        car.mark = existsMark;
        await this.carsRepository.save(car);
      } else {
        return {
          ok: false,
          error: "There is a mark with that id dosen't exists",
        };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Couldn't create car" };
    }
  }

  async deleteCar({ carId }: DeleteCarDto): Promise<DeleteCarOutput> {
    try {
      const car = await this.carsRepository.findOne({ id: carId });
      if (!car) {
        return { ok: false, error: 'Not found' };
      }
      await this.carsRepository.delete(car);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Could not delete car' };
    }
  }
}
