import { Module } from '@nestjs/common';
import { MarksResolver } from './marks.resolver';
import { MarksService } from './marks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  providers: [MarksResolver, MarksService]
})
export class MarksModule {}
