import { AuthController } from '@/modules/auth/controllers/Auth.controller';
import { ModelHasPermission } from '@/modules/auth/entities/ModelHasPermission';
import { ModelHasRole } from '@/modules/auth/entities/ModelHasRole';
import { Permission } from '@/modules/auth/entities/Permission';
import { Role } from '@/modules/auth/entities/Role';
import { User } from '@/modules/auth/entities/User';
import { Wallet } from '@/modules/auth/entities/Wallet';
import { AUTH_REPOSITORY, AuthRepository } from '@/modules/auth/repositories';
import {
    LOGIN_SERVICE, LoginService,
    LOGOUT_SERVICE, LogoutService,
    REGISTER_SERVICE, RegisterService,
} from '@/modules/auth/services';
import { JwtStrategy } from '@/modules/auth/strategies/Jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RevokedToken } from '@/modules/auth/entities/RevokedToken';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] ?? 'changeme',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([User, Role, Permission, ModelHasPermission, ModelHasRole, Wallet, RevokedToken]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_REPOSITORY, useClass: AuthRepository },
    { provide: REGISTER_SERVICE, useClass: RegisterService },
    { provide: LOGIN_SERVICE, useClass: LoginService },
    { provide: LOGOUT_SERVICE, useClass: LogoutService },
    JwtStrategy,
  ],
})
export class AuthModule {}
