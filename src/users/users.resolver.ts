import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { GetAllUsersOutput } from './dtos/get-all-users.dto';
import { User } from './entities/user.entity';
import { CreateUserDto, CreateUserOutput } from './dtos/create-account.dto';
import { LoginDto, LoginOutput } from './dtos/login.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => GetAllUsersOutput)
  async getAllUsers(): Promise<GetAllUsersOutput> {
    return this.usersService.getAllUsers();
  }

  @Mutation((returns) => CreateUserOutput)
  async createAccount(
    @Args('input') createUserDto: CreateUserDto,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginDto: LoginDto): Promise<CreateUserOutput> {
    return this.usersService.login(loginDto);
  }
}
