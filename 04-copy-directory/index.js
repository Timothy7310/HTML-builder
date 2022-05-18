const path = require('path');
const fs = require('fs/promises');

const createFolder = async(path) => {
    return new Promise(() => {
        fs.mkdir(path, {recursive: true}, (err) => {
            if(err){
                throw err;
            }
        });
    });
};

const copyFolder = async() => {
    return new Promise(() => {
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true})
            .then((files) => {
                files.map(file => {
                    if (file.isFile()) {
                        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
                    }
                });
            });
    });
};

createFolder(path.join(__dirname, 'files-copy'))
    .then(copyFolder());