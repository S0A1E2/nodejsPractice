"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const fs_1 = __importDefault(require("fs"));
class ConfigurationService {
    constructor(configPath) {
        this.configPath = configPath;
    }
    getGameDuration() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getConfig();
            return data.getGameDuration;
        });
    }
    getTeamSize() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getConfig();
            return data.teamSize;
        });
    }
    getMaxSubstitutions() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getConfig();
            return data.timeouts.break;
        });
    }
    getHalfTimeBreakTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getConfig();
            return data.timeouts.halfTime;
        });
    }
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs_1.default.promises.readFile(this.configPath, 'utf-8');
            return JSON.parse(data);
        });
    }
}
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration-service.js.map