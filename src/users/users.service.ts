import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { email, fullname } = createUserDto; // Desestructuración
    
        this.logger.log(`Creamos usuario ${fullname} con email ${email}`);
    
        try {
            
            const user = this.usersRepository.create(createUserDto); // Crea una instancia del objeto usuario con los datos del DTO
    
            await this.usersRepository.save(user);
            this.logger.log(`Creamos usuario ${user}`)
            
            return user;
        } catch (error) {
      
            this.logger.error(`Error al crear el usuario ${fullname} con email ${email}: ${error.message}`);
            
            // Lanzamos una excepción con el mensaje de error
            throw new BadRequestException(`No se pudo crear el usuario: ${error.message}`);
        }
    }
    
    async findOne(email: string) {
        const user = await this.usersRepository.findOneBy({
            email,
        });

        return user;
    }
}
