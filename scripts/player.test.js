const player = require('./player.js');
const gb = require('./gameBoard.js');

describe('canary', ()=> {
    it('test test infrastructure', ()=> {
        expect(true).toBe(true);
    });
})

describe ('test player', () => {
    let boardOne = gb(10,10);
    let boardTwo = gb(10,10);
    let x = 5;
    let y = 5;
    let ai = player(boardOne,boardTwo);
    test (`check if ${x},${y} marked`, () => {
        expect (ai.makeMove(5,5)).toBe(true);
    })
    test (`check if ${x},${y} marked`, () => {
        expect (ai.makeMove(5,5)).toBe(false);
    })
    test (`check if automove`, () => {
        expect (ai.autoMove()).toBe(true);
    })
})