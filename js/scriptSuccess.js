        // Function to get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // Append the digits to the card number paragraph
        if (code) {
            const cardNumberElement = document.getElementById('card-number');
            cardNumberElement.textContent += code.slice(0,4); // Append the digits to the existing text
        }

        function toggleMenu() {
            var x = document.getElementById("Links");
            x.classList.toggle("slide-in");
        }


        function populateCart() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const code2 = code.slice(4);
            if (code2) {
                const items = code2.match(/.{1,4}/g); // Split code into pairs
                items.forEach(item => {
                    if(item.slice(0,2) == '01'){
                        Title = "Dune";
                        Author = "Frank Herbert";
                        bookImage = 'book1.webp';                        
                    }
                    else if(item.slice(0,2) == '02'){
                        Title = "On Earth We're Briefly Gorgeous";
                        Author = "Ocean Vuong";
                        bookImage = 'book2.jpg';                        
                    }
                    else if(item.slice(0,2) == '03'){
                        Title = "Across the River and into the Trees";
                        Author = "Ernest Hemingway";
                        bookImage = 'book3.jpg';                        
                    }
                    else if(item.slice(0,2) == '04'){
                        Title = "Mapping The Interior";
                        Author = "Stephen Graham Jones";
                        bookImage = 'book4.jpg';                        
                    }
                    Quantity = parseInt(item.slice(2,4));
                    addToCart(Title, Author, bookImage, Quantity);
                });
            }
        }
        
        function addToCart(Title, Author, bookImage, Quantity) {
        
            // Create a new div element for the cart item
            const cartItem = document.createElement('div');
            cartItem.className = "Item";
            
            const cartItemText = document.createElement('div');
            cartItemText.className = "ItemText";
        
            // Set the content of the cart item
            const cartItemTitle = document.createElement('div');
            cartItemTitle.textContent = `Title: ${Title}`;
        
            const cartItemAuthor = document.createElement('div');
            cartItemAuthor.textContent = `Author: ${Author}`;
        
            const cartItemImage = document.createElement('img');
            cartItemImage.setAttribute('src','images/'+bookImage);
            cartItemImage.style.width = '100px';
        
            const cartItemQuantity = document.createElement('div');
            cartItemQuantity.textContent = `Quantity: ${Quantity}`;
        
            // Append the new cart item to the cart container
            const cartContainer = document.getElementById('cartContainerSuccess');
            cartContainer.appendChild(cartItem);
            cartItem.appendChild(cartItemImage);
            cartItem.appendChild(cartItemText);
            cartItemText.appendChild(cartItemTitle);
            cartItemText.appendChild(cartItemAuthor);
            cartItemText.appendChild(cartItemQuantity);
        
            
        }


        window.onload = populateCart;