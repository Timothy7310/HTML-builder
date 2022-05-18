const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');


const bundleCss = (bundlePath, stylesPath) => {
    let writeableStream = fs.createWriteStream(bundlePath);
    fsPromises.readdir(stylesPath, {withFileTypes: true})
        .then(files => {
            files.map(file => {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    let readableStream = fs.createReadStream(`${stylesPath}${path.sep}${path.join(file.name)}`,'utf8');

                    readableStream.pipe(writeableStream);
                }
            });
        });
};

// бандл для задания

bundleCss(path.join(__dirname, 'project-dist', 'bundle.css'), path.join(__dirname, 'styles'));


// тестовый бандл 

// bundleCss(path.join(__dirname, 'test-files', 'bundle.css'), path.join(__dirname, 'test-files', 'styles'));

    
    