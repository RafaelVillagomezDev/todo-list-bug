import { IsBoolean, IsDateString, IsNotEmpty, IsString, IsUUID,IsOptional } from 'class-validator';

export class UpdateTaskDto {

  @IsUUID()
  @IsNotEmpty()
  id: string; // ID de la tarea que se va a actualizar

  @IsString()
  @IsOptional()
  title: string; // Titulo de la tarea

  @IsString()
  @IsOptional()
  description: string; // Descripcion de la tarea

  @IsBoolean()
  @IsOptional()
  done: boolean; // Estado de tarea

  @IsDateString()
  @IsOptional()
  dueDate: string; // Fecha de vencimiento de la tarea

  @IsUUID()
  @IsOptional()
  ownerId: string; // ID del usuario que es dueño de la tarea
}
