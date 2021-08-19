// création, personalistion et ajout les camers dans le DOM
function addCameras (_id, imageUrl, name, price ){        
  const nouveauCameras = document.createElement('article');    
  nouveauCameras.innerHTML=`
    <a class="text-decoration-none"  href="./ficheProduit.html?id=${_id}">       
      <div class="card-img-top">
        <img src="${imageUrl}" class=" card-img-top img-fluid" alt="photo de la caméra choisie ">
      </div>
      <div class="card-body text-dark bg-light  d-flex flex-row justify-content-between">
        <h3 class="card-title font-weight-bolder ">${name}</h3>
        <p class="card-text font-weight-bolder">${price/100} £</p>
      </div>               
    </a>`
  nouveauCameras.setAttribute("class", ` card p-0 mb-4 border border-dark  d-flex flex-column align-items-center`);      
  document.querySelector(".contenairCameras").appendChild(nouveauCameras);
}

/********************************************************************** */
// fonction fetch pour recuperer les donne dans le serveur
function getCameras(){
  fetch(`http://localhost:3000/api/cameras`)
  .then(function(res) {
    if (res.ok){
      return res.json();
    }
  })
  .catch(function(err) {
    alert('Une erreur est survenue')
  })
  .then( function(data) {    
    for (let i=0 ; i< data.length; i++){      
      let _id =data[i]._id;
      let name = data[i].name;
      let price = data[i].price;
      let imageUrl = data[i].imageUrl;                    
      addCameras (_id, imageUrl, name, price);      
    }      
  });
} 
getCameras();


   
  












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


