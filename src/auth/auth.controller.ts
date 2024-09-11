import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { getUser } from './decorators/getUser';
import { User } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport'; // Importamos el guard de Auth0

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@getUser() user: User, @Body() createAuthDto: CreateAuthDto) {
    console.log(user);
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDot: LoginAuthDto) {
    return this.authService.login(loginDot);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  // Nueva ruta para iniciar la autenticación con Auth0
  @Get('auth0/login')
  @UseGuards(AuthGuard('auth0')) // Usamos el guard de Auth0 para iniciar el flujo de autenticación
  async auth0Login() {
    // Esta ruta redirige al usuario a Auth0 para autenticarse.
  }

  // Ruta de callback que recibe el perfil del usuario autenticado desde Auth0
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0')) // Esta ruta también usa el guard de Auth0 para manejar el callback
  async auth0Callback(@Req() req, @Res() res) {
    // Aquí el perfil del usuario ya fue autenticado por Auth0
    const user = await this.authService.validateAuth0User(req.user); // Validamos al usuario en nuestra base de datos

    // Redirigimos al usuario a una página de éxito (opcional)
    res.redirect(`http://localhost:3000/dashboard?token=${user.token}`);
  }
  @Get('auth0/logout')
  async auth0Logout(@Res() res) {
    const returnTo = 'http://localhost:3000'; // URL de redirección después de logout
    res.redirect(`dev-m5w5ruh6rkweo0ah.us.auth0.com/v2/logout?client_id=YOUR_CLIENT_ID&returnTo=${returnTo}`);
  }
}
