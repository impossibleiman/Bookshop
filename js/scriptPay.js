document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number-input').value.replace(/\s+/g, ''); //Remove spaces from input (accessibility)
    const expMonth = document.getElementById('exp-month').value;
    const expYear = document.getElementById('exp-year').value;
    const cvv = document.getElementById('cvv').value;
    //Get input values from form

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 0-11
    const currentYear = currentDate.getFullYear();
    //Get current date to check if card is valid

    // Validation checks
    if (cardNumber.length !== 16 || !/^(51|52|53|54|55)/.test(cardNumber)) { 
        //Check whether card is of length (16) and starts with the following values
        document.getElementById('message').innerText = 'Invalid card number.';
        return;
    }

    if (!/^(1[0-2]|[1-9])$/.test(expMonth)) {
        //Check to see if the month is between
            //1[0-2] = 10, 11, 12
            //[1-9] = 1,2, ... ,8,9
        document.getElementById('message').innerText = 'Invalid expiration month.';
        return;
    }

    if (!/^\d{4}$/.test(expYear) || parseInt(expYear) < currentYear) {
        //Check to see if year is 4 digits
        document.getElementById('message').innerText = 'Invalid expiration year.';
        return;
    }

    if (parseInt(expYear) < currentYear || 
    (parseInt(expYear) === currentYear && expMonth < currentMonth)) {
        //is card in date
        document.getElementById('message').innerText = 'Card has expired.';
        return;
    }


    if (cvv.length < 3 || cvv.length > 4) {
        //cvv length should be 3 or 4
        document.getElementById('message').innerText = 'Invalid CVV.';
        return;
    }

    // Prepare data for POST request
    const data = {
        master_card: cardNumber,
        exp_year: expYear,
        exp_month: expMonth,
        cvv_code: cvv
    };

    // Send POST request
    fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 200) {
            const digits = cardNumber.slice(12, 16);
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            window.location.href = 'success.html?code=' + digits.concat(code);
        } else {
            document.getElementById('message').innerText = 'Error: ' + response.status + ' (Bad Request)';
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Network Error: ' + error.message;
    });
});

document.getElementById('card-number-input').addEventListener('input', function (evt) {
    const cardNumber = evt.target.value;
    const cardImageID = cardNumber.startsWith('5') ? 'mastercard.png' : ''; // Simplified check

    // Clear previous images
    const cardNumberBox = document.getElementById('card-number-box');
    const existingImages = cardNumberBox.getElementsByTagName('img');
    while (existingImages.length > 0) {
        existingImages[0].parentNode.removeChild(existingImages[0]);
    }

    // Create and append the image if cardImageID is set
    if (cardImageID) {
        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', 'images/' + cardImageID);
        cardImage.style.width = '80px';
        cardImage.style.height = '50px';
        cardImage.className = "cardImage";
        cardNumberBox.appendChild(cardImage);
    }
});

function populateCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        const items = code.match(/.{1,4}/g); // Split code into pairs
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

    cartItem.innerHTML =
    `<img src='images/${bookImage}' style='width:100px;'/>`;
    cartItemText.innerHTML = `
        <div>Title: ${Title}</div>
        <div>Author: ${Author}</div>
        <div>Quantity: ${Quantity}</div>
    `;

    const cartContainer = document.getElementById('cartContainer');
    cartContainer.appendChild(cartItem);
    cartItem.appendChild(cartItemText);
}

// Call the function to populate the cart on page load
window.onload = populateCart;
