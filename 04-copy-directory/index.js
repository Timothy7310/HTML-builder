const path = require('path');
const fs = require('fs/promises');

const copyFolder = async(pathFiles, pathCopy) => {
    return new Promise(() => {
        fs.readdir(pathFiles, {withFileTypes: true})
            .then( async(files) => {
                await fs.rm(pathCopy, {force: true, recursive: true}, (err) => {
                    if(err){
                        throw err;
                    }
                });
                await fs.mkdir(pathCopy, {recursive: true}, (err) => {
                    if(err){
                        throw err;
                    }
                });
                files.map(file => {
                    if (file.isFile()) {
                        fs.copyFile(`${pathFiles}${path.sep}${file.name}`, `${pathCopy}${path.sep}${file.name}`);
                    }
                });
            });
    });
};

copyFolder(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));