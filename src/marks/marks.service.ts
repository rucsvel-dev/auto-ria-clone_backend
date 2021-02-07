import { Injectable } from '@nestjs/common';
import { Mark } from './entities/mark.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarkDto, CreateMarkOutput } from './dtos/create-mark.dto';
import { Repository } from 'typeorm';
import { GetAllCarsOutput } from '../cars/dtos/get-all-cars.dto';
import { GetAllMarksOutput } from './dtos/get-all-marks.dto';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark) private readonly marksRepository: Repository<Mark>
  ) {}
  async getAllMarks(): Promise<GetAllMarksOutput>{
    try {
      const marks = await this.marksRepository.find();
      return { ok: true, marks }
    } catch (err){
      return { ok: false, error: "TODO" };
    }
  }

  async createMark({
    markName,
    markRegion
  }: CreateMarkDto): Promise<CreateMarkOutput> {
    try {
      const exists = await this.marksRepository.findOne({ markName });
      if (exists) {
        return { ok: false, error: 'There is a marks with that name already' };
      }
      await this.marksRepository.save(
        this.marksRepository.create({ markName, markRegion }),
      );
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Couldn't create marks" };
    }
  }
}
