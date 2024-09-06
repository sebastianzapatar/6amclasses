import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/JWTStrategy';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from './strategy/Auth0Strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, Auth0Strategy],
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    useFactory:()=>{
      return{
        secret:process.env.SECRET_PASSWORD,
        signOptions:{expiresIn:'1d'}
        }
      }
    }
  )
  ],
  exports:[JwtStrategy,PassportModule,JwtModule,Auth0Strategy]	
})
export class AuthModule {}
