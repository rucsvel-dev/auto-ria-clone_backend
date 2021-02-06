import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Mark } from './entities/mark.entity';
import { MarkService } from './mark.service';
import { CreateMarkDto, CreateMarkOutput } from './dtos/create-mark.dto';
import { GetAllMarksOutput } from './dtos/get-all-marks.dto';

@Resolver(of => Mark)
export class MarkResolver {
  constructor(private readonly usersService: MarkService) {}

  @Query(returns => GetAllMarksOutput)
  async getAllMarks(): Promise<GetAllMarksOutput> {
    return this.usersService.getAllMarks();
  }

  @Mutation(returns => CreateMarkOutput)
  async createMark(
    @Args('input') createMarkDto: CreateMarkDto,
  ): Promise<CreateMarkOutput> {
    return this.usersService.createMark(createMarkDto);
  }
}
