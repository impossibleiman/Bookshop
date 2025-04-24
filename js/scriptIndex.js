function toggleCart() {
    var x = document.getElementById("cartItems");

    x.classList.toggle("slide-in-reverse");
} //Show/Hide Cart

function filterBooks() {
    const input = document.querySelector('input[name="search"]');
    const filter = input.value.toLowerCase();
    //Get lowercase input from search bar 
    const cards = document.querySelectorAll('.card');
    //Query all card class elements

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const author = card.getAttribute('data-author').toLowerCase();

        card.style.display = (title.includes(filter) || author.includes(filter)) ? "" : "none"; // Show or hide card
    }); //Show titles/authors with input letters
}

function addToCart(title, author) {
    var cartItems = document.getElementById("cartItemsDiv");
    //Get cart item container
    var existingItem = Array.from(cartItems.children).find(item => item.dataset.title === title);
    //Check if item is already in cart

    if (existingItem) {
        incrementItemQuantity(existingItem); //To which it increments its quantity rather than adding the same item underneath
    } else {
        createCartItem(cartItems, title, author); //Or make the item if its the first of its kind
    }
}

function incrementItemQuantity(item) {
    var counter = item.querySelector('.counter');
    var count = parseInt(counter.textContent.split(': ')[1].trim()); //Extract Counter value

    if (count < 10) {
        counter.textContent = "Quantity: " + (count + 1);
    } else {
        alert("You cannot add more than 10 of this book.");
    } //Don't allow the user to add more than 10 items so that the website looks more sleek and prevents people from messing around
}

function createCartItem(cartItems, title, author) { //This only runs when the item the user wants to add is not already in the list
    var item = document.createElement("div");
    item.dataset.title = title; // Store the title for reference
    item.innerHTML = `<h4>Book Title: </h4><h5>${title}</h5><h4>Author: </h4><h5>${author}</h5><p class='counter'>Quantity: 1</p><button id='removebutton' onclick='removeFromCart(this)'>Remove</button>`;
    cartItems.appendChild(item);
}

function removeFromCart(element) {
    var parent = element.parentNode; //Get cart item
    var counter = parent.querySelector('.counter');
    var count = parseInt(counter.textContent.split(': ')[1].trim());

    if (count > 1) {
        counter.textContent = "Quantity: " + (count - 1);
    } else {
        parent.parentNode.removeChild(parent);
    } //Either decrement the quantity if more than 1 otherwise remove the item element completely
}

function checkout() {
    var cartItems = document.getElementById("cartItemsDiv");

    if (cartItems.children.length - 2 === 0) { //For some reason the cart items have 2 random children, this is a partial solution 
        alert("Your cart is empty!");
        return;
    }

    var items = cartItems.children;
    var code = ''; //Initalise variable
    var bookCodes = {
        'Dune': '01',
        'On Earth We\'re Briefly Gorgeous': '02',
        'Across the River and into The Trees': '03',
        'Mapping The Interior': '04'
    }; //Assign each book a code so that can pass on information to the following page

    for (var i = 2; i < items.length; i++) { //Again using the same partial solution due to random 2 children //Looping through cart items
        var item = items[i];
        var title = item.dataset.title;
        var counterElement = item.querySelector('.counter');
        var quantity = counterElement ? parseInt(counterElement.textContent.split(': ')[1].trim()) : 0;

        // Append code and quantity to the query string
        var bookCode = bookCodes[title] || '';
        code += bookCode + (quantity < 10 ? '0' + quantity : quantity); //Formats each book to be 'AABB' where AA is the bookCode and BB is the quantity
    }
    // Redirect to pay.html with the constructed code
    location.href = 'pay.html?code=' + code; 
}
