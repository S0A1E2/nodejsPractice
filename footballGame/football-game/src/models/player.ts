import { IsString, IsInt, isInt, isString} from 'class-validator';

export class Player {
    @IsString()
    name!: string;

    @IsInt()
    age!: number;

    @IsString()
    position!: string;
    id!: number;
}