import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';

@InputType()
export class DeletePublicationDto {
  @Field((type) => Number)
  publicationId: number;
}

@ObjectType()
export class DeletePublicationOutput extends CoreOutput {}
