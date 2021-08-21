/*fonction pour ajouter les produit selectionner au dom
 *création est ajout des elemnet de tableau *****************************/
function addProduitStokPanier (idProduit, nameProduit, priceProduit, quantite, totalPayerProduit, lentillesChoisi ){
  const nouveauProduitCommander = document.createElement('tr');  
    nouveauProduitCommander.innerHTML=`   
    <td scope="col " scope="row">${nameProduit}</td>
    <td scope="col">${lentillesChoisi}</td>
    <td  scope="col">${priceProduit}</td>
    <td scope="col" >${quantite}</td>
    <td scope="col" >${totalPayerProduit}</td>
    <td scope="col"><button class="btn-supprimer bg-transparent border-0" value=${idProduit}><i class="bi bi-trash"></i></button></td>`
    nouveauProduitCommander.setAttribute("scope", `row `);    
document.querySelector(".ligneTableau").append(nouveauProduitCommander); 
}
/******************************
//fonction pour ajouter les produit selectionner au dom *création est ajout des elemnet de tableau *****************************/
function addFormulaire (){
  const nouveauFormulaire  = document.createElement('form');   
  nouveauFormulaire.innerHTML=  `
    <div class="form-groups m-3 font-weight-bolder" >    
      <label for="firstName"  > firstName : </label>
      <input class="form-control  " type="text" id="firstName" name="firstName"  required > 
    </div>
    <div class="form-groups m-3 font-weight-bolder" >
      <label for="lastName">lastName :</label>
      <input class="form-control" type="text" id="lastName" name="lastName"  required >
    </div>

    <div class="form-groups m-3 font-weight-bolder" >
       <label for="address">address:</label>
      <input class="form-control" type="text"  name="address" id="address" required> 
    </div>
    <div class="form-groups m-3 font-weight-bolder" >
      <label for="city">city:</label>
      <input class="form-control" type="text" name="city" id="city" required>
    </div >  
    <div class="form-groups m-3 font-weight-bolder" >
      <label for="email">email :</label>
      <input class="form-control" type="email" name="email" id="email" placeholder="name@example.com" requered>
    </div>
    <div class=" m-3 d-flex  flex-column align-self-center">
      <button  type="submit" id="btnEnvoyerFormulaire" name="btnEnvoyerFormulaire" class="btn btn-secondary font-weight-bolder m-1">Commander </button>
    </div>
  `   
  nouveauFormulaire.setAttribute("class", ` formulaireContactServer bg-light  d-flex  flex-column align-items-center mb-3`);  
  nouveauFormulaire.setAttribute("id", `from`);
  document.querySelector(".formil").insertAdjacentElement("beforeend",nouveauFormulaire);
  //document.querySelector(".formil").appendChild(nouveauFormulaire);  
} 
addFormulaire();
 /********************************************************************* 
 * Récupere les donne de  tableau des products qui sont dans le localstorage
 * ajouter touts les proprietes des product recupré*********************************************/
  let products
 function getParametreProduct() {
  products =JSON.parse(localStorage.getItem("produit"));  
  if (products === null){
    alert("panier vide ");
    window.location.href=" index.html";
  }else{
    for (let k=0; k<products.length; k++){      
      addProduitStokPanier (products[k].idProduit, products[k].nomProduit, products[k].prixProduit,products[k].quantite, products[k].totalPayerProduit, products[k].lentillesChoisi ); 
    }         
  };  
}
getParametreProduct();
/******************************************************************table-secondary
 creer la ligne de tableau qui present le pris total de la commande et selection la div ligneTableau pour l'ajouter au DOM*************************/ 
function addTotalCommande(){   
  // calculer le montant total de la commande 
let prisTotalCalcul=[];
for (let n=0; n < products.length; n++){        
  let assembleLesPris =products[n].totalPayerProduit;//mesProduit[n].prixProduit;
  prisTotalCalcul.push(assembleLesPris);
    
}// addition avec reduce 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalCommande=prisTotalCalcul.reduce(reducer) ;
localStorage.setItem("prixTotalCommande", JSON.stringify(totalCommande)); 
// stoque la variable totalCommande dans localStorage
 let  calculPrixTotalPanier = `
  <tr scope=" row">
  <td scope="col" colspan="4"><strong> total commande</strong> </td>
  <td scope="col" colspan="2" class="  calculPrixTotalPanier" id="calculPrixTotalPanier"><strong> ${totalCommande}</strong></td>
  </tr>`;
  document.querySelector(".ligneTableau").insertAdjacentHTML("beforeend",calculPrixTotalPanier);  
};
  addTotalCommande();
