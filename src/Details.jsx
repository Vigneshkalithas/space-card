import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "./context";

function Details() {
  const { id } = useParams();
  //   const [product, setProduct] = useState([]);
  const { products, setProducts } = useContext(MyContext);
  const [one, setOne] = useState([]);
  console.log(id);
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

      const Single = Datas.map((x) => {
        if (x._id == id) {
          setOne(x);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="head-detail">
        <img src={one.image} alt={one.brandName} />
        <h1>Product Describtion : {one.productDescription}</h1>
      </div>
    </>
  );
}

export default Details;
