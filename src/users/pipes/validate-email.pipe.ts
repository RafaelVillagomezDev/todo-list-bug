import { PipeTransform, Injectable, BadRequestException,Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

//Pipe para validar que un email existe en la base de datos 
@Injectable()
export class ValidateEmailPipe implements PipeTransform {
    private readonly logger = new Logger(' ValidateEmailPipe');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async transform(value: any) {
    const email = value.email;

    
    if (!email) {
      throw new BadRequestException('El campo email es obligatorio');
    }
    try{

      const exists = await this.userRepository.findOne({ where: { email } });

      if (exists) {
      this.logger.error(`Ya hay un usuario con ese email ${email}`)
      throw new BadRequestException('error al crear usuario ');
      }
    }catch(error){
        throw new BadRequestException(`Error : ${error.message}`);
    }

    
    
    return value;
  }
}
