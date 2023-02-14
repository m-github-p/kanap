//Définition du titre de l'onglet "Cart".
document.title = "Kanap Panier";

//Récupération du panier depuis le localStorage.
function localStorageData(){

    //Le panier est plein.
    if(localStorage.getItem("cart")){

        //Résultat de l'analyse du panier, au format JSON.
        let cart = JSON.parse(localStorage.getItem("cart"));

        //Si tableau, alors boucle "for ... of ...".*/
        for(let couch of cart){

            //sectionElement = Product Section
            let sectionElement = document.getElementById("cart__items");

            //cardElement = Product Card
            //Il faut d'abord paramétrer "cardElement", pour les besoins de la prochaine étape.
            let cardElement = document.createElement("article");
            cardElement.className = "cart__item";
            cardElement.dataset.id = couch.productId;
            cardElement.dataset.color = couch.productColor;

            //"sectionElement" a "cardElement" pour enfant.
            sectionElement.appendChild(cardElement);

            //div for "cart__item__img"
            let divCartItemImg = document.createElement("div");
            divCartItemImg.className = "cart__item__img";
            cardElement.appendChild(divCartItemImg);

            //imageElement = Product Image
            let imageElement = document.createElement("img");

            //Pour ne pas obtenir le résultat "undefined", il faut déclarer les caractéristiques produit du fichier "product.js". (Lignes 107-114)
            imageElement.src = couch.productImage;
            imageElement.alt = couch.productAltTxt;

            //"divCartItemImg" a "imageElement" pour enfant.
            divCartItemImg.appendChild(imageElement);

            //div for "cart__item__content"
            let divCartItemContent = document.createElement("div");
            divCartItemContent.className = "cart__item__content";
            cardElement.appendChild(divCartItemContent);

            //div for "cart__item__content__description"
            let divCartItemContentDescription = document.createElement("div");
            divCartItemContentDescription.className = "cart__item__content__description";
            divCartItemContent.appendChild(divCartItemContentDescription);

            //nameElement = Product Name
            let nameElement = document.createElement("h2");
            nameElement.innerText = couch.productName;
            divCartItemContentDescription.appendChild(nameElement);

            //colorElement = Product Color
            let colorElement = document.createElement("p");
            colorElement.innerText = couch.productColor;
            divCartItemContentDescription.appendChild(colorElement);

            //priceElement = Product Price
            let priceElement = document.createElement("p");
            priceElement.innerText = couch.productPrice + " €";
            divCartItemContentDescription.appendChild(priceElement);

            //div for "cart__item__content__settings"
            let divCartItemContentSettings = document.createElement("div");
            divCartItemContentSettings.className = "cart__item__content__settings";
            divCartItemContent.appendChild(divCartItemContentSettings);

            //div for "cart__item__content__settings__quantity"
            let divCartItemContentSettingsQuantity = document.createElement("div");
            divCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

            //quantityElement = Product Quantity
            let quantityElement = document.createElement("p");
            quantityElement.innerText = "Qté : ";
            divCartItemContentSettingsQuantity.appendChild(quantityElement);

            //inputElement = Product Input
            let inputElement = document.createElement("input");
            inputElement.className = "itemQuantity";
            inputElement.type = "number";
            inputElement.name = "itemQuantity";
            inputElement.min = "1";
            inputElement.max = "100";
            inputElement.value = couch.productQuantity;
            divCartItemContentSettingsQuantity.appendChild(inputElement);
            
            //div for "cart__item__content__settings__delete"
            let divCartItemContentSettingsDelete = document.createElement("div");
            divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

            //deleteItem = Product Deletion
            let deleteItem = document.createElement("p");
            deleteItem.className = "deleteItem";
            deleteItem.innerText = "Supprimer";
            divCartItemContentSettingsDelete.appendChild(deleteItem);

            //totalQuantity = totalProducts()
            let totalQuantity = totalProducts();
            let getTotalQuantity = document.getElementById("totalQuantity");
            getTotalQuantity.innerText = totalQuantity;
        
            //totalPrice = totalAmount()
            let totalPrice = totalAmount();
            let getTotalPrice = document.getElementById("totalPrice");
            getTotalPrice.innerText = totalPrice;
        }

        //Le panier est vide.
        }else{
        alert("Veuillez remplir votre panier.");
    

        //Redirection vers la page "Accueil".
        location.href = "index.html";
    }
}

//Appel de la fonction "localStorageData()".
localStorageData();

