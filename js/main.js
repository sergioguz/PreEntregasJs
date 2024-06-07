
// const lista = document.querySelector('#listado')


// fetch('https://jsonplaceholder.typicode.com/posts') 
// .then( (resp) => resp.json())
// .then( (data) => {

//     data.forEach((post) => {
//         const li= document.createElement('li')
//         li.innerHTML= `
//         <h4>${post.title}</h4>
//         <p>${post.body}</p>
//         `
//         lista.append(li)
//     })

// })

/*

fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'Coderhouse',
            body: 'Post de prueba',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))

*/

/*
const lista = document.querySelector('#listado')

fetch('/data.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <h4>${producto.nombre}</h4>
                <p>${producto.precio}</p>
                <p>Código: ${producto.id}</p>
                <hr/>
            `
   
            lista.append(li)
        })
    })
*/


/*
const pedirPosts= async () => {
    lista = document.querySelector('#listado')

    const resp= await 
fetch('https://jsonplaceholder.typicode.com/posts')

    const data= await resp.json()

    data.forEach((post) => {
        const li = document.createElement('li')
        li.innerHTML=  `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
    `
        lista.append(li)
    })
}

pedirPosts()
*/

/*
fetch('https://preciosjustos.micm.gob.do/api/productos')
.then( (resp)=> resp.json())
.then((data) => {
    console.log(data)
})
*/


// const productos = async () => {
//     try {
//       const resp = await fetch("https://preciosjustos.micm.gob.do/api/productos", {
//         "headers": {
//           "accept": "*/*",
//           "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//           "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Windows\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "no-cors",
//           "sec-fetch-site": "same-origin",
//           "x-requested-with": "XMLHttpRequest",
//           "Access-Control-Allow-Origin": "*"
//         },
//         "method": "GET",
//         "mode": "no-cors"
//       });
  
//       if (!resp.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const contentType = resp.headers.get('Content-Type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Expected JSON response, got: ' + contentType);
//       }
  
//       const data = await resp.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Failed to fetch data: ', error);
//     }
//   }

// productos();

/*
const productos = async () =>{
   const resp= await fetch('https://c1wzlcsbbf.execute-api.us-east-1.amazonaws.com/devproducts/products')

   const data = await resp.json();
   console.log(data);
   //console.log(data.body[10].name);
};
*/


//const container= document.getElementById('container');





let data = null;

//Funcion para llamar mi API
async function fetchData(){
    const resp= await fetch('https://c1wzlcsbbf.execute-api.us-east-1.amazonaws.com/devproducts/products');
    data = await resp.json();
    crearCard()
};

///Funcion para crear una Session Storage de la lista de resultado
const guardarSession= (clave,valor) => sessionStorage.setItem(clave,JSON.stringify(valor));

async function crearCard() {
    console.log(data.body[100].precio[0].type)

    await data.body.forEach((el, index) => {
        // Filtrar los que no son canasta básica
        if (el.inMarketsSpecial[0] !== 'MICM') {
            // Filtrar solo el tipo 1 que corresponde a supermercados
            if (el.precio[0].type == 1) {
                // Contenedor principal de la tarjeta
                const card = document.createElement("div");
                card.className = 'selectprices-item1';
                
                // Imagen del producto
                const imgDiv = document.createElement("div");
                imgDiv.className = 'selectprices-item1-image';
                const image = document.createElement('img');
                // image.src = el.image; // Asegúrate de que el objeto de datos tiene la URL de la imagen
                // image.alt = el.name;
                // imgDiv.appendChild(image);
                
                // Contenido de la tarjeta
                const contentDiv = document.createElement("div");
                contentDiv.className = 'selectprices-item-1-content';

                // Nombre del producto
                const name = document.createElement("h3");
                name.textContent = el.name;

                // Rango de precios
                const price = document.createElement("p");
                price.textContent = `Precio Promedio RD$ ${el.priceAverages}`; // Asegúrate de que el objeto de datos tenga este rango de precios

                // Formulario para seleccionar unidad de medida y cantidad
                const form = document.createElement("form");
                const select = document.createElement("select");
                const defaultOption = document.createElement("option");
                defaultOption.textContent = "UdMedida";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);
                
                select.id= 'undmedidas-' + el.name ;

                const option = document.createElement('option');
                option.value = el.unit;
                option.text = el.unit;
                select.appendChild(option);

                // // Añadir opciones de unidades de medida
                /*el.units.forEach(unit => {
                     const option = document.createElement("option");
                     option.value = unit;
                     option.text = unit;
                     select.appendChild(option);
                 });
                */

                const inputNumber = document.createElement("input");
                inputNumber.type = "number";
                inputNumber.name = "Cantidad";
                inputNumber.placeholder = "CT";
                
                const submitButton = document.createElement("input");
                submitButton.type = "button";
                submitButton.value = "AÑADIR";
                submitButton.id= 'agregar' + index;
                submitButton.addEventListener('click',()=>agregarAlResumen(el,select));

                form.appendChild(select);
                form.appendChild(inputNumber);
                form.appendChild(submitButton);

                contentDiv.appendChild(name);
                contentDiv.appendChild(price);
                contentDiv.appendChild(form);

                card.appendChild(imgDiv);
                card.appendChild(contentDiv);

                container.appendChild(card);
            }
        }
    });
}

