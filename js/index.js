//premiere page

//window.addEventListener("load",()=>{

fetch(`http://localhost:3000/api/cameras`)
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  .then(function(data) {    
    for (let i=0 ; i<= data.length; i++){
      
      let _id =data[i]._id;
      let nomProduit = data[i].name;
      let prixProduit = data[i].price;
      let imageUrl = data[i].imageUrl;                    
      addElement (_id, imageUrl, nomProduit, prixProduit);      
    }      
  })
  .catch(function(err) {
    alert('Une erreur est survenue')
});


// création, personalistion et ajout des élement dans le DOM

  function addElement (_id, imageUrl, nomProduit, prixProduit ){        
    const nouveauElement = document.createElement('article');    
    nouveauElement.innerHTML=`
    <div class=" row">

      <div class="col"> 
        
        <div>    
          <a href="./ficheProduit.html?id=${_id}">
    
            <div class="photoProduit">      
              <img src="${imageUrl}" alt="photo de produit">
            </div>
            <div class="prixNom">
              <h3>${nomProduit}</h3>
              <p class="nomProduit">${prixProduit/100} £</p>
            </div>
         
          </a>
        </div>
      </div>

    </div>`
    document.querySelector("section").appendChild(nouveauElement);
  } 
   
  












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


