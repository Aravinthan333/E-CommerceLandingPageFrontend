// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, [searchTerm, category]);

//   const fetchProducts = async () => {
//     let url = "http://localhost:3000/api/products";
//     if (searchTerm)
//       url = `http://localhost:3000/api/products/search?name=${searchTerm}`;
//     else if (category)
//       url = `http://localhost:3000/api/products/category/${category}`;
//     const response = await axios.get(url);
//     setProducts(response.data);
//   };

//   const openModal = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="bg-black text-white min-h-screen p-4">
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search products..."
//         className="mb-4 p-2 border rounded text-black"
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Category Filter */}
//       <div className="mb-4">
//         <button
//           className="mr-2 p-2 border rounded"
//           onClick={() => setCategory("electronics")}
//         >
//           Electronics
//         </button>
//         <button
//           className="mr-2 p-2 border rounded"
//           onClick={() => setCategory("clothing")}
//         >
//           Clothing
//         </button>
//         <button
//           className="mr-2 p-2 border rounded"
//           onClick={() => setCategory("home-appliances")}
//         >
//           Home Appliances
//         </button>
//         <button className="p-2 border rounded" onClick={() => setCategory("")}>
//           All
//         </button>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="border p-4 rounded shadow-lg"
//             onClick={() => openModal(product)}
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="h-48 w-full object-cover"
//             />
//             <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
//             <p className="text-lg text-gray-400">${product.price}</p>
//           </div>
//         ))}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white text-black p-4 rounded">
//             <button className="text-black" onClick={closeModal}>
//               Close
//             </button>
//             <img src={selectedProduct.image} alt={selectedProduct.name} />
//             <h2>{selectedProduct.name}</h2>
//             <p>{selectedProduct.description}</p>
//             <p>${selectedProduct.price}</p>
//             <p>Available Quantity: {selectedProduct.quantity}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// ==================================================================================================================================================
// ==================================================================================================================================================
// ==================================================================================================================================================
// ==================================================================================================================================================
// ==================================================================================================================================================

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Shop Your Favorite Products</h1>
        <p className="text-lg text-gray-400">
          Discover the best deals in electronics, clothing, home appliances, and
          more.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-3 rounded-lg border border-gray-700 bg-white text-black placeholder-gray-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <button
          className={`mx-2 p-2 px-4 border rounded-lg transition duration-300 ${
            category === "electronics" ? "bg-white text-black" : "bg-gray-800"
          }`}
          onClick={() => setCategory("electronics")}
        >
          Electronics
        </button>
        <button
          className={`mx-2 p-2 px-4 border rounded-lg transition duration-300 ${
            category === "clothing" ? "bg-white text-black" : "bg-gray-800"
          }`}
          onClick={() => setCategory("clothing")}
        >
          Clothing
        </button>
        <button
          className={`mx-2 p-2 px-4 border rounded-lg transition duration-300 ${
            category === "home-appliances"
              ? "bg-white text-black"
              : "bg-gray-800"
          }`}
          onClick={() => setCategory("home-appliances")}
        >
          Home Appliances
        </button>
        <button
          className="mx-2 p-2 px-4 border rounded-lg bg-gray-800 transition duration-300"
          onClick={() => setCategory("")}
        >
          All
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => openModal(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-400 mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg">
            <button
              className="text-gray-400 float-right text-lg"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
            <p className="text-xl mb-2">
              <span className="font-bold">Price: </span>${selectedProduct.price}
            </p>
            <p className="text-lg">
              <span className="font-bold">Available Quantity: </span>
              {selectedProduct.quantity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
