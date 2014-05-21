/*!
 * conkitty v0.5.11, https://github.com/hoho/conkitty
 * Copyright 2013-2014 Marat Abdullin
 * Released under the MIT license
 */
'use strict';


var path = require('path'),
    ConkittyParser = require(path.join(__dirname, 'parser.js')).ConkittyParser,
    ConkittyGenerator = require(path.join(__dirname, 'generator.js')).ConkittyGenerator,
    ConkittyErrors = require(path.join(__dirname, 'errors.js')),
    fs = require('fs');


// Conkitty constructor.
function Conkitty() {
    this.code = [];
}


Conkitty.prototype.push = function push(filename, code, base) {
    code = new ConkittyParser(filename, code, base);
    this.code = this.code.concat(code.readBlock(0) || []);
};


Conkitty.prototype.generate = function generate(sourceMapFile) {
    this.generated = (new ConkittyGenerator(this.code)).generateCode(sourceMapFile);

    var includes = this.generated.includes,
        i;

    for (i in includes) {
        if (!fs.existsSync(i)) {
            throw new ConkittyErrors.IllegalName(includes[i], 'File "' + i + '" does not exist.');
        }
    }
};


Conkitty.prototype.getCommonCode = function getCommonCode() {
    return this.generated.common;
};


Conkitty.prototype.getTemplatesCode = function getTemplatesCode() {
    return this.generated.code;
};


Conkitty.prototype.getIncludes = function getIncludes() {
    return Object.keys(this.generated.includes);
};


Conkitty.prototype.getSourceMap = function getSourceMap() {
    return this.generated.map;
};

module.exports = Conkitty;
