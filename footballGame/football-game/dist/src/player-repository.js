"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const base_repository_1 = require("./base-repository");
class PlayerRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('./src/models/data/players.json');
    }
}
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player-repository.js.map