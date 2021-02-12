import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Publication } from '../entities/publication.entity';

@InputType()
export class CreatePublicationDto extends PickType(Publication, [
  'carType',
  'photo',
  'yearOfProduction',
  'country',
  'kilometres',
  'description',
  'price',
]) {
  @Field((type) => Number)
  markId: number;

  @Field((type) => Number)
  carId: number;
}

@ObjectType()
export class CreatePublicationOutput extends CoreOutput {}
