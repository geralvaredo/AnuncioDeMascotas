function crearTabla(data){

    let divTabla = $('divTabla');
    let tabla = document.createElement('table');
    let cabecera = document.createElement('thead');
    let tr = document.createElement('tr');
    divTabla.classList.add('spaceTop');
    tabla.className = 'tabla';
    //tabla.classList.add('')
    cabecera.classList.add('orange-theme');
    cabecera.classList.add('whiteLabel');
    var vacunas = document.getElementById('vacunas');
    var options = ["---","Si","No"];
    if(vacunas.children.length < 1){
        for (var i = 0; i < options.length; i++) {
            var option = document.createElement("option");
            option.value = options[i];
            option.text = options[i];
            vacunas.appendChild(option);
        }
    }

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
    cuerpo.id ='cuerpoTabla';
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
            a = new Anuncio(tr.children[0].innerText,tr.children[1].innerText,tr.children[2].innerText,tr.children[3].innerText,tr.children[4].innerText,tr.children[5].innerText,tr.children[6].innerText,tr.children[7].innerText,tr.children[8].innerText) ;
            e.preventDefault();
            e.stopPropagation();
            controlador(a);
        });
        cuerpo.appendChild(tr);
    }
    //$('spinner').hidden = true;
    tabla.appendChild(cabecera);
    tabla.appendChild(cuerpo);
    divTabla.appendChild(tabla);
}

function crearFiltros(data) {
    if($('filtros') == null || $('filtros') == undefined){
        let filtros = $('divFiltrosColumnas');
        filtros.classList.add('spaceTop');
        let tabla = document.createElement('table');
        tabla.id = 'filtros';
        let cabecera = document.createElement('thead');
        divTabla.classList.add('spaceTop');
        tabla.className = 'tabla';
        cabecera.classList.add('orange-theme');
        cabecera.classList.add('whiteLabel');
        let tr = document.createElement('tr');
        cabecera.id = 'cuerpo';
        let keys = [];
        for(var k in data[0]){
            keys.push(k);
        }

        for(i = 1 ; i< keys.length; i++ ){
            let th = document.createElement('th');
            th.innerText = keys[i];
            tr.appendChild(th);
            cabecera.appendChild(tr);
        }

        let cuerpo = document.createElement('tbody');
        cuerpo.id = 'cuerpoCheck';
        var maxTd = 9 ;
        var maxTr = 1 ;
        for (var i = 0 ; i< maxTr; i++){
            let trBody = document.createElement('tr');
            for (let j = 1; j < maxTd; j++) {
                let tdBody = document.createElement('td');
                let chk = document.createElement('input');
                chk.type = "checkbox";
                chk.className = 'form-check-input';
                chk.id = j + 1 ;
                let divCheckbox = document.createElement('div');
                divCheckbox.className = 'form-check form-check-inline';
                chk.addEventListener('change', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    checks(e);
                })
                divCheckbox.appendChild(chk);
                tdBody.appendChild(divCheckbox);
                trBody.appendChild(tdBody);
            }
            cuerpo.appendChild(trBody);
        }
        tabla.appendChild(cabecera);
        tabla.appendChild(cuerpo);
        filtros.appendChild(tabla);
    }
}


function checks(event){
    let lista = JSON.parse(localStorage.getItem('anuncios'));
    let listaFiltrada = JSON.parse(localStorage.getItem('listaFiltrada'));
    var option;
    if(option == null || option == undefined){
         option = JSON.parse(localStorage.getItem('opciones'));
    }
    if(event.target.checked){
        reducirColumnas(event.target.id,listaFiltrada);
          option.push(event.target.id);
        option = JSON.stringify(option);
        localStorage.setItem("opciones", option);
    }
    else {
        for (let i= 0 ; i < option.length;i++) {
             if(option[i] == event.target.id){
                 option.splice(i,1);
                 break;
             }
        }
        option = JSON.stringify(option);
        localStorage.setItem("opciones", option);
       traerColumnas(option,lista);
    }

}

function reducirColumnas(valor,lista){
     var listaFiltrada = lista.data.map(
        function (obj) {
            switch (valor) {
                case "1":
                         delete obj.id;
                         break;
                case "2":
                         delete obj.titulo;
                         break;
                case "3":
                         delete obj.transaccion;
                         break;
                case "4":
                         delete obj.descripcion;
                         break;
                case "5":
                         delete obj.precio;
                         break;
                case "6":
                         delete obj.animal;
                         break;
                case "7":
                         delete obj.raza;
                         break;
                case "8":
                         delete obj.fecha;
                         break;
                case "9":
                         delete obj.vacunas;
                         break;
            }
            var rObj = {};
            rObj = obj;
            return rObj;
        });

    //console.log(listaFiltrada);
    limpiarTabla();
    crearTabla(listaFiltrada);
    lista = JSON.stringify(lista);
    localStorage.setItem("listaFiltrada", lista);
}

function traerColumnas(option,lista) {
    var listaNueva = lista.data.filter(
        function (obj) {
            for (let i=0 ; i < option.length;i++){
                 if(obj.id == option[i]){
                     delete obj;
                 }
            }

            var rObj = {};
            rObj = obj;
            return rObj;
        }
    )
    limpiarTabla();
    crearTabla(listaNueva);
    lista = JSON.stringify(lista);
    localStorage.setItem("listaFiltrada", lista);

}