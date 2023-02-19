"use strict";
class Football {
    constructor() {
        this.firstTeam = [];
        this.secondTeam = [];
        this.duration = 120;
        this.events = [];
        this.clock = 0;
    }
    startGame() {
        console.log('The game has started');
        this.tick();
    }
    tick() {
        if (this.clock < this.duration) {
            this.clock++;
            this.executeGameAction();
            setTimeout(() => this.tick(), 200);
        }
        else {
            console.log('The game has ended');
        }
    }
    executeGameAction() {
        const attackingPlayer = game.firstTeam[generateRandomNumber(game.firstTeam.length)];
        const shotOnGoal = simulateShotOnGoal();
        if (shotOnGoal) {
            game.updateScore(attackingPlayer, 1, 'ShotOnGoal');
        }
        const passingPlayer = game.firstTeam[generateRandomNumber(game.firstTeam.length)];
        const receivingPlayer = game.secondTeam[generateRandomNumber(game.secondTeam.length)];
        const passPosition = [generateRandomNumber(100), generateRandomNumber(100)];
        const successfulPass = simulatePass(passingPlayer, passPosition);
        if (successfulPass) {
            game.updateScore(passingPlayer, 1, 'SuccessfulPass');
        }
    }
    updateScore(player, points, event) {
        player.score += points;
        const teamName = this.firstTeam.includes(player) ? 'First Team' : 'Second Team';
        this.events.push(`${player.name} of ${teamName} scored a ${event}`);
    }
    printEvents() {
        console.log('List of event :');
        this.events.forEach((event, index) => {
            console.log(`${index + 1}. ${event}`);
        });
    }
}
function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
function simulateShotOnGoal() {
    const result = generateRandomNumber(3);
    return result === 0;
}
function simulatePass(player, fieldPosition) {
    if (!player.fieldPosition)
        return false;
    const accuracy = player.position === 'Goalkeeper' ? 0.8 : 0.5;
    const distance = Math.abs(fieldPosition[0] - player.fieldPosition[0]) + Math.abs(fieldPosition[1] - player.fieldPosition[1]);
    const result = Math.random();
    return result <= accuracy - (distance * 0.1);
}
const game = new Football();
game.firstTeam.push({ name: 'Cristiano Ronaldo', position: 'Forward', score: 0 });
game.firstTeam.push({ name: 'Lionel Messi', position: 'Forward', score: 0 });
game.firstTeam.push({ name: 'Neymar Jr', position: 'Midfield', score: 0 });
game.firstTeam.push({ name: 'Virgil van Dijk', position: 'Defense', score: 0 });
game.firstTeam.push({ name: 'Manuel Neuer', position: 'Goalkeeper', score: 0 });
game.secondTeam.push({ name: 'Robert Lewandowski', position: 'Forward', score: 0 });
game.secondTeam.push({ name: 'Kylian Mbappe', position: 'Forward', score: 0 });
game.secondTeam.push({ name: 'Kevin De Bruyne', position: 'Midfield', score: 0 });
game.secondTeam.push({ name: 'Sergio Ramos', position: 'Defense', score: 0 });
game.secondTeam.push({ name: 'Alisson Becker', position: 'Goalkeeper', score: 0 });
game.startGame();
game.printEvents();
