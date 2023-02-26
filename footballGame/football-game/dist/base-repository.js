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
exports.BaseRepository = void 0;
const fs_1 = __importDefault(require("fs"));
class BaseRepository {
    constructor(dbPath) {
        this.dbPath = dbPath;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs_1.default.promises.readFile(this.dbPath, 'utf-8');
            return JSON.parse(data);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            return data.find((item) => item['id'] === id);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            data.push(item);
            yield fs_1.default.promises.writeFile(this.dbPath, JSON.stringify(data));
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            const index = data.findIndex((item) => item['id'] === id);
            if (index === -1) {
                throw new Error(`Item with id ${id} not found`);
            }
            data[index] = item;
            yield fs_1.default.promises.writeFile(this.dbPath, JSON.stringify(data));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            const filterData = data.filter((item) => item['id'] !== id);
            yield fs_1.default.promises.writeFile(this.dbPath, JSON.stringify(filterData));
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map