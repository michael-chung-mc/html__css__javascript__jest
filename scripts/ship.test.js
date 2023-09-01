const shipFactory = require('./ship.js');

describe('canary', ()=> {
    it('test test infrastructure', ()=> {
        expect(true).toBe(true);
    });
})

describe('analyzeShip', () => {
    let destroyer = shipFactory(2);
    test('destroyer length',()=> {
        expect(destroyer.getLength()).toBe(2);
        expect(destroyer.getSunk()).toBe(false);
    });
    test('destroyer hit',()=> {
        destroyer.hit()
        expect(destroyer.getHealth()).toBe(1);
        expect(destroyer.getLength()).toBe(2);
        expect(destroyer.getSunk()).toBe(false);
    });
    test('destroyer sunk',()=> {
        destroyer.hit()
        destroyer.hit()
        expect(destroyer.getHealth()).toBe(0);
        expect(destroyer.getLength()).toBe(2);
        expect(destroyer.getSunk()).toBe(true);
    });

    let submarine = shipFactory(3);
    test('submarine length',()=> {
        expect(submarine.getLength()).toBe(3);
    });

    let cruiser = shipFactory(3);
    test('cruiser length',()=> {
        expect(cruiser.getLength()).toBe(3);
    });

    let battleship = shipFactory(4);
    test('battleship length',()=> {
        expect(battleship.getLength()).toBe(4);
    });

    let carrier = shipFactory(5);
    test('carrier length',()=> {
        expect(carrier.getLength()).toBe(5);
    });
});