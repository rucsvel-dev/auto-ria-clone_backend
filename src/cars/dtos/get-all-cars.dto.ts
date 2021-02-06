import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Car } from '../entities/car.entity';

@ObjectType()
export class GetAllCarsOutput extends CoreOutput {
  @Field(type => [Car], { nullable: true })
  cars?: Car[]
}
