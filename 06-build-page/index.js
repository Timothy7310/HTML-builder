const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');




const createFolder = async(path) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, {recursive: true}, (err) => {
            if(err){
                return reject(err.message);
            }
            resolve();
        });
    });
};



const copyTemplate = async(path, pathTemplate) => {

    let writeableStream = fs.createWriteStream(path);
    let readableStream = fs.createReadStream(pathTemplate, 'utf-8');

    readableStream.pipe(writeableStream);
   
};



const bundleCss =  async(bundlePath, stylesPath) => {
    
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



const createFolders =  async(pathName) => {
    
    return new Promise(() => {
        fsPromises.readdir(path.join(__dirname, pathName), {withFileTypes: true})
            .then(files => {
                files.forEach(file => {
                    if(!file.isFile()){
                        createFolder(path.join(__dirname, 'project-dist', pathName, file.name));
                        return createFolders(`${pathName}${path.sep}${file.name}`);
                    } else {
                        fs.access(path.join(__dirname, 'project-dist', pathName), (err) => {
                            if(err){
                                createFolder(path.join(__dirname, 'project-dist', pathName)).
                                    then(fsPromises.copyFile(path.join(__dirname, pathName, file.name), path.join(__dirname, 'project-dist', pathName, file.name)));
                            }
                        });
                        fsPromises.copyFile(path.join(__dirname, pathName, file.name), path.join(__dirname, 'project-dist', pathName, file.name));
                    }
                });
            });
    });
};

const pasteComponents = async (pathTemplate, pathComponents) => {
    let newHTML = await fsPromises.readFile(pathTemplate, 'utf-8');

    const componentArr = await fsPromises.readdir(pathComponents, {withFileTypes: true});
    console.log(componentArr);
    componentArr.map( async(file) => {
       
        if(file.isFile() && path.extname(file.name) === '.html'){
            console.log('test');
            const componentContent = await fsPromises.readFile(path.join(pathComponents, `${file.name}`), 'utf-8');
            const fileName = path.basename(`${pathComponents}${path.sep}${file.name}`, path.extname(file.name));
            console.log(fileName);
            const regExp = new RegExp(`{{${fileName}}}`, 'g');
            newHTML = newHTML.replace(regExp, componentContent);
        }
        fsPromises.writeFile(pathTemplate, newHTML);
     
    });
  
};



createFolder(path.join(__dirname, 'project-dist'))
    .then(createFolders('assets'))
    .then(bundleCss(path.join(__dirname, 'project-dist', 'style.css'), path.join(__dirname, 'styles')))
    .then(copyTemplate(path.join(__dirname, 'project-dist', 'index.html'), path.join(__dirname, 'template.html')))
    .then(pasteComponents(path.join(__dirname, 'project-dist', 'index.html'), path.join(__dirname, 'components')));


