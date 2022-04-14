const { resolve } = require('path');
const { stdin } = require('process');

require('colors');

const mostrarMenu = () => {
    /*
    no se hace con un async porque solo haria el return del (opt) 
    y yo lo que quiero es retornar todo el cuerpo, 
    entonces se hace con un return new Promise de esta manera
    */

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una Opcion  '.rainbow);
        console.log('==========================\n'.green);

        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'7.'.green} Salir\n`);

        const readLine = require('readline').createInterface({ //creamos la interface, readline ya viene por defecto en visual studio

            input: process.stdin,
            output: process.stdout

        });

        readLine.question('Seleccione una Opcion: ', (opt) => {

            // console.log({opt});
            readLine.close();
            resolve(opt); //toda mi promesa se adjunta y captura aqui para enviar

        });

    });

}

const pausa = () => {

    return new Promise( resolve => {

        const readLine = require('readline').createInterface({ //creamos la interface

            input: process.stdin,
            output: process.stdout
    
        });
    
        readLine.question(`\nPresione ${ 'Enter'.green } para continuar\n`, (opt) => {
    
            readLine.close();
            resolve(); //toda mi promesa se adjunta y captura aqui para enviar
    
        });

    });

}

module.exports = {
    mostrarMenu,
    pausa
}
