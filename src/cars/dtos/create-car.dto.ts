import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Car } from '../entities/car.entity';

@InputType()
export class CreateCarDto extends PickType(Car, [
  'name',
  'yearOfCreation'
]) {
  @Field(type => Number)
  markId: number;
}

@ObjectType()
export class CreateCarOutput extends CoreOutput {}
