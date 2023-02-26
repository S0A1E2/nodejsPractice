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
exports.playerController = void 0;
const express_1 = __importDefault(require("express"));
const player_repository_1 = require("./player-repository");
const router = express_1.default.Router();
exports.playerController = router;
const playerRepository = new player_repository_1.PlayerRepository();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = playerRepository.getAll();
        res.json(players);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield playerRepository.getById(parseInt(req.params.id, 10));
        if (!player) {
            res.sendStatus(404);
            return;
        }
        res.json(player);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = req.body;
        yield playerRepository.create(player);
        res.status(201).json(player);
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const player = req.body;
        player.id = id;
        yield playerRepository.update(id, player);
        res.status(204);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        yield playerRepository.delete(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=controllers.js.map