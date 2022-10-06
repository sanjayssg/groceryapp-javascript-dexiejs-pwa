const db = new Dexie('Grocery')
db.version(1).stores({ details: '++id,name,price,isPurchased' })


//toggle add/update views
const defaultView = (v) =>{
  if(v == true){
    addItemView.style.display="block";
    //updateItemView.style.display="none";
  }else if(v == false){
    addItemView.style.display="none";
    //updateItemView.style.display="block";
  }
}
const itemInput = document.getElementById('itemInput')
const newItemsDiv = document.getElementById('newItemsDiv')
const totalPriceDiv = document.getElementById('totalPriceDiv')
const createNewListDiv = document.getElementById('createNewListDiv')

itemInput.onsubmit = async (event) => {
    event.preventDefault()
    const name = document.getElementById('nameInput').value
    const quantity = document.getElementById('quantityInput').value
    const price = document.getElementById('priceInput').value
    await db.details.add({name, quantity, price})
    await populateNewItemsDiv()
    itemInput.reset()
  }


  //add item
  const populateNewItemsDiv = async () => {
    const allItems = await db.details.reverse().toArray()
    newItemsDiv.innerHTML = allItems.map(item => `
      <div class="item ${item.isPurchased && 'purchased'}">
        <input
          type="checkbox"
          class="checkbox"
          onchange="toggleItemStatus(event, ${item.id})"
          ${item.isPurchased && 'checked'}
        />
        <div class="itemInfo">
          <p>${item.name}</p>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        ${!item.isPurchased ? `<div class="itemChange">
        <button onclick="deleteItem(${item.id})" class="deleteButton">
        <span class="deleteSign">&#9747</span>
        </button>
        </div>`: ``}
      </div>
    `).join('')
    const arrayOfPrices = allItems.map(item => item.price * item.quantity)
    const totalPrice = arrayOfPrices.reduce((a, b) => a + b, 0)
    totalPriceDiv.innerText = 'Total Price: ₹' + totalPrice
  }
  
  window.onload = populateNewItemsDiv
  

  // add toggle toggle item status
const toggleItemStatus = async (event, id) => {
    await db.details.update(id, { isPurchased: !!event.target.checked })
    await populateNewItemsDiv()
  }

  // delete item from database
const deleteItem = async id => {
    await db.details.delete(id)
    await populateNewItemsDiv()
   // defaultView(true)
  }

  "deleteAllItems"
// delete all item from database
const deleteAllItems = () => {
  db.details.clear()
  populateNewItemsDiv()
 // defaultView(true)
}

