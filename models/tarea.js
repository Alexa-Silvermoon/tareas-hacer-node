
const { v4: uuidv4 } = require('uuid'); //v4 tomara el nombre de uuidv4

class Tarea {

    id = '';
    desc = ''; //descripcion
    completadoEn = null;

    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;

    }
}

module.exports = Tarea; //exportando de manera por defecto 
//no se usa llaves para no tener que importarlo y hacer desestructuracion de la Tarea

/*
identificador id unico a nivel mundial con npm
https://www.npmjs.com/package/uuid
npm i uuid
*/
