'use strict';

const Chalk = require('chalk');

const LEVEL_INFO = {
    10: {
        name: 'TRACE',
        color: Chalk.blue
    },
    20: {
        name: 'DEBUG',
        color: Chalk.yellow
    },
    30: {
        name: 'INFO',
        color: Chalk.white,
    },
    40: {
        name: 'WARN',
        color: Chalk.yellow
    },
    50: {
        name: 'ERROR',
        color: Chalk.red
    },
    60: {
        name: 'FATAL',
        color: Chalk.bgRed
    },
};

module.exports = function (msg) {
    const level_info = LEVEL_INFO[msg.level];

    console.log(level_info.color(`${msg.name} [${level_info.name}] @ (${msg.time})`));
    console.log(msg.data.join('\n'));
}