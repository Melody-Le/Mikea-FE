import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function CategoriesIndex() {
  const params = useParams();
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/categories/${params.slug}`);
        const subCats = response?.data;
        setSubCategories(subCats);

        return;
      } catch (err) {}
    }
    getData();
  }, []);
  return <div>Categories</div>;
}

export default CategoriesIndex;
