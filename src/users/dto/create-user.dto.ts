import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength,IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string; // Nombre completo del usuario

    @IsEmail()
    @IsNotEmpty()
    email: string; // Email único del usuario

    @IsString()
    @IsNotEmpty()
    pass: string; // Contraseña del usuario (con mínimo de 6 caracteres)
}


