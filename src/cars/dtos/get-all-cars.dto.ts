import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';
import { PaginationDto, PaginationOutput } from '../../common/dtos/pagination.dto';

@InputType()
export class GetAllCarsDto extends PaginationDto {}

@ObjectType()
export class GetAllCarsOutput extends PaginationOutput {
  @Field((type) => [Car], { nullable: true })
  cars?: Car[];
}
