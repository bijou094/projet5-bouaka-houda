//dériger vers la page en creeent le parametre de iurl avec le id de camera
const queryString_url_id = window.location.search;
const urlSearchParams = new  URLSearchParams(queryString_url_id);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id);
/******************************************************************************************************************************* */
//créé une fonction pour rajouter les information du camera selectionné au DOM
function addOneCamera(nameProduit, priceProduit, imageUrlProduit, descriptionProduit){  
  const CameraSelectionne = document.createElement('article');    
  CameraSelectionne.innerHTML=`  
    <div class="card-img-top card-img-produit pb-3 mb-5">
      <img src="${imageUrlProduit}" class="imageProduit" alt="photo de produit selectionner">
    </div>
    <div class="card-body-produit font-weight-bolder text-dark bg-transparent p-3 mt-5 d-flex flex-row justify-content-between ">
      <h3 class="card-title" >${nameProduit}</h3>
      <p class="prixProduit card-text  font-weight-bolder"><strong>${priceProduit}</strong></p>                  
    </div> 
    <p class="descriptionProduitSelectionner p-3  "><strong>Déscription:</strong> ${descriptionProduit}</p>                 
              
    <form class="p-2 font-weight-bolder d-flex flex-column   align-content-center">
      <div class=" form-group optionlentilles font-weight-bolder d-flex flex-row justify-content-between">
        <label for="optionlentilles"class="label label-default" > Lentille:</label>
        <select class="form-control optionlentilles  selectTaille"  id="optionlentilles">                                                      
        </select>
      </div>
      <div class="form-group d-flex flex-row justify-content-between font-weight-bolder">
        <label for="quantite" class="label label-default" >Qantité :</label>
        <input type="number" class="form-control-number quantite selectTaille " id="quantite" value="1"  min="1" max="10" required>
      </div>
      <div class=" groupButton m-3 d-flex flex-column align-items-center  flex-lg-row  justify-content-lg-between" >
        <a class="btn btn-primary   m-1" href="./index.html" role="button">Retour à l'acceuil</a>
        <button id="btn-envoyer" type="submit" name="btn-envoyer" class="btn btn-primary  m-1">Ajouter au panier</button>
      </div>
    </form>`
    CameraSelectionne.setAttribute("class", `carte-Produit m-3  d-flex  flex-column align-content-between`);
 document.querySelector(".contenairCameraSelectionner").appendChild(CameraSelectionne);
}
/************************************************************************************************************************** */
//
const pomptConfirmation = ()=>{
  if(window.confirm( 
    `la caméra a bien été rajouté au panier
    OK  -consulter le panier  
    ANNULER - revenir à l'acceuil `)){
    window.location.href= "panier.html";
  }else {
    window.location.href=" index.html";
  }
};
/**************************************************** */
function addOptionlentilles (j, choixOptionlentilles ){
   const nouveauOption = document.createElement('option');    
  nouveauOption.innerHTML=
  `${choixOptionlentilles} `
  nouveauOption.setAttribute("value", `${j}`);
  document.querySelector("#optionlentilles").appendChild( nouveauOption );
}
/**************************************************************** */
function addLocaleStorage(produitEnvoyerPanier){
let products =JSON.parse(localStorage.getItem("produit"));      
if (products){
  let indexProduit = products.findIndex(el=>(el.idProduit ===produitEnvoyerPanier.idProduit && el. lentillesChoisi=== produitEnvoyerPanier.lentillesChoisi))
  if (indexProduit === -1 ){
    products.push(produitEnvoyerPanier);
  }else{
    products[indexProduit].quantite += produitEnvoyerPanier.quantite;
    products[indexProduit].totalPayerProduit = products[indexProduit].quantite * products[indexProduit].prixProduit;
   
  }   

  localStorage.setItem("produit", JSON.stringify(products));    
  
  pomptConfirmation(); 
}else{
  products =[];
  products.push(produitEnvoyerPanier);      
  localStorage.setItem("produit", JSON.stringify(products));
  pomptConfirmation();
};  
}
/******************************************************************************************************************************************** */
//
function getOneCamera(){
    fetch(`http://localhost:3000/api/cameras/${id}`)  
    .then (function(resp) {if (resp.ok) {return resp.json();}}) 
    .catch(function(err) {alert('Une erreur est survenue')})  
    .then(function(reponse){ 
    // recupera les donnes de la reponse qui est 
    let idProduit =reponse._id;
    let nameProduit = reponse.name;   
    let priceProduit =reponse.price/100;
    let descriptionProduit = reponse.description;
    let imageUrlProduit = reponse.imageUrl; 
    
    addOneCamera(nameProduit, priceProduit, imageUrlProduit, descriptionProduit);
    let optionSelectProduct = reponse.lenses;    
    let lentilles =[]; 
    for (let j=0; j< optionSelectProduct.length; j++){
      let choixOptionlentilles =optionSelectProduct[j];

      lentilles.push(choixOptionlentilles);       
      addOptionlentilles (j, choixOptionlentilles);      
    }    
    const btnEnvoyerPanier = document.querySelector("#btn-envoyer");  
    btnEnvoyerPanier.addEventListener("click", (event)=> {
     event.preventDefault();  
     const idOption = document.querySelector('#optionlentilles');      
     const lentillesChoisi =idOption.value; 
     const idquantite = document.querySelector('#quantite');      
     const  quantite =idquantite.value;
     //getChoixLentilles(choixOptionlentilles);      
   
     // cree la variable pour choixQuantite pour choisir le nombre de produit     
     let produitEnvoyerPanier ={
     idProduit:idProduit,
     nomProduit:nameProduit,
     prixProduit:Number(priceProduit),
     quantite:Number(quantite),
     lentillesChoisi:lentilles[lentillesChoisi], 
     totalPayerProduit:Number(quantite * priceProduit),         
     }
     addLocaleStorage(produitEnvoyerPanier);
    })
   /**************************************************************************************************************************** */     
   
  })
   
}   
getOneCamera();


