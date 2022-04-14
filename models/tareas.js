
const Tarea = require('./tarea.js');

class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];

        //Obeject.keys() sirve para extraer el id de los elementos de un array
        Object.keys( this._listado ).forEach( key => { //key es el id de cada elemento en el array _listado

            //console.log(key);

            const tarea = this._listado[key];

            listado.push(tarea);

        });

        return listado;
    }

    constructor(){

        this._listado = {};

    }

    borrarTarea( id = ''){

        if ( this._listado[id] ){

            delete this._listado[id];

        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {

            this._listado[tarea.id] = tarea;

        });
    }

    crearTarea( desc = '' ){

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        // console.log( this._listado );
        console.log(); //salto de linea

        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${ i + 1 }`.green; //para que no le muestre tarea numero 0 al usuario 
            // console.log(idx);

            const { desc, completadoEn } = tarea; //quiero la descripcion de la tarea y su estado
            const estado = (completadoEn) //si estado existe es verde, si el null es rojo
                            ? 'Completado'.green
                            : 'Pendiente'.red 

            console.log(`${ idx }. ${ desc } :: ${ estado }`);

        });

    }

    listarPendientesOCompletadas( completadas = true ){

        // console.log( this._listado );
        console.log(); //salto de linea
        let contador = 0;

        this.listadoArr.forEach( tarea => {


            const { desc, completadoEn } = tarea; //quiero la descripcion de la tarea y su estado
            const estado = (completadoEn) //si estado existe es verde, si el null es rojo
                            ? 'Completado'.green
                            : 'Pendiente'.red
            
            if ( completadas ){

                if ( completadoEn ){ //si completado existe algo que no sea un null

                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado } completado en ${ completadoEn.green }`);
                    //console.log(`${ contador.toString().green }. ${ desc } :: ${ estado }`);
                    //toString() convierte el contador numero a string
                }

            } else {

                if ( !completadoEn ){ //si no hay nada, es decir si hay un null

                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                    //console.log(`${ contador.toString().red }. ${ desc } :: ${ estado }`);
                    //toString() convierte el contador numero a string
                }
            }

        });

    }

    toggleCompletadas( ids = [] ){//las casillas de check de las tareas en el case 5

        ids.forEach( id => {

            const tarea = this._listado[id];

            if ( !tarea.completadoEn ){

                tarea.completadoEn = new Date().toString();

                //tarea.completadoEn = new Date().toISOString();
                // toma la fecha y con toISOString lo convierte a un string entendible en formato ISO
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ){

                this._listado[tarea.id].completadoEn = null;

            }

        });
        
    }

}

module.exports = Tareas;