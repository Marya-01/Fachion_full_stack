import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); // Default to null instead of false
  const [image, setImage] = useState(""); // Main image state
  const [color, setColor] = useState(""); // Selected color
  const [size, setSize] = useState(""); // Selected size

  // Fetch product data
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || ""); // Default to the first image or an empty string
      setColor(product.colors?.[0] || ""); // Default to the first color or an empty string
    }
  };

  // Update product data when the component mounts or dependencies change
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Handle color selection
  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    // If the product has images per color, update the main image
    const colorImages = productData.images?.[selectedColor];
    if (colorImages && colorImages.length > 0) {
      setImage(colorImages[0]); // Set the main image for the selected color
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Side Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)} // Update the main image on click
                src={item}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  item === image ? " " : ""
                }`}
                alt={`Product variant ${index}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Main Product" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Product Name */}
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Product Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star} alt="" className="w-3.5" />
            <img src={assets.star} alt="" className="w-3.5" />
            <img src={assets.star} alt="" className="w-3.5" />
            <img src={assets.star} alt="" className="w-3.5" />
            <img src={assets.star_half} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Product Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Product Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Select Color */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Color</p>
            <div className="flex gap-2">
              {productData.colors?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === color ? "border-[#fcba63]" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Select Size */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-[#fcba63]" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, color, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          {/* Additional Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            selling of products and showcases their products, interacts with
            customers, and conducts transactions without the need for a physical
            presence.
          </p>
          <p>
            E-commerce provides convenience, accessibility, and the global reach
            they offer, as these websites typically display dedicated pages with
            relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
