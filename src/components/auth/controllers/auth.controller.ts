import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { User } from '../models';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Auth } from '../../../common/decorators/auth.decorator';
import { RoleProtected } from '../../../common/decorators/role-protected.decorator';
import { RawHeader } from '../../../common/decorators/raw-headers.decorator';
import { UserRoleGuard } from '../../../common/guards/user-role.guard';
import { ValidRoles } from '../../../common/interfaces/validRoles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPriveRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeader() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    console.log(rawHeaders);
    return {
      ...user,
      userEmail: userEmail,
      rawHeaders,
      headers,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
