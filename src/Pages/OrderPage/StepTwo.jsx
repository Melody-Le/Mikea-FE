import React from "react";
import { useEffect, useState, useContext } from "react";
import PurchaseCard from "../../Components/PurchaseCard/PurchaseCard";
import OrderCardSkeleton from "../../Components/OrderCard/OrderCardSkeleton";
import Box from "@mui/material/Box";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

function StepTwo(props) {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [lineItemsOnOrdering, setLineItemsOnOrdering] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const variantsIdsString = JSON.stringify(props.orderList);
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/cart/lineItems?q=${variantsIdsString}`
        );
        setLineItemsOnOrdering(response?.data);
        setIsLoading(false);
        return;
      } catch (error) {}
    };
    getData();
  }, [auth]);
  let lineItemsOrderingToShow = [];
  if (lineItemsOnOrdering?.length) {
    lineItemsOrderingToShow = lineItemsOnOrdering?.map((lineItem, idx) => {
      const productDetail = {
        variantImage: lineItem?.variant?.variantImage,
        productName: lineItem?.variant?.product?.productName,
        variantDescription: lineItem?.variant?.variantDescription,
        variantId: lineItem?.variant?.id,
        price: lineItem?.variant?.price,
        qty: lineItem?.qty,
      };
      return <PurchaseCard key={idx} orderDetail={productDetail} />;
    });
  } else {
    return <OrderCardSkeleton />;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {lineItemsOrderingToShow}
      <Box
        sx={{
          color: "var(--color6)",
          alignSelf: "flex-end",
          marginRight: "3rem",
        }}
      >
        Total Price: ${props.totalPrice}
      </Box>
    </Box>
  );
}

export default StepTwo;
