







import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const LogoContainer = styled(Box)({
  display: "inline-block",
  padding: "5px",
});

const HomLogo = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

  color: "blue",
   // Чистый синий цвет
  letterSpacing: "0.05rem",
//   border: "2px solid #0057b7", 
  // Синяя обводка
  borderRadius: "6px",
  padding: "4px 10px",
  textShadow: "0 4px 8px gold",
// textShadow: "2px 2px 0px blue, -2px -2px 0px blue, 2px -2px 0px blue, -2px 2px 0px blue",
});

const Logo = () => {
  return (
    <LogoContainer>
      <HomLogo variant="h6">NaDoby.com.ua</HomLogo>
    </LogoContainer>
  );
};

export default Logo;
