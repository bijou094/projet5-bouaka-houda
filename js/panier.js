// declaration duuuuu variable "article Enregidtrer Panier"////////////////////function produitDePanierCommander( idProduit, quantite, priceProduit, choixFormulaire,nomProduit){
  let products =JSON.parse(localStorage.getItem("products"))
  if (products === null){
    alert("panier vide ");
  }else{
    for (let k=0; k<products.length; k++){ 
     
      addProduitStokPanier (products[k].produits, products[k].nomProduit, products[k].prixProduit,products[k].quantite, products[k].totalPayerProduit, products[k].lentillesChoisi ); 
    }  
       
  };     
/////////////////////////////////////////////////////////////////

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 
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
  
}


//////////////////////////////////////////////////////////////
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



  


/////////////////////////////////////////boutton a vider panier ///////////////////////////////////////////////////////////////////////////

//insertion
let  nouveauButtonViderPanier = `
<button class="btnViderPanier" id="btnViderPanier" >vider le panier</button>`;
//button.;
document.querySelector("#block-Panier").insertAdjacentHTML("beforeend",nouveauButtonViderPanier);
// selection le id 
nouveauButtonViderPanier = document.querySelector("#btnViderPanier");

//selectionner les cles des produis de localstotege
nouveauButtonViderPanier.addEventListener("click", (e)=>{
  e.preventDefault;
  // remove pour vider le panier  
  localStorage.removeItem("produit");
  alert(" le panier a été vidé")
  window.location.reload();
})



/////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////////////////////

let prisTotalCalcul=[];

for (let n=0; n < products.length; n++){        
  let assembleLesPris =products[n].totalPayerProduit;//mesProduit[n].prixProduit;
  prisTotalCalcul.push(assembleLesPris);
    
}// addition avec reduce 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTattal =prisTotalCalcul.reduce(reducer) ;


/*********************************************** */
let  calculPrixTotalPanier = `
<div class="calculPrixTotalPanier" id="calculPrixTotalPanier" >prix total de la commande : ${prixTattal}</div>`;
//button.;
document.querySelector("#block-Panier").insertAdjacentHTML("beforeend",calculPrixTotalPanier);





















/////////////////////////////////////////////////////le formulaire................................
function addFormulaire (){
  const nouveauFormulaire  = document.createElement('div');   
  nouveauFormulaire.innerHTML=  `
  
  <div class="row produitSelectionner  border border-dark ">
  <form  id="from">                    
    <div class="form-group">
      <label for="firstName" > firstName : </label>
      <input type="text" id="firstName" name="firstName" pattern="^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$" required > 
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

  </form >
  </div>`
                 
           
 
  document.querySelector("#block-Panier").appendChild(nouveauFormulaire);
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
   
  
    const  donneEnvoyer ={
      contact:{
        firstName:document.querySelector("#firstName").value,
        lastName :document.querySelector("#lastName").value,
        address:document.querySelector("#address").value,
        city :document.querySelector("#city").value,    
        email:document.querySelector("#email").value
      },
      products,      
    };
    console.log(donneEnvoyer);
    //localStorage.setItem("donneEnvoyer",JSON.stringify(donneEnvoyer));    
   

  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(donneEnvoyer),
  })  
  .then(function(repon){    
    console.log(repon);
   localStorage.setItem("order", JSON.parse(repon).orderId);
    
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