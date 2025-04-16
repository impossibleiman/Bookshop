function toggleMenu() {
    var x = document.getElementById("Links");
    x.classList.toggle("slide-in");
}

function filterBooks() {
    const input = document.querySelector('input[name="search"]');
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const author = card.getAttribute('data-author').toLowerCase();
        if (title.includes(filter) || author.includes(filter)) {
            card.style.display = ""; // Show matching card
        } else {
            card.style.display = "none"; // Hide non-matching card
        }
    });
}

function toggleCart() {
    var x = document.getElementById("cartItems");
    x.classList.toggle("slide-in-reverse");
}

function addToCart(title, author) {
    var x = document.getElementById("cartItems");
    var existingItem = Array.from(x.children).find(item => item.dataset.title === title);

    if (existingItem) {
        // If the item already exists, increment the counter
        var counter = existingItem.querySelector('.counter');
        var count = parseInt(counter.textContent.split(': ')[1].trim());
        if (count < 10) {
            counter.textContent = "Quantity: " + (count + 1);
        } else {
            alert("You cannot add more than 10 of this book.");
        }
    } else {
        // Create a new cart item
        var item = document.createElement("div");
        item.dataset.title = title; // Store the title for reference
        item.innerHTML = "<h4>Book Title: </h4><h5>" + title + "</h5><h4>Author: </h4><h5>" + author + "</h5><p class='counter'>Quantity: 1</p><button id='removebutton' onclick='removeFromCart(this)'>Remove</button>";
        x.appendChild(item);
    }
}

function removeFromCart(element) {
    var parent = element.parentNode;
    var counter = parent.querySelector('.counter');
    var count = parseInt(counter.textContent.split(': ')[1].trim());

    if (count > 1) {
        // Decrement the counter if more than one
        counter.textContent = "Quantity: " + (count - 1);
    } else {
        // Remove the item if the count is 1
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

    for (var i = 2; i < items.length; i++) {
    var item = items[i];
    var title = item.dataset.title;
    var counterElement = item.querySelector('.counter');
    var quantity = counterElement ? parseInt(counterElement.textContent.split(': ')[1].trim()) : 0;

    // Map titles to codes
    var bookCode = '';
    if (title === 'Dune') {
        bookCode = '01';
    } else if (title === 'On Earth We\'re Briefly Gorgeous') {
        bookCode = '02';
    } else if (title === 'Across the River and into The Trees') {
        bookCode = '03';
    } else if (title === 'Mapping The Interior') {
        bookCode = '04';
    }

    // Append code and quantity to the query string
    code += bookCode + (quantity < 10 ? '0' + quantity : quantity);
    }

    // Redirect to pay.html with the constructed code
    location.href = 'pay.html?code=' + code;
}