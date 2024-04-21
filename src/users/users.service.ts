import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userProviders: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userProviders.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userProviders.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userProviders.findOne({ where: { id: id } });
  }

}