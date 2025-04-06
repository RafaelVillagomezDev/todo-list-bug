import { BadRequestException, Injectable, Logger, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { listDto } from './dto/list-task.dto';
import { UpdateTaskDto } from './dto/edit-task.dto';
import { VerifyTaskPipe } from './pipes/verify-task.pipe';
import { Request } from 'express';

@Injectable()
export class TasksService {

    private readonly logger = new Logger("TasksService") // Logger con name taskService
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    async listTasks(ownerId:string) : Promise<Task[]> {
   

        try{
        this.logger.log(`Usuario con id : ${ownerId}`)
        // Listamos las tareas para que solo se pueda ver el detalle un usuario de sus propias tareas relacion ownerId(Task):id(User)
        const tasks = await this.tasksRepository.find({where: { ownerId: ownerId}},);

        this.logger.log( `Se han encontrado  ${tasks.length}`);
        this.logger.log(`Tareas:${tasks}`)

        return tasks;

        }catch(error){

         this.logger.error(`Fallo en peticion al obtener las tareas en el usuario ${ownerId} : ${error.message}`)
        }
        
    }

    async getTask(id: string) {
        const task = await this.tasksRepository
            .createQueryBuilder('task')
            .where(`task.id = "${id}"`)
            .getOne();

        return task;
    }
 
    
    async editTask(body: UpdateTaskDto, id: string) {
      
     
        this.logger.log(`Editando tarea con ID: ${body.id} para el usuario con ID: ${id}`);
    
        try {
          // Buscar la tarea por ID
          const task = await this.tasksRepository.findOne({ where: { id: body.id } });
    
          if (!task) {
            this.logger.error(`La tarea con id ${body.id} no existe`);
            throw new BadRequestException(`La tarea con id ${body.id} no existe`);
          }
    
          // Verificar que el ownerId de la tarea coincida con el id del usuario
          if (task.ownerId !== id) {
            this.logger.error(`El usuario con id ${id} no tiene permisos para editar esta tarea`);
            throw new BadRequestException('No tienes permisos para modificar esta tarea');
          }
    
          // Si la tarea existe y el usuario tiene permiso actualizamos
          await this.tasksRepository.update(body.id, body);
    
          // Recuperar la tarea actualizada
          const editedTask = await this.tasksRepository.findOne({ where: { id: body.id } });
    
          this.logger.log(`Tarea actualizada correctamente con ID: ${body.id}`);
          return editedTask;
    
        } catch (error) {
          this.logger.error(`Error al editar la tarea con id ${body.id}: ${error.message}`);
          throw new BadRequestException(`Error al editar la tarea: ${error.message}`);
        }
      }
      

   
}
