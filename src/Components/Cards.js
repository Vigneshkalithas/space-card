import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { MyContext } from "../context";
function Cards() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { products, setProducts } = useContext(MyContext);
  let fetchData = async () => {
    try {
      const values = {
        lat: "12.9675069",

        lng: "80.1490955",

        _start: 0,

        _limit: 100,

        sortBy: "sortByDistance",

        distanceMax: 15,
      };
      let result = await axios.post(
        "http://nammacart-dev-lb-1671514857.ap-south-1.elb.amazonaws.com:8082/search/product",
        values
      );
      const Datas = result.data.data.products;
      setProduct(Datas);

      console.log(Datas);
    } catch (error) {
      console.log(error);
    }
  };

  // fetchData();

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1 className="head">Products</h1>
      <div className="card-head">
        {product.map((x) => {
          return (
            <>
              <div className="card">
                <div
                  className="img-head"
                  onClick={() => navigate(`/details/${x._id}`)}
                >
                  <img src={x.image} alt="brand" className="image-product" />
                </div>
                <div className="content">
                  <h4>brandName :{x.brandName} </h4>
                  <h5>name : {x.name}</h5>
                  <h5 className="des">
                    Product Describtion : {x.productDescription}
                  </h5>
                  <h5>MRP : {x.pricedetail[0].sellingPrice}</h5>
                  {/* <h5>productId : {x.productId}</h5> */}
                  {/* <h5>foodType :{x.foodType}</h5> */}
                  {/* <h5>approvedStatus :{x.approvedStatus}</h5> */}
                </div>
              </div>
            </>
          );
        })}
        name prodr des mrp
        {/* <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div> */}
      </div>
    </>
  );
}

export default Cards;
