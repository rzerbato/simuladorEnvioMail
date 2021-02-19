
//Variables
const btnEnviar = document.querySelector('#enviar');
const btnreset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

eventListeners();
function eventListeners(){
    
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
    btnreset.addEventListener('click', resetarFormulario);
}


//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    const error = document.querySelector('p.error');
    if(error){
        error.remove();
    }  
}

//Valida el validarFormulario
function validarFormulario(e){
    if(e.target.value.length > 0){
        //Elimino los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }        
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    
    if(e.target.type === 'email'){
        if(er.test( e.target.value )){
            //Elimino los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
                e.target.classList.remove('border', 'border-red-500');
                e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');        
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error');
    
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

//Envia el Email
function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    
    //Oculto el spinner despues de 3 segundos
    setTimeout(() => {
        spinner.style.display = 'none';

        //Aviso de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje fué enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove();
            resetarFormulario();
        }, 5000);
    }, 3000);
}

//Reseteo el formulario
function resetarFormulario(){
    
    formulario.reset();
    iniciarApp();
    eliminarColores();
}

function eliminarColores() {
    const clases = 'border-green-500';//Se elimina los verdes al hacer exitoso el correo
    const clases2 = 'border-red-500';//Se elimina los rojos al presionar cualquier campo, salirse, y darle al reset, se elimina los rojos
    email.classList.remove(clases, clases2);
    asunto.classList.remove(clases, clases2);
    mensaje.classList.remove(clases, clases2);
};