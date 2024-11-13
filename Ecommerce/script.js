//create sample products
const products = [
    {id: 1, name: "Apple", img: "images/apple.png", price: 20.00},
    {id: 2, name: "Orange", img: "images/orange.png", price: 15.00},
    {id: 3, name: "Lemon", img: "images/lemon.png", price: 25.00},
    {id: 4, name: "Banana", img: "images/banana.png", price: 50.00},
    {id: 5, name: "Grapes", img: "images/grapes.png", price: 50.00},
    {id: 6, name: "Green Apple", img: "images/greenapple.png", price: 50.00},
    {id: 7, name: "Pineapple", img: "images/pineapple.png", price: 50.00},
    {id: 8, name: "Dragon Fruit", img: "images/dragon fruit.png", price: 50.00},
];

// cart array
let cart = [];

//Function to display products to the page
function displayProducts() {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; //clear the existing products

    products.forEach((result) => {
        const card = document.createElement("div");
        card.classList = "card-body";
      
        const content = `
          <div class="card">
              <div class="card-header" id="products">
                  <img src="${result.img}" class="cardImage">
              </div>
          
              <div class="card-body">
                  <h5>${result.name}</h5>
                  <p> &#8369;${result.price}</p>
              </div>
              <div class="addToCart">
                  <button onclick="addToCart(${result.id})">Add to Cart</button>
              </div>
         
          </div>
          `;
      
        productContainer.innerHTML += content;
      });
}

// function to add a product to the cart (default qty is 1)
function addToCart (productId) {
    const product = products.find(p => p.id === productId);
    if (product){
        // Check if the product is already in the cart
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            // If the product is in the cart, increment its quantity
            cartItem.quantity += 1;
        } else {
            // add new items to cart with just quantity of 1
            cart.push({...product, quantity:1})
        }
        displayCart();
    }
}

// function to remove a product from the cart
function removeFromCart (productId){
    const productIndex = cart.findIndex(item => item.id === productId);
    if(productIndex != -1){
        cart.splice(productIndex, 1);
        displayCart(); //update the cart display
    }
}

// function to increment the quantity of a product in the cart
function incrementQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1; //increment quantity
        displayCart(); //update the cart display
    }
}

// function to decrement the quantity of a product in the cart
function decrementQuantity (productId){
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1; //increment quantity
        displayCart(); //update the cart display
    }
}

// Function to display items in the cart
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; //clear the current cart items

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-items");
        cartItemDiv.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toFixed(2)} x ${item.quantity}</span>
        <button onclick="decrementQuantity(${item.id})">-</button>
        <button onclick="incrementQuantity(${item.id})">+</button>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Update the total price and total items in the cart
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("total-items").textContent = totalItems;
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = []; // Clear cart
        displayCart(); // Update cart display
    }
}

// initialize page with products
displayProducts();