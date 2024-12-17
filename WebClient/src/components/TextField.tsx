import * as React from "react";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

// Functional component that wraps the MUI TextField component with additional props
const TextField: React.FC<MuiTextFieldProps> = ({ ...props }) => {
  return <MuiTextField {...props} />; // Render the MUI TextField component with all passed props
};

export default TextField;
