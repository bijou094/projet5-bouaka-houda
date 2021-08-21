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

<p > Mme/Mrs : <span class=" text-capitalize idenCommande"> <strong>${contact.firstName}</strong></span> , merci pour votre achat sur notre site !</p>
    <p ">Votre montant est de :<br><span class="fw-bold idenCommande"><strong>${totalCommande} £</strong></span></p>
    <p class="fs-5">Votre numéro de commande est le :<span class="fw-bold idenCommande"><strong>${orderId}</strong><span></p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold idenCommande"><strong>${contact.email}</strong></span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize idenCommande"><strong>${contact.firstName}  ${contact.lastName} </strong></p>
        <p class="text-capitalize idenCommande"><strong>${contact.city}</strong></p>
        <p class="text-capitalize idenCommande"><strong>${contact.address}</strong></p>
    </div>
    <div class="text-center ">
        <a class="btn btn-primary btnOrder  m-1" href="./index.html" role="button">Retour à l'acceuil</a>
    </div>
    `
    
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