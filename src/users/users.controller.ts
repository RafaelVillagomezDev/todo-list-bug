import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateEmailPipe } from './pipes/validate-email.pipe';



@UseGuards(AuthGuard) // Guard para rutas
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    @UsePipes(ValidateEmailPipe)
    async create(@Body() body:CreateUserDto) {
        return this.usersService.create(body);
    }
}
