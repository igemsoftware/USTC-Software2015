describe('window', function() {
    it('should have property jQuery', function() {
        window.should.have.property('jQuery');
    });
    it('should have property PIXI', function() {
        window.should.have.property('PIXI');
    });
    it('should have property BioBLESS', function() {
        window.should.have.property('BioBLESS');
    });
});
describe('BioBLESS', function() {
    it('should have property plugins', function() {
        BioBLESS.should.have.property('plugins');
    });
});
