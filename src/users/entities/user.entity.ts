import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Review } from './review.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(type => String)
  firstName: string

  @Column({ default: '' })
  @Field(type => String)
  lastName: string

  @Column()
  @Field(type => String)
  email: string

  // mobile?:string
  @Column({ default: '' })
  @Field(type => String)
  googleId: string

  @Column()
  @Field(type => String)
  password: string

  @Column({ default: '' })
  @Field(type => String)
  photo?: string

  @Column({ default: 25 })
  @Field(type => Boolean)
  rating: boolean

  @Column({ default: true })
  @Field(type => Boolean)
  oneFreePublication: boolean

  @Field(type => [Publication])
  @OneToMany(
    type => Publication,
    publication => publication.user
  )
  publications: Publication[]

  @Field(type => [Review])
  @OneToMany(
    type => Review,
    review => review.to
  )
  myReviews: Review[]

  @Field(type => [Review])
  @ManyToOne(
    type => Review,
    review => review.from
  )
  writedReviews: Review[]
}
