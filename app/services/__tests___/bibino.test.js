const beerService = require('../bibino');


const bibino = beerService.generate();

describe('Bibino generate method', () => {
    it('Should return a object', () => {
        expect(typeof bibino).toBe('object');
    });
    it('Should return undefined', () => {
        expect(typeof bibino.beerName).toBe('undefined');
    });
})
