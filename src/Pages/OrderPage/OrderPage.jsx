import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { useShoppingCart } from "../../Context/ShoppingCartContext";
import EmptyBox from "../../Components/EmptyBox/EmptyBox";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const steps = ["Check Information", "Review Order Item", "Payment"];
function OrderPage() {
  const { createOrder } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderList, totalPrice } = location.state || 0;

  const handleCheckout = async (evnt) => {
    evnt.preventDefault();
    try {
      setIsLoading(true);
      await createOrder(orderList);
      setTimeout(navigate, 500, `/user`);
      setIsLoading(false);
    } catch (error) {}
  };

  // ----------------------------
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      {orderList?.length ? (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>

              {activeStep === 0 && <StepOne handleNext={handleNext} />}
              {activeStep === 1 && (
                <StepTwo
                  handleNext={handleNext}
                  orderList={orderList}
                  totalPrice={totalPrice}
                />
              )}
              {activeStep === 2 && (
                <StepThree
                  handleCheckout={handleCheckout}
                  orderList={orderList}
                />
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  className="step-btn"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  className="step-btn"
                  color="inherit"
                  to={-1}
                  component={Link}
                  sx={{ mr: 1 }}
                >
                  Cancle
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} className="step-btn">
                  {activeStep !== steps.length - 1 && "Next"}
                </Button>
                {activeStep === 2 && (
                  <LoadingButton
                    size="small"
                    loading={isLoading}
                    onClick={handleCheckout}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--color4-transparent)",
                      color: "var(--color4a)",
                      borderRadius: 1,
                      padding: "8px",
                      ":hover": {
                        border: "solid 1px var(--colorGreenBorder)",
                        backgroundColor: "var(--colorGreen)",
                      },
                    }}
                  >
                    Submit order
                  </LoadingButton>
                )}
              </Box>
            </>
          )}
        </Box>
      ) : (
        <EmptyBox />
      )}
    </>
  );
}

export default OrderPage;