//Calcul du total des produits.
function totalProducts(){

    //Initialisation de la quantité totale à 0, lorsque le panier est vide de produits.
    let totalQuantity = 0;

    //Récupération du panier dans le localStorage.
    if(localStorage.getItem("cart")){

        //Résultat de l'analyse du panier, au format JSON.
        let cart = JSON.parse(localStorage.getItem("cart"));

        //Si tableau, alors boucle "for ... of ...".
        for(let couch of cart){

            //La quantité sélectionnée est incrémentée à la quantité totale. La fonction parseInt() convertit le résultat en nombre entier.
            totalQuantity += parseInt(couch.productQuantity);
        }
    }

    //La nouvelle valeur de "totalQuantity" est le résultat du calcul.
    return totalQuantity;
}

//Calcul du montant total.
function totalAmount(){

    //Initialisation de la quantité totale à 0, lorsque le panier est vide de montants.
    let totalPrice = 0;

    //Récupération du panier dans le localStorage.
    if(localStorage.getItem("cart")){

        //Résultat de l'analyse du panier, au format JSON.
        let cart = JSON.parse(localStorage.getItem("cart"));

        //Si tableau, alors boucle "for ... of ...".
        for(let couch of cart){

            //Le produit de la quantité et du prix sélectionnés est incrémenté au prix total. La fonction parseInt() convertit le résultat en nombre entier.
            totalPrice += parseInt(couch.productQuantity) * parseInt(couch.productPrice);
        }
    }

    //La nouvelle valeur de "totalPrice" est le résultat du calcul.
    return totalPrice;
}

//Modification de la quantité des canapés dans le panier.
function modifyFromCart(){

    //Il faut déclarer "itemQuantity", pour les besoins des prochaines étapes.
    let itemQuantity = document.querySelectorAll(".itemQuantity");

    //Pour cette boucle "for", déclaration d'une variable d'indice "i", servant de compteur pour le nombre d'exécutions de la boucle.
    for(let i = 0; i < itemQuantity.length; i++){
    
        //Clic sur les flèches, dans l'input de quantité.
        itemQuantity[i].addEventListener("change", function(event){

            //Désactivation du comportement par défaut du navigateur (modification de l'URL de l'onglet, et chargement d'une nouvelle page).
            event.preventDefault();

            //Récupération du panier dans le localStorage.
            if(localStorage.getItem("cart")){

                //Résultat de l'analyse du panier, au format JSON.
                let cart = JSON.parse(localStorage.getItem("cart"));

                //Recherche des produits identiques dans le panier.
                let cartFind = cart.find(

                    //Paramétrage de ladite recherche.
                    (p) => p.productId == cart[i].productId && p.productColor == cart[i].productColor
                );

                //Si le canapé sélectionné se trouve déjà dans le panier, alors sa quantité doit être incrémentée.
                if(cartFind !== undefined){

                    //Erreur : Valeur supérieure à 100 pour le nombre d'articles.
                    if(itemQuantity[i].value > 100){
                        alert("Veuillez ne pas renseigner de valeur supérieure à 100 pour le nombre d'articles.");

                    //Succès : Modification de la quantité des canapés dans le panier.
                    }else{

                        //Récupération de la nouvelle quantité.
                        cartFind.productQuantity = itemQuantity[i].value;
                        
                        //Création du nouveau panier, et conversion du panier JS en chaîne de caractères JSON.
                        localStorage.setItem("cart", JSON.stringify(cart));

                        //Confirmation de la modification du panier.
                        alert("Votre panier a été mis à jour.");

                        //Actualisation de la page.
                        location.reload();
                    }
                }
            }
        })
    }
}

//Appel de la fonction "modifyFromCart()".
modifyFromCart();

//Suppression des canapés du panier.
function removeFromCart(){

    //Il faut déclarer "deletionElement", pour les besoins des prochaines étapes.
    let deletionElement = document.querySelectorAll(".deleteItem");

    //Pour cette boucle "for", déclaration d'une variable d'indice "i", servant de compteur pour le nombre d'exécutions de la boucle.
    for(let i = 0; i < deletionElement.length; i++){

        //Clic sur le bouton "Supprimer".
        deletionElement[i].addEventListener("click", function(event){

            //Désactivation du comportement par défaut du navigateur (modification de l'URL de l'onglet, et chargement d'une nouvelle page).
            event.preventDefault();

            //Récupération du panier dans le localStorage.
            if(localStorage.getItem("cart")){

                //Vérification de la suppression du panier.
                if(confirm("Voulez-vous vraiment supprimer ce produit du panier ?")){

                    //Résultat de l'analyse du panier, au format JSON.
                    let cart = JSON.parse(localStorage.getItem("cart"));

                    //Recherche des produits identiques dans le panier.
                    cart = cart.filter(

                        //Paramétrage de ladite recherche. Les produits non identiques sont conservés.
                        (p) => p.productId !== cart[i].productId || p.productColor !== cart[i].productColor
                    );

                    //Création du nouveau panier, et conversion du panier JS en chaîne de caractères JSON.
                    localStorage.setItem("cart", JSON.stringify(cart));

                    //Confirmation de la suppression du panier.
                    alert("Produit(s) supprimé(s) du panier.")

                    //Actualisation de la page.
                    location.reload();

                //Annulation de la suppression du panier.
                }else{
                    alert("Votre panier a été conservé tel quel.")
                }
            }
        })
    }
}

