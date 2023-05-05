import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const NewTextField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            {/* <label>
                {label}
                <input {...field} {...props} />
            </label> */}
            <TextField
                {...field}
                {...props}
                // error={props.touched?.lastName && Boolean(errors?.lastName)}
                // helperText={touched?.lastName && errors?.lastName}
            />
            {/* {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} */}
        </>
    );
};
export default NewTextField;