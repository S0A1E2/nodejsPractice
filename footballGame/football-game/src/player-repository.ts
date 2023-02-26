import { Player } from './models/player';
import { BaseRepository } from './base-repository';

export class PlayerRepository extends BaseRepository<Player> {
    constructor() {
        super('./src/models/data/players.json')
    }
}