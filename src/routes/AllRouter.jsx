import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import ProductList from "../pages/ProductList";

function AllRoutes() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</div>
		</Router>
	);
}

export default AllRoutes;
