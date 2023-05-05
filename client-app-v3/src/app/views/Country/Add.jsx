import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const PopupUi = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
  }
  .input {
    border: none;
    border-bottom: 1px solid gray;
    margin-top: 6px;
    margin-bottom: 20px;
    width: 80%;
  }
`;

export default function Add(props) {

    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: {
            id: "",
            code: "",
            name: "",
            description: "",
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Tên quá ngắn")
                .max(25, "Tên quá dài")
                .required("required"),
            code: Yup.string()
                .min(2, "Code quá ngắn")
                .max(25, "Code quá dài")
                .required("required"),
            description: Yup.string()
                .min(3, "Desc quá ngắn")
                .max(25, "Desc quá dài")
                .required("required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            props.handleAdd(values)
            formik.resetForm()

        },
    });

    console.log(formik);

    return (
        <div>
            <PopupUi>
                <Dialog open={props.open} onClose={props.handleClose}>
                    <DialogTitle>Add country</DialogTitle>
                    <DialogContent>
                        <form className="form" onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="code"
                                name="code"
                                label="Code"
                                autoFocus
                                margin="dense"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                            />

                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                margin="dense"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                margin="dense"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                            <DialogActions>
                                <Button onClick={props.handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </PopupUi>
        </div>
    );
}
