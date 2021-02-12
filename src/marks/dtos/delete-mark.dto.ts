import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@InputType()
export class DeleteMarkDto {
  @Field((type) => Number)
  markId: number;
}

@ObjectType()
export class DeleteMarkOutput extends CoreOutput {}
