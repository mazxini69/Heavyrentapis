import { Controller, Get, Req, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Autenticación (Auth)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión con Google OAuth2 (Redirige al login de Google)' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    // Triggers Google OAuth2 authentication flow
  }

  @ApiOperation({ summary: 'Callback de Google OAuth2 (Redirección automática)' })
  @ApiResponse({ status: 200, description: 'Sesión iniciada con éxito. Retorna los datos del usuario y el token JWT.' })
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }

  @ApiOperation({ summary: 'Generar un token mock JWT para desarrollo/pruebas en Postman/Swagger' })
  @ApiQuery({ name: 'role', required: false, enum: ['customer', 'admin'], description: 'Rol deseado del usuario', default: 'customer' })
  @ApiResponse({ status: 200, description: 'Token mock generado con éxito.' })
  @Get('token')
  async getMockToken(@Query('role') role: string) {
    return this.authService.generateMockToken(role || 'customer');
  }
}
