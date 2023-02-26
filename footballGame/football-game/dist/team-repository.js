"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepository = void 0;
const base_repository_1 = require("./base-repository");
class TeamRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('/src/models/data/teams.json');
    }
}
exports.TeamRepository = TeamRepository;
//# sourceMappingURL=team-repository.js.map