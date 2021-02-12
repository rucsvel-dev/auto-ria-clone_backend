import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Mark, Country } from '../../marks/entities/mark.entity';
import { Car } from '../../cars/entities/car.entity';
import { CarType } from './publication.entity';

@InputType('SearchInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Search extends CoreEntity {
  @Column({ default: 'all' })
  @Field((type) => String)
  carType: CarType;

  @Field((type) => String, { nullable: true })
  @ManyToOne((type) => Mark, { nullable: true })
  mark: Mark;

  @Field((type) => String, { nullable: true })
  @ManyToOne((type) => Car, { nullable: true })
  car: Car;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  region: Country;

  @Column({ nullable: true })
  @Field((type) => Number, { nullable: true })
  yearFrom: number;

  @Column({ nullable: true })
  @Field((type) => Number, { nullable: true })
  yearTo: number;

  @Column({ nullable: true })
  @Field((type) => Number, { nullable: true })
  priceFrom: number;

  @Column({ nullable: true })
  @Field((type) => Number, { nullable: true })
  priceTo: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.searches)
  user: User;
}
