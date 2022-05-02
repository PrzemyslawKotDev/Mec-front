const itemsData = [];

const socket = new WebSocket('wss://mec-storage.herokuapp.com');
socket.onmessage = ({data}) => {
    let bank = JSON.parse(data);
    switch(bank.operation){
        case 'product.stock.decreased':
            for(let i=0; i<itemsData.length; i++){
                if(bank.payload.productId === itemsData[i].productId){
                    itemsData[i].stock = bank.payload.stock
                }
            }    
            break;
        case 'product.stock.updated':
            for(let i=0; i<itemsData.length; i++){
                if(bank.payload.productId === itemsData[i].productId){
                    itemsData[i].stock = bank.payload.stock
                }
            }    
            break;
        default: 
            console.log(bank);
            bank.map((itemInfo)=> itemsData.push(itemInfo));
            let items = itemsData.map(item=>{
            let parent = document.querySelector('#itemList');
            
            let itemBar = document.createElement('div');
            itemBar.classList.add('itemBar');
            
            let itemIMG = document.createElement('div');
            itemIMG.classList.add('itemIMG');
            itemIMG.classList.add('flex');
            itemIMG.innerText = 'IMG';
            
            let itemInfo = document.createElement('div');
            itemInfo.classList.add('itemInfo');
            
            let itemName = document.createElement('div');
            itemName.classList.add('itemName');
            itemName.classList.add('boxFont');
            itemName.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            
            let itemPrice = document.createElement('div');
            itemPrice.classList.add('itemPrice');
            itemPrice.classList.add('boxFont');
            itemPrice.innerText = 'Cena: ' + (item.price/100).toFixed(2)+'zł';
            
            let itemButtons = document.createElement('div');
            itemButtons.classList.add('itemButtons');
            itemButtons.classList.add('flex');
            itemButtons.classList.add('boxFont');
            
            let amountLower = document.createElement('button');
            amountLower.addEventListener('click', function () {
                let amount = document.getElementById('amountOrder');
                    if(amount.innerText > 0){
                        amount.innerText = parseInt(amount.innerText) - 1;
                    }
                })
            amountLower.classList.add('amountLower');
            amountLower.classList.add('boxFont');
            amountLower.setAttribute('id','minusButton');
            amountLower.innerText = '-';
            
            let amountOrder = document.createElement('div');
            amountOrder.classList.add('amountOrder');
            amountOrder.classList.add('boxFont');
            amountOrder.classList.add('flex');
            amountOrder.setAttribute('id','amountOrder');
            amountOrder.innerText = 0;
            
            let amountHigher = document.createElement('button');
            amountHigher.addEventListener('click', function () {
                let amount = document.getElementById('amountOrder');
                    amount.innerText = parseInt(amount.innerText) + 1;
                })
            amountHigher.classList.add('amountHigher');
            amountHigher.classList.add('boxFont');
            amountHigher.setAttribute('id','plusButton');
            amountHigher.innerText = '+';
            
            let orderButton = document.createElement('button');
            orderButton.classList.add('orderButton');
            orderButton.classList.add('boxFont');
            orderButton.innerText = 'Zamów teraz';

            parent.append(itemBar);
            itemBar.append(itemIMG);
            itemBar.append(itemInfo);
            itemInfo.append(itemName);
            itemInfo.append(itemPrice);
            itemInfo.append(itemButtons);
            itemButtons.append(amountLower);
            itemButtons.append(amountOrder);
            itemButtons.append(amountHigher);
            itemInfo.append(orderButton);
    })  
    }
}
