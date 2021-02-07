import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserOutput } from './dtos/create-account.dto';
import { LoginDto, LoginOutput } from './dtos/login.dto';
import { JwtService } from '../jwt/jwt.service';
import { GetAllUsersOutput } from './dtos/get-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<GetAllUsersOutput> {
    try {
      const users = await this.usersRepository.find();
      return { ok: true, users };
    } catch (err) {
      return { ok: false, error: 'TODO' };
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserOutput> {
    try {
      const exists = await this.usersRepository.findOne({
        email: createUserDto.email,
      });
      if (exists) {
        return { ok: false, error: 'User exists' };
      }
      await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'TODO' };
    }
  }

  async login({ email, password }: LoginDto): Promise<LoginOutput> {
    try {
      const existsUser = await this.usersRepository.findOne({ email });
      if (existsUser) {
        return { ok: true, token: this.jwtService.sign(existsUser.id) };
      } else {
        return { ok: false, error: 'Token unvalid' };
      }
    } catch (err) {
      return { ok: false, error: 'TODO' };
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findOneOrFail({ id });
      return { ok: true, user };
    } catch (err) {
      return { ok: false, error: 'User not found' };
    }
  }
}
