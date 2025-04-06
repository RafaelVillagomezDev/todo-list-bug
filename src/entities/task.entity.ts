import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn} from 'typeorm';
import { User } from './user.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    done: boolean;

    @Column()
    dueDate: string;


    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'ownerId' }) // Relación  con el campo ownerId para relacionar 
    owner: User;

    @Column()
    ownerId: string; 
}
