import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`https://fakestoreapi.com/products/${id}`)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.error("Error fetching product details:", error);
			});
	}, [id]);

	// Add to Cart function that stores cart data in localStorage
	const addToCart = (product) => {
		// Get current cart from localStorage (if it exists)
		let cart = JSON.parse(localStorage.getItem("cart")) || [];

		// Check if the product is already in the cart
		const existingProduct = cart.find((item) => item.id === product.id);

		if (existingProduct) {
			// Update the quantity of the existing product in the cart
			existingProduct.quantity += 1;
		} else {
			// Add the product to the cart with a quantity of 1
			cart.push({ ...product, quantity: 1 });
		}

		localStorage.setItem("cart", JSON.stringify(cart));

		navigate("/cart");
	};

	if (!product) return <div>Loading...</div>;

	return (
		<div className="product-details">
			<h1>{product.title}</h1>
			<img src={product.image} width={200} height={200} alt={product.title} />
			<p className="text-color">{product.description}</p>
			<h3 className="text-color">${product.price}</h3>
			<button onClick={() => addToCart(product)}>Add to Cart</button>
		</div>
	);
}

export default ProductDetail;
