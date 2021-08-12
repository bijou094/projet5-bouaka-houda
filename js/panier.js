// declaration duuuuu variable "article Enregidtrer Panier"////////////////////function produitDePanierCommander( idProduit, quantite, priceProduit, choixFormulaire,nomProduit){
  let products =JSON.parse(localStorage.getItem("produit"))
  if (products === null){
    alert("panier vide ");
  }else{
    for (let k=0; k<products.length; k++){ 
     
      addProduitStokPanier (products[k].produits, products[k].nomProduit, products[k].prixProduit,products[k].quantite, products[k].totalPayerProduit, products[k].lentillesChoisi ); 
    }  
       
  };     
/////////////////////////////////////////////////////////////////

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* 
function addProduitStokPanier (idProduit, nameProduit, priceProduit, quantite, totalPayerProduit, lentillesChoisi ){
  const nouveauProduitCommander = document.createElement('div');  
  
    nouveauProduitCommander.innerHTML=`
      <div class="articleSelectionne ">
        <div class=" row affichageNpq  d-flex flex-row justify-content-between">        
          <span>name : ${nameProduit}</span>
          <span>option:${lentillesChoisi}</span>
          <span>prix : ${priceProduit}</span>
          <span>quantite:${quantite}</span>                   
          <span>prix total d'un produit:${totalPayerProduit}</span> 
                    
        </div> 
        <button class="btn-supprimer" value=${idProduit}>supprimer<i class="bi bi-trash"></i></button>
      </div> `
  document.querySelector("#block-Panier").appendChild(nouveauProduitCommander);
  
}*/
////////////////////////////////////////////////////////////////////////////////////////////////////////
// fonction pour ajouter les produit selectionner au dom
// création est ajout des elemnet de tableau 

function addProduitStokPanier (idProduit, nameProduit, priceProduit, quantite, totalPayerProduit, lentillesChoisi ){
  const nouveauProduitCommander = document.createElement('tr');  
  
    nouveauProduitCommander.innerHTML=`     
    <td  scope="row">${nameProduit}</td>
    <td >${lentillesChoisi}</td>
    <td >${priceProduit}</td>
    <td >${quantite}</td>
    <td >${totalPayerProduit}</td>
    <td><button class="btn-supprimer" value=${idProduit}><i class="bi bi-trash"></i></button></td>      
   `
   
  document.querySelector(".ligneTableau").appendChild(nouveauProduitCommander);  
}
///////////////////////////////////////////////////////boutton supprimer////////////////////////////////////////////////////////////
// selectionner tout les 
//supprimer le produit volu en click sur le boutton supprimer
let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer);

for (let l =0; l<btnSupprimer.length; l++){
  btnSupprimer[l].addEventListener('click', (event)=> { 
    event.preventDefault();
    let choixSupprimer = products[l].idProduit; 
    let lentillesChoisi =products[l].lentillesChoisi;
    products = products.filter(el => (el.idProduit!==choixSupprimer || el.lentillesChoisi !== lentillesChoisi));
    console.log(products);  alert("etes vous sur de supprimer l'article");
    localStorage.setItem("produit", JSON.stringify(products)); 
    window.location.reload();        
  })
}
/////////////////////////////////////////// le prix total de la commande //////////////////////////////////////

let prisTotalCalcul=[];

for (let n=0; n < products.length; n++){        
  let assembleLesPris =products[n].totalPayerProduit;//mesProduit[n].prixProduit;
  prisTotalCalcul.push(assembleLesPris);
    
}// addition avec reduce 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTattal =prisTotalCalcul.reduce(reducer) ;

let  calculPrixTotalPanier = `
<tr class="table-secondary ">
<td colspan="4">prix total de la commande </td>
<td colspan="2" class="  calculPrixTotalPanier" id="calculPrixTotalPanier"> ${prixTattal}</td>
</tr>`;
//button.;
document.querySelector(".ligneTableau").insertAdjacentHTML("beforeend",calculPrixTotalPanier);

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////boutton a vider panier ///////////////////////////////////////////////////////////////////////////

