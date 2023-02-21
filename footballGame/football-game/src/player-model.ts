import { IsString, IsInt} from 'class-validator';

export class Player {
    @IsString()
    name!: string;

    @IsInt()
    age!: number;

    @IsString()
    position!: string;
}