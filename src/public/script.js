window.onload = start();
function start(){

    //En index page
    const editInfo = document.getElementById("editInfo")
    const mainDiv = document.getElementById("infoDiv")
    const lineaMenu = document.getElementById("lineaMenuTextual");
    const editInfoDiv = document.getElementById("editInfoDiv")
    const categoriesDiv = document.querySelector(".opciones")
    const menu = document.querySelector(".menu");
    const editBtn = document.getElementById("edit");
    const footer = document.querySelector('footer');
    const backBtn = document.getElementById("back");
    
    //En edit page.
    let nombrePlatoDia = document.getElementById('inputPlatoDia');
    let descripcionPDia = document.getElementById('descripcionPlatoDia');
    
    //inputSubtotal mostrar precio
    const inputSubT = document.getElementById('subtotal');
    
    //Boton para ordenar al costado del inputSubTotal
    const orderBtn = document.getElementById('order');
    
    //Para iterar y colocarle un listener a cada uno
    const buyButtons = document.querySelectorAll(".buyBtn");

    //Carrito
    let carrito = [];
    let subTotal = 0;

    //Obtiene el boton, sustrae su valor, JSON parsea ese valor a un objeto Javascript y asi obtengo el id y precio del plato agregado al carrito, se aumenta el subTotal y se va printeando a medida que hay mas productos en el carrito
    const addShoppingCart = (objbutton) =>{
        let value = objbutton.value;
        let objValue = JSON.parse(value);
        carrito.push(objValue);
        subTotal += objValue.precio;
        inputSubT.setAttribute('placeholder',`$${subTotal}`);
        //console.log(objValue.id, objValue.nombre ,objValue.precio);
    }
    
    //Por cada boton de Compra, le agrego onClick para que al clickearlo, se ejecute la funcion para agregar el plato al carrito de compras
    buyButtons.forEach((btn)=>{btn.onclick = ()=>{addShoppingCart(btn)} })

    //Al realizar la orden el subtotal vuelve a 0
    orderBtn.onclick = () =>{
        alert(`Total de su orden ${subTotal}`);
        
        //Imprime carrito por consola
        console.log(`Carrito \n`);
        carrito.forEach(plato => console.log(`Nombre: ${plato.nombre}, Precio: ${plato.precio} \n`))

        //Setea el input del subtotal a $0, el subtotal que calcula los precios a 0 y vacia el carrito
        inputSubT.setAttribute('placeholder','$0');
        subTotal = 0;
        carrito = [];
    }

    //Al cliquear Edit se muestra la seccion para ingresar la info del plato del dia
    editInfo.onclick = (e) =>{
        console.log('Click');
        window.scroll(0,0) //Posiciona la ventana en el eje X: 0 y eje Y: 0
        mainDiv.classList.add('isInactive');
        categoriesDiv.classList.add('isInactive');
        menu.classList.add('isInactive');
        editInfoDiv.classList.remove('isInactive');
        footer.style = "display: none;"
        lineaMenu.classList.add('isInactive');
    }
 
    //Al cliquear Edit en la seccion de info del plato del dia se muestra el index con la info actualizada
    backBtn.addEventListener('click',(e) => {
        e.preventDefault();
        mainDiv.classList.remove('isInactive');
        categoriesDiv.classList.remove('isInactive');
        menu.classList.remove('isInactive');
        editInfoDiv.classList.add('isInactive');
        lineaMenu.classList.remove('isInactive');
        footer.style = "display: normal;" 
        }
    )
    
    //Muestra en tiempo real la info que se va escribiendo acerca del plato del dia en la Edit page
    nombrePlatoDia.addEventListener('keyup',(event) => {
        let inputText = nombrePlatoDia.value;
        document.getElementById('presentacionNombre').innerHTML = inputText; 
    })
    descripcionPDia.addEventListener('keyup',(event) => {
        let inputText = document.getElementById('descripcionPlatoDia').value;
        document.getElementById('presentacionDesc').innerHTML = inputText;
    })
    
    //Lee platos.json y los carga en sus correspondientes divs en el menu textual, funciona bien pero tendria que optimizar la carga de los datos para no recorrer todos los platos cada vez que avanzo de categoria.
    const cargarPlatos = async () =>{
        try {
            let respuesta = await fetch('./Data/Platos.json')
    
            const datos = await respuesta.json();
    
            //Mapeo el arreglo datos y paso a cats los nombres de las categorias, podria que al realizar esto ya pasar los platos a un arreglo para cada categoria.
            let cats = datos.map((dato) => {
                let categoria = dato.cat;
                return categoria;
            });
    
            //Por cada categoria recorro los platos y los cargo en su div previamente obtenido por id
            cats.forEach(cate => {
                let divComida = document.getElementById(cate.toLowerCase())
                divComida.innerHTML=''
                //let html = `<div class="categoria" id="${cate.toLowerCase()}"> <h3>${cate}</h3>`;
                let html = `<h3>${cate}</h3>`
                let comidas = '';
                datos.forEach(Plato => {
                    if(Plato.cat === cate){
                        
                        comidas += (comidas.substring(0,4)==='<ul>' ? `` : `<ul>`) + `<li> <h4>${Plato.nombre}</h4> <button value=${Plato.id}>${Plato.precio}<img src="./Iconos/shoppingCart/apple-touch-icon.png" style="width: 24px; height: 24px;" alt=""> </button> </li>`
                    }
                });
                /*Si se abrio una lista con platos se cierra, sino se deja el div vacio*/
                (comidas.substring(0,4)==='<ul>' ? '</ul>' : '');
                
                html += comidas
                divComida.innerHTML = html;
            });
            
        } catch (error) {
            console.log(`Error: ${error}`);    
        }
    }    
}