// declaration duuuuu variable "article Enregidtrer Panier"////////////////////function produitDePanierCommander( idProduit, quantite, priceProduit, choixFormulaire,nomProduit){
  let mesProduit =JSON.parse(localStorage.getItem("produit"));
  //console.log(mesProduit);
  if (mesProduit === null){
    console.log("panier vide ");
  }else{
    for (let k=0; k<mesProduit.length; k++){      
      addProduitStokPanier (mesProduit[k].idProduit, mesProduit[k].nomProduit, mesProduit[k].prixProduit,mesProduit[k].quantite, mesProduit[k].totalPayerProduit ); 
      
      }  
  };     
/////////////////////////////////////////////////////////////////

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addProduitStokPanier (idProduit, nomProduit, prixProduit, quantite, totalPayerProduit ){
  const nouveauProduitCommander = document.createElement('div');    
  nouveauProduitCommander.innerHTML=`
  <div class=" row">
    <div class="col">
      <h6>produit selectionner</h6>
      <div class=" row affichageNpq">        
        <span>name : ${nomProduit}</span>
        <span>prix U : ${prixProduit}</span>
        <span>quantite:${quantite}</span> 
        <span>prix:${totalPayerProduit}</span> 
        <button class="btn-supprimer" value=${idProduit}>supprimer<i class="bi bi-trash"></i></button>
      </div>       
        
    </div>
  </div>`
  document.querySelector("#block-Panier").appendChild(nouveauProduitCommander);
  
}

//////////////////////////////////////////////////////////////
let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer);

for (let l =0; l<btnSupprimer.length; l++){
  btnSupprimer[l].addEventListener('click', (event)=> { 
    event.preventDefault();
    let choixSupprimer = mesProduit[l].idProduit; 
    mesProduit = mesProduit.filter(el => el.idProduit!==choixSupprimer);
    console.log(mesProduit);  alert("etes vous sur de supprimer l'article");
    localStorage.setItem("produit", JSON.stringify(mesProduit)); 
        
  })


}

/*
let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer);
for (let l =0; l<btnSupprimer.length; l++){
  btnSupprimer[l].addEventListener('click', (event)=> { 
    let choixSupprimer = btnSupprimer[l].value;    
    for (let k=0; k<mesProduit.length; k++){ 
      if ( mesProduit[k].idProduit === choixSupprimer ){
        localStorage.setItem("produit", JSON.stringify(mesProduit));
        alert(" etes vous sur de supprimer cette article ") 
        console.log("fichier supprimer");                                                    // relier la requette
              
      }
    }
    //console.log(btnSupprimer);
  }) 

}*/


///////////////////////////////////////////////////////

 /*let totalPayerProduit=0;
for (let p=0; p<mesProduit.length; p++){
   
  totalPayerProduit =Number(mesProduit[p].prixProduit* mesProduit[p].quantite );  

  
}
const totalPayerProduitff = document.createElement('span');    
  totalPayerProduitff.innerHTML=`prix total de produit : ${totalPayerProduit}`
  document.querySelector(".affichageNpq").appendChild(totalPayerProduitff);*/





//////////////////////////////////////////////////





/*const nouveauBouttonSupprimer = document.createElement('button');    
nouveauBouttonSupprimer.innerHTML=`
  class="btn-supprimer" value=${mesProduit.idProduit}>supprimer<i class="bi bi-trash"></i> `
nouveauBouttonSupprimer.setAttribute("class", "btn-supprimer");
nouveauBouttonSupprimer.setAttribute("value", `${mesProduit.idProduit}`)
document.querySelector(".affichageNpq").appendChild(nouveauBouttonSupprimer);
console.log(btnSupprimer);*/

  


/////////////////////////////////////////boutton a vider panier ///////////////////////////////////////////////////////////////////////////

//insertion
let  nouveauButtonViderPanier = `
<button class="btnViderPanier" id="btnViderPanier" >vider le panier</button>`;
//button.;
document.querySelector("#block-Panier").insertAdjacentHTML("beforeend",nouveauButtonViderPanier);
// selection le id 
nouveauButtonViderPanier = document.querySelector("#btnViderPanier");
console.log(nouveauButtonViderPanier);
//selectionner les cles des produis de localstotege
nouveauButtonViderPanier.addEventListener("click", (e)=>{
  e.preventDefault;
  // remove pour vider le panier  
  localStorage.removeItem("produit");
  alert(" le panier a été vidé")
})



/////////////////////////////////////////////////////////////////////////////////

let prisTotalCalcul=[];

for (let n=0; n<mesProduit.length; n++){
        
  let assembleLesPris =mesProduit[n].totalPayerProduit;//mesProduit[n].prixProduit;
  prisTotalCalcul.push(assembleLesPris);
    
}// addition avec reduce 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTattal =prisTotalCalcul.reduce(reducer) ;
console.log(prixTattal);


/*********************************************** */
let  calculPrixTotalPanier = `
<div class="calculPrixTotalPanier" id="calculPrixTotalPanier" >prix total de la commande : ${prixTattal}</div>`;
//button.;
document.querySelector("#block-Panier").insertAdjacentHTML("beforeend",calculPrixTotalPanier);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////le formulaire 




