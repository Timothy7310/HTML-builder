const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


const createFile = async (path, data) => {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if(err){
            return reject(err.message);
        }
        resolve();
    }));
};

const writeDataToFile = async(path) => {
    return new Promise(() => {
        rl.on('line', (stdin) => {
            if (stdin.toLowerCase() === 'exit') {
                return rl.close();
            }
            fs.appendFile(path, stdin, (err) => {
                if(err){
                    throw err;
                }
            });
        });
        rl.on('close', () => {
            console.log('Bye Bye');
        });
    });
};



createFile(path.join(__dirname, 'text.txt'), '')
    .then(console.log('Можете ввести данные'))
    .then(() => writeDataToFile(path.join(__dirname, 'text.txt')));