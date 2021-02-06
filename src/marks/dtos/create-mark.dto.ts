import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { Mark } from '../entities/mark.entity';

@InputType()
export class CreateMarkDto extends PickType(Mark, [
  'markName',
  'markRegion'
]) {}

@ObjectType()
export class CreateMarkOutput extends CoreOutput {}
