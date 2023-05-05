import { useField } from 'formik'
import React from 'react'
// import TextField from "@mui/material/TextField";
import { TextField } from "@material-ui/core/";
export default function GlobitsTextField({ variant, size, label, ...props }) {
  const [field, meta] = useField(props)
  const configTextField = {
    ...field,
    ...props,
    label: label,
    // name: name,
    // id: name,
    fullWidth: true,
    // value : value,
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
  };

  return <TextField {...configTextField} />
}
