'use strict';

const path = require('path');

const ChildLogger = {
    modules: [],
    startUp() {

        // Loop through arguments and load modules
        for (let i = 2; i < process.argv.length; i++) {
            switch (process.argv[i]) {
                case '--modules':

                    for (let j = 1; j < process.argv.length - i; j++) {
                        const module = process.argv[j + i];

                        this.modules.push(require('./modules/' + module));
                    }

                break;
            }
        }

        // Setup message passing
        process.on('message', (msg) => {
            if (msg.type != 'log') {
                console.error(`Unknown message type: ${msg.type}.`);
                return;
            }

            for (let i = 0; i < this.modules.length; i++) {
                this.modules[i](msg);
            }
        });

    }
}

ChildLogger.startUp();