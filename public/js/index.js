function $(element){
    return document.getElementById(element);
} 

var xhr = new XMLHttpRequest();
var a ;
let lista; 
let tipoMod = null;
let idA = null;

function modulo(){
    tipoMod = 'M';        
}

function cargarDatos(option) {      
    xhr.onreadystatechange =  () => {       
        if(xhr.readyState == 4 && xhr.status == 200){             
            lista = JSON.parse(xhr.responseText);           
            //$('spinner').setAttribute("class", "show");
            $('spinner').hidden = false;                                        
            switch (option) {
                case 1:                    
                        crearTabla(lista.data);
                        
                        break;
                case 2:                                          
                        /*agregar();*/
                            break;        
                case 3:
                        /*eliminar(); */   
                         break;
                case 4:
                       //listarModificacion();   
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

function crearTabla(data){  
    
    let div = $('divTabla');    
    let tabla = document.createElement('table');
    let cabecera = document.createElement('thead');
    let tr = document.createElement('tr');    
    div.className = 'table';     
    cabecera.className = 'green-theme';
    cabecera.classList.add('whiteLabel'); 
  
    
    let keys = [];
    for(var k in data[0]){
        keys.push(k);
    }

    for(i = 0 ; i< keys.length; i++ ){        
        let th = document.createElement('th');
        th.innerText = keys[i];
        tr.appendChild(th);        
        cabecera.appendChild(tr);
    }

    let cuerpo = document.createElement('tbody');
    cuerpo.id ='cuerpo';
    cuerpo.className = 'dark-theme';
    cuerpo.classList.add('whiteLabel');
    for(i = 0 ;i< data.length; i++){
        let tr = document.createElement('tr');
            for(value in data[i]){
                let td = document.createElement('td');
                td.innerText = data[i][value];
                tr.appendChild(td);
            }
        tr.addEventListener('click', (e) => {
          a = new Anuncio(tr.children[0].innerText,tr.children[1].innerText,tr.children[2].innerText,tr.children[3].innerText,tr.children[4].innerText,tr.children[5].innerText,tr.children[6].innerText,tr.children[7].innerText) ;      
          e.preventDefault();
          e.stopPropagation();
          controlador(a);
            
        }); 
        cuerpo.appendChild(tr);
    }    
    $('spinner').hidden = true;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);    
    div.appendChild(tabla); 
    
    
}

function controlador(a){    //TO DO
        
    idA = a.id;
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
        listarModificacion();        
    });
}

 function listarModificacion(){    
        let p = traerAnuncio();
        p.id = idA;
        for(var i=0; i < lista.data.length; i++){
            if(lista.data[i].id != idA){
                lista.data.push(p);
                break; 
            }
        }
        vaciarCampos();    
        crearTabla(lista.data); 
} 
function limpiarTabla(){    
    $('divTabla').innerText = "";
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


function eliminar(){   
    for(i=0; i < lista.data.length; i++){        
        if(lista.data[i].id == idA){
           
            let p = new Anuncio(idA,$('titulo').value,"venta",$('descripcion').value,$('precio').value,valorRadio('animal'),$('raza').value,$('fecha').value);
            lista.data.splice(i,1);
            console.log(p.id);
            baja(p.id);
            vaciarCampos();
            $('spinner').hidden = false;
            break;
        }
    }    
    limpiarTabla();    
    crearTabla(lista.data);
}


function guardar(){
    a = traerAnuncio();
    if(tipoMod == null || tipoMod == undefined){        
        agregar(a);        
        listarNuevo(a);
        vaciarCampos();
        //crearTabla(lista.data);
        
    }else{        
        modificar(a);
        $('btnGuardar').removeEventListener('click',modulo(),false);        
        tipoMod = null;         
    }      
        
}

function listarNuevo(a){
        
    for(var i=0; i < lista.data.length; i++){
        if(lista.data[i].id != a.id){
            lista.data.push(a);
            break; 
        }
    }    
    
    texto = '<tr>'+ '<td>' + a.id + '<td>' 
    + a.titulo + '</td><td>' 
    + a.transaccion + '</td> <td>' 
    + a.descripcion +'</td> <td>'
    + a.precio + '</td> <td>'
    + a.animal + '</td> <td>'
    + a.raza + '</td> <td>'
    + a.fecha + '</td> <td>'
    + '</tr>' ;     
    $('cuerpo').innerHTML += texto;
}



window.onload = () => {        
    formulario();    

    $('btnGuardar').addEventListener('click', ()=> {
        guardar();     
        
        
    }); 

    $('btnCancelar').addEventListener('click', () => {     
       
        $('frmAlta').hidden = true;
        $('btnEliminar').hidden = true;
    });

    $('btnEliminar').addEventListener('click', () => {     
        eliminar();
    });
    

    document.forms[0].addEventListener("submit", function(e) {
        e.preventDefault();
    });    
    $('btnEliminar').hidden = true;
    
    listado(xhr);
    
}  



function traerAnuncio(){
    var idA = traerUltimoId().toString();
    if(validacionCampos){
    let titulo = $('titulo').value;
    let animal =  valorRadio('animal');
    let transaccion = "venta";        
    let descripcion = $('descripcion').value;
    let precio = $('precio').value;
    let raza = $('raza').value    
    let fecha = $('fecha').value;   
    return new Anuncio(idA,titulo,transaccion,descripcion,precio,animal,raza,fecha);
    }      
    
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
    a = lista.data.pop().id;
    return a++;
}

 function validacionCampos(){
    var retorno = false;
    var titulo = $('titulo').value ;
    var transaccion = valorRadio('transaccion');
    var descripcion = $('descripcion').value;
    var precio = $('precio').value;
    var banos = $('raza').value;
    var autos = $('cantidadAutos').value;
    var dormitorios = $('cantidadDormitorios').value; 
   
    if(titulo.length < 10)
    {        
        mensaje("titulo");
        colorearCampos("titulo");        
        retorno = true;
    }    
    
    if(descripcion.length < 10)
    {         
        mensaje("descripcion");
        colorearCampos("descripcion");
        retorno = true;
    }    
    
    if(transaccion == null)
    {
        mensaje("transaccion");
        colorearCampos("transaccion");
        retorno = true;
    }   

    if(precio.length < 5)
    {         
        mensaje("precio");
        colorearCampos("precio");
        retorno = true;
    }

    if(banos.length < 1)
    {         
        mensaje("cantidadBanos");
        colorearCampos("cantidadBanos");
        retorno = true;
    }

    if(autos.length < 1)
    {         
        mensaje("cantidadAutos");
        colorearCampos("cantidadAutos");
        retorno = true;
    }

    if(dormitorios.length < 1)
    {         
        mensaje("cantidadDormitorios");
        colorearCampos("cantidadDormitorios");
        retorno = true;
    }
    
    return retorno;
    

    /* if(!validacionFecha(fecha))
    {
        mensaje("fecha");
        colorearCampos("fecha");
        retorno = false;
    } */ 

    
}

function mensaje(campo){
    var mensaje ;
    switch (campo) {
        case 'titulo':
        mensaje ="Debe ingresar un titulo con mas de 3 caracteres" ;  
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