const container = document.getElementById('container'); // Asegúrate de que este ID exista en tu HTML

/*
async function crearCard(){
    console.log(data.body[100].precio[0].type)

    await data.body.forEach((el,index) =>{

        //Filtrar los que no son canasta basica
        if (el.inMarketsSpecial[0] !== 'MICM'){

            //Filtrar solo el type 1 que corresponde a supermercados
            if (el.precio[0].type == 1){
                const card = document.createElement("div");
                card.className= 'carta';
                 
                const titulos= document.createElement("p");
                const precios= document.createElement("p");
                const udmedida1= document.createElement("p");
                const button= document.createElement('button');
        
                
                const undmedidas = document.createElement('select');
                undmedidas.id= 'undmedidas-' + el.name ;
            
        
                /*
                //Crear una option por defecto
                const defaultOption= document.createElement('option');
                defaultOption.value= '';
                defaultOption.text= 'UdMedida';
                defaultOption.disabled= true;
                defaultOption.selected= true;
                undmedidas.appendChild(defaultOption);
            
        
                const option = document.createElement('option');
                option.value = el.unit;
                option.text = el.unit;
                undmedidas.appendChild(option);
                */
                
                // const imga1= document.createElement('img');
                // imga1.src= el.image;
                // imga1.alt= 'Imagen de '+ el.name;
                // imga1.className= 'img'
            
                /*------DESCOMENTAR AQUI


                titulos.innerHTML= el.name;
                precios.innerHTML= el.priceAverages;
                udmedida1.innerHTML= el.unit;
                button.innerHTML = 'AGREGAR';
                button.id= 'agregar' + index;
                button.addEventListener('click',()=>agregarAlResumen(el,undmedidas));
                
        
                
                 card.appendChild(titulos);
                 card.appendChild(precios);
                 card.appendChild(udmedida1);
                 card.appendChild(button);
                 card.appendChild(undmedidas);
            
                 
                 //card.appendChild(imga1)
                
                 container.appendChild(card)

            }

        } 
    });
        
};
*/



