import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Country, Mark } from 'src/marks/entities/mark.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { type } from 'os';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../users/entities/review.entity';
import { Car } from '../../cars/entities/car.entity';

export enum CarType {
  all = 'all',
  sedan = 'sedan',
  coupe = 'coupe',
  hatchback = 'hatchback',
  minivan = 'minivan',
  pickup = 'pickup',
  crossover = 'crossover',
}

@InputType('PublicationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Publication extends CoreEntity {
  @Column()
  @Field((type) => String)
  carType: CarType;

  @Field((type) => Mark)
  @ManyToOne((type) => Mark, (mark) => mark.publications)
  mark: Mark;

  @Field((type) => Car)
  @ManyToOne((type) => Car, (car) => car.publications)
  car: Car;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  photo?: string;

  @Column()
  @Field((type) => Number)
  yearOfProduction: number;

  @Column()
  @Field((type) => String)
  country: Country;

  @Column()
  @Field((type) => Number)
  kilometres: number;

  @Column({ default: '' })
  @Field((type) => String)
  description: string;

  @Column()
  @Field((type) => Number)
  price: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.publications)
  user: User;

  @RelationId((publication: Publication) => publication.user)
  ownerId: number;
}
