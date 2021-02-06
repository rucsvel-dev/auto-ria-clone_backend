import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Car } from './car.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Publication } from '../../publications/entities/publication.entity';

@InputType('ModelInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Model extends CoreEntity {
  @Column()
  @Field(type => Number)
  year: number

  @Column()
  @Field(type => Number)
  engineVolume: number

  @Field(type => Car)
  @ManyToOne(
    type => Car,
    car => car.models
  )
  car: Car

  @Field(type => [Publication])
  @OneToMany(
    type => Publication,
    publication => publication.mark
  )
  publications: Publication[]
}
