import { IsString, ValidateNested } from "class-validator";
import { Player } from "./models/player";

export class Team {
    @IsString()
    name!: string;


    @ValidateNested({each: true})
    players!: Player[];
}