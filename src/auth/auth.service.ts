import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const user = this.userRepository.create({
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 12),
      });
      await this.userRepository.save(user);
      const { email, fullName } = user;
      return { user: { email, fullName } };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.detail);
    }
  }

  private async generateToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDto: LoginAuthDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload: JwtPayload = { email, fullName: user.fullName };
      const token = await this.generateToken(payload);
      return { email, token };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Método para manejar la autenticación con Auth0
  async validateAuth0User(profile: any) {
    const { email, name, picture, id } = profile; // Datos que recibes desde Auth0
    let user = await this.userRepository.findOneBy({ email });
    console.log(user);
    if (!user) {
      // Si el usuario no existe, crearlo en la base de datos
      const newUser = this.userRepository.create({
        email,
        fullName: name,
        password: '', // Deja vacío, ya que el usuario se autenticó externamente
        // Puedes agregar un campo `auth0Id` en la entidad de usuario para almacenar el ID de Auth0
      });
      user = await this.userRepository.save(newUser);
    }

    // Generar JWT para el usuario autenticado con Auth0
    const payload: JwtPayload = { email: user.email, fullName: user.fullName };
    const token = await this.generateToken(payload);

    return { email: user.email, fullName: user.fullName, token };
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
