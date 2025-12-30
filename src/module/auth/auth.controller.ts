import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    const result = await this.authService.create(createAuthDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "User create successfully!",
      data: result
    }
  }

  @Get()
  async findAll() {
    const result = await this.authService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: "Fetching user successfully!",
      data: result
    }
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
}
