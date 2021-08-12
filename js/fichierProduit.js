//premiere page
const queryString_url_id = window.location.search;
const urlSearchParams = new  URLSearchParams(queryString_url_id);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id);

//////////////////////////////////////////////////////////////////////////////////

fetch(`http://localhost:3000/api/cameras/${id}`)
  .then (function(resp) {
    if (resp.ok) {
      return resp.json();
    }
  }) 
  .then(function(reponse){ 
    let idProduit =reponse._id;
    let nameProduit = reponse.name;   
    let priceProduit =reponse.price/100;
    let descriptionProduit = reponse.description;
    let imageUrlProduit = reponse.imageUrl; 
    /********************************************************************************************************** */ 
    addProduit(nameProduit, priceProduit, imageUrlProduit, descriptionProduit);  
/*************************************************************************************************** */
    let optionSelectProduct = reponse.lenses;    
    let lentilles =[]; 
    for (let j=0; j< optionSelectProduct.length; j++){
      let choixOptionlentilles =optionSelectProduct[j];

      lentilles.push(choixOptionlentilles);       
      addOptionlentilles (j, choixOptionlentilles);      
    }    
   /**************************************************************************************************************************** */     
    //selectionner le boutton envoyer 
    const btnEnvoyerPanier = document.querySelector("#btn-envoyer");    
    // ecouter le boutton et envoyer ver le panier
    
    btnEnvoyerPanier.addEventListener("click", (event)=> {
      event.preventDefault();
      /************************************************************************************************************************************* */
      // cree la variable choix formulaire pour trouver les option de personaliser 
      const idOption = document.querySelector('#optionlentilles');      
      const  lentillesChoisi =idOption.value;
      
      /************************************************************************************************* */
      console.log(lentillesChoisi);
      // cree la variable pour choixQuantite pour choisir le nombre de produit
      const idquantite = document.querySelector('#quantite');      
      const  quantite =idquantite.value;
      /************************************************************************************************************* */
      
      let produitEnvoyerPanier ={
        idProduit:idProduit,
        nomProduit:nameProduit,
        prixProduit:Number(priceProduit),
        quantite:Number(quantite),
        lentillesChoisi:lentilles[lentillesChoisi], 
        totalPayerProduit:Number(quantite * priceProduit),         
      }
      //console.log( produitEnvoyerPanier); // recuperer le nom de produit */
    
      /****************local storage  *************************************/

      let products =JSON.parse(localStorage.getItem("produit"));
      const pomptConfirmation = ()=>{
        if(window.confirm( `${nameProduit} option : ${lentilles[lentillesChoisi]} a bien été rajouté au panier
        consulter le panier  OK  ou revenir à l'acceuil ANNULER`)){;
        window.location.href= "panier.html";
        }
        else {
          window.location.href=" index.html";
        }
      };
      if (products){
        let indexProduit = products.findIndex(el=>(el.idProduit ===produitEnvoyerPanier.idProduit && el. lentillesChoisi=== produitEnvoyerPanier.lentillesChoisi))
        if (indexProduit === -1 ){
          products.push(produitEnvoyerPanier);
        }else{
          products[indexProduit].quantite += produitEnvoyerPanier.quantite;
        }                
        localStorage.setItem("produit", JSON.stringify(products));     // pensser a faire une fonction pour non repetition
        
        pomptConfirmation(); 
      }     
      else{

        products =[];  
        products.push(produitEnvoyerPanier);
        
        localStorage.setItem("produit", JSON.stringify(products));
        pomptConfirmation();
       
      };
      
      


      
        })
   
  })
  .catch(function(err) {
    alert('Une erreur est survenue')
    
  })

function addProduit(nameProduit, priceProduit, imageUrlProduit, descriptionProduit){
  
  const nouveauProduit = document.createElement('div');    
  nouveauProduit.innerHTML=`

      <div class=" carteProduit border border-dark d-flex  flex-column align-content-between">
            <div class="card-img-top mb-5">
              <img src="${imageUrlProduit}" class="imageProduit" alt="photo de produit selectionner">
            </div>
            <p class="descriptionProduitSelectionner p-3 mt-4 "><strong>Déscription:</strong> ${descriptionProduit}</p>
            <div class="card-body-produit text-dark bg-transparent p-3 d-flex flex-row justify-content-between ">
              <h3 card-title >${nameProduit}</h3>
              <p class="prixProduit card-text "><strong>${priceProduit}</strong></p>                  
            </div>      
              
            <form class=" p-3  ">
              <div class=" form-group optionlentilles d-flex flex-row justify-content-between">
                  <label for="optionlentilles"class="label label-default" ><strong> Option:  </strong> </label>
                  <select class="form-control optionlentilles text-center  selectTaille"  id="optionlentilles">
                                                       
                  </select>
              </div>
              <div class="form-group d-flex flex-row justify-content-between">
                  <label for="quantite" class="label label-default" ><strong>Qantité :</strong></label>
                  <input type="number" class="form-control-number quantite selectTaille" id="quantite" value="1"  min="1" max="10" required>
              </div>
              <div class="d-flex flex-row justify-content-between p-3" >
                <button id="btn-envoyer" type="submit" name="btn-envoyer" class="btn btn-primary font-weight-bolder">Ajouter au panier</button>
                <a class="btn btn-primary font-weight-bolder" href="./index.html" role="button">Retour à l'acceuil</a>                            
              </div>
            </form>
         
      </div>`
  document.querySelector("main").appendChild(nouveauProduit);
};


/************************************************************************************************************* */

// cree une fonction pour ajouter les option de personalisation des cameras
function addOptionlentilles (j, choixOptionlentilles){
  const nouveauOption = document.createElement('option');    
  nouveauOption.innerHTML=`
    
   ${choixOptionlentilles}   
   `
  nouveauOption.setAttribute("value", `${j}`);
  document.querySelector("#optionlentilles").appendChild( nouveauOption );    
  
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////local storage/////////////////////////


