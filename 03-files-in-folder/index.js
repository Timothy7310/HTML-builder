const fs = require('fs/promises');
const path = require('path');



fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
    .then((files) => {
        files.map(file => {
            if (file.isFile()) {
                fs.stat(path.join(__dirname, 'secret-folder', file.name))
                    .then(fileStat => {
                        let extFile = path.extname(file.name);
                        let sizeFile = fileStat.size;
                        let nameFile = path.basename(path.join(__dirname, 'secret-folder', file.name), extFile);

                        console.log(`${nameFile} - ${extFile.slice(1)} - ${sizeFile / 1000}kb`);
                    });
            }
        });
    });