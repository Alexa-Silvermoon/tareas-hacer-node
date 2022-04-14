
require('colors');
const inquirer = require('inquirer');
const Tarea = require('../models/tarea');

const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Que Desea Hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Marcar Como Completada o Pendiente`
                // name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]

    }

];

const inquirerMenu = async() => {

    // console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una Opcion  '.rainbow);
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas); //debido a name: 'opcion',

    return opcion;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiones ${'enter'.green} para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt(question); //espera a que el usuario presione enter
}

const leerInput = async( message ) => {

    const question = [

        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){

                if ( value.length === 0 ){

                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);//debido a name: 'desc'

    return desc;

}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ i + 1}.`.green;

        return{

            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }

    });
    // console.log(choices);

    choices.unshift( // añade al inicio del arreglo la opcion 0 que sera solo para cancelar la eliminacion

        {
            value: '0',
            name: '0.'.green + ' Cancelar'
        }
    );

    const preguntas = [

        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas); //debido a name: 'id',

    return id;

}

const confirmar = async( message ) => {

    const question = [
        
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question); //debido a name: 'ok'

    return ok;

}

const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ i + 1}.`.green;

        return{

            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }

    });
    // console.log(choices);

    const pregunta = [

        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta); //debido a name: 'id',

    return ids;

}

module.exports = {

    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}