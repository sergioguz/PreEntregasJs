
///Entrega Final 

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
                image.src = `https://preciosjustos.micm.gob.do/img_p/${el.img}`; // Asegúrate de que el objeto de datos tiene la URL de la imagen
                image.alt = el.name;
                imgDiv.appendChild(image);
                
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
        products: supermercadoTotales[name].products,
        countProducts: Object.keys(supermercadoTotales[name].products).length
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