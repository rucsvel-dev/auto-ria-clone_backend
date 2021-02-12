import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto, CreateCarOutput } from './dtos/create-car.dto';
import { Mark } from '../marks/entities/mark.entity';
import { GetAllCarsOutput } from './dtos/get-all-cars.dto';
import { User } from '../users/entities/user.entity';
import {
  DeletePublicationDto,
  DeletePublicationOutput,
} from '../publications/dtos/delete-publication.dto';
import { DeleteCarDto, DeleteCarOutput } from './dtos/delete-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    @InjectRepository(Mark) private readonly marksRepository: Repository<Mark>,
  ) {}

  async getAllCars(): Promise<GetAllCarsOutput> {
    try {
      const cars = await this.carsRepository.find({ relations: ['mark'] });
      return { ok: true, cars };
    } catch (err) {
      return { ok: false, error: 'TODO' };
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
