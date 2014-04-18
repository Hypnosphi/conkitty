/*!
 * conkitty, https://github.com/hoho/conkitty
 * Copyright 2013-2014 Marat Abdullin
 * Released under the MIT license
 */
'use strict';

function getErrorMessage(msg, code, lineAt, charAt) {
    lineAt = lineAt === undefined ? code.lineAt : lineAt;
    charAt = charAt === undefined ? code.charAt : charAt;
    return msg +
        ' (line: ' + (lineAt + 1) +
        ', col: ' + (charAt + 1) + '):\n' +
        code.src[lineAt] + '\n' + (new Array(charAt + 1).join(' ')) + '^';
}


function BadIndentation(code) {
    this.name = 'BadIndentation';
    this.message = getErrorMessage('Bad indentation', code);
    this.stack = (new Error()).stack;
}
BadIndentation.prototype = new Error();


function UnexpectedSymbol(code) {
    this.name = 'UnexpectedSymbol';
    this.message = getErrorMessage('Unexpected symbol', code);
    this.stack = (new Error()).stack;
}
UnexpectedSymbol.prototype = new Error();


function IllegalName(part) {
    this.name = 'IllegalName';
    this.message = getErrorMessage('Illegal ' + part.type, part.src, part.lineAt, part.charAt);
    this.stack = (new Error()).stack;
}
IllegalName.prototype = new Error();


function UnterminatedPart(part) {
    this.name = 'UnterminatedPart';
    this.message = getErrorMessage('Unterminated ' + part.type, part.src, part.lineAt, part.charAt);
    this.stack = (new Error()).stack;
}
UnterminatedPart.prototype = new Error();


function JSParseError(msg, code, lineAt, charAt) {
    this.name = 'JSParseError';
    this.message = getErrorMessage(msg, code, lineAt, charAt);
    this.stack = (new Error()).stack;
}
JSParseError.prototype = new Error();


function DuplicateDecl(part) {
    this.name = 'DuplicateDecl';
    this.message = getErrorMessage('Duplicate ' + part.type, part.src, part.lineAt, part.charAt);
    this.stack = (new Error()).stack;
}
DuplicateDecl.prototype = new Error();


function IncompletePart(part) {
    this.name = 'IncompletePart';
    this.message = getErrorMessage('Incomplete ' + part.type, part.src, part.lineAt, part.charAt);
    this.stack = (new Error()).stack;
}
IncompletePart.prototype = new Error();


function InconsistentCommand(part) {
    this.name = 'InconsistentCommand';
    this.message = getErrorMessage(
        part.type ? 'Unexpected ' + part.type : 'Incomplete command',
        part.src,
        part.lineAt,
        part.charAt
    );
    this.stack = (new Error()).stack;
}
InconsistentCommand.prototype = new Error();


module.exports.BadIndentation = BadIndentation;
module.exports.UnexpectedSymbol = UnexpectedSymbol;
module.exports.IllegalName = IllegalName;
module.exports.UnterminatedPart = UnterminatedPart;
module.exports.JSParseError = JSParseError;
module.exports.DuplicateDecl = DuplicateDecl;
module.exports.IncompletePart = IncompletePart;
module.exports.InconsistentCommand = InconsistentCommand;