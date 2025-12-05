import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user.dto.js';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
