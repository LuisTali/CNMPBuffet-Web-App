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
    buyButtons.forEach((btn)=>{
        btn.onclick = ()=>{ addShoppingCart(btn) } 
    })

    //Al realizar la orden el subtotal vuelve a 0
    orderBtn.onclick = () =>{
        //Setea el input del subtotal a $0, el subtotal que calcula los precios a 0 y vacia el carrito
        inputSubT.setAttribute('placeholder','$0');
        subTotal = 0;
        carrito = [];
    }

    //Al cliquear Edit se muestra la seccion para ingresar la info del plato del dia
    
    const showEditPanel = ()=>{
        window.scroll(0,0) //Posiciona la ventana en el eje X: 0 y eje Y: 0
        mainDiv.classList.toggle('isInactive');
        categoriesDiv.classList.toggle('isInactive');
        menu.classList.toggle('isInactive');
        editInfoDiv.classList.toggle('isInactive');
        lineaMenu.classList.toggle('isInactive');
        footer.classList.toggle('isInactive');
    }
    
    editInfo.onclick = showEditPanel;
        
    backBtn.onclick = showEditPanel;

    //Al cliquear Edit en la seccion de info del plato del dia se muestra el index con la info actualizada
    
    /*backBtn.addEventListener('click',(e) => {
        showEditPanel()
        }
    )*/
    
    //Muestra en tiempo real la info que se va escribiendo acerca del plato del dia en la Edit page
    nombrePlatoDia.addEventListener('keyup',(event) => {
        let inputText = nombrePlatoDia.value;
        document.getElementById('presentacionNombre').innerHTML = inputText; 
    })
    descripcionPDia.addEventListener('keyup',(event) => {
        let inputText = document.getElementById('descripcionPlatoDia').value;
        document.getElementById('presentacionDesc').innerHTML = inputText;
    })

    let select = document.getElementById("adminOptions");
    select.onchange = () =>{
        let valueSelected = select.options[select.selectedIndex].value;
        select.value = select.options[2].value;
        if(valueSelected == 'editInfo'){
            showEditPanel();
        }else if(valueSelected == '/auth/logout'){
            window.location = '/auth/logout';
        }
        console.log(valueSelected)
    }
}