//Appel de la fonction "removeFromCart()".
removeFromCart();

let firstName = document.getElementById("firstName");
let firstNameRegEx = new RegExp(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ' -]{2,50}$/);
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

firstName.addEventListener("change", function(event){
    event.preventDefault();
    firstNameCheck();
})

function firstNameCheck(){
    if(firstNameRegEx.test(firstName.value)){
        firstNameErrorMsg.innerText = "";
        return true;
    }else{
        firstNameErrorMsg.innerText = "Veuillez renseigner un prénom valide.";
        return false;
    }
}

let lastName = document.getElementById("lastName");
let lastNameRegEx = new RegExp(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ' -]{2,50}$/);
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

lastName.addEventListener("change", function(event){
    event.preventDefault();
    lastNameCheck();
})

function lastNameCheck(){
    if(lastNameRegEx.test(lastName.value)){
        lastNameErrorMsg.innerText = "";
        return true;
    }else{
        lastNameErrorMsg.innerText = "Veuillez renseigner un nom valide.";
        return false;
    }
}

let address = document.getElementById("address");
let addressRegEx = new RegExp(/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{5,100}$/);
let addressErrorMsg = document.getElementById("addressErrorMsg");

address.addEventListener("change", function(event){
    event.preventDefault();
    addressCheck();
})

function addressCheck(){
    if(addressRegEx.test(address.value)){
        addressErrorMsg.innerText = "";
        return true;
    }else{
        addressErrorMsg.innerText = "Veuillez renseigner une adresse valide.";
        return false;
    }
}

let city = document.getElementById("city");
let cityRegEx = new RegExp(/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{2,50}$/);
let cityErrorMsg = document.getElementById("cityErrorMsg");

city.addEventListener("change", function(event){
    event.preventDefault();
    cityCheck();
})

function cityCheck(){
    if(cityRegEx.test(city.value)){
        cityErrorMsg.innerText = "";
        return true;
    }else{
        cityErrorMsg.innerText = "Veuillez renseigner une ville valide.";
        return false;
    }
}

let email = document.getElementById("email");
let emailRegEx = new RegExp(/^[a-zA-Z]+[a-z-A-Z.-_\d]+?@[a-zA-Z]+.[a-z]{2,50}$/);
let emailErrorMsg = document.getElementById("emailErrorMsg");

email.addEventListener("change", function(event){
    event.preventDefault();
    emailCheck();
})

function emailCheck(){
    if(emailRegEx.test(email.value)){
        emailErrorMsg.innerText = "";
        return true;
    }else{
        emailErrorMsg.innerText = "Veuillez renseigner un courriel valide.";
        return false;
    }
}

let products = [];
if(localStorage.getItem("cart")){
    let cart = JSON.parse(localStorage.getItem("cart"));
    for(let couch of cart){
        products.push(couch.productId)
    }
}

let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
}

let order = document.getElementById("order");

order.addEventListener("click", function(event){
    event.preventDefault();

    if((products.length == null) || (products.length == 0)){
        alert("Veuillez remplir votre panier.");
        location.href = "index.html";
    
    }else if((firstNameCheck() == false) || (lastNameCheck() == false) || (addressCheck() == false) || (cityCheck() == false) || (emailCheck() == false)){
        alert("Veuillez vérifier votre formulaire.");
    
    }else{
        postSuccess();
    }
})

function postSuccess(){
    let contactProducts = {
        contact: contact,
        products: products
    }
    fetch("http://localhost:3000/api/products/order",
    {
      method: "post",
      headers: {
        "accept": "application/json",
        "content-type": "application/json"
    },
      body: JSON.stringify(contactProducts)
    })
    .then(function(response){
        if(response.ok){
        return response.json();
    }})
    .then(function(result){
        alert("Vous allez être redirigé vers votre numéro de commande.")
        location.href = "./confirmation.html?id=" + result.orderId;
    })
    .catch(function(postFail){
        alert("Échec de l'envoi du formulaire. Veuillez réessayer ultérieurement.");
    })
}