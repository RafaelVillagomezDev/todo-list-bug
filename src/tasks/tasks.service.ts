import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { listDto } from './dto/list-task.dto';

@Injectable()
export class TasksService {

    private readonly logger = new Logger("TasksService") // Logger con name taskService
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    async listTasks(dto:listDto) : Promise<Task[]> {
        const { id } = dto; //Desestructuramos el obj 

        try{
        // Listamos las tareas para que solo se pueda ver el detalle un usuario de sus propias tareas relacion ownerId(Task):id(User)
        const tasks = await this.tasksRepository.find({where: { ownerId: id }});

        this.logger.log( `Se han encontrado  ${tasks.length} tareas  ID: ${id}`);

        return tasks;

        }catch(error){

         this.logger.error(`Fallo en peticion al obtener las tareas en el usuario ${id} : ${error.message}`)
        }
        
    }

    async getTask(id: string) {
        const task = await this.tasksRepository
            .createQueryBuilder('task')
            .where(`task.id = "${id}"`)
            .getOne();

        return task;
    }

    async editTask(body: any) {
        await this.tasksRepository.update(body.id, body);

        const editedTask = await this.getTask(body.id);

        return editedTask;
    }
}
