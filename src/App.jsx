import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaArrowLeft,
  FaInstagram,
  FaFacebook,
  FaBookmark,
  FaCartPlus,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(8); // State to track how many items to show
  const [quantity, setQuantity] = useState(1); // New state for quantity

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category]);

  const fetchProducts = async () => {
    let url = "http://localhost:3000/api/products";
    if (searchTerm)
      url = `http://localhost:3000/api/products/search?name=${searchTerm}`;
    else if (category)
      url = `http://localhost:3000/api/products/category/${category}`;
    const response = await axios.get(url);
    setProducts(response.data);
    setItemsToShow(8); // Reset to 8 products whenever category changes
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset quantity to 1 when a new product is opened
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleViewMore = () => {
    setItemsToShow((prev) => prev + 8); // Increase the number of items shown by 8
  };

  const increaseQuantity = () => {
    if (quantity < selectedProduct.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 h-[10vh] bg-white py-4 px-10 shadow-lg flex justify-between items-center z-50">
        <div className="text-2xl font-bold">ShopLogo</div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 pl-10 rounded-lg border w-[20vw] border-gray-300 bg-gray-100 text-black placeholder-gray-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaShoppingCart className="text-2xl cursor-pointer" />
          <FaUser className="text-2xl cursor-pointer" />
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white text-black min-h-screen max-w-[100vw] px-8">
        {/* Welcome Section */}
        <section className="text-center my-12">
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Favorite Products
          </h1>
          <p className="text-lg text-gray-600">
            Explore a wide range of electronics, clothing, home appliances, and
            more.
          </p>
        </section>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <button
            className={`mx-2 p-2 px-4 rounded-lg transition duration-300 ${
              category === "electronics"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-black hover:text-white`}
            onClick={() => setCategory("electronics")}
          >
            Electronics
          </button>
          <button
            className={`mx-2 p-2 px-4 rounded-lg transition duration-300 ${
              category === "clothing"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-black hover:text-white`}
            onClick={() => setCategory("clothing")}
          >
            Clothing
          </button>
          <button
            className={`mx-2 p-2 px-4 rounded-lg transition duration-300 ${
              category === "home-appliances"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-black hover:text-white`}
            onClick={() => setCategory("home-appliances")}
          >
            Home Appliances
          </button>
          <button
            className={`mx-2 p-2 px-4 rounded-lg transition duration-300 ${
              category === "cosmetics"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-black hover:text-white`}
            onClick={() => setCategory("cosmetics")}
          >
            Cosmetics
          </button>
          <button
            className={`mx-2 p-2 px-4 rounded-lg transition duration-300 ${
              category === "accessories"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            } hover:bg-black hover:text-white`}
            onClick={() => setCategory("accessories")}
          >
            Accessories
          </button>
          <button
            className="mx-2 p-2 px-4 rounded-lg bg-gray-200 text-black hover:bg-black hover:text-white transition duration-300"
            onClick={() => setCategory("")}
          >
            All
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {products.slice(0, itemsToShow).map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => openModal(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="bg-slate-300 px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    {product.category}
                  </p>
                </div>
                <p className="text-gray-600 font-semibold mt-2">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {itemsToShow < products.length && products.length > 8 && (
          <div className="flex justify-center mb-12">
            <button
              className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition duration-300"
              onClick={handleViewMore}
            >
              View More
            </button>
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-12 rounded-lg w-full max-w-4xl relative">
              <button
                className="bg-black text-xl text-white font-semibold flex gap-2 pl-5 pr-6 py-3 rounded-full items-center justify-center absolute top-4 left-4"
                onClick={closeModal}
              >
                <FaArrowLeft className="text-lg" />
                Back
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover mb-4 mt-10 rounded-lg"
              />
              <h2 className="text-4xl font-bold mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedProduct.description}
              </p>
              <div className="flex justify-between items-center mb-6">
                <p className="text-2xl">
                  <span className="font-bold">Price: </span>$
                  {selectedProduct.price}
                </p>
                <p className="text-xl">
                  <span className="font-bold">Available Quantity: </span>
                  {selectedProduct.quantity - quantity}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <button
                  className="bg-gray-200 text-black p-2 rounded-l-lg"
                  onClick={decreaseQuantity}
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-2 text-xl font-bold">{quantity}</span>
                <button
                  className="bg-gray-200 text-black p-2 rounded-r-lg"
                  onClick={increaseQuantity}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add to Cart and Save for Later */}
              <div className="flex justify-between items-center mt-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 text-lg hover:bg-green-600 transition duration-300">
                  <FaCartPlus />
                  Add to Cart
                </button>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 text-lg hover:bg-blue-600 transition duration-300">
                  <FaBookmark />
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Copyright */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold">© 2024 ShopLogo</h4>
            <p className="text-gray-400">All rights reserved.</p>
          </div>

          {/* Column 2: Social Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="text-gray-400">support@shoplogo.com</p>
            <p className="text-gray-400">+1 (800) 123-4567</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
