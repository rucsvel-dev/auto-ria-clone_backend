import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Mark } from '../../marks/entities/mark.entity';
import { Publication } from '../../publications/entities/publication.entity';

@InputType('CarInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Car extends CoreEntity {
  @Field((type) => Mark)
  @ManyToOne((type) => Mark, (mark) => mark.cars)
  mark: Mark;

  @Column()
  @Field((type) => String)
  name: string;

  @Column()
  @Field((type) => Number)
  yearOfCreation: number;

  @Field((type) => Publication)
  @OneToMany((type) => Publication, (publication) => publication.car)
  publications: Publication[];

  @RelationId((car: Car) => car.mark)
  markId: number;
}
