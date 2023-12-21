import React from "react";
import { Button } from "@chakra-ui/react";

const CustomButton = ({
  children,
  type,
  variant = "solid",
  size = "md",
  ...props
}) => {
  const styleProps = {
    primary: {
      backgroundColor: "blue.500",
      color: "white",
      _hover: { backgroundColor: "blue.600" },
    },
    secondary: {
      backgroundColor: "gray.500",
      color: "white",
      _hover: { backgroundColor: "gray.600" },
    },
  };

  return (
    <Button {...styleProps[type]} variant={variant} size={size} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
