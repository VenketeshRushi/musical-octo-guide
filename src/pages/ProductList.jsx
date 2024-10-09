import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOption, setSortOption] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);

	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products")
			.then((response) => {
				setProducts(response.data);
				setFilteredProducts(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	// Handle search
	useEffect(() => {
		const results = products.filter((product) =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredProducts(results);
	}, [searchTerm, products]);

	// Handle sort
	useEffect(() => {
		let sortedProducts = [...filteredProducts];
		if (sortOption === "price-asc") {
			sortedProducts.sort((a, b) => a.price - b.price);
		} else if (sortOption === "price-desc") {
			sortedProducts.sort((a, b) => b.price - a.price);
		} else if (sortOption === "alphabetical") {
			sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
		}
		setFilteredProducts(sortedProducts);
	}, [sortOption]);

	return (
		<div>
			<div className="product-search">
				<h1>Product List</h1>
				<input
					type="text"
					placeholder="Search Products..."
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<select onChange={(e) => setSortOption(e.target.value)}>
					<option value="">Sort By</option>
					<option value="price-asc">Price: Low to High</option>
					<option value="price-desc">Price: High to Low</option>
					<option value="alphabetical">Alphabetically</option>
				</select>
			</div>

			<div className="product-grid">
				{filteredProducts.map((product) => (
					<div key={product.id} className="product-card">
						<img src={product.image} alt={product.title} />
						<h2>{product.title}</h2>
						<p>${product.price}</p>
						<Link to={`/product/${product.id}`}>View Details</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductList;
