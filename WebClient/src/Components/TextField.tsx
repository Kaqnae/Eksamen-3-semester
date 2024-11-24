import * as React from 'react';
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';

const TextField: React.FC<MuiTextFieldProps> = ({...props}) => {
  return <MuiTextField {...props} />
};

export default TextField;