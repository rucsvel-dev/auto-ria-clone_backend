import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends PickType(User, [
  'firstName',
  'lastName',
  'email',
  'password'
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
