import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { observer } from 'mobx-react';
import { ThemeProvider, createTheme } from '@mui/material';
import { useStore } from "../../stores";
import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import TablePagination from "@mui/material/TablePagination";
// import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Formik } from 'formik';
import Button from "@mui/material/Button";
import ParentList from './ParentList';
import AddIcon from "@mui/icons-material/Add";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Cancel, SaveAs, Save } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from './ConfirmDialog';
function MaterialButton({ handleUpdateDepartment, handleDeleteDepartment }) {
    return (
        <div>
            <IconButton
                color="primary"
                aria-label="edit"
                onClick={handleUpdateDepartment}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                style={{ color: "#f44336" }}
                aria-label="delete"
                onClick={handleDeleteDepartment}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
}
export default observer(function Department() {
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

    })
    const initialDepartment = {
        id: "",
        code: "",
        name: "",
        value: "",
        parent: null,
        foundedDate: null,
    }
    const { departmentStore } = useStore();
    const {
        departmentList,
        updatePageDataDepartment,
        handleChangePage,
        rowsPerPage,
        totalPages,
        setRowsPerPage,
        totalElements,
        selectedDepartmentList,
        handleCreateDepartment,
        openCreateUpdateDialog,
        openConfirmDeleteDialog,
        openConfirmDeleteListDialog,
        editDepartmen,
        createDepartment,
        editDepartment,
        handleParentList,
        openFormDialog,
        deleteDepartment,
        handleClose,
        handleDeleteDepartment,
        selectedDepartment,
        handleChangeRowsPerPage,
        handleSelectDepartmentList,
        deleteDepartmentList,
        handleDeleteDepartmentList,
        handleUpdateDepartment,
        selectDepartment,
        handleSelectParent,
        updateDepartment,
        handleOpenSelectParent,
        openSelectParentDialog,
        handleCloseParentDialog,
    } = departmentStore;

    useEffect(() => {
        console.log(departmentList)
        updatePageDataDepartment();
        // console.log(departmentList)
    }, [updatePageDataDepartment]);
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
    const columns = [
        {
            title: "Thao tác",
            field: "type",
            render: (rows) => (
                <MaterialButton
                    handleUpdateDepartment={() => {
                        handleUpdateDepartment(rows.id);
                        // console.log("parentId", rows.parentId);
                    }}
                    handleDeleteDepartment={() => {
                        handleDeleteDepartment(rows);
                    }}
                // rows={rows}
                />
            ),
        },
        { title: "Mã phòng ban", field: "code" },
        { title: "Tên phòng ban", field: "name" },
        { title: "Mô tả", field: "description" },

    ]
    const [value, setValue] = React.useState(null);

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
                        // handleClose();
                        console.log(department);
                    } else {
                        updateDepartment(department);
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
                    resetForm,
                    /* and other goodies */
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Grid
                                    container
                                    style={{ position: "relative" }}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        id="parent"
                                        name="parent"
                                        label="Phòng ban trực thuộc"
                                        autoFocus
                                        margin="dense"
                                        value={
                                            values?.parent
                                                ? values.parent.name
                                                : ""
                                        }
                                    // onChange={}
                                    />
                                    <Button
                                        style={{
                                            position: "absolute",
                                            top: "57%",
                                            transform: "translateY(-50%)",
                                            right: "2px",
                                        }}
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            handleOpenSelectParent(
                                                selectedDepartment
                                            );
                                        }}
                                    >
                                        Lựa chọn
                                    </Button>
                                </Grid>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="code"
                                        name="code"
                                        label={
                                            <span>
                                                Mã phòng ban{" "}
                                                <span
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </span>
                                            </span>
                                        }
                                        margin="dense"
                                        value={values?.code || ""}
                                        onChange={handleChange}
                                        error={
                                            touched?.code &&
                                            Boolean(errors?.code)
                                        }
                                        helperText={
                                            touched?.code &&
                                            errors?.code
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label={
                                            <span>
                                                Tên phòng ban{" "}
                                                <span
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </span>
                                            </span>
                                        }
                                        margin="dense"
                                        value={values?.name || ""}
                                        onChange={handleChange}
                                        error={
                                            touched?.name &&
                                            Boolean(errors?.name)
                                        }
                                        helperText={
                                            touched?.name &&
                                            errors?.name
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="func"
                                        name="func"
                                        label="Chức năng"
                                        margin="dense"
                                        value={values?.func || ""}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="industryBlock"
                                        name="industryBlock"
                                        label="Khối ngành"
                                        margin="dense"
                                        value={
                                            values?.industryBlock || ""
                                        }
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="foundedNumber"
                                        name="foundedNumber"
                                        label="Quyết định số"
                                        margin="dense"
                                        value={
                                            values?.foundedNumber || ""
                                        }
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            label="Ngày"
                                            value={values?.foundedDate}
                                            // inputFormat="YYYY-MM-DD"
                                            onChange={(newValue) => {
                                                setFieldValue(
                                                    "foundedDate",
                                                    newValue
                                                );
                                                setValue(newValue);
                                            }}
                                            // name="foundedDate"
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <TextField
                                    fullWidth
                                    id="displayOrder"
                                    name="displayOrder"
                                    label="Mã hiển thị"
                                    margin="dense"
                                    value={values?.displayOrder || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid container>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Mô tả"
                                    margin="dense"
                                    multiline
                                    maxRows={3}
                                    minRows={3}
                                    value={values?.description || ""}
                                    onChange={handleChange}
                                />
                            </Grid>

                            { }

                            <DialogActions>
                                <Button
                                    variant="contained"
                                    startIcon={<Cancel />}
                                    color="inherit"
                                    onClick={() => {
                                        resetForm();
                                        handleClose();
                                    }}
                                >
                                    Hủy
                                </Button>
                                {/* {button} */}
                                <Button
                                    variant="contained"
                                    startIcon={<SaveAs />}
                                    type="submit"
                                >
                                    LƯU
                                </Button>
                                {/* <ParentListDialog
                                    open={openSelectParentDialog}
                                    handleClose={handleCloseParentDialog}
                                    data={props.data}
                                    totalElements={props.totalElements}
                                    totalPages={props.totalPages}
                                    rowsPerPage={props.rowsPerPage}
                                    setRowsPerPage={props.setRowsPerPage}
                                    handleChangePage={props.handleChangePage}
                                    setFieldValue={setFieldValue}
                                /> */}
                            </DialogActions>
                            <ParentList
                                open={openSelectParentDialog}
                                handleClose={handleCloseParentDialog}
                                data={departmentList}
                                totalElements={totalElements}
                                totalPages={totalPages}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                handleChangePage={handleChangePage}
                                setFieldValue={setFieldValue}
                            />
                        </form >
                    )
                }}
            </Formik >
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    title="Basic Tree Data Preview"
                    data={departmentList}
                    columns={columns}
                    parentChildData={(row, rows) =>
                        rows.find(a => a.id === row.parentId)}
                    onSelectionChange={(rows) => {
                        handleSelectDepartmentList(rows);
                    }}
                    options={{
                        sorting: true,
                        selection: true,
                        paging: false,
                        paginationType: "stepped",
                        search: false,
                        toolbar: false,
                    }}
                />
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

            </ThemeProvider>
            <ConfirmDialog
                handleOpen={openConfirmDeleteDialog}
                handleClose={handleClose}
            // handleDeleteDepartment={deleteDepartment}
            />
        </div>
    )
}) 
