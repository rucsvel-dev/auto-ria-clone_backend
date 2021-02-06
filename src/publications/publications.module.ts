import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsResolver } from './publications.resolver';

@Module({
  providers: [PublicationsService, PublicationsResolver]
})
export class PublicationsModule {}
