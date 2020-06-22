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
            //$('spinner').setAttribute("class", "show");
            //$('spinner').hidden = false;
            switch (option) {
                case 1:
                        crearTabla(lista.data);
                        break;
                default:
                    break;
            }

        }
    };
}



function Anuncio(id,titulo,transaccion,descripcion,precio,animal,raza,fecha){
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;
    this.animal = animal;
    this.raza = raza;
    this.fecha = fecha;
    
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
                break; 
            }
        }
        vaciarCampos();
        limpiarTabla();
        crearTabla(lista.data);
     lista = JSON.stringify(lista);
     localStorage.setItem("anuncios", lista);
     modificarElemento();

} 
function limpiarTabla(){    
    $('divTabla').innerText = "";
}



function eliminarElemento(){
    baja(a.id);
}

function modificarElemento() {
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
    return new Anuncio(idA,titulo,transaccion,descripcion,precio,animal,raza,fecha);



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

function vaciarCampos(){
    $('titulo').value = ' ';
    document.getElementsByName('animal')[0].checked = false;
    document.getElementsByName('animal')[1].checked = false;
    $('descripcion').value = ' ';
    $('precio').value = ' ';
    $('raza').value = ' ';
    $('fecha').value = ' ';
}


 function validacionCampos(){
    var retorno = false;
    var titulo = $('titulo').value ;
    var animal = valorRadio('animal');
    var descripcion = $('descripcion').value;
    var precio = $('precio').value;
    var raza = $('raza').value;
    var fecha = $('fecha').value;
   
    if(titulo == '')
    {        
        mensaje("nulos",0);
        colorearCampos("titulo");        
        retorno = true;
    }
     if(titulo.length < 1)
     {
         mensaje("titulo", 1);
         colorearCampos("titulo");
         retorno = true;
     }
     /*
     if(descripcion == null)
     {
         mensaje("nulos");
         colorearCampos("descripcion");
         retorno = true;
     }

     if(animal == null){
         mensaje("nulos");
         colorearCampos("animal");
         retorno = true;
     }

     if(precio == null)
     {
         mensaje("nulos");
         colorearCampos("precio");
         retorno = true;
     }

     if(raza == null)
     {
         mensaje("nulos");
         colorearCampos("raza");
         retorno = true;
     }

     if(fecha == null)
     {
         mensaje("nulos");
         colorearCampos("fecha");
         retorno = true;
     }
 */

    
    return retorno;
    

    /* if(!validacionFecha(fecha))
    {
        mensaje("fecha");
        colorearCampos("fecha");
        retorno = false;
    } */ 

    
}

function mensaje(campo,valor){
    var mensaje ;
    switch (campo) {
        case 'titulo':
        mensaje ="Debe ingresar un titulo con mas de" + valor + "caracteres" ;
        break;
        case 'descripcion':
        mensaje = "Debe ingresar un apellido con mas de 3 caracteres" ;     
        break;
        case 'transaccion':
        mensaje = "Debe ingresar una fecha menor al dia de hoy" ;  
        break;
        case 'precio' :
        mensaje = "Debe seleccionar un sexo" ;
        break;
        case 'cantidadBanos' :
        mensaje = "Debe seleccionar un sexo" ;
        break;
        case 'cantidadAutos' :
        mensaje = "Debe seleccionar un sexo" ;
        break; 
        case 'cantidadDormitorios' :
        mensaje = "Debe seleccionar un sexo" ;
        break;
        case 'nulos':
            mensaje = "no puede ingresar los campos nulos";
            break;
        default:
            break;
    }
      
    alert(mensaje);

}

/* function validacionFecha(fecha){
    var retorno = true;

    var anio = fecha.split("-")[0];
    var mes =  fecha.split("-")[1];
    var dia =  fecha.split("-")[2];
    var fechaIngresada = new Date(anio, mes, dia);
    var fechaActual =  new Date();
    if(fechaActual.getTime() < fechaIngresada.getTime()){
        retorno = false;  
    }     
    
    return retorno;
} */

function colorearCampos(campo){
    var cam = document.getElementById(campo);
    cam.style.borderColor = "red" ;
    cam.style.borderWidth = "5px";
    
}

/* function sinColor(){
    document.getElementById("nombre").style.border = '' ;
    var apellido = document.getElementById("apellido").style.border = '' ;
    var fecha = document.getElementById("fecha").style.border = '' ;   
    var sexo = genero("sexo") ;
    sexo.style.border = '';
    
}  */