document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const expMonth = document.getElementById('exp-month').value;
    const expYear = document.getElementById('exp-year').value;
    const cvv = document.getElementById('cvv').value;

    // Validation checks
    if (cardNumber.length !== 16 || !/^(51|52|53|54|55)/.test(cardNumber)) {
        document.getElementById('message').innerText = 'Invalid card number.';
        return;
    }
    if (cvv.length < 3 || cvv.length > 4) {
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
        console.log(response.status);
        if(response.status = 200){
            window.location.href = 'success.html';
        }
        //window.Location.href = 'success.html';
        
    })
})