import { Injectable, PipeTransform, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';

//Pipe para validar la tarea es opcional //
@Injectable()
export class VerifyTaskPipe implements PipeTransform {
  private readonly logger = new Logger('VerifyTaskPipe');

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async transform(value: any) {
    const id = value.id;

    if (!id) {
      throw new BadRequestException('El campo id tarea es obligatorio');
    }

    this.logger.log(`Verificando tarea con id: ${id}`);

    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new BadRequestException(`La tarea con id ${id} no existe`);
    }


    return task;
  }
}
