import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user.Role';

@Injectable()
export class UsersService {
   
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password, role } = createUserDto;
        const user = this.userRepository.create({ name, email, password, role: role as UserRole });
        await this.userRepository.save(user);
        return user;
    }

    async getUserByMail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
}
