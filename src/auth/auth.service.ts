import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    try{
        const user = this.userRepository.create({
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 12),
      });
      await this.userRepository.save(user);
      const {email,fullName}=user;
      return {user:{email,fullName}};
    }
    catch(e){
        console.log(e);
        throw new BadRequestException(e.detail);
    }
    
    
  }
  async login(loginDot:LoginAuthDto){
    try{
      const {email,password}=loginDot;
      const user=await this.userRepository.findOneBy({email});
      if(!user){
        throw new UnauthorizedException('Invalid credentials');
      }
      if(!bcrypt.compareSync(password,user.password)){
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    }
    catch(e){
        console.log(e);
        throw new UnauthorizedException('Invalid credentials');
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
