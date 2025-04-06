import { Body, Controller, Get, Logger, Param, Post, UseGuards ,Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { listDto } from './dto/list-task.dto';


@UseGuards(AuthGuard)
@Controller('tasks')


export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
    private readonly logger = new Logger("TaskController");
    @Get()
    
    async listTasks(@Req() req:listDto) {
        return this.tasksService.listTasks(req);
    }

    @Get('/:id')
    async getTask(@Param('id') id: string) {
        return this.tasksService.getTask(id);
    }

    @Post('/edit')
    async editTask(@Body() body) {
        return this.tasksService.editTask(body);
    }
}
