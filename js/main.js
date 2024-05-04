//Consulta de precios-PreEntrega2

class Producto {
    constructor(id,producto, precio,supermercado) {
        this.id  = parseInt(id);
        this.producto= producto;
        this.precio  = parseFloat(precio);
        this.supermercado= supermercado;
    }
};

const productos = [{ id: 1,  producto: "Arroz", precio: 125, supermercado: "Bravo" },
                  {  id: 1,  producto: "Arroz", precio: 70, supermercado: "La Cadena" }, 
                  {  id: 1,  producto: "Arroz"  , precio: 50, supermercado: "Fresh"},
                  {  id: 1,  producto: "Arroz" , precio: 100, supermercado: "Ole"},
                    { id: 13,  producto: "Ajo", precio: 109, supermercado: "Bravo" },
                    { id: 13,  producto: "Ajo", precio: 109, supermercado: "Ole" }, 
                    { id: 13,  producto: "Ajo", precio: 118, supermercado: "Unidos" },
                    { id: 13,  producto: "Ajo", precio: 119.9, supermercado: "Jumbo" },
                    { id: 10,  producto: "Habichuelas", precio: 50, supermercado: "Bravo" },
                    { id: 10,  producto: "Habichuelas", precio: 30, supermercado: "Ole" }, 
                    { id: 10,  producto: "Habichuelas", precio: 40, supermercado: "La Cadena"},
                    { id: 10,  producto: "Habichuelas", precio: 55, supermercado: "Fresh" },
                    { id: 8,  producto: "Pollo", precio: 65, supermercado: "Bravo" },
                    { id: 8,  producto: "Pollo", precio: 55, supermercado: "Unidos" },
                    { id: 8,  producto: "Pollo", precio: 63, supermercado: "Ole" }, 
                    { id: 8,  producto: "Pollo", precio: 60, supermercado: "Jumbo" }];


let fechaUTC = new Date().toDateString();

menuprincipal=true


function Consultarprecios(){

    const opcionselect=parseInt(prompt("Bienvenido a Precios Bajo. ¿Que quisieras hacer? \n 1. Consultar el precio de un producto \n2. Consultar una lista de productos \n3. Agregar/Actualizar producto"))


    if (opcionselect===1){
           
            const consultaproductos= parseInt(prompt("Elige uno de los productos a continuacion para consulta \n 1.Arroz \n 8.Pollo \n 10.Habichuelas \n 13.Ajo "));
            
            ///filtro por el numero de opcion 
            const resultadoconsulta= productos.filter((el)=> el.id=== consultaproductos);
    
            ///Organicé de menor a mayor los precios
            resultadoconsulta.sort((a, b) => a.precio - b.precio);
    
            alert("Favor visualizar la consola para los ver los resultados");
    
            console.log('Aqui los precios por supermercados de '+ resultadoconsulta[0]["producto"], fechaUTC);
    
            for (const results of resultadoconsulta){
                console.log(results["supermercado"],results["precio"]);
            }
    
            }else if(opcionselect===2){
    
                let busquedalista= [];
                let validaconsulta= true;
    
                while (validaconsulta){
                    const consultaproductos= parseInt(prompt("Elige el codigo del producto a continuacion para consulta de la lista \n 1.Arroz \n 8.Pollo \n 10.Habichuelas \n 13.Ajo "));
                    ///Agrega el producto 
                    busquedalista.push(consultaproductos);
        
                    
                    let validasalir=prompt("Finalizar la consulta? Si o No?");
                        if (validasalir. toLowerCase()=== 'no'){
                            ///console.log(busquedalista);
                        }else {
                            ///filtro por el numero de opcion 
                           
                            const resultadoconsulta= productos.filter(el=>busquedalista.includes(el.id));
                                    //Utilizo reduce para sumarizar
                                const sumasPorSupermercado = resultadoconsulta.reduce((acum, producto) => {
                                    // Si el supermercado ya está en el acumulador, sumar el precio actual al acumulado
                                    if (acum[producto.supermercado]) {
                                    acum[producto.supermercado] += producto.precio;
                                    } else {
                                    // Si no, inicializar el acumulador para ese supermercado con el precio del primer producto
                                    acum[producto.supermercado] = producto.precio;
                                    }
                                    return acum;
                                }, {});
                                    //Me transforma el array a un objeto
                                const paresSupermercadoPrecio = Object.entries(sumasPorSupermercado);
                                    //Me organiza los de menor a mayor los precios
                                paresSupermercadoPrecio.sort((a, b) => a[1] - b[1]);
                                alert("Favor visualizar la consola para los ver los resultados");
                                console.log('Aqui la lista de precios por supermercados al', fechaUTC);
                                console.log(paresSupermercadoPrecio);
                                
                            break;
                            
                        }
                }
    
    
            } else if (opcionselect===3){
                productos.push(new Producto(prompt('Ingresa el ID que quieres que lleve'),
                prompt('Ingresa el producto que quieres'),
                prompt('Ingresa el precio'),
                prompt('Ingresa el supermercado al que compraste')))
    
                console.log(productos);
    
            }else{
                alert ("Esta opción no está disponible");     
            }

};

Consultarprecios();