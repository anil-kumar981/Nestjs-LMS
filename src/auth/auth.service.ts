import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiResponseFactory } from 'src/common/apiResponseFactory';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,private readonly jwtService:JwtService) { }

    async registerUser(createUserDto: CreateUserDto) {
        try {
            const existingUser = await this.usersService.getUserByMail(createUserDto.email);
            console.log('Existing User:', existingUser);
            if (existingUser) {
                return ApiResponseFactory.error('User with this email already exists', 400);
            }
            const saltOrRounds = 10;
            const password =await bcrypt.hash(createUserDto.password, saltOrRounds);
            const user = await this.usersService.createUser({
                ...createUserDto,
                password,
            });
                
            const token = await this.generateToken(user);
            return ApiResponseFactory.success({user, token}, 'User registered successfully');

        }
        catch (error) {
            throw new Error('Internal server error', { cause: error });
        }
    }

    private async generateToken(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token =await this.jwtService.signAsync(payload);
    return {
      message: 'Success',
      access_token: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
