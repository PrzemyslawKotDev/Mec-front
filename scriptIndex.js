window.onload = function createNavbar(){
    let container = document.querySelector('#navBar');

    let navBar = document.createElement('div');
        navBar.classList.add('width');
        navBar.classList.add('boxFont');
        navBar.classList.add('flex');
        navBar.setAttribute('id','navbar');

        let logo = document.createElement('div');
            logo.classList.add('link');
            logo.setAttribute('id','logo');
            logo.setAttribute('onclick','index()');
            logo.innerText = 'MEC';
       
        let searchBar = document.createElement('div');
            searchBar.classList.add('boxFont');
            searchBar.classList.add('flex');
            searchBar.setAttribute('id','searchBar');
        
            let searchTxt = document.createElement('input');
                searchTxt.classList.add('search');
                searchTxt.classList.add('boxFont');
                searchTxt.setAttribute('id','searchTxt');
                searchTxt.setAttribute('type','text');
                searchTxt.setAttribute('placeholder','Search for anything');
            
            let searchButton = document.createElement('input');
                searchButton.classList.add('search');
                searchButton.classList.add('boxFont');
                searchButton.setAttribute('id','searchButton');
                searchButton.setAttribute('type','image');
                searchButton.setAttribute('src','https://freeiconshop.com/wp-content/uploads/edd/search-outline.png');
                searchButton.setAttribute('onclick','');

        let menuContainer = document.createElement('div');
            menuContainer.classList.add('flex');
            
            let login = document.createElement('div');
                login.classList.add('button');
                login.classList.add('link');
                login.classList.add('flex');
                login.setAttribute('id','login');
                login.setAttribute('onmouseover','showOption(event)');
                login.setAttribute('onmouseout','hideOption(event)');
            
                let loginImg = document.createElement('img');
                    loginImg.classList.add('buttonIMG');
                    loginImg.setAttribute('src','https://icons.iconarchive.com/icons/icons8/windows-8/64/User-Interface-Login-icon.png');
                
                let loginTxt = document.createElement('p');
                    loginTxt.classList.add('basketWidth');
                    loginTxt.classList.add('boxFont');
                    loginTxt.classList.add('flex');
                    loginTxt.setAttribute('id','loginTxt');
                    loginTxt.innerText = 'Log In';

                let logOrReg = document.createElement('div');
                    logOrReg.classList.add('flex');
                    logOrReg.setAttribute('id','logOrReg');
                    logOrReg.setAttribute('onmouseover','showOption(event)');
                    logOrReg.setAttribute('onmouseout','hideOption(event)');

                    let loginLink = document.createElement('a');
                        loginLink.classList.add('logOption');
                        loginLink.classList.add('textCenter');
                        loginLink.setAttribute('id','logInLink');
                        loginLink.classList.add('width');
                        loginLink.setAttribute('onclick','logInForm()');
                        loginLink.innerText = 'Log In';

                    let orTxt = document.createElement('p');
                        orTxt.classList.add('logOption');
                        orTxt.classList.add('textCenter');
                        orTxt.classList.add('width');
                        orTxt.innerText = 'or';

                    let registerLink = document.createElement('div');
                        registerLink.classList.add('logOption');
                        registerLink.classList.add('textCenter');
                        registerLink.setAttribute('id','registerLink');
                        registerLink.classList.add('width');
                        registerLink.setAttribute('onclick','registerForm()');
                        registerLink.innerText = 'Register';

            let userAccount = document.createElement('div');
                userAccount.classList.add('button');
                userAccount.classList.add('flex');
                userAccount.classList.add('link');
                userAccount.classList.add('basketWidth');
                userAccount.setAttribute('id','userAccount');

                let userImg = document.createElement('img');
                    userImg.classList.add('buttonIMG');
                    userImg.setAttribute('src','https://freeiconshop.com/wp-content/uploads/edd/person-outline.png');

                let profileTxt = document.createElement('div');
                    profileTxt.classList.add('basketWidth');
                    profileTxt.classList.add('boxFont');
                    profileTxt.classList.add('flex');
                    profileTxt.innerText = 'Profile';

            let basket = document.createElement('div');
                basket.classList.add('button');
                basket.classList.add('link');
                basket.classList.add('basketWidth');
                basket.classList.add('flex');
                basket.setAttribute('id','basket');

                let basketImg = document.createElement('img');
                    basketImg.classList.add('buttonIMG');
                    basketImg.setAttribute('src','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lq3F5wIgfte5dY2SwTmVqjuS422fIH8JCg&usqp=CAU');

                let basketTxt = document.createElement('div');
                    basketTxt.classList.add('basketWidth');
                    basketTxt.classList.add('boxFont');
                    basketTxt.classList.add('flex');
                    basketTxt.innerText = 'Basket';

container.append(navBar);
    navBar.append(logo);
    navBar.append(searchBar);
        searchBar.append(searchTxt);
        searchBar.append(searchButton);
    navBar.append(menuContainer);
        menuContainer.append(login);
            login.append(loginImg);
            login.append(loginTxt);
            login.append(logOrReg);
                logOrReg.append(loginLink);
                logOrReg.append(orTxt);
                logOrReg.append(registerLink);
        menuContainer.append(userAccount);
            userAccount.append(userImg);
            userAccount.append(profileTxt);
        menuContainer.append(basket);
            basket.append(basketImg);
            basket.append(basketTxt);
}

