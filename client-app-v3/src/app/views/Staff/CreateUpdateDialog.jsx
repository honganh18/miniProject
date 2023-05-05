import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, Form, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import { Grid } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import ParentListDialog from "./ParentListDialog";
import { Cancel, SaveAs, Save } from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';
import AppAutoComplete from "../material-kit/auto-complete/AppAutoComplete";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateUpdateFamilyRelationship from "./CreateUpdateFamilyRelationship";
import AutocompleteRelationship from "./EthnicsAutocomplete";
import EthnicsAutocomplete from "./EthnicsAutocomplete";
import NationalAutocomplete from "./NationalAutoComplete";
import ReligionAutocomplete from "./ReligionAutoComplete";
import DepartmentAutocomplete from "./DepartmentAutoComplete";
// import DatePicker from "./DatePicker";
import SelectInput from "./SelectInput";
import StaffFamilyRelationship from "./StaffFamilyRelationship";
const validationSchema = yup.object({
    firstName: yup
        .string("Enter firstName")
        .required("FirstName is required"),
    lastName: yup
        .string("Enter lastName")
        .required("LastName is required"),
    // description: yup
    //     .string("Enter country description")
    //     .min(2, "Description should be of minimum 2 characters length")
    //     .required("Description is required"),
});

export default observer(function CreateUpdateDialog(props) {
    const { staffStore } = useStore();
    const initialValues = {
        id: "",
        lastName: "",
        firstName: "",
        displayName: "",
        gender: "",
        birthDate: null,
        birthPlace: "",
        permanentResidence: "",
        currentResidence: "",
        email: "",
        phoneNumber: "",
        idNumber: "",
        value: "",
        nationality: null,
        ethnics: null,
        religion: null,
        department: null,
        familyRelationships: [],

    };
    const [staff, setStaff] = useState(initialValues);

    const {


        handleClose,
        handleChangeGender,
        createStaff,
        editStaff,
        selectedStaff
    } = staffStore;




    useEffect(() => {
        if (selectedStaff) setStaff(selectedStaff);
    }, [selectedStaff]);

    let button = "";
    if (staff?.id) {
        button = <Button type="submit">Cập nhật</Button>;
    } else {
        button = <Button type="submit">Thêm mới</Button>;
    }
    // const [gender, setGender] = React.useState('');
    const [value, setValue] = React.useState(null);


    //     const [value3 , setValue3] = useState("")
    //    const displayName = value?.firstName + value?.lastName
    //    console.log(value.firstName)
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            // onBackdropClick={() => }
            >
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={staff}
                    onSubmit={(staff) => {
                        if (staff.id.length === 0) {
                            createStaff(staff);
                            console.log(staff);
                        }
                        else {
                            console.log(staff);
                            editStaff(staff);

                        }
                    }}
                >
                    {({
                        isSubmitting,
                        values,
                        handleSubmit,
                        handleChange,
                        touched,
                        errors,
                        resetForm,
                        setFieldValue,
                        handleReset,
                    }) => (
                        <Form autoComplete="off" onSubmit={handleSubmit}>
                            <DialogTitle>
                                {staff?.id ? "CẬP NHẬT" : "THÊM MỚI"}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                id="lastName"
                                                name="lastName"
                                                label={
                                                    <span>
                                                        Họ{" "}
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
                                                value={values?.lastName || ""}
                                                onChange={handleChange}
                                                error={
                                                    touched?.lastName &&
                                                    Boolean(errors?.lastName)
                                                }
                                                helperText={
                                                    touched?.lastName &&
                                                    errors?.lastName
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                id="firstName"
                                                name="firstName"
                                                label={
                                                    <span>
                                                        Tên{" "}
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
                                                value={values?.firstName || ""}
                                                // onChange={handleChange}
                                                onChange={handleChange}
                                                error={
                                                    touched?.firstName &&
                                                    Boolean(errors?.firstName)
                                                }
                                                helperText={
                                                    touched?.firstName &&
                                                    errors?.firstName
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                id="displayName"
                                                name="displayName"
                                                label="Họ và tên"
                                                disabled
                                                margin="dense"
                                                value={
                                                    values?.lastName +
                                                    (values?.lastName ? " " : "") +
                                                    values?.firstName
                                                }
                                            // value={values?.lastName + " " + values?.firstName || ""}
                                            // onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={countryList}
                                                onChange={(newValue) => {
                                                    setFieldValue(
                                                        "national",
                                                        newValue
                                                    );
                                                    setValue(newValue);
                                                }}
                                                getOptionLabel={option => option.name}
                                                sx={{ width: 270 }}
                                                renderInput={(params) => <TextField {...params} label="Quốc tịch" />}
                                            /> */}
                                            < NationalAutocomplete name="nationality" value={values?.nationality} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* <FormControl fullWidth>
                                             <InputLabel id="gender">{label}</InputLabel> 
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={gender}
                                                    // label="Gender"
                                                    onChange={handleChangeGender}
                                                // onChange={(event) => {
                                                //     setFieldValue(
                                                //         "gender",
                                                //         event
                                                //     );
                                                //     setValue(event.target.value);
                                                // }}
                                                >
                                                    <MenuItem value={"M"}>Nam</MenuItem>
                                                    <MenuItem value={"F"}>Nữ</MenuItem>
                                                    <MenuItem value={"U"}>Không rõ</MenuItem>
                                                </Select>
                                            </FormControl>  */}
                                            <SelectInput
                                                name="gender"
                                                label="Giới tính"
                                                value={values?.gender}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={6}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {/* <DatePicker
                                                name="birthDate"
                                                label="Ngày sinh"
                                            /> */}
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >

                                                <DatePicker
                                                    label="Ngày sinh"
                                                    value={values?.birthDate}
                                                    // inputFormat="YYYY-MM-DD"
                                                    onChange={(newValue) => {
                                                        setFieldValue(
                                                            "birthDate",
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
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="birthPlace"
                                                name="birthPlace"
                                                label="Nơi sinh"
                                                margin="dense"
                                                value={values?.birthPlace || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="permanentResidence"
                                                name="permanentResidence"
                                                label="Địa chỉ thường chú"
                                                margin="dense"
                                                value={values?.permanentResidence || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="currentResidence"
                                                name="currentResidence"
                                                label="Nơi cư trú hiện tại"
                                                margin="dense"
                                                value={values?.currentResidence || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Email"
                                                margin="dense"
                                                value={values?.email || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                label="Số điện thoại"
                                                margin="dense"
                                                value={values?.phoneNumber || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="idNumber"
                                                name="idNumber"
                                                label="Căn cước công dân"
                                                margin="dense"
                                                value={values?.idNumber || ""}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={ethnicList}
                                                getOptionLabel={option => option.name}
                                                onChange={(newValue) => {
                                                    setFieldValue(
                                                        "ethnics",
                                                        newValue
                                                    );
                                                    setValue(newValue);
                                                }}
                                                sx={{ width: 270 }}
                                                renderInput={(params) => <TextField {...params} label="Dân tộc" />}
                                            /> */}
                                            <EthnicsAutocomplete name={"ethnics"} value={values?.ethnics} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>

                                        <Grid item xs={6}>
                                            {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={religionList}
                                                getOptionLabel={option => option.name}
                                                getOptionSelected={(option, value) => option?.id === value?.id}
                                                onChange={(newValue) => {
                                                    setFieldValue(
                                                        "religion",
                                                        newValue
                                                    );
                                                    setValue(newValue);
                                                }}
                                                sx={{ width: 270 }}
                                                renderInput={(params) => <TextField 
                                                    name="religion"
                                                    {...params} label="Tôn giáo" 
                                                    />}
                                            /> */}
                                            <ReligionAutocomplete name="religion" value={values?.religion} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={departmentList}
                                                onChange={(newValue) => {
                                                    setFieldValue(
                                                        "department",
                                                        newValue
                                                    );
                                                    setValue(newValue);
                                                }}
                                                getOptionLabel={option => option.name}
                                                sx={{ width: 270 }}
                                                renderInput={(params) => <TextField {...params} label="Phòng ban" />}
                                            /> */}
                                            <DepartmentAutocomplete name="department" value={values?.department} />
                                        </Grid>
                                    </Grid>
                                    <h4>5.Quan hệ nhân thân</h4>
                                    {/* <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        style={{ marginBottom: 10 }}
                                    >

                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            style={{ marginBottom: "8px", marginTop: "8px" }}
                                        >
                                            <Button
                                                variant="contained"
                                                endIcon={<AddIcon />}
                                                onClick={handleCreateFamilyRelationship}
                                            >
                                                Thêm Nhân thân
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                                    <CreateUpdateFamilyRelationship />
                                    {/* <StaffFamilyRelationship /> */}
                                </Grid>
                                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Tên
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Nghề nghiệp
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Ngày sinh
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Quan hệ
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Địa chỉ
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: "bold" }}>
                                                        Mô tả
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {/* <TableBody>
                            {ethnicList?.map((ethnic) => (
                                <TableRow
                                    key={ethnic.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{ethnic.code}</TableCell>
                                    <TableCell>{ethnic.name}</TableCell>
                                    <TableCell>{ethnic.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            onClick={() => {
                                                handleUpdateEthnic(ethnic);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ color: "#f44336" }}
                                            aria-label="delete"
                                            onClick={() => {
                                                handleDeleteEthnic(ethnic);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </DialogContent>
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
                                {button}
                                {/* <Button
                                    variant="contained"
                                    startIcon={<SaveAs />}
                                    type="submit"
                                >
                                    LƯU
                                </Button> */}
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
                                {/* <CreateUpdateFamilyRelationship
                                    open={openCreateUpdateFamilyRelationship}
                                /> */}
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
});
