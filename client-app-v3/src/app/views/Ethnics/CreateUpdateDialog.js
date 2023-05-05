import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, useFormikContext, Field } from "formik";
import * as yup from "yup";
import { observer } from "mobx-react";
import { useStore } from "../../stores";

const validationSchema = yup.object({
    code: yup
        .string("Enter country code")
        .min(2, "Code should be of minimum 2 characters length")
        .required("Code is required"),
    name: yup
        .string("Enter country name")
        .min(2, "Name should be of minimum 2 characters length")
        .required("Name is required"),
    description: yup
        .string("Enter country description")
        .min(2, "Description should be of minimum 2 characters length")
        .required("Description is required"),
});

export default observer(function CreateUpdateDialog(props) {
    const { ethnicsStore } = useStore();
    const initialEthnic = {
        id: "",
        code: "",
        name: "",
        description: "",
    };
    const [ethnic, setEthnic] = useState(initialEthnic);
    const { selectedEthnic, editEthnic, handleClose, createEthnic } =
        ethnicsStore;

    useEffect(() => {
        if (selectedEthnic) setEthnic(selectedEthnic);
    }, [selectedEthnic]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: ethnic,
        validationSchema: validationSchema,
        onSubmit: (ethnic) => {
            console.log(ethnic)
            if (ethnic.id.length === 0) {
                createEthnic(ethnic);
                formik.resetForm();
            } else {
                editEthnic(ethnic);
            }
        },
    });

    let button = "";
    if (ethnic?.id) {
        button = <Button type="submit">Cập nhật</Button>;
    } else {
        button = <Button type="submit">Thêm mới</Button>;
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                onBackdropClick={() => formik.resetForm()}
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>
                        {ethnic?.id ? "CẬP NHẬT" : "THÊM MỚI"}
                    </DialogTitle>
                    <DialogContent>
                        {/* <Field name="code" placeholder="code" /> */}
                        <TextField
                            fullWidth
                            id="code"
                            name="code"
                            label="Mã dân tộc"
                            autoFocus
                            margin="dense"
                            value={formik.values?.code || ""}
                            onChange={formik.handleChange}
                            error={
                                formik.touched?.code &&
                                Boolean(formik.errors?.code)
                            }
                            helperText={
                                formik.touched?.code && formik.errors?.code
                            }
                        />
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Tên dân tộc"
                            margin="dense"
                            value={formik.values?.name || ""}
                            onChange={formik.handleChange}
                            error={
                                formik.touched?.name &&
                                Boolean(formik.errors?.name)
                            }
                            helperText={
                                formik.touched?.name && formik.errors?.name
                            }
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Mô tả"
                            margin="dense"
                            value={formik.values?.description || ""}
                            onChange={formik.handleChange}
                            error={
                                formik.touched?.description &&
                                Boolean(formik.errors?.description)
                            }
                            helperText={
                                formik.touched?.description &&
                                formik.errors?.description
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                formik.resetForm();
                                handleClose();
                            }}
                        >
                            Hủy
                        </Button>
                        {button}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
});
