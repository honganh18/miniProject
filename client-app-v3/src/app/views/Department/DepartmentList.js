import { Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React from 'react'
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useStore } from "../../stores";
import { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import ParentList from './ParentList';
import ConfirmDialog from './ConfirmDialog';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
export default observer(function DepartmentList() {
    const defaultMaterialTheme = createTheme();
    const validationSchema = Yup.object().shape({
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
        func: Yup.string()
            .min(3, "func quá ngắn")
            .max(25, "func quá dài")
            .required("required"),
    })
    const { departmentStore } = useStore();
    const initialDepartment = {
        id: "",
        code: "",
        name: "",
        value: "",
        parent: null,
        foundedDate: null,
    }

    const {
        // departmentList,
        selectedDepartment,
        totalPages,
        updatePageData,
        // handleCreateDepartment,
        openFormDialog,
        // handleClose,
        // handleOpen,
        // openDialogg,
        // handleUpdateDepartment,
        // handleDeleteDepartment,
        // deleteDepartment,
        // openConfirmDialog,
        handleChangePage,
        handleChangeRowsPerPage,
        // search,

        createDepartment,
        editDepartment,
        handleParentList

    } = departmentStore;

    useEffect(() => {
        updatePageData();
    }, [updatePageData]);
    let button = "";
    if (department?.id) {
        button = <Button type="submit">Cập nhật</Button>;
    } else {
        button = <Button type="submit" >Thêm mới</Button>;
    }
    const [department, setDepartment] = useState(initialDepartment);
    useEffect(() => {
        if (selectedDepartment) setDepartment(selectedDepartment);
    }, [selectedDepartment]);
    // const handleSubmit = (department) => {
    //     console.log(department)
    //     if (department.id.length === 0) {
    //         createDepartment(department);
    //         Formik.resetForm();
    //     } else {
    //         editDepartment(department);
    //     }
    // }

    const data = [
        {
            code: 1,
            name: 'a',
            description: 'Baran',
        },
        {
            code: 2,
            name: 'b',
            description: 'Baran',
        },]
    const columns = [
        { title: 'Mã', field: 'code' },
        { title: 'Tên phòng ban', field: 'name' },
        { title: 'Mô tả', field: 'foundedDate' },
    ]

    return (
        <div>
            <div><h1>Thêm mới phòng ban</h1></div>
            <Formik
                initialValues={department}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(department) => {
                    console.log(department)
                    if (department.id.length === 0) {
                        createDepartment(department);
                        Formik.resetForm({
                            values: {
                                id: "",
                                name: "",
                                code: "",
                                description: "",
                                func: "",
                                parent: null,
                            }
                        });
                    }
                    else {
                        editDepartment(department);
                    }
                }
                }
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    /* and other goodies */
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    fullWidth
                                    id="parent"
                                    name="parent"
                                    label="Đơn vị trực thuộc"
                                    autoFocus
                                    margin="dense"
                                    value={values?.parent || ""}
                                    onChange={handleChange}

                                />
                                <button className='btn btn-success'
                                    type="button"
                                    onClick={handleParentList}
                                >Lựa chọn</button>
                                {/* <ParentList
                                        open={openFormDialog}

                                    /> */}

                            </div>
                            <TextField
                                // fullWidth
                                id="code"
                                name="code"
                                label="Mã "
                                autoFocus
                                margin="dense"
                                value={values?.code || ""}
                                onChange={handleChange}
                                error={
                                    touched?.code &&
                                    Boolean(errors?.code)
                                }
                                helperText={
                                    touched?.code && errors?.code
                                }
                            />
                            <TextField
                                // fullWidth
                                id="name"
                                name="name"
                                label="Tên Phòng "
                                margin="dense"
                                value={values?.name || ""}
                                onChange={handleChange}
                                error={
                                    touched?.name &&
                                    Boolean(errors?.name)
                                }
                                helperText={
                                    touched?.name && errors?.name
                                }
                            />
                            <TextField
                                // fullWidth
                                id="func"
                                name="func"
                                label="Chức năng"
                                autoFocus
                                margin="dense"
                                value={values?.func || ""}
                                onChange={handleChange}
                                error={
                                    touched?.func &&
                                    Boolean(errors?.func)
                                }
                                helperText={
                                    touched?.func && errors?.func
                                }
                            />
                            <TextField
                                // fullWidth
                                id="description"
                                name="description"
                                label="Mô tả"
                                margin="dense"
                                value={values?.description || ""}
                                onChange={handleChange}
                                error={
                                    touched?.description &&
                                    Boolean(errors?.description)
                                }
                                helperText={
                                    touched?.description &&
                                    errors?.description
                                }
                            />
                            { }

                            {button}
                            <ParentList
                                open={openFormDialog}
                                setFieldValue={setFieldValue}
                            />
                        </form >
                    )
                }}
            </Formik >
            <ThemeProvider theme={defaultMaterialTheme}>
                < MaterialTable
                    title="Basic Tree Data Preview"
                    data={data}
                    columns={columns}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                    options={{
                        selection: true,
                    }}
                />
            </ThemeProvider>
            {/* <TableContainer sx={{ maxHeight: 500 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Mã phòng ban
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Tên phòng ban
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Mô tả
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Chức năng
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Đơn vị trực thuộc
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departmentList?.map((department) => (
                            <TableRow
                                key={department.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>{department.code}</TableCell>
                                <TableCell>{department.name}</TableCell>
                                <TableCell>{department.description}</TableCell>
                                <TableCell>{department.func}</TableCell>
                                <TableCell>{department.parent}</TableCell>
                                <TableCell> *
                                    <IconButton
                                        color="primary"
                                        aria-label="edit"
                                        onClick={() => {
                                            handleUpdateDepartment(department);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        style={{ color: "#f44336" }}
                                        aria-label="delete"
                                        onClick={() => {
                                            handleDeleteDepartment(department);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow >
                        ))}
                    </TableBody >
                </Table >
                <ConfirmDialog
                    handleOpen={openConfirmDialog}
                    handleClose={handleClose}
                    deleteDepartment={deleteDepartment}
                />
            </TableContainer > */}
            < Grid Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={12}
                md={12}
                sm={12}
            >
                <p>Số hàng mỗi trang</p>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"

                        onChange={handleChangeRowsPerPage}

                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    onChange={handleChangePage}
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    sx={{ marginBottom: 2 }}
                />
            </ Grid>

        </div >

    )
})
