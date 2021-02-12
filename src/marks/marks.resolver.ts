import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Mark } from './entities/mark.entity';
import { MarksService } from './marks.service';
import { CreateMarkDto, CreateMarkOutput } from './dtos/create-mark.dto';
import { GetAllMarksOutput } from './dtos/get-all-marks.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver((of) => Mark)
export class MarksResolver {
  constructor(private readonly marksService: MarksService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => GetAllMarksOutput)
  async getAllMarks(): Promise<GetAllMarksOutput> {
    return this.marksService.getAllMarks();
  }

  @Mutation((returns) => CreateMarkOutput)
  async createMark(@Args('input') createMarkDto: CreateMarkDto): Promise<CreateMarkOutput> {
    return this.marksService.createMark(createMarkDto);
  }
}
