'use strict';

const cp   = require('child_process');
const path = require('path');

function Lambert(name, modules) {
    if (!modules) {
        modules = [];
    }

    this.name = name;
    this.child = cp.fork(path.join(__dirname, './child.js'), [ '--modules', ...modules ]);

    process.on('error', (err) => {
        console.error(err);
        this.child.kill();
    });

    process.on('exit', _ => {
        setTimeout(_ => {
            this.child.kill();
        }, 500);
    });
}

Lambert.prototype._log = function (level, ...msg) {
    const serialized_msgs = msg.map(m => typeof m === 'object' ? JSON.stringify(m) : m);

    this.child.send({ 
        type  : 'log',
        level : level,
        data  : serialized_msgs,
        time  : new Date().toISOString(),
        name  : this.name
    });
}

Lambert.prototype.trace = function (...msg) {
    this._log(10, ...msg);
}

Lambert.prototype.debug = function (...msg) {
    this._log(20, ...msg);
}

Lambert.prototype.log   = function (...msg) {
    this._log(30, ...msg);
}

Lambert.prototype.warn  = function (...msg) {
    this._log(40, ...msg);
}

Lambert.prototype.error = function (...msg) {
    this._log(50, ...msg);
}

Lambert.prototype.fatal = function (...msg) {
    this._log(60, ...msg);
}

module.exports = Lambert;
