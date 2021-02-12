import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Publication } from '../entities/publication.entity';
import { Search } from '../entities/search.dto';

@InputType()
export class SearchPublicationsDto extends PickType(Search, ['carType']) {}

@ObjectType()
export class SearchPublicationsOutput extends CoreOutput {
  @Field((returns) => [Publication], { nullable: true })
  publications?: Publication[];
}
