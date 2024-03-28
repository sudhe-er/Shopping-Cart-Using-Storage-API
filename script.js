document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const cartItemsElement = document.getElementById('cart-items');

		//adding items to the cart dynamically
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const parent = this.parentElement;
                const itemName = parent.dataset.name;
                const itemPrice = parent.dataset.price;

                const itemElement = document.createElement('li');
                itemElement.classList.add('item');
                itemElement.innerHTML = `<span>${itemName} - $${itemPrice}</span> <button class="btn remove-from-cart">Remove</button>`;
                cartItemsElement.appendChild(itemElement);

                updateTotal();
            });
        });
		
		
		//calculates total price
        function updateTotal() {
            const items = document.querySelectorAll('#cart-items .item');
            let totalPrice = 0;
            items.forEach(item => {
                const price = parseFloat(item.querySelector('span').textContent.replace(/^\D+/g, ''));
                totalPrice += price;
            });
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        }
		//temporarily removes 
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-from-cart')) {
                event.target.parentElement.remove();
                updateTotal();
            }
        });
  


//Storage API

function updateUI() {
       // cartItemsElement.innerHTML = ' '; // Clear previous items
        var keys = Object.keys(localStorage);
        keys.forEach(key => {
            const item = JSON.parse(localStorage.getItem(key));
            const itemElement = document.createElement('li');
            itemElement.classList.add('item');
            itemElement.dataset.name = item.name;
            itemElement.dataset.price = item.price;
            itemElement.innerHTML = `<span>${item.name} - $${item.price}</span> <button class="btn remove-from-cart" data-name="${item.name}" data-price="${item.price}">Remove</button>`;
            cartItemsElement.appendChild(itemElement);
        });
        updateTotal();
    }


	//retaining items to the cart via localstorage
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener("click", function() {
            const parent = this.parentElement;
            const itemName = parent.dataset.name;
            const itemPrice = parent.dataset.price;

            // Generate unique identifier for the item
            const itemId = itemName + '_' + Date.now();
			console.log(itemId);
            // Storing item in local storage
            const item = { name: itemName, price: itemPrice };
            localStorage.setItem(itemId, JSON.stringify(item));
			
			//localStorage.clear();
            updateUI();
        });
    });

	document.querySelectorAll('.remove-from-cart').forEach(button => {
			button.addEventListener("click", function() {
				localStorage.removeItem(itemId);
				
				updateUI();
			});
	});


    // Initial UI update
    updateUI();
});












