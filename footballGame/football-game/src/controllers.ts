import express from 'express';
import { Player } from './models/player';
import { PlayerRepository } from './player-repository';

const router = express.Router();
const playerRepository = new PlayerRepository();


router.get('/', async (req, res, next) => {
    try {
        const players = playerRepository.getAll();
        res.json(players);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const player = await playerRepository.getById(parseInt(req.params.id, 10));
        if(!player) {
            res.sendStatus(404);
            return;
        } 
        res.json(player);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const player = req.body as Player;
        await playerRepository.create(player);
        res.status(201).json(player);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res,next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const player = req.body as Player;
        player.id = id;
        await  playerRepository.update(id, player);
        res.status(204);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        await playerRepository.delete(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

export { router as playerController };