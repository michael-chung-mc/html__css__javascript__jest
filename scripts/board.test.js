const boardFactory = require('./board.js')

describe('canary', ()=> {
    it('test test infrastructure', ()=> {
        expect(true).toBe(true);
    });
})

describe('Test Board', () =>
{
    var b = boardFactory(10,10);
    test('test board dimensions', () => {
        expect(b.getWidth()).toBe(10);
        expect(b.getHeight()).toBe(10);
    });
    test('test mark', () => {
        expect(b.setMark(0,0)).toBe(true);
        expect(b.getMarked(0,0)).toBe(true);
        expect(b.setMark(0,0)).toBe(true);
        expect(b.getMarked(0,0)).toBe(true);
        expect(b.setMarkToggle(0,0)).toBe(true);
        expect(b.getMarked(0,0)).toBe(false);
    });
});