const fs = require('fs');
const path = require('path');

const stream = fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});

stream.once('readable', () => {
    console.log(stream.read());
});

stream.on('error', (e) => {
    if(e){
        throw e;
    }
});