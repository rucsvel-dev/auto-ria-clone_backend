import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto, CreateCarOutput } from './dtos/create-car.dto';
import { Mark } from '../marks/entities/mark.entity';
import { GetAllCarsOutput } from './dtos/get-all-cars.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly cars: Repository<Car>,
    @InjectRepository(Mark) private readonly marks: Repository<Mark>,
  ) {}

  async getAllCars(): Promise<GetAllCarsOutput>{
    try {
      const cars = await this.cars.find({relations: ['mark']});
      return { ok: true, cars };
    } catch (err){
      return { ok: false, error: 'TODO' };
    }
  }

  async createCar({
    name,
    yearOfCreation,
    markId,
  }: CreateCarDto): Promise<CreateCarOutput>{
    try {
      const existsCar = await this.cars.findOne({ name });
      const existsMark = await this.marks.findOne({ id: markId });
      if (existsCar) {
        return { ok: false, error: 'There is a car with that name already' };
      }
      if (existsMark) {
        const car = this.cars.create({ name, yearOfCreation });
        car.mark = existsMark;
        await this.cars.save(car);
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
}