//insertion
let  nouveauButtonViderPanier = `
<tr class="table-primary"  >
<td colspan="6">
<button class="btnViderPanier" id="btnViderPanier" >vider le panier</button></td>
</tr>`;
//button.;
document.querySelector(".ligneTableau").insertAdjacentHTML("beforeend",nouveauButtonViderPanier);
// selection le id 
nouveauButtonViderPanier = document.querySelector("#btnViderPanier");

//selectionner les cles des produis de localstotege
nouveauButtonViderPanier.addEventListener("click", (e)=>{
  e.preventDefault;
  // remove pour vider le panier 
  localStorage.removeItem("produit"),alert(" le panier a été vidé");  
    
  window.location.reload();
  
})
/////////////////////////////////////////////////////le formulaire................................
function addFormulaire (){
  const nouveauFormulaire  = document.createElement('div');   
  nouveauFormulaire.innerHTML=  `
  
  
  <form  id="from" >                    
    <div class="form-group">
      <label for="firstName" > firstName : </label>
      <input class="form-control" type="text" id="firstName" name="firstName" pattern="^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$" required > 
    </div>

    <div class="form-group">
      <label for="lastName">lastName :</label>
      <input class="form-control" type="text" id="lastName" name="lastName" pattern="^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$" required >
    </div>

    <div class="form-group">
      <label for="address">address:</label>
      <input class="form-control" type="text"  name="address" id="address" required>                        
    </div>

    <div class="form-group">
      <label for="city">city:</label>
      <input class="form-control" type="text" name="city" id="city" pattern="^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$" required>
    </div>    

    <div class="form-group">
      <label for="email">email :</label>
      <input class="form-control" type="email" name="email" id="email" placeholder="name@example.com" requered>
    </div>
    <button  type="submit" id="btnEnvoyerFormulaire" name="btnEnvoyerFormulaire">confirmer votre commande </button>

  </form >`      
  
  document.querySelector(".formil").appendChild(nouveauFormulaire);  
  
} 

addFormulaire();

/////////////////////////////////////////////////////
//selectionner le button commander
const nouveauEnvoyerFormulaire = document.querySelector("#btnEnvoyerFormulaire");

nouveauEnvoyerFormulaire.addEventListener("click", (event)=>{
  event.preventDefault(); 
  
  const contact ={
    firstName:document.querySelector("#firstName").value,
    lastName :document.querySelector("#lastName").value,
    address:document.querySelector("#address").value,
    city :document.querySelector("#city").value,    
    email:document.querySelector("#email").value
  };

  console.log(contact);
  
  localStorage.setItem("contact",JSON.stringify(contact));  
  // le dossier a envoyer avec la requette
    const  donneEnvoyer ={
      contact:{
         firstName :document.querySelector("#firstName").value,
        lastName :document.querySelector("#lastName").value,
        address:document.querySelector("#address").value,
        city :document.querySelector("#city").value,    
        email:document.querySelector("#email").value
      },
      products,    
    };
    console.log(donneEnvoyer);
    localStorage.setItem("donneEnvoyer",JSON.stringify(donneEnvoyer));    
   
// la requette 
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(donneEnvoyer)
  })  
  .then(function(repon){    
    console.log(repon);
    let reponseApi = JSON.parse(repon);
    window.localStorage.setItem("orderId", reponseApi.orderId);    
  })
});

const dataLocaleStorage = localStorage.getItem("contact");
    const dataLocaleStorageObjet = JSON.parse(dataLocaleStorage);
    console.log(dataLocaleStorageObjet);

    // mettre les caleur du localestorage dans les champs du formulaire 
  
  function remplirInpuTLocalStorage(input){
    document.querySelector(`#${input}`).value = dataLocaleStorageObjet[input];
  };  
   
  remplirInpuTLocalStorage("firstName");  
  remplirInpuTLocalStorage ('lastName');
  remplirInpuTLocalStorage ('address');
  remplirInpuTLocalStorage ('city');
  remplirInpuTLocalStorage ('email');


