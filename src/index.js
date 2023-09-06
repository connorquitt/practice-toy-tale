let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//event listeners
//renders premade toy cards
document.addEventListener("DOMContentLoaded", renderDefaults)
//creates new toys
document.addEventListener("submit", handleSubmit)
//updates likes
//document.addEventListener("submit", toyLikes)


//fetch and get requests
//fetches original toy cards
function renderDefaults(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toyData)=> toyData.forEach(toy => renderToy(toy)))
}
//create toy post
function toyCreate(toyObj){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

//update likes patch
function toyLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

//delete toy
function toyDelete(id){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>res.json())
  .then(toy=>console.log(toy))
}

//event handler functions
function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }
  renderToy(toyObj)
  toyCreate(toyObj)

}


//render functions
function renderToy(toy) {
  let card = document.createElement("div")
  card.className = 'card'
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class ="toy-avatar" />
    <p>${toy.likes} likes</p>
    <button class="like-btn" id=${toy.id}>like</button>
    <button class="del-btn" id=${toy.id}>delete</button>
    `
    document.querySelector("#toy-collection").appendChild(card)
      //like button
    card.querySelector(".like-btn").addEventListener("click", ()=>{
      toy.likes++
      card.querySelector('p').textContent = `${toy.likes} likes`
      toyLikes(toy)
      
    })
      //delete button
      card.querySelector(".del-btn").addEventListener("click", ()=> {
        card.remove()
        toyDelete(toy)
      })

    
}




        
      