function showOption(oEvent) {
    var oDiv = document.getElementById("logOrReg");
    oDiv.style.visibility = "visible";
    oDiv.style.top = '75px';
}

function hideOption(oEvent) {
    var oDiv = document.getElementById("logOrReg");
    oDiv.style.visibility = "hidden";
}

function index(){
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
        let content = document.querySelector('#content');
            content.innerText = ' ';

        let parent = document.createElement('div');
        parent.classList.add('flex');
        parent.setAttribute('id','itemList');
            
            console.log(bank);
            bank.map((itemInfo)=> itemsData.push(itemInfo));
            let items = itemsData.map(item=>{
            
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

content.append(parent);
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
                }
            )
        }
    }
};
function registerForm(){ 
    let content = document.querySelector('#content');
        content.innerText = ' ';


    let registerTxt = document.createElement('h1');
        registerTxt.innerText = 'Register';
        registerTxt.classList.add('width');
        registerTxt.classList.add('font');
        registerTxt.classList.add('textCenter');
            
    let form = document.createElement('form');
        form.classList.add('flex');
        form.setAttribute('id','regForm');
        form.classList.add('font');

        let userNameLabel = document.createElement('label');
            userNameLabel.setAttribute('for','username');
            userNameLabel.innerText = 'Enter your user name here';
        
        let userNameInput = document.createElement('input');
            userNameInput.classList.add('width');
            userNameInput.classList.add('margin');
            userNameInput.classList.add('regForm');
            userNameInput.setAttribute('id','username');
            userNameInput.setAttribute('type','text');
            userNameInput.setAttribute('autocomplete','off');
            userNameInput.setAttribute('required','');
        
        let emailLabel = document.createElement('label');
            emailLabel.setAttribute('for','email');
            emailLabel.innerText = 'Enter your email here';
        
        let emailInput = document.createElement('input');
            emailInput.classList.add('width');
            emailInput.classList.add('margin');
            emailInput.classList.add('regForm');
            emailInput.setAttribute('id','email');
            emailInput.setAttribute('type','email');
            emailInput.setAttribute('autocomplete','off');
            emailInput.setAttribute('required','');

        let passwordLabel = document.createElement('label');
            passwordLabel.setAttribute('for','email');
            passwordLabel.innerText = 'Enter your password here';
        
        let passwordInput = document.createElement('input');
            passwordInput.classList.add('width');
            passwordInput.classList.add('margin');
            passwordInput.classList.add('regForm');
            passwordInput.setAttribute('id','password');
            passwordInput.setAttribute('type','password');
            passwordInput.setAttribute('autocomplete','off');
            passwordInput.setAttribute('required','');

        let password2Label = document.createElement('label');
            password2Label.setAttribute('for','email');
            password2Label.innerText = 'Repeat your password here';

        let password2Input = document.createElement('input');
            password2Input.classList.add('width');
            password2Input.classList.add('margin');
            password2Input.classList.add('regForm');
            password2Input.setAttribute('id','password2');
            password2Input.setAttribute('type','password');
            password2Input.setAttribute('autocomplete','off');
            password2Input.setAttribute('required','');

        let registerButton = document.createElement('input');
            registerButton.classList.add('margin');
            registerButton.classList.add('regButton');
            registerButton.classList.add('regForm');
            registerButton.setAttribute('id','registerButton');
            registerButton.setAttribute('type','submit');
            registerButton.setAttribute('value','Create account');
            registerButton.setAttribute('onclick','register()');



content.append(registerTxt);
content.append(form);
    form.append(userNameLabel);
    form.append(userNameInput);
    form.append(emailLabel);
    form.append(emailInput);
    form.append(passwordLabel);
    form.append(passwordInput);
    form.append(password2Label);
    form.append(password2Input);
    form.append(registerButton);


}
function register(){
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value
    if(password !== password2){alert('Both passwords must be the same')} else {
    const form = document.getElementById('regForm')
        form.addEventListener('submit', registerUser)
        async function registerUser(event){
            event.preventDefault()
            const username = document.getElementById('username').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const result = await fetch('https://mecapikot.herokuapp.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password, email, username, 
                })
            }).then((res)=>res.json())
        }
    }
}

