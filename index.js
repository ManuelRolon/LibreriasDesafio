const tiposCripto = [{nombre: 'BNB', precio: 429}, {nombre: 'ETHEREUM', precio: 3271}, {nombre: 'USDT', precio: 1},{nombre: 'BITCOIN', precio: 46600} ];
let carritoCompra = [];
let form = document.querySelector('#formulario');
let eleccion = document.querySelector('#moneda');
let divPrincipal = document.createElement('div');
let guardadoLS;
let total;
let guardadoLS1;
let total2;

seleccionadorMonedas(tiposCripto);
botonTotal ();
function seleccionadorMonedas (tipo){

    for(let i = 0; i<tipo.length; i++){
        eleccion.innerHTML += `<option value ='${tipo[i].nombre}'>${tipo[i].nombre}</option>`

    }
};

class Criptomoneda {
    constructor(nombre, cantidadUSD){
        this.nombre = nombre,
        this.cantidadUSD = parseInt( cantidadUSD);
        this.precio = calcularPrecio(this.nombre);
        this.calculadoraCripto = this.cantidadUSD / this.precio;
    };

    TotalCompra(){
        compraTotal = this.nombre + '--> ' + this.cantidadUSD + ' = ' + this.calculadoraCripto + ' ' + this.nombre + '\n' + compraTotal
        return compraTotal
    }
}; 
function calcularPrecio (nom) {
    const validar = tiposCripto.find( (el) => el.nombre === nom  )

    return validar.precio
};

document.querySelector('#formulario').onsubmit = (e) => {
    e.preventDefault();
    let dinero = document.querySelector('#cantidadMoneda').value
    const compra = new Criptomoneda ( eleccion.value,dinero )
    mostrarCarrito(compra)

    carritoCompra.push(compra)
    console.log(carritoCompra)
    addLocalStorage()



};

mostrarCompra()





function mostrarCarrito(compra){

    let divHijo = document.createElement('div')
    divHijo.innerHTML = `<h2>Usted Compro: ${compra.nombre} </h2>
                     <h2>Total que desea comprar: ${compra.cantidadUSD}  </h2>
                     <h2>Cotizacion Actual: ${compra.precio}  </h2>
                     <h2>Total en Cripto: ${compra.calculadoraCripto}  </h2>
                     `
     divPrincipal.appendChild(divHijo);

}


function mostrarCompra() {
    guardadoLS2 = localStorage.getItem('carrito')
    total2 = JSON.parse(guardadoLS2)
   if(total2 != null){

        for(let i = 0; i < total2.length; i++){
            let divHijo = document.createElement('div')
              divHijo.innerHTML = `<h2>Usted Compro: ${total2[i].nombre} </h2>
                               <h2>Total que desea comprar: ${total2[i].cantidadUSD}  </h2>
                               <h2>Cotizacion Actual: ${total2[i].precio}  </h2>
                               <h2>Total en Cripto: ${total2[i].calculadoraCripto}  </h2>
                               `
               divPrincipal.appendChild(divHijo);

            
        }
   }


};

function botonTotal (){
    let fin = document.querySelector('#finalizar')

    fin.onclick = () =>{
        guardadoLS = localStorage.getItem('carrito')
        total = JSON.parse(guardadoLS)

        console.log('resumen compras' + total)
        let totalPrecio = 0;
        for(const el of total ){
            totalPrecio += el.cantidadUSD       
        }
        swal({
            title: "TRANSACCION EXITOSA!",
            text: "Muchas gracias por su compra",
            icon: "success",
            button: "Aceptar",
          });

    }
};

function addLocalStorage(){
    
    localStorage.setItem('carrito', JSON.stringify(carritoCompra))
  }
document.body.append(divPrincipal);
console.log(carritoCompra);