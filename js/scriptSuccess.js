// Function to get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

// Append the digits to the card number paragraph
if (code) {
    const cardNumberElement = document.getElementById('card-number');
    cardNumberElement.textContent += code.slice(0, 4); // Append the digits to the existing text
}

function populateCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code2 = code.slice(4);
    if (code2) {
        const items = code2.match(/.{1,4}/g); // Split code into pairs
        const bookDetails = {
            '01': { Title: "Dune", Author: "Frank Herbert", bookImage: 'book1.webp' },
            '02': { Title: "On Earth We're Briefly Gorgeous", Author: "Ocean Vuong", bookImage: 'book2.jpg' },
            '03': { Title: "Across the River and into the Trees", Author: "Ernest Hemingway", bookImage: 'book3.jpg' },
            '04': { Title: "Mapping The Interior", Author: "Stephen Graham Jones", bookImage: 'book4.jpg' }
        };

        items.forEach(item => {
            const bookInfo = bookDetails[item.slice(0, 2)];
            if (bookInfo) {
                const Quantity = parseInt(item.slice(2, 4));
                addToCart(bookInfo.Title, bookInfo.Author, bookInfo.bookImage, Quantity);
            }
        });
    }
}

function addToCart(Title, Author, bookImage, Quantity) {
    const cartItem = document.createElement('div');
    cartItem.className = "Item";
    
    const cartItemText = document.createElement('div');
    cartItemText.className = "ItemText";

    cartItem.innerHTML = `<img src='images/${bookImage}' style='width:100px;'>`
    cartItemText.innerHTML = `
        <div>Title: ${Title}</div>
        <div>Author: ${Author}</div>
        <div>Quantity: ${Quantity}</div>
    `;

    const cartContainer = document.getElementById('cartContainerSuccess');
    cartContainer.appendChild(cartItem);
    cartItem.appendChild(cartItemText);
}

// Call the function to populate the cart on page load
window.onload = populateCart;
