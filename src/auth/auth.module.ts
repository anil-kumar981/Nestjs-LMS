import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/jwt.strategy';

@Module({
 
  imports: [UsersModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET') || jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),}),],
       controllers: [
    AuthController 
   ],
  providers: [Auth, AuthService,JwtStrategy],
})
export class AuthModule {}
