const ui = require('./ui.js')

describe('canary', ()=> {
    it('test test infrastructure', ()=> {
        expect(true).toBe(true);
    });
})

describe('test ui setup', ()=> {
    let testUi = ui();
    test('test ui reset', ()=> {
    });
})