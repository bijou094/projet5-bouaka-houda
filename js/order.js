// recuperer les donner dans le local storage
let contact =JSON.parse(localStorage.getItem("contact"));
let orderId =JSON.parse(localStorage.getItem("order"));
let totalCommande =JSON.parse(localStorage.getItem("prixTotalCommande"));
/***************************************************************************************** */
// créé la structure html du page order et l'envoyer ver le DOM
function addConfirmationCommande (){
    if ( orderId === null){
        window.location.href="./index.html";
    }
const informations  = document.createElement('div');
informations.innerHTML = `

<p > Mme/Mrs :  <span class="idenCommande font-weight-bolder">${contact.firstName}</span> , merci pour votre achat sur notre site !</p>
<p >Votre montant est de : <span class="idenCommande font-weight-bolder">${totalCommande} £<span></p>
<p >Votre numéro de commande est le :<span class="idenCommande font-weight-bolder">${orderId}</span></p>
<p >Votre facture va vous être transmise par mail à : <span class="idenCommande font-weight-bolder">${contact.email}</span></p>
<p >Votre commande sera envoyée à l'adresse suivante :
    <div class="  text-center ">
        <p ><span class="idenCommande font-weight-bolder">${contact.firstName}  ${contact.lastName} </span></p>
        <p ><span class="idenCommande font-weight-bolder">${contact.city}</span></p>
        <p ><span class="idenCommande font-weight-bolder">${contact.address}</span></p>
    </div>
</p>
<div class="text-center ">
    <a class="btn btn-primary btnOrder  m-1" href="./index.html" role="button">Retour à l'acceuil</a>
</div>`
    
informations.setAttribute("class", `col p-3`);  
document.querySelector(".recapulatif").appendChild(informations);     
}
addConfirmationCommande();
/****************************************************************************************************************** */
// fonction pour vider le localestorage
function deleteLocaleStorageFin(){
    console.log(orderId);
    if (orderId !== null){
        localStorage.removeItem("contact");
        localStorage.removeItem("order");
        localStorage.removeItem("prixTotalCommande");
        localStorage.clear();
        
    }else{
        
        window.location.href="./index.html";
    }
};
deleteLocaleStorageFin();
    /****************************************************************************************************** */