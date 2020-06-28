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
                lista = JSON.parse(xhr.responseText);
                localStorage.setItem("anuncios", JSON.stringify(lista));
            }else {
                lista.message = JSON.parse(xhr.responseText);
            }
            if(option){
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

 function listarModificacion(a){
     lista = JSON.parse(localStorage.getItem('anuncios'));
        for(var i=0; i < lista.data.length; i++){
            if(lista.data[i].id == a.id){
                lista.data[i].titulo =  a.titulo;
                lista.data[i].transaccion =  a.transaccion;
                lista.data[i].descripcion =  a.descripcion;
                lista.data[i].precio =    a.precio;
                lista.data[i].animal =    a.animal;
                lista.data[i].raza =    a.raza;
                lista.data[i].fecha =    a.fecha;
                lista.data[i].vacunas =    a.vacunas;
                break;
            }
        }
        vaciarCampos();
        limpiarTabla();
        crearTabla(lista.data);
     lista = JSON.stringify(lista);
     localStorage.setItem("anuncios", lista);
     modificarElemento(a);

} 




function eliminarElemento(){
    baja(a.id);
}

function modificarElemento(a) {
    modificar(a);
}


function eliminar(){

    lista = JSON.parse(localStorage.getItem('anuncios'));
    for(i=0; i < lista.data.length; i++){
        if(lista.data[i].id == a.id){
            lista.data.splice(i,1);
            //console.log(p baja(p.id);
            vaciarCampos();
            //$('spinner').hidden = false;
            break;
        }
    }    
    limpiarTabla();
    crearTabla(lista.data);
    lista = JSON.stringify(lista);
    localStorage.setItem("anuncios", lista);
    tipoMod = null;
    eliminarElemento();
}


function guardar(){
    if(!validacionCampos()){
        anuncio = traerAnuncio();
        if(tipoMod == null || tipoMod == undefined){
            agregarNuevo(anuncio);
            agregar(anuncio);
            vaciarCampos();
            //crearTabla(lista.data);
        }else{
            listarModificacion(anuncio);
            $('btnGuardar').removeEventListener('click',modulo(),false);
            tipoMod = null;
        }
    }

}

function agregarNuevo(a){
    lista = JSON.parse(localStorage.getItem('anuncios'));
    limpiarTabla();
    lista.data.push(a);
    crearTabla(lista.data);
    lista = JSON.stringify(lista);
    localStorage.setItem("anuncios", lista);
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



function traerAnuncio(){
    var idA = null;
    if(tipoMod == null || tipoMod == undefined){
       idA = traerUltimoId().toString();
   }else{
       idA = a.id;
   }
    let titulo = $('titulo').value;
    let animal =  valorRadio('animal');
    let transaccion = "venta";        
    let descripcion = $('descripcion').value;
    let precio = $('precio').value;
    let raza = $('raza').value    
    let fecha = $('fecha').value;
    let vacunas = $('vacunas').value;
    return new Anuncio(idA,titulo,transaccion,descripcion,precio,animal,raza,fecha,vacunas);
}

function valorRadio(s){
    radio=document.getElementsByName(s); 
    for(i=0;i<radio.length;i++) 
        if (radio[i].checked) { 
            valor = radio[i].value; 
            return valor;
            break;
        }  
     return null;   
}

function traerUltimoId(){
    if(lista.data == null || lista.data == undefined){
        lista = JSON.parse(localStorage.getItem('anuncios'));
    }
    a = parseInt(lista.data.pop().id);
    return a = a + 1;
}