function agregarAlResumen(producto,selectElement){
    const listaResumenModal= document.getElementById('modalListaResumen');
    const cartCount= document.getElementById('cartCount');

    const selectedValue= selectElement.value;
    if(!selectedValue){
        alert ('Por favor, seleccione una unidad de medida.');
        return;
    }

    const item= document.createElement('li');
        item.innerText= `${producto.name} - ${producto.unit} - ${producto.id}`  
        listaResumenModal.appendChild(item);

    
    //Actualiza el contador del carrito
    cartCount.textContent= listaResumenModal.children.length;

    /*const listaResumen= document.getElementById('listaResumen');
    const selectedValue= selectElement.value;

    const item= document.createElement('li');
        item.innerText= `${producto.name} - ${producto.unit} - ${producto.id}`  
        listaResumen.appendChild(item);
    
    */

    /*
    if(selectedValue){
        const item= document.createElement('li');
        item.innerText= `${producto.name} - ${selectedValue}`  
        listaResumen.appendChild(item);
    }else {
        alert ('Por favor, seleccione una unidad de medida.');
    }
    */
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Alerta de confirmacion de comparacion de productos
async function compararPrecios() {
    swal({
        title: "¿Estás seguro?",
        text: "¿Quieres realizar la comparación de precios ahora?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willCompare) => {
        if (willCompare) {
            realizarComparacion();
        } else {
            swal("Comparación cancelada", "No se ha realizado ninguna comparación.", "info");
        }
    });
}

function realizarComparacion() {
    const listaResumen = document.getElementById('modalListaResumen');
    const items = listaResumen.getElementsByTagName('li');
    const resumen = [];

    // Leer el elemento html que contiene la opción seleccionada por el cliente
    for (const item of items) {
        const [name, selectedValue, id] = item.innerText.split(' - ');
        const product = data.body.find(p => p.id == id);
        if (product) {
            resumen.push({ id: product.id, name: product.name, unit: selectedValue, supermarkets: product.precio[0].markets });
        }
    };

    const supermercadoTotales = {};

    // Almacenar en el array supermercadoTotales la sumatoria de los totales seleccionados
    resumen.forEach(item => {
        item.supermarkets.forEach(supermarket => {
            if (!supermercadoTotales[supermarket.name]) {
                supermercadoTotales[supermarket.name] = { total: 0, products: [] };
            }
            supermercadoTotales[supermarket.name].total += supermarket.price;
            supermercadoTotales[supermarket.name].products.push({
                name: item.name,
                unit: item.unit,
                price: supermarket.price
            });
        });
    });

    // Crear un objeto del nombre del supermercado y total
    const supermercadoArray = Object.keys(supermercadoTotales).map(name => ({
        name,
        total: supermercadoTotales[name].total,
        products: supermercadoTotales[name].products
    }));

    // Organizar de menor a mayor el total de precio para mostrar el más barato primero
    supermercadoArray.sort((a, b) => a.total - b.total);

    let randomId = getRandomInt(1, 10000000);
    guardarSession(randomId, supermercadoArray);

    const resultadoComparacion = document.getElementById('resultadoComparacion');
    const resultadoComparacionLista = document.getElementById('resultadoComparacionLista');
    resultadoComparacion.innerHTML = '<h3>Comparación de Precios</h3>';
    resultadoComparacionLista.innerHTML = '';
    supermercadoArray.forEach(s => {
        resultadoComparacionLista.innerHTML += `<li>${s.name}: $${s.total.toFixed(2)}</li>`;
    });

    // Guardar datos para usar en otra página
    sessionStorage.setItem('resultadosComparacion', JSON.stringify(supermercadoArray));

    // Redirigir a la nueva página
    window.location.href = 'pages/results.html'; // Asegúrate de que el nombre del archivo coincida
}

//Para el rendimiento en la busqueda de articulos

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

///Buscador y filtro de productos
const searchBar = document.getElementById('search-bar');
const handleSearchInput = function() {
    const searchTerm = searchBar.value.toLowerCase();
    const cards = document.querySelectorAll('.selectprices-item1'); // Selecciona todas las tarjetas de productos

    if (searchTerm.length > 0) {
        cards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = ''; // Muestra las tarjetas que coinciden
            } else {
                card.style.display = 'none'; // Oculta las tarjetas que no coinciden
            }
        });
    } else {
        cards.forEach(card => {
            card.style.display = ''; // Muestra todas las tarjetas cuando no hay término de búsqueda
        });
    }
};

// Envuelve la función handleSearchInput con debounce
const debouncedSearchHandler = debounce(handleSearchInput, 300); // Ajusta el tiempo de espera como sea necesario

searchBar.addEventListener('input', debouncedSearchHandler);

  



///Llamar las funciones
fetchData();

// Llama a la función que realiza la comparación
document.getElementById('compareButton').addEventListener('click', function() {
    compararPrecios(); 
});


document. getElementById('compararButton').addEventListener('click', compararPrecios);