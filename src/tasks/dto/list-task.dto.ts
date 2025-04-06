import { IsNotEmpty, IsString } from 'class-validator';

export class listDto {
  // Validamos campos
  @IsString()
  @IsNotEmpty()  
  id: string;
}