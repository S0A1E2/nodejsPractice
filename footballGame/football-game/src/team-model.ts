import { IsString, ValidateNested } from "class-validator";
import { Player } from "./player-model";

export class Team {
    @IsString()
    name!: string;


    @ValidateNested({each: true})
    players!: Player[];
}