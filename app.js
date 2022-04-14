
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo.js');

const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer.js');

// const Tarea = require('./models/tarea.js');
const Tareas = require('./models/tareas.js');
// const { mostrarMenu, pausa } = require('./helpers/mensajes.js');

// console.clear();

const main = async() => {

    // console.log('hola mundo');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){ //cargar tareas

        //Establecer las tareas
        tareas.cargarTareasFromArray( tareasDB );
        
    }

    // await pausa();
    //este await aqui es necesario, ya que sino, se me limpia la consola muy rapido

    do {
        
        opt = await inquirerMenu(); //espera hasta que tenga una resolucion de las promesas en ('./helpers/inquirer.js')
        // console.log({ opt });

        switch (opt) {

            case '1': //crear la tarea

                //crear opcion
                const desc = await leerInput('Descripcion: ');
                // console.group(desc);
                tareas.crearTarea(desc);
                
            break;

            case '2': //listar todas las tareas
                
                tareas.listadoCompleto();

                //console.log( tareas.listadoArr );

            break;

            case '3': //listar las tareas completadas

                tareas.listarPendientesOCompletadas( true );//opcional enviar aqui un true
            
            break;

            case '4': //listar las tareas pendiente

                tareas.listarPendientesOCompletadas( false );//opcional aqui enviar un false

            break;

            case '5': //completado | pendiente --- checklist, checkbox

                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                // console.log( ids );

                tareas.toggleCompletadas( ids );

            break;

            case '6': // borrar las tareas

                const id = await listadoTareasBorrar( tareas.listadoArr );
                // console.log({ id });

                if ( id !== '0' ){

                    const ok = await confirmar('¿Esta seguro de borrar la tarea?');//YES / NO
                    // console.log({ ok }); //salida: true or false

                    if ( ok ){

                        tareas.borrarTarea( id );

                        console.log('Tarea Borrada');

                    }

                }
            
            break;

        }

        guardarDB( tareas.listadoArr );

        // const tareas = new Tareas();
        // const tarea = new Tarea('Comprar Comida');
        // tareas._listado[tarea.id] = tarea;
        // console.log(tareas);

        await pausa();

    } while (opt !== '0' ); //mientras sea diferente de 0, el codigo do se va a ejecutar

    // pausa();

}

main();

//MADE BY CHRISTIAN ALEXANDER MARTINEZ MILLAN

// https://www.npmjs.com/package/inquirer
// npm install inquirer

//------------------------------------------------------------------------------------------
// lo de abajo es la version estatica del menu

/*

require('colors');
const { mostrarMenu, pausa } = require('./helpers/mensajes.js');

console.clear();

const main = async() => {

    console.log('hola mundo');

    let opt = '';

    do {
        
        opt = await mostrarMenu(); //espera hasta que tenga una resolucion de las promesas en ('./helpers/mensajes.js')

        console.log({ opt });

        if ( opt !== '0' ) await pausa();

    } while (opt !== '0' ); //mientras sea diferente de 0, el codigo do se va a ejecutar

    // pausa();

}

main();

// https://www.npmjs.com/package/inquirer
// npm install inquirer

*/
