import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findOneWithAuthorization(id: number, user: User): Promise<User> {
    if (user.role !== 'admin' && user.id !== id) {
      throw new UnauthorizedException('Access denied.');
    }
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new UnauthorizedException('User not found.');
    }
    return foundUser;
  }

  async updateWithAuthorization(id: number, update: Partial<User>, user: User) {
    if (user.role !== 'admin' && user.id !== id) {
      throw new UnauthorizedException('Access denied.');
    }
    await this.userRepo.update(id, update);
    return this.findOne(id);
  }

  async removeWithAuthorization(id: number, user: User) {
    if (user.role !== 'admin' && user.id !== id) {
      throw new UnauthorizedException('Access denied.');
    }
    return this.userRepo.delete(id);
  }
}
