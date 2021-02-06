import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Mark, region } from 'src/mark/entities/mark.entity';
import { Model } from '../../car/entities/model.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { type } from 'os';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../users/entities/review.entity';

type carType =
  | 'sedan'
  | 'coupe'
  | 'hatchback'
  | 'minivan'
  | 'pickup'
  | 'crossover';

@InputType('PublicationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Publication extends CoreEntity {
  @Column()
  @Field(type => String)
  carType: carType

  @Field(type => Mark)
  @ManyToOne(
    type => Mark,
    mark => mark.publications
  )
  mark: Mark

  @Field(type => Model)
  @ManyToOne(
    type => Model,
    model => model.publications
  )
  model: Model

  @Column({ default: '' })
  @Field(type => String)
  photo: string

  @Column()
  @Field(type => Number)
  yearOfProduction: number

  @Column()
  @Field(type => String)
  region: region

  @Column()
  @Field(type => Number)
  kilometres: number

  @Column({ default: '' })
  @Field(type => String)
  description: string

  @Column()
  @Field(type => Number)
  price: number


  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.publications
  )
  user: User
}
