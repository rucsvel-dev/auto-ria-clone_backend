import { Module } from '@nestjs/common';
import { MarkResolver } from './mark.resolver';
import { MarkService } from './mark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  providers: [MarkResolver, MarkService]
})
export class MarkModule {}
