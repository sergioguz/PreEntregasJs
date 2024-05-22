//Consulta de precios-PreEntrega3

let productos1=[

    {"product" : "ACEITE DE SOYA CRISOL"},

    {   
        "type": 1,
        "markets": [
            {
                "name": "Arroz",
                "avg_price": 315,
                "udmedida": "1 LIBRA",
                "supermarkets" : [
                    { "name": "Bravo", "price": 125 },
                    { "name": "Ole", "price": 70 },
                    { "name": "La Cadena", "price": 100 },
                    { "name": "Fresh", "price": 170 }
                ]
                //"image": "https://3.bp.blogspot.com/-VWGxBMidZ1I/W6RUplh-7zI/AAAAAAAAnrs/giUUK2EDEQoBtFlogvfwkNa48oXtH0b3QCLcBGAs/s1600/aprezio.jpg"
            },
            {
                "name": "Arroz",
                "avg_price": 315,
                "udmedida": "0.3 oz",
                "supermarkets" : [
                    { "name": "Bravo", "price": 100 },
                    { "name": "Ole", "price": 75 },
                    { "name": "La Cadena", "price": 110 },
                    { "name": "Fresh", "price": 180 }
                ]
                //"image": "https://3.bp.blogspot.com/-VWGxBMidZ1I/W6RUplh-7zI/AAAAAAAAnrs/giUUK2EDEQoBtFlogvfwkNa48oXtH0b3QCLcBGAs/s1600/aprezio.jpg"
            },
            {
                "name": "Ajo",
                "avg_price": 319,
                "udmedida": "1 LIBRA",
                "supermarkets" : [
                    { "name": "Bravo", "price": 55 },
                    { "name": "Ole", "price": 75 },
                    { "name": "La Cadena", "price": 80 },
                    { "name": "Fresh", "price": 65 }]
            },
            {
                "name": "Habichuelas",
                "avg_price": 319.95,
                "udmedida": "800 GRAMO",
                "supermarkets" : [
                    { "name": "Bravo", "price": 65 },
                    { "name": "Ole", "price": 80 },
                    { "name": "La Cadena", "price": 81 },
                    { "name": "Fresh", "price": 77 }]
            },
            {
                "name": "Pollo",
                "avg_price": 319.95,
                "udmedida": "1 LIBRA",
                "supermarkets" : [
                    { "name": "Bravo", "price": 65 },
                    { "name": "Ole", "price": 80 },
                    { "name": "La Cadena", "price": 81 },
                    { "name": "Fresh", "price": 77 }]
            },
            {
                "name": "Habichuelas Jiras",
                "avg_price": 414,
                "udmedida": "400 GRAMO",
                "supermarkets" : [
                    { "name": "Bravo", "price": 60 },
                    { "name": "Ole", "price": 71 },
                    { "name": "La Cadena", "price": 88 },
                    { "name": "Fresh", "price": 77 }]
            },
            {
                "name": "Aguacate",
                "avg_price": 318,
                "udmedida": "UNIDAD",
                "supermarkets" : [
                    { "name": "Bravo", "price": 60 },
                    { "name": "Ole", "price": 71 },
                    { "name": "La Cadena", "price": 88 },
                    { "name": "Fresh", "price": 77 }]
            },
            {
                "name": "Spaguettis",
                "avg_price": 319.95,
                "udmedida": "1 LIBRA",
                "supermarkets": [
                    { "name": "Bravo", "price": 120 },
                    { "name": "Ole", "price": 130 },
                    { "name": "La Cadena", "price": 125 },
                    { "name": "Fresh", "price": 135 }
                ]
            },
            {
                "name": "Spaguettis Pre Cocidos",
                "avg_price": 414,
                "udmedida": "0.3 oz",
                "supermarkets": [
                    { "name": "Bravo", "price": 110 },
                    { "name": "Ole", "price": 115 },
                    { "name": "La Cadena", "price": 120 },
                    { "name": "Fresh", "price": 125 }
                ]
            },
            {
                "name": "Aguacate Criollo",
                "avg_price": 417,
                "udmedida": "1 LIBRA",
                "supermarkets": [
                    { "name": "Bravo", "price": 140 },
                    { "name": "Ole", "price": 145 },
                    { "name": "La Cadena", "price": 150 },
                    { "name": "Fresh", "price": 155 }
                ]
            },
            {
                "name": "Mani",
                "avg_price": 379,
                "udmedida": "1 oz",
                "supermarkets": [
                    { "name": "Bravo", "price": 100 },
                    { "name": "Ole", "price": 105 },
                    { "name": "La Cadena", "price": 110 },
                    { "name": "Fresh", "price": 115 }
                ]
            },
            {
                "name": "Mani Pre cocido",
                "avg_price": 318,
                "udmedida": "1 LIBRA",
                "supermarkets": [
                    { "name": "Bravo", "price": 90 },
                    { "name": "Ole", "price": 95 },
                    { "name": "La Cadena", "price": 100 },
                    { "name": "Fresh", "price": 105 }
                ]
    }
]}
];