function logInForm(){ 
    let content = document.querySelector('#content');
        content.innerText = ' ';


    let logInTxt = document.createElement('h1');
        logInTxt.innerText = 'Log in to your account';
        logInTxt.classList.add('width');
        logInTxt.classList.add('font');
        logInTxt.classList.add('textCenter');
            
    let form = document.createElement('form');
        form.classList.add('flex');
        form.setAttribute('id','regForm');
        form.classList.add('font');

        let userNameLabel = document.createElement('label');
            userNameLabel.setAttribute('for','username');
            userNameLabel.innerText = 'Enter your user name here';
        
        let userNameInput = document.createElement('input');
            userNameInput.classList.add('width');
            userNameInput.classList.add('margin');
            userNameInput.classList.add('regForm');
            userNameInput.setAttribute('id','username');
            userNameInput.setAttribute('type','text');
            userNameInput.setAttribute('autocomplete','off');
            userNameInput.setAttribute('required','');

        let passwordLabel = document.createElement('label');
            passwordLabel.setAttribute('for','email');
            passwordLabel.innerText = 'Enter your password here';
        
        let passwordInput = document.createElement('input');
            passwordInput.classList.add('width');
            passwordInput.classList.add('margin');
            passwordInput.classList.add('regForm');
            passwordInput.setAttribute('id','password');
            passwordInput.setAttribute('type','password');
            passwordInput.setAttribute('autocomplete','off');
            passwordInput.setAttribute('required','');

        let logInButton = document.createElement('input');
            logInButton.classList.add('margin');
            logInButton.classList.add('regButton');
            logInButton.classList.add('regForm');
            logInButton.setAttribute('type','submit');
            logInButton.setAttribute('value','Log In');
            logInButton.setAttribute('onclick','logIn()');


content.append(logInTxt);
content.append(form);
    form.append(userNameLabel);
    form.append(userNameInput);
    form.append(passwordLabel);
    form.append(passwordInput);
    form.append(logInButton);
}
    
function logIn(){


    const form = document.getElementById('regForm')
        form.addEventListener('submit', logInUser)
        async function logInUser(event){
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const result = await fetch('https://mecapikot.herokuapp.com/api/auth/user');
            const body = await result.json();
            console.log(body);
        }
}