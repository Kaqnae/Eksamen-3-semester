import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

// Type definition for the Button component props
type ButtonProps = MuiButtonProps & {
  children: React.ReactNode; // The content to be rendered inside the button
};

// Button component
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton
      {...props} // Passes down all other properties (props) to the MUI Button component
    >
      {children} {/* Renders the content passed as children */}
    </MuiButton>
  );
};

export default Button;
