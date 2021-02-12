import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Publication } from './entities/publication.entity';
import { PublicationsService } from './publications.service';
import { SearchPublicationsDto, SearchPublicationsOutput } from './dtos/search-publications.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreatePublicationDto, CreatePublicationOutput } from './dtos/create-publication.dto';
import { UseGuards } from '@nestjs/common';
import { DeletePublicationDto, DeletePublicationOutput } from './dtos/delete-publication.dto';

@Resolver((of) => Publication)
export class PublicationsResolver {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Mutation((returns) => SearchPublicationsOutput)
  async searchPublications(
    @AuthUser() user: User,
    @Args('input') searchPublicationsDto: SearchPublicationsDto,
  ): Promise<SearchPublicationsOutput> {
    return this.publicationsService.searchPublications(user, searchPublicationsDto);
  }

  // @UseGuards(AuthUser)
  @Mutation((returns) => CreatePublicationOutput)
  async createPublication(
    @AuthUser() user: User,
    @Args('input') createPublicationDto: CreatePublicationDto,
  ): Promise<CreatePublicationOutput> {
    return this.publicationsService.createPublication(user, createPublicationDto);
  }

  // @UseGuards(AuthUser)
  @Mutation((returns) => DeletePublicationOutput)
  async deletePublication(
    @AuthUser() user: User,
    @Args('input') deletePublicationDto: DeletePublicationDto,
  ): Promise<DeletePublicationOutput> {
    return this.publicationsService.deletePublication(user, deletePublicationDto);
  }
}
