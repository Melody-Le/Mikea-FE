import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

function ProductShowPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get(`/products/${params.slug}`);
        setProduct(productResponse.data);
        // setIsLoading(true);
      } catch (err) {}
    }
    getData();
  }, []);

  console.log("product:", product);
  return <div>show</div>;
}

export default ProductShowPage;
