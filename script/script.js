
   // Function to handle the shopping cart functionality
function handleShoppingCart() {
    // Get all the add to cart buttons
    const addToCartButtons = document.querySelectorAll('.cart button');
  
    // Add event listeners to each add to cart button
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', addToCart);
    });
  
    // Function to add items to the cart
    function addToCart(event) {
      const cartItem = event.target.parentNode;
      const itemImage = cartItem.querySelector('img').src;
      const itemTitle = cartItem.querySelector('h3').innerText;
      const itemPrice = parseFloat(cartItem.querySelector('p').innerText.replace('£', ''));
  
      // Create a new cart item element
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
  
      // Create the item details
      const itemDetails = document.createElement('div');
      itemDetails.classList.add('item-details');
      itemDetails.innerHTML = `
        <img src="${itemImage}" alt="${itemTitle}" />
        <h3>${itemTitle}</h3>
        <p class="item-price">£${itemPrice.toFixed(2)}</p>
        <div class="quantity">
          <button class="quantity-btn minus">-</button>
          <span class="item-quantity">1</span>
          <button class="quantity-btn plus">+</button>
        </div>
        <button class="delete-btn">Delete</button>
        <button class="like-btn">Like</button>
      `;
  
      cartItemElement.appendChild(itemDetails);
  
      // Add the new cart item to the cart
      const cartContainer = document.querySelector('.cart-container');
      cartContainer.appendChild(cartItemElement);
  
      // Update total price
      updateTotalPrice();
  
      // Add event listeners to quantity and delete buttons
      const quantityButtons = cartItemElement.querySelectorAll('.quantity-btn');
      const deleteButton = cartItemElement.querySelector('.delete-btn');
      const likeButton = cartItemElement.querySelector('.like-btn');
  
      quantityButtons.forEach((button) => {
        button.addEventListener('click', adjustQuantity);
      });
  
      deleteButton.addEventListener('click', deleteItem);
      likeButton.addEventListener('click', toggleLike);
    }
  
    // Function to adjust the quantity of an item
    function adjustQuantity(event) {
      const quantitySpan = event.target.parentNode.querySelector('.item-quantity');
      const currentQuantity = parseInt(quantitySpan.innerText);
  
      if (event.target.classList.contains('plus')) {
        quantitySpan.innerText = currentQuantity + 1;
      } else if (event.target.classList.contains('minus') && currentQuantity > 1) {
        quantitySpan.innerText = currentQuantity - 1;
      }
  
      updateTotalPrice();
    }
  
    // Function to delete an item from the cart
    function deleteItem(event) {
      const cartItem = event.target.parentNode.parentNode;
      cartItem.remove();
  
      updateTotalPrice();
    }
  
    // Function to toggle the like button
    function toggleLike(event) {
      event.target.classList.toggle('liked');
    }
  
    // Function to update the total price
    function updateTotalPrice() {
      const itemPrices = document.querySelectorAll('.item-price');
      const quantities = document.querySelectorAll('.item-quantity');
  
      let totalPrice = 0;
  
      itemPrices.forEach((price, index) => {
        const itemPrice = parseFloat(price.innerText.replace('£', ''));
        const itemQuantity = parseInt(quantities[index].innerText);
  
        totalPrice += itemPrice * itemQuantity;
      });
  
      const totalPriceElement = document.querySelector('.total-price');
      totalPriceElement.innerText = `Total: £${totalPrice.toFixed(2)}`;
    }
  }
  
  // Call the function to handle the shopping cart functionality
  handleShoppingCart();
  