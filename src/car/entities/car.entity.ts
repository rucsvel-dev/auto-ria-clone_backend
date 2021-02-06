import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Mark } from '../../mark/entities/mark.entity';
import { Review } from '../../users/entities/review.entity';
import { Model } from './model.entity';

@InputType('CarInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Car extends CoreEntity {
  @Field(type => Mark, { nullable: true })
  @ManyToOne(
    type => Mark,
    mark => mark.cars
  )
  mark: Mark

  @Column()
  @Field(type => String)
  name: string

  @Field(type => [Model])
  @OneToMany(
    type => Model,
    model => model.car
  )
  models: Model[]

}
