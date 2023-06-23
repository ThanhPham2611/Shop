import React from "react";
import ProductInformation from "./ProductInformation";
import InfoShop from "./InfoShop";
import InfoProduct from "./InfoProduct";
import ReviewProduct from "./ReviewProduct";

const DetailProduct = () => {
  return (
    <div>
      <ProductInformation />
      <InfoShop />
      <InfoProduct />
      <ReviewProduct />
    </div>
  )
}

export default DetailProduct