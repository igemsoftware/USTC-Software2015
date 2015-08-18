/**
 * @namespace BioBLESS
 */
BioBLESS = {
    animate_hook : [],
    logic : {},
    gene_network : {},
    simulation : {},
    analysis : {},
    dna : {},
    utils : {}
};
if(!Function.prototype.bind)
    Function.prototype.bind = function(oThis) {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        if(typeof this !== "function")
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function() {}, fBound = function() {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
