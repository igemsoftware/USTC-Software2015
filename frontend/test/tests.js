BioBLESS.add_animate_hook(function() {
    $("canvas").hide();
    return false;
});
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
    it('should have property init', function() {
        BioBLESS.should.have.property('init');
    });
});
