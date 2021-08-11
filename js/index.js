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
      let name = data[i].name;
      let price = data[i].price;
      let imageUrl = data[i].imageUrl;                    
      addElement (_id, imageUrl, name, price);      
    }      
  })
  .catch(function(err) {
    alert('Une erreur est survenue')
});


// création, personalistion et ajout des élement dans le DOM

  function addElement (_id, imageUrl, name, price ){        
    const nouveauElement = document.createElement('div');    
    nouveauElement.innerHTML=`
  
    <div class="col  ">   
      <article class="card p-0 mb-3 border border-dark  d-flex flex-column">
        <a class="text-decoration-none"  href="./ficheProduit.html?id=${_id}">       
          <div class="card-img-top">
              <img src="${imageUrl}" class="card-img-top" alt="photo de de l'article ">
          </div>
          <div class="card-body text-dark bg-light d-flex flex-row justify-content-between">
              <h3 class="card-title font-weight-bolder  ">${name}</h3>
              <p class="card-text font-weight-bolder " >${price/100} £</p>
          </div>               
        </a>
      </article>
    </div>`
  
      
    document.querySelector("#blocTwo").appendChild(nouveauElement);
  }
   
  












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


