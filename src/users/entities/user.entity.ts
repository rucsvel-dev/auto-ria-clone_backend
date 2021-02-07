import {
  BeforeInsert, BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from '../../common/entities/core.entity';
import { Publication } from '../../publications/entities/publication.entity';
import { Review } from './review.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';

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
  @Column({ nullable: true })
  @Field(type => String)
  googleId?: string

  @Column()
  @Field(type => String)
  password: string

  @Column({ nullable: true })
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
