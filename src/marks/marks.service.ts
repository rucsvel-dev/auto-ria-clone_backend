import { Injectable } from '@nestjs/common';
import { Mark } from './entities/mark.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarkDto, CreateMarkOutput } from './dtos/create-mark.dto';
import { Repository } from 'typeorm';
import { GetAllCarsOutput } from '../cars/dtos/get-all-cars.dto';
import { GetAllMarksOutput } from './dtos/get-all-marks.dto';
import { DeleteCarDto, DeleteCarOutput } from '../cars/dtos/delete-car.dto';
import { DeleteMarkDto, DeleteMarkOutput } from './dtos/delete-mark.dto';

@Injectable()
export class MarksService {
  constructor(@InjectRepository(Mark) private readonly marksRepository: Repository<Mark>) {}
  async getAllMarks(): Promise<GetAllMarksOutput> {
    try {
      const marks = await this.marksRepository.find();
      return { ok: true, marks };
    } catch (err) {
      return { ok: false, error: 'TODO' };
    }
  }

  async createMark({ markName, markRegion }: CreateMarkDto): Promise<CreateMarkOutput> {
    try {
      const exists = await this.marksRepository.findOne({ markName });
      if (exists) {
        return { ok: false, error: 'There is a marks with that name already' };
      }
      await this.marksRepository.save(this.marksRepository.create({ markName, markRegion }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Couldn't create marks" };
    }
  }

  async deleteMark({ markId }: DeleteMarkDto): Promise<DeleteMarkOutput> {
    try {
      const mark = await this.marksRepository.findOne({ id: markId });
      if (!mark) {
        return { ok: false, error: 'Not found' };
      }
      await this.marksRepository.delete(mark);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Could not delete mark' };
    }
  }
}
