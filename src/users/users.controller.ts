import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
   
    async create(@Body() body) {
        return this.usersService.create(body);
    }
}
