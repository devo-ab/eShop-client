import axios from "axios";
import { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [brand, setBrand] = useState("");
  const [searchText, setSearchText] = useState("");

  const priceRanges = [
    { label: "0 - 299$", min: 0, max: 299 },
    { label: "300 - 599$", min: 300, max: 599 },
    { label: "600 - 899$", min: 600, max: 899 },
    { label: "900 - 1199$", min: 900, max: 1199 },
    { label: "1200 - 1499$", min: 1200, max: 1499 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const query = `?page=${currentPage}&limit=9&search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&brand=${brand}`;

        const res = await axios.get(`https://e-shop-server-navy.vercel.app/products${query}`);

        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, search, category, minPrice, maxPrice, sortBy, brand]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchText = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handlePriceRangeChange = (e) => {
    const selectedRange = priceRanges.find((range) => range.label === e.target.value);
    if (selectedRange) {
      setMinPrice(selectedRange.min);
      setMaxPrice(selectedRange.max);
      setCurrentPage(1);
    } else {
      setMinPrice("");
      setMaxPrice("");
    }
  };

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  return (
    <div id="book" className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold my-12 text-center text-red-400">All Products</h1>

      <form onSubmit={handleSearchText} className="my-4 text-center flex items-center justify-center">
        <input
          type="text"
          placeholder="Search here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-xs border-red-400 rounded-l-3xl rounded-r-none"
        />
        <button className="p-3 bg-red-400 text-white my-2 md:my-0 rounded-r-3xl">Search</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 my-4 gap-4 justify-center text-center items-center">
        <div>
          <select
            className="select select-primary border-red-400 w-full"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option>Smartphone</option>
            <option>Gaming Smartphone</option>
            <option>Laptop</option>
            <option>Gaming Laptop</option>
          </select>
        </div>

        <div>
          <select
            className="select select-primary border-red-400 w-full"
            value={
              priceRanges.find((range) => range.min === minPrice && range.max === maxPrice)
                ?.label || ""
            }
            onChange={handlePriceRangeChange}
          >
            <option value="">Select Price Range</option>
            {priceRanges.map((range, index) => (
              <option key={index} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <select
          className="select select-primary border-red-400 w-full"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="newestFirst">Date Added: Newest First</option>
        </select>

        <select
          className="select select-primary border-red-400 w-full"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Brands</option>
          <option>Samsung</option>
          <option>Apple</option>
          <option>Google</option>
          <option>OnePlus</option>
          <option>Xiaomi</option>
          <option>Sony</option>
          <option>Asus</option>
          <option>Dell</option>
          <option>HP</option>
          <option>Lenovo</option>
          <option>Acer</option>
          <option>Microsoft</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-96 md:w-full mx-auto md:mx-0 gap-6">
        {products?.map((book) => (
          <div key={book?.id} className="card bg-gray-300 w-96 hover:bg-red-300">
            <figure className="px-10 pt-10">
              <img
                src={book?.image || "https://i.ibb.co/0FMYqVt/traveltech1a.jpg"}
                alt={book?.product_name}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name: {book?.product_name}</h2>
              <div className="flex gap-3">
                <p>Price: {book?.price}$</p>
                <p>Category: {book?.category}</p>
              </div>
              <div className="flex gap-3">
                <p>Product-Date: {book?.date}</p>
                <p>Brand: {book?.brand_name}</p>
              </div>
              <div className="card-actions">
                <button className="btn bg-red-400 text-white w-full mt-2">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-8 pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn bg-rose-600 text-white mr-4 tooltip hover:shadow-xl hover:bg-red-400"
          data-tip="Previous"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn ml-4 text-white bg-rose-600 hover:shadow-xl hover:bg-red-400 tooltip"
          data-tip="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
