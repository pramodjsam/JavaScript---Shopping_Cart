function removeCartItems(){
	const removeCartItemButtons=document.querySelectorAll(".btn-danger");
		removeCartItemButtons.forEach(function(button){
		button.addEventListener('click',function(event){
			const buttonClicked= event.target;
			buttonClicked.parentElement.parentElement.remove();
			updateCartTotal()
		})
	})
}

removeCartItems();

function quantityInputs(){
	const quantityInputs= document.querySelectorAll(".cart-quantity-input");
		quantityInputs.forEach(function(inputs){
			inputs.addEventListener("change",function(event){
				const input= event.target;
				if(isNaN(input.value) || input.value<=0){
					input.value=1
				}
				updateCartTotal()
			})
	})
}
quantityInputs()

document.querySelector(".btn-purchase").addEventListener("click",purchaseClicked);

function purchaseClicked(){
	alert("Thank you for your purchase");
	const cartItems=document.querySelector(".cart-items");
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal()
}


const addToCartButtons=document.querySelectorAll(".shop-item-button");
addToCartButtons.forEach(function(buttons){
	buttons.addEventListener("click",function(event){
		const shopItem=event.target.parentElement.parentElement;
		const title=shopItem.querySelector(".shop-item-title").innerHTML;
		const price=shopItem.querySelector(".shop-item-price").innerHTML;
		const imageSrc=shopItem.querySelector(".shop-item-image").src;
		addItemsToCart(title,price,imageSrc)
	})
})

function addItemsToCart(title,price,imageSrc){
	const cartRow=document.createElement("div");
	cartRow.classList.add("cart-row");
	const cartItemNames=document.querySelectorAll(".cart-item-title");
	let flag=0;
	cartItemNames.forEach(function(cartTitle){
		if(cartTitle.innerHTML === title){
			alert("Item is already added to the cart");
			flag++;
			return;
		}
	})
	if(flag==0){
		cartRow.innerHTML=`
			<div class="cart-item cart-column">
	            <img class="cart-item-image" src=${imageSrc} width="100" height="100">
	            <span class="cart-item-title">${title}</span>
	        </div>
	        <span class="cart-price cart-column">${price}</span>
	        <div class="cart-quantity cart-column">
	            <input class="cart-quantity-input" type="number" value="1">
	            <button class="btn btn-danger" type="button">REMOVE</button>
	        </div>
			`;
		const cartItems=document.querySelector(".cart-items");
		cartItems.append(cartRow);
		updateCartTotal();
		console.log(cartRow)
		// removeCartItems();
		// quantityInputs()
		cartRow.querySelector(".btn-danger").addEventListener("click",removeCartItems());
		cartRow.querySelector(".cart-quantity-input").addEventListener('change',quantityInputs())
	}	
}


function updateCartTotal(){
	const cartItemContainer=document.querySelector(".cart-items");
	const cartRows= cartItemContainer.querySelectorAll(".cart-row");
	let total=0;
	cartRows.forEach(function(cartRow){
		let priceElement=cartRow.querySelector(".cart-price");
		let quantityElement=cartRow.querySelector(".cart-quantity-input");
		let price= parseFloat(priceElement.innerHTML.replace("$",""));
		let quantity=quantityElement.value;
		total=total+ (price*quantity);
	})
	total=Math.round(total*100)/100
	document.querySelector(".cart-total-price").innerHTML= `$ ${total}`
}