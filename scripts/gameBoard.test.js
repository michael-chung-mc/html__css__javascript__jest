const gameboard = require('./gameBoard.js');

describe('canary', ()=> {
    it('test test infrastructure', ()=> {
        expect(true).toBe(true);
    });
})

describe('Test Gameboard', () =>
{
    let gb = gameboard(10,10);
    test('test gb', () => {
        expect(gb.getWidth()).toBe(10);
        expect(gb.getHeight()).toBe(10);
    })
    test('place destroyer', () => {
        gb.setShip(0,0,2,0);
        expect(gb.getShip(0,0)).not.toBe(null);
        expect(gb.getShip(0,0).getLength()).toBe(2);
    })
    test('attack destroyer', () => {
        expect(gb.checkValidMove(0,0)).toBe(true);
        gb.receiveAttack(0,0);
        expect(gb.checkValidMove(0,0)).toBe(false);
        expect(gb.battleReport()).toBe(false);
        gb.receiveAttack(0,0);
        expect(gb.checkValidMove(0,0)).toBe(false);
        expect(gb.battleReport()).toBe(false);
        expect(gb.checkValidMove(1,0)).toBe(true);
        gb.receiveAttack(1,0);
        expect(gb.checkValidMove(1,0)).toBe(false);
        expect(gb.battleReport()).toBe(true);
    })
});