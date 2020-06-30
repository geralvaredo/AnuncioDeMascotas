function $(element){
    return document.getElementById(element);
} 

var xhr = new XMLHttpRequest();
var a;
var lista;
let tipoMod = null;
let idA = null;
let option = null;

function modulo(){
    tipoMod = 'M';        
}

function cargarDatos(option) {
    xhr.onreadystatechange =  () => {       
        if(xhr.readyState == 4 && xhr.status == 200){
            if(lista == null || lista == undefined){
                var opciones =  [];
                lista = JSON.parse(xhr.responseText);
                localStorage.setItem("anuncios", JSON.stringify(lista));
                localStorage.setItem("listaFiltrada", JSON.stringify(lista));
                localStorage.setItem("opciones",JSON.stringify(opciones));
            }else {
                lista.message = JSON.parse(xhr.responseText);
            }
            if(option){
                crearFiltros(lista.data);
                crearTabla(lista.data);
            }
            //$('spinner').setAttribute("class", "show");
            //$('spinner').hidden = false;
        }
    };
}

function Anuncio(id,titulo,transaccion,descripcion,precio,animal,raza,fecha,vacunas){
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
    this.animal = animal;
    this.raza = raza;
    this.fecha = fecha;
    this.vacunas = vacunas;
}

function controlador(anuncio){
    a = anuncio;
    let transaccion = null;
    $('btnEliminar').hidden = false;
    $('titulo').value = a.titulo;
    if(a.animal == 'perro'){
        transaccion = 0;
    }else{
        transaccion = 1;
    }
    document.getElementsByName('animal')[transaccion].checked = true;
    $('descripcion').value = a.descripcion;    
    $('precio').value = a.precio;
    $('raza').value = a.raza;
    $('fecha').value = a.fecha;
    $('vacunas').value = a.vacunas;
    $('btnGuardar').addEventListener('click', modulo(),false);
    $('btnGuardar').addEventListener('click', (e)=> {
        e.preventDefault();
        e.stopPropagation();
    });
}



window.onload = () => {        
    formulario();
    $('btnGuardar').addEventListener('click', ()=> {
        guardar();
        $('btnEliminar').hidden = true;
    });

    /*$('btnCancelar').addEventListener('click', () => {
       
        $('frmAlta').hidden = true;
        $('btnEliminar').hidden = true;
    });*/

    $('btnEliminar').addEventListener('click', () => {
        eliminar();
        $('btnEliminar').hidden = true;
    });
    document.forms[0].addEventListener("submit", function(e) {
        e.preventDefault();
    });    
    $('btnEliminar').hidden = true;
    
    listado(xhr);
    
}  





