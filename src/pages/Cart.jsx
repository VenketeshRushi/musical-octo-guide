import { useState } from "react";

function Cart() {
	const [cartItems, setCartItems] = useState(
		JSON.parse(localStorage.getItem("cart")) || []
	);

	const updateQuantity = (id, quantity) => {
		const updatedItems = cartItems.map((item) =>
			item.id === id ? { ...item, quantity } : item
		);
		setCartItems(updatedItems);
		localStorage.setItem("cart", JSON.stringify(updatedItems));
	};

	const removeItem = (id) => {
		const updatedItems = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedItems);
		localStorage.setItem("cart", JSON.stringify(updatedItems));
	};

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<div className="cart-container">
			<h1>Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<p className="cart-empty">Your cart is empty</p>
			) : (
				<div>
					{cartItems.map((item) => (
						<div key={item.id} className="cart-item">
							<h2>{item.title}</h2>
							<p>${item.price}</p>
							<input
								type="number"
								value={item.quantity}
								onChange={(e) =>
									updateQuantity(item.id, parseInt(e.target.value))
								}
								min="1"
							/>
							<button onClick={() => removeItem(item.id)}>Remove</button>
						</div>
					))}
					<h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
				</div>
			)}
		</div>
	);
}

export default Cart;
