function toggleMenu() {
    var x = document.getElementById("Links");
    x.classList.toggle("slide-in");
}

function toggleCart() {
    var x = document.getElementById("cartItems");

    x.classList.toggle("slide-in-reverse");
}

function filterBooks() {
    const input = document.querySelector('input[name="search"]');
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const author = card.getAttribute('data-author').toLowerCase();

        card.style.display = (title.includes(filter) || author.includes(filter)) ? "" : "none"; // Show or hide card
    });
}

function addToCart(title, author) {
    var cartItems = document.getElementById("cartItems");
    var existingItem = Array.from(cartItems.children).find(item => item.dataset.title === title);

    if (existingItem) {
        incrementItemQuantity(existingItem);
    } else {
        createCartItem(cartItems, title, author);
    }
}

function incrementItemQuantity(item) {
    var counter = item.querySelector('.counter');
    var count = parseInt(counter.textContent.split(': ')[1].trim());

    if (count < 10) {
        counter.textContent = "Quantity: " + (count + 1);
    } else {
        alert("You cannot add more than 10 of this book.");
    }
}

function createCartItem(cartItems, title, author) {
    var item = document.createElement("div");
    item.dataset.title = title; // Store the title for reference
    item.innerHTML = `<h4>Book Title: </h4><h5>${title}</h5><h4>Author: </h4><h5>${author}</h5><p class='counter'>Quantity: 1</p><button id='removebutton' onclick='removeFromCart(this)'>Remove</button>`;
    cartItems.appendChild(item);
}

function removeFromCart(element) {
    var parent = element.parentNode;
    var counter = parent.querySelector('.counter');
    var count = parseInt(counter.textContent.split(': ')[1].trim());

    if (count > 1) {
        counter.textContent = "Quantity: " + (count - 1);
    } else {
        parent.parentNode.removeChild(parent);
    }
}

function checkout() {
    var cartItems = document.getElementById("cartItems");

    if (cartItems.children.length - 2 === 0) {
        alert("Your cart is empty!");
        return;
    }

    var items = cartItems.children;
    var code = '';
    var bookCodes = {
        'Dune': '01',
        'On Earth We\'re Briefly Gorgeous': '02',
        'Across the River and into The Trees': '03',
        'Mapping The Interior': '04'
    };

    for (var i = 2; i < items.length; i++) {
        var item = items[i];
        var title = item.dataset.title;
        var counterElement = item.querySelector('.counter');
        var quantity = counterElement ? parseInt(counterElement.textContent.split(': ')[1].trim()) : 0;

        // Append code and quantity to the query string
        var bookCode = bookCodes[title] || '';
        code += bookCode + (quantity < 10 ? '0' + quantity : quantity);
    }
    // Redirect to pay.html with the constructed code
    location.href = 'pay.html?code=' + code;
}
