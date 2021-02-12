import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@InputType()
export class DeleteCarDto {
  @Field((type) => Number)
  carId: number;
}

@ObjectType()
export class DeleteCarOutput extends CoreOutput {}
