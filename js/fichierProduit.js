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
    addProduit(nameProduit, priceProduit, imageUrlProduit, descriptionProduit);  


    let produitLenses = reponse.lenses;
    

    
    let optionSelectProduct =[]; 
    for (let j=0; j< produitLenses.length; j++){
      let s =produitLenses[j]

      optionSelectProduct.push(s);       
      addOption (j, s);      
    }    
    
    //console.log(optionSelectProduct);
    
    
    //selectionner le boutton envoyer 
    const btnEnvoyerPanier = document.querySelector("#btn-envoyer");    
    // ecouter le boutton et envoyer ver le panier
    
    btnEnvoyerPanier.addEventListener("click", (event)=> {
      event.preventDefault();
      // cree la variable choix formulaire pour trouver les option de personaliser 
      const idForm = document.querySelector('#optionProduitPersonaliser');      
      const  choixFormulaire =idForm.value;  
      // cree la variable pour choixQuantite pour choisir le nombre de produit
      const idquantite = document.querySelector('#quantiteCommander');      
      const  choixQuantite =idquantite.value;
      
      
      let produitEnvoyerPanier ={
        idProduit:idProduit,
        nomProduit:nameProduit,
        prixProduit:Number(priceProduit),
        quantite:Number(choixQuantite),
        choixFormulaire:optionSelectProduct[choixFormulaire], 
        totalPayerProduit:Number(choixQuantite * priceProduit),

         
      }
      //console.log( produitEnvoyerPanier); // recuperer le nom de produit */
    
      /****************local storage  *************************************/
      let articleEnregidtrerLocaleStorage =JSON.parse(localStorage.getItem("produit"));
      const pomptConfirmation = ()=>{
        if(window.confirm( `${nameProduit} option : ${optionSelectProduct[choixFormulaire]} a bien été rajouté au panier
        consulter le panier  OK  ou revenir à l'acceuil ANNULER`)){;
        window.location.href= "panier.html";
        }
        else {
          window.location.href=" index.html";
        }
      }
        //console.log(articleEnregidtrerLocaleStorage);
        // si le produit existe
      if (articleEnregidtrerLocaleStorage){
        articleEnregidtrerLocaleStorage.push(produitEnvoyerPanier);        
        localStorage.setItem("produit", JSON.stringify(articleEnregidtrerLocaleStorage));     // pensser a faire une fonction pour non repetition
        //console.log(articleEnregidtrerLocaleStorage);
        pomptConfirmation();     



      }     
      else{

        articleEnregidtrerLocaleStorage =[];  
        articleEnregidtrerLocaleStorage.push(produitEnvoyerPanier);
        console.log(articleEnregidtrerLocaleStorage);
        localStorage.setItem("produit", JSON.stringify(articleEnregidtrerLocaleStorage));
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
  <div class=" row">
    <div class="col">          
      <div class="photoProduit">      
        <img src="${imageUrlProduit}" alt="photo de produit">
      </div>
      <div class="infoProduitSelectionner">
        <h3>${nameProduit}</h3>
        <p class="prixProduit">${priceProduit}</p>
        <p class="descriptionProduitSelectionner">${descriptionProduit}</p>
      </div>
      <form>
          <div>
            <label for="optionProduitPersonaliser">personaliser</label>
            <select name="optionProduitPersonaliser" id="optionProduitPersonaliser"> 
            <option value=""></option> 
            </select>
          </div>
          <div>
            <label for="quantiteCommander">Qantités:</label>
           <input type="number" id="quantiteCommander" name="quantiteCommander" value="1"  min="1" max="10" required>
            
          </div>
          <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter au panier</button>
        </form>
        <a href="./index.html">Retour à l'acceuil</a>
      
    </div>
  </div> `
  document.querySelector("main").appendChild(nouveauProduit);
};

// cree une fonction pour ajouter les option de personalisation des cameras
function addOption (j, s){
  const nouveauOption = document.createElement('option');    
  nouveauOption.innerHTML=`
    
   ${s}   
   `
  nouveauOption.setAttribute("value", `${j}`);
  document.querySelector("#optionProduitPersonaliser").appendChild( nouveauOption );    
  
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////local storage/////////////////////////


