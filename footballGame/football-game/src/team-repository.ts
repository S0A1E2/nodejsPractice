import { Team } from "./team-model";
import { BaseRepository } from "./base-repository";

export class TeamRepository extends BaseRepository<Team> {
    constructor() {
        super('/src/models/data/teams.json')
    }
} 