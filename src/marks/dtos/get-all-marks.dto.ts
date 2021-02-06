import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Mark } from '../entities/mark.entity';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@ObjectType()
export class GetAllMarksOutput extends CoreOutput {
  @Field(type => [Mark], { nullable: true })
  marks?: Mark[]
}
