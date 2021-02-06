import {
  Column,
  Entity, ManyToOne, OneToMany,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from './user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity {
  @Column()
  @Field(type => String)
  message: string

  @Field(type => [User])
  @OneToMany(
    type => User,
    user => user.writedReviews
  )
  from: User

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.myReviews
  )
  to: User
}