/************************************************************************************************************************************/
 /*************************************************** 
 * selectionner tout les boutton supprimer
 * supprimer le produit volu en click sur le boutton supprimer*****************************************/
function deleteProduit (){
  let btnSupprimer = document.querySelectorAll(".btn-supprimer");
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
}
deleteProduit ();
/*************************************************
 * créé le boutton a vider panier
 * ********/
//insertion
function addViderPanier(){
let  nouveauButtonViderPanier = `
<tr scope="row" class="table-primary text-center mb-1"  >
<td scope="col" colspan="12">    
    <button class="btnViderPanier border-0  bg-transparent" id="btnViderPanier"><strong>vider le panier </strong></button>    
</td>
</tr>`;
//button.;
document.querySelector(".ligneTableau").insertAdjacentHTML("beforeend",nouveauButtonViderPanier);
}
addViderPanier();
// selection le id 
/*************************************************************************************************** */
function getVidePanier(){
nouveauButtonViderPanier = document.querySelector("#btnViderPanier");
//selectionner les cles des produis de localstotege
nouveauButtonViderPanier.addEventListener("click", (e)=>{
  e.preventDefault;
  // remove pour vider le panier 
 
  localStorage.removeItem("produit"),  
  alert(" le panier a été vidé");
  window.location.href=" index.html"; 
    
});
}
getVidePanier();
/////////////////////////////////////////////////////le formulaire................................
function regExControleName (a){   
  if(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(a)){    
    return true;
  }else{    
    alert( `veuiller saisir que des lettres!!` );
    return false;
  }
};
function regExControleCity (b){   
  if(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([0-9])|([a-zA-ZÀ-ÿ]+)){1,20}$/.test(b)){    
    return true;
  }else{    
    alert(`Veuillez saisir le champ !!
    et ne pas depasser 20 caracteres`);
    return false;
  }
}
function regExControleEmail (c){ 
  if(/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,5})$/.test(c)){    
    return true;
  }else{    
  alert("Veuillez saisir votre email au format demander ");
    return false;
  }
}
/////////////////////////////////////////////////////
//selectionner le button commander
const nouveauEnvoyerFormulaire = document.querySelector("#btnEnvoyerFormulaire");
nouveauEnvoyerFormulaire.addEventListener("click", (event)=>{
  event.preventDefault(); 
  let products =JSON.parse(localStorage.getItem("produit"));  
  productTable = [];
  for (let v=0; v<products.length; v++){      
    productTable.push(products[v].idProduit); 
  }     
  

  const contact ={
    firstName:document.querySelector("#firstName").value,
    lastName :document.querySelector("#lastName").value,
    address:document.querySelector("#address").value,
    city :document.querySelector("#city").value,    
    email:document.querySelector("#email").value
  };  
  
  if ((regExControleName(contact.firstName)===true) && (regExControleName (contact.lastName)===true) && (regExControleCity (contact.adresse) ===true) && (regExControleCity (contact.adresse) ===true) && (regExControleEmail (contact.email) ===true) ){
    localStorage.setItem("contact",JSON.stringify(contact));
    
  }else{
    alert("Veuillez bien remplir le formulaire");
    return false;
  }

const  donneEnvoyer ={
  contact :{
    firstName:document.querySelector("#firstName").value,
    lastName :document.querySelector("#lastName").value,
    address:document.querySelector("#address").value,
    city :document.querySelector("#city").value,    
    email:document.querySelector("#email").value
  },
  products:productTable,

};  
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(donneEnvoyer),
  })
  .then((response) => response.json())
  .catch((erreur) => console.log("erreur : " + erreur))
  
  .then((data) => {
    localStorage.setItem("order", JSON.stringify(data.orderId));
    localStorage.removeItem("produit");
    window.location.href= "order.html";   
  });  
  
   
// la requette 

});
//
const dataLocaleStorage = localStorage.getItem("contact");
const dataLocaleStorageObjet = JSON.parse(dataLocaleStorage);
        // mettre les caleur du localestorage dans les champs du formulaire   
  function remplirInpuTLocalStorage(input){
    document.querySelector(`#${input}`).value = dataLocaleStorageObjet[input];
  };    
  remplirInpuTLocalStorage("firstName");  
  remplirInpuTLocalStorage ('lastName');
  remplirInpuTLocalStorage ('address');
  remplirInpuTLocalStorage ('city');
  remplirInpuTLocalStorage ('email');


 