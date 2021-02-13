import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Car } from '../entities/car.entity';
import { PaginationDto, PaginationOutput } from '../../common/dtos/pagination.dto';

@InputType()
export class GetAllCarsByMarkDto extends PaginationDto {
  @Field((type) => Number)
  markId: number;
}

@ObjectType()
export class GetAllCarsByMarkOutput extends PaginationOutput {
  @Field((returns) => [Car], { nullable: true })
  cars?: Car[];
}
