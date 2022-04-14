
const fs = require('fs');

// const archivo = './db/data.txt';
const archivo = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify( data) );
    // JSON.stringify( data) data es un arreglo y con stringify se converte a un string, de lo contrario genera error

}

const leerDB = () => {

    if ( !fs.existsSync( archivo ) ){

        return null;
        
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
    //encoding me evita bites
    //console.log(info);

    const data = JSON.parse( info );
    // JSON.parse( info ) info es un string y con parse se convierte a un arreglo
    // console.log( data );

    // return null;
    return data;

}


module.exports = {

    guardarDB,
    leerDB
}