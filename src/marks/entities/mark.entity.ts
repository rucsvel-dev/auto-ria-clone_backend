import {
  Column,
  Entity, OneToMany,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Car } from '../../cars/entities/car.entity';
import { Model } from '../../cars/entities/model.entity';
import { Publication } from '../../publications/entities/publication.entity';

export type region = 'Mykolaiv' | 'Kiev' | 'Odessa';

@InputType('MarkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Mark extends CoreEntity {
  @Column()
  @Field(type => String)
  markName: string

  @Column()
  @Field(type => String)
  markRegion: region

  @Field(type => [Car], { nullable: true })
  @OneToMany(
    type => Car,
    car => car.mark
  )
  cars: Car[]

  @Field(type => [Publication], { nullable: true })
  @OneToMany(
    type => Publication,
    publication => publication.mark
  )
  publications: Publication[]
}
