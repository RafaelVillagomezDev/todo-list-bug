import { Body, Controller, Get, Logger, Param, Post, UseGuards ,Req, Put, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { listDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/edit-task.dto';
import { Request } from 'express';



@UseGuards(AuthGuard)
@Controller('tasks')


export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
    private readonly logger = new Logger("TaskController");
    @Get()
    
    async listTasks(@Req() req) {
        const { id } = req.user;
        return this.tasksService.listTasks(id);
    }

    @Get('/:id')
    async getTask(@Param('id') id: string) {
        return this.tasksService.getTask(id);
    }

   
    @Put('/edit') // Es un put estamos actualizando 
    async editTask(@Body() body:UpdateTaskDto , @Req() req) {
        const { id } = req.user;
        return this.tasksService.editTask(body,id);
    }
}
