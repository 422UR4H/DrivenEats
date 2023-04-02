function select(section, item) {
    const selected = document.querySelector(`.${section} .selected`);
    
    if (selected) {
        selected.classList.remove('selected');
    }
    item.classList.add('selected');
    
    authOrder();
}

function authOrder() {
    const burger = document.querySelector('.burgers .selected');
    const drink = document.querySelector('.drinks .selected');
    const sauce = document.querySelector('.sauces .selected');

    if (burger && drink && sauce) {
        activateButtonCloseOrder(true, "<h6>Fechar pedido</h6>");
    }
}

function activateButtonCloseOrder(bool, tag) {
    const button = document.querySelector('.close-order');

    button.disabled = !bool;
    button.innerHTML = `${tag}`;
    if (bool) {
        button.classList.add('activeButton');
    } else {
        button.classList.remove('activeButton');
    }
}

/*function activateButtonCloseOrder() {
    const button = document.querySelector('.close-order');

    button.disabled = false;
    button.innerHTML = '<h6>Fechar pedido<h6>';
    button.classList.add('activeButton');
}*/

function closeOrder() {
    const name = prompt('Qual o seu nome?');
    if (!name) {
        alert('É necessário colocar o nome');
        return;
    }

    const address = prompt('E o seu endereço?');
    if (!address) {
        alert('É necessário colocar o endereço');
        return;
    }

    const burger = document.querySelector('.burgers .selected h4').innerHTML;
    const drink = document.querySelector('.drinks .selected h4').innerHTML;
    const sauce = document.querySelector('.sauces .selected h4').innerHTML;
    
    let priceBurger = calcAmount('.burgers .selected h5');
    let priceDrink = calcAmount('.drinks .selected h5');
    let priceSauce = calcAmount('.sauces .selected h5');
    let priceTotal = priceBurger + priceDrink + priceSauce;

    // pelo visto, essa parte tem que ficar mal identada
    const order = 
`Olá, gostaria de fazer o pedido:
- Prato: ${burger}
- Bebida: ${drink}
- Sobremesa: ${sauce}
Total: R$ ${formatPrice(priceTotal)}\n
Nome: ${name}
Endereço: ${address}` // uma pena não poder escrever "Burger" nem "Molho" kkkkkrying  :'')

    const wppNum = "5524999780040";
    const wppLink = `https://wa.me/${wppNum}?text=${encodeURIComponent(order)}`;

    const confirmOrder = document.querySelector('.confirm-order');
    confirmOrder.innerHTML =
            `<div>
                <h6>Confirme seu pedido</h6>
            </div>
            <div>
                <p>${burger}</p>
                <p>${formatPrice(priceBurger)}</p>
            </div>
            <div>
                <p>${drink}</p>
                <p>${formatPrice(priceDrink)}</p>
            </div>
            <div>
                <p>${sauce}</p>
                <p>${formatPrice(priceSauce)}</p>
            </div>
            <div>
                <h6>TOTAL</h6>
                <h6>R$ ${formatPrice(priceTotal)}</h6>
            </div>
            <a href="${wppLink}">
                <button class="push-order" onclick="pushOrder()" data-test="confirm-order-btn">
                    Tudo certo, pode pedir!
                </button>
            </a>
            <button class="cancel-order" onclick="cancelOrder()" data-test="cancel-order-btn">
                Cancelar
            </button>`


    document.querySelector('.review-order').classList.toggle('hidden');

    activateButtonCloseOrder(false, "<p>Selecione os 3 itens<br>para fechar o pedido</p>");

}

function calcAmount(selectors) {
    const price = document.querySelector(selectors).innerHTML;
    return Number(price.slice(3, price.length).replace(",", "."));
}

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

function pushOrder() {
    activateButtonCloseOrder(true, "<h6>Fechar pedido</h6>");
}

function cancelOrder() {
    document.querySelector('.review-order').classList.toggle('hidden');
    activateButtonCloseOrder(true, "<h6>Fechar pedido</h6>");

}