const container= document.getElementById('container');

///Funcion para crear una Session Storage de la lista de resultado
const guardarSession= (clave,valor) => sessionStorage.setItem(clave,JSON.stringify(valor));

function crearCard(){

    productos1[1].markets.forEach((el,index) =>{
        const card = document.createElement("div");
        card.className= 'carta';
         
        const titulos= document.createElement("p");
        const precios= document.createElement("p");
        const button= document.createElement('button');

        const undmedidas = document.createElement('select');
        undmedidas.id= 'undmedidas-' + el.name ;
    
        //Crear una option por defecto
        const defaultOption= document.createElement('option');
        defaultOption.value= '';
        defaultOption.text= 'UdMedida';
        defaultOption.disabled= true;
        defaultOption.selected= true;
        undmedidas.appendChild(defaultOption);
    

        const option = document.createElement('option');
        option.value = el.udmedida;
        option.text = el.udmedida;
        undmedidas.appendChild(option);

        
        // const imga1= document.createElement('img');
        // imga1.src= el.image;
        // imga1.alt= 'Imagen de '+ el.name;
        // imga1.className= 'img'
    
        titulos.innerHTML= el.name;
        precios.innerHTML= el.avg_price;
        button.innerHTML = 'AGREGAR';
        button.id= 'agregar' + index;
        button.addEventListener('click',()=>agregarAlResumen(el,undmedidas));
        

        
         card.appendChild(titulos);
         card.appendChild(precios);
         card.appendChild(button);
         card.appendChild(undmedidas);
    
         
         //card.appendChild(imga1)
        
         container.appendChild(card)
        });
        
};

function agregarAlResumen(producto,selectElement){
    const listaResumen= document.getElementById('listaResumen');
    const selectedValue= selectElement.value;

    

    if(selectedValue){
        const item= document.createElement('li');
        item.innerText= `${producto.name} - ${selectedValue}`  
        listaResumen.appendChild(item);
    }else {
        alert ('Por favor, seleccione una unidad de medida.');
    }
    
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function compararPrecios(){
    const listaResumen= document.getElementById('listaResumen');
    const items= listaResumen.getElementsByTagName('li');
    const resumen= [];
    
    ///Leer el elemento html que contiene la opcion seleccionada por el cliente
    for (const item of items) {
        const [name, selectedValue] = item.innerText.split(' - ');
        const product = productos1[1].markets.find(p => p.name === name);
        if (product) {
            resumen.push({ name: product.name, selectedValue: selectedValue, supermarkets: product.supermarkets });
        }
    };
    
    const supermercadoTotales= {};

    ///Almacenar en el array supermercadoTotales la sumatoria de los totales seleccionados
    resumen.forEach(item => {
        item.supermarkets.forEach(supermarket => {
            if (!supermercadoTotales[supermarket.name]) {
            supermercadoTotales[supermarket.name]=0;
        }
            supermercadoTotales[supermarket.name]+=supermarket.price;

        });
    });
    //Crear un objeto del nombre del supermercado y total
    const supermercadoArray= Object.keys(supermercadoTotales).map(name=>({
        name,
        total: supermercadoTotales[name]
    }));
    
    //Organizar de menor a mayor el total de precio para mostrar el mas barato primero
    supermercadoArray.sort((a,b)=> a.total - b.total);

    

    let randomId = getRandomInt(1, 10000000);
    
    guardarSession(randomId,supermercadoArray);

    

    const resultadoComparacion = document.getElementById('resultadoComparacion');
    const resultadoComparacion1 = document.getElementById('resultadoComparacionLista');
    resultadoComparacion.innerHTML= '<h3>Comparación de Precios</h3>';
    supermercadoArray.forEach(s => {
        resultadoComparacion1.innerHTML +=`<li>${s.name}: $${s.total.toFixed(2)}</li>`;
    });

    
}



crearCard();


document. getElementById('compararButton').addEventListener('click', compararPrecios);