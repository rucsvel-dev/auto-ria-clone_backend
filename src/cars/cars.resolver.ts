import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Car } from './entities/car.entity';
import { GetAllCarsDto, GetAllCarsOutput } from './dtos/get-all-cars.dto';
import { CarsService } from './cars.service';
import { CreateCarDto, CreateCarOutput } from './dtos/create-car.dto';
import { DeleteCarDto, DeleteCarOutput } from './dtos/delete-car.dto';
import { GetAllCarsByMarkDto, GetAllCarsByMarkOutput } from './dtos/get-all-cars-by-mark.dto';

@Resolver((of) => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query((returns) => GetAllCarsOutput)
  async getAllCars(@Args('input') getAllCarsDto: GetAllCarsDto): Promise<GetAllCarsOutput> {
    return this.carsService.getAllCars(getAllCarsDto);
  }

  @Query((returns) => GetAllCarsByMarkOutput)
  async getAllCarsByMark(
    @Args('input') getAllCarsByMarkDto: GetAllCarsByMarkDto,
  ): Promise<GetAllCarsByMarkOutput> {
    return this.carsService.getAllCarsByMark(getAllCarsByMarkDto);
  }

  @Mutation((returns) => CreateCarOutput)
  async createCar(@Args('input') createCarDto: CreateCarDto): Promise<CreateCarOutput> {
    return this.carsService.createCar(createCarDto);
  }

  @Mutation((returns) => DeleteCarOutput)
  async deleteCar(@Args('input') deleteCarDto: DeleteCarDto): Promise<DeleteCarOutput> {
    return this.carsService.deleteCar(deleteCarDto);
  }
}
