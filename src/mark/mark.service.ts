import { Injectable } from '@nestjs/common';
import { Mark } from './entities/mark.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMarkDto, CreateMarkOutput } from './dtos/create-mark.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MarkService {
  constructor(
    @InjectRepository(Mark) private readonly marks: Repository<Mark>
  ) {}
  async getAllMarks(){
    try {
      const marks = await this.marks.find();
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
      const exists = await this.marks.findOne({ markName });
      if (exists) {
        return { ok: false, error: 'There is a mark with that name already' };
      }
      await this.marks.save(this.marks.create({ markName, markRegion }));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: "Couldn't create mark" };
    }
  }
}
