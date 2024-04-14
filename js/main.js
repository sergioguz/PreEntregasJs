function consultaprecios(){

    const precio_arroz= 25;
    const precio_aguacate= 10;

    while(true){
        let producto = prompt('Escribe tu producto o dale a salir')

        if (producto.toLowerCase()=== 'salir'){
            alert('Gracias por utilizar nuestros servicios de consulta de precios');
            break;
        }

        if (producto.toLowerCase()=== 'arroz'){
            alert('precio ' + producto+' :' + precio_arroz +' usd');
        }
        else if(producto.toLowerCase()=== 'aguacate'){
            alert('precio ' + producto+' :' + precio_aguacate +' usd');
        }
        else{
            alert("El producto  " + producto  + "  no  se  encuentra.");
        }
    }
}


consultaprecios()


