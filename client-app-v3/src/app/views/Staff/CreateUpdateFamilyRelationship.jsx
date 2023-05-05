import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, FieldArray, useField, FormikProps } from "formik";

import Button from "@mui/material/Button";
import { Box, Grid } from "@material-ui/core";
// import CustomTextField from "./CustomTextField";
// import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStore } from "../../stores";
// import { Grid } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Autocomplete from '@mui/material/Autocomplete';

import { makeStyles } from "@material-ui/core/styles";
// import SelectFamilyRelationship from "./SelectFamilyRelationship";
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";
import GlobitsAutoComplete from "./GlobitsAutoComplete";
import AutocompleteRelationship from "./AutocompleteRelationship";
import DatePickerRelationship from "./DatePickerRelationship";
import FamilyRelationshipAutocomplete from "./FamilyRelationshipAutocomplete";
const useStyles = makeStyles({
    header: {
        backgroundColor: "#2579cc",
        height: 48,
        display: "flex",
        alignItems: "center",
        border: "1px solid #fff",
        color: "#fff",
        padding: "0 12px",
    },
});
export default function StaffFamilyRelationship() {
    // const { setFieldValue } = useFormikContext();
    // const [field, meta] = useField();
    const { values, setFieldValue } = useFormikContext();
    // const classes = useStyles();
    // const data = [
    //     {
    //         fullName: "",
    //         profession: "",
    //         birthDate: "",
    //         familyRelationship: null,
    //         address: "",
    //         description: "",
    //     },

    // ];
    // const { staffStore } = useStore();
    const [value, setValue] = React.useState(null);
    // const {
    //     selectedFamilyRelationships,
    //     selectedDepartment,
    //     updateDepartment,
    //     handleClose,

    // } = staffStore;
    // const [familyRelationships, setFamilyRelationships] = useState({});
    // useEffect(() => {
    //     if (selectedFamilyRelationships) setFamilyRelationships(selectedFamilyRelationships);
    // }, [selectedFamilyRelationships, familyRelationships]);

    // useEffect(() => {
    //     if (selectedDepartment) setDepartment(selectedDepartment);
    // }, [selectedDepartment]);
    // const { familyRelationshipStore } = useStore();
    // const {
    //     familyRelationshipList,

    //     updatePageDataFamilyRelationship,

    // } = familyRelationshipStore;

    // useEffect(() => {
    //     console.log(familyRelationshipList)
    //     updatePageDataFamilyRelationship();
    // }, [updatePageDataFamilyRelationship]);
    // const { setFieldValue, values } = useFormikContext();
    // const [selectedNationality, setSelectedNationality] = useState(null);

    // useEffect(() => {
    //     updatePageDataFamilyRelationship();
    //     setFieldValue(name, selectedNationality);
    // }, [name, selectedNationality, setFieldValue, updatePageDataFamilyRelationship]);
    return (
        // <Box>
        //     <Formik

        //         // initialValues={{ friends: ["jared", "ian", "brent"] }}
        //         initialValues={{ familyRelationships: data }}
        //         onSubmit={(values) => {
        //             // setFieldValue(
        //             //     "familyRelationships",
        //             //     values.familyRelationships
        //             // );
        //             setFieldValue(
        //                 "familyRelationships",
        //                 values.familyRelationships
        //             );
        //             // alert(JSON.stringify(values, null, 2));

        //         }}
        //         render={({ isSubmitting,

        //             values,
        //             handleSubmit,
        //             handleChange,
        //             touched,
        //             errors,
        //             resetForm,
        //             setFieldValue,
        //             handleReset }) => (
        //             <Form>
        //                 <FieldArray
        //                     name="familyRelationships"
        //                     render={(arrayHelpers) => (
        //                         <Box>
        //                             <Button
        //                                 variant="outlined"
        //                                 startIcon={<AddIcon />}
        //                                 onClick={() => {
        //                                     arrayHelpers.push({
        //                                         // fullName: "",
        //                                         // profession: "",
        //                                         // birthDate
        //                                         // familyRelationship: null,
        //                                         // address: "",
        //                                         // description: "",
        //                                         fullName: "",
        //                                         profession: "",
        //                                         birthDate: null,
        //                                         familyRelationship: null,
        //                                         address: "",
        //                                         description: "",
        //                                     });
        //                                 }}
        //                                 style={{ marginBottom: "8px" }}
        //                             >
        //                                 {/* show this when user has removed all friends from the list */}
        //                                 Thêm mới
        //                             </Button>

        //                             {values.familyRelationships.map(
        //                                 (familyRelationship, index) => (
        //                                     <div key={index}>
        //                                         <Grid container>
        //                                             <Grid
        //                                                 item
        //                                                 xs={1}
        //                                                 style={{
        //                                                     display: "flex",
        //                                                     justifyContent:
        //                                                         "center",
        //                                                 }}
        //                                             >
        //                                                 <IconButton
        //                                                     aria-label="delete"
        //                                                     style={{
        //                                                         color: "#f44336",
        //                                                     }}
        //                                                     onClick={() =>
        //                                                         arrayHelpers.remove(
        //                                                             index
        //                                                         )
        //                                                     } // remove a friend from the list
        //                                                 >
        //                                                     <DeleteIcon />
        //                                                 </IconButton>
        //                                                 {/* <IconButton
        //                                                     // aria-label="submit"
        //                                                     type="submit"
        //                                                     style={{
        //                                                         color: "#4caf50",
        //                                                     }}
        //                                                     onClick={() =>
        //                                                         arrayHelpers.insert(
        //                                                             index,
        //                                                             ""
        //                                                         )
        //                                                     } // insert an empty string at a position
        //                                                 >
        //                                                     <CheckIcon />
        //                                                 </IconButton> */}
        //                                             </Grid>
        //                                             <Grid container spacing={2}>

        //                                                 <Grid item xs={6}>
        //                                                     <GlobitsTextField
        //                                                         id="fullName"
        //                                                         name={`familyRelationships.${index}.fullName`}
        //                                                         label="Tên"
        //                                                     // value={values?.idNumber || ""}
        //                                                     />
        //                                                     {/* <TextField
        //                                                         fullWidth
        //                                                         id="fullName"
        //                                                         onChange={handleChange}
        //                                                         name={`familyRelationships.${index}.fullName`}
        //                                                         label="Tên"
        //                                                         margin="dense"
        //                                                         value={values?.fullName || ""}


        //                                                     /> */}
        //                                                 </Grid>
        //                                                 <Grid item xs={6}>
        //                                                     <GlobitsTextField
        //                                                         id="profession"
        //                                                         name={`familyRelationships.${index}.profession`}
        //                                                         label="Nghề nghiệp"


        //                                                     />
        //                                                 </Grid>
        //                                             </Grid>

        //                                             <Grid container spacing={2}>
        //                                                 <Grid
        //                                                     item
        //                                                     xs={6}
        //                                                 >
        //                                                     {/* <GlobitsTextField
        //                                                         id="birthDate"
        //                                                         name={`familyRelationships.${index}.birthDate`}
        //                                                         type="date"
        //                                                     /> */}
        //                                                     <LocalizationProvider
        //                                                         dateAdapter={AdapterDayjs}
        //                                                     >
        //                                                         <DatePicker
        //                                                             label="Ngày sinh"
        //                                                             value={values?.birthDate}
        //                                                             // inputFormat="YYYY-MM-DD"
        //                                                             name={`familyRelationships.${index}.birthDate`}
        //                                                             index={index}
        //                                                             onChange={(newValue) => {
        //                                                                 setFieldValue(
        //                                                                     "birthDate",
        //                                                                     newValue
        //                                                                 );
        //                                                                 setValue(newValue);
        //                                                             }}
        //                                                             // name="foundedDate"
        //                                                             renderInput={(params) => (
        //                                                                 <GlobitsTextField
        //                                                                     {...params}

        //                                                                     fullWidth
        //                                                                 />
        //                                                             )}
        //                                                         />
        //                                                     </LocalizationProvider>
        //                                                     {/* <DatePickerRelationship
        //                                                         name={`familyRelationships[${index}].birthDate`}
        //                                                         label="Ngày sinh"
        //                                                         index={index}
        //                                                         value={value?.birthDate}
        //                                                     /> */}
        //                                                 </Grid>
        //                                                 <Grid item xs={6}>
        //                                                     {/* <Autocomplete
        //                                                         disablePortal
        //                                                         id="combo-box-demo"
        //                                                         options={familyRelationshipList}
        //                                                         getOptionLabel={option => option.name}
        //                                                         sx={{ width: 270 }}
        //                                                         renderInput={(params) => <TextField
        //                                                             {...params}
        //                                                             //  name={`familyRelationships.${index}.familyRelationship`}
        //                                                             label="Quan hệ" />}familyRelationship
        //                                                     /> */}
        //                                                     <AutocompleteRelationship
        //                                                         name={`familyRelationships.${index}.familyRelationship`}
        //                                                         index={index}
        //                                                         value={value?.familyRelationship}
        //                                                     />
        //                                                     {/* <Autocomplete
        //                                                         disablePortal
        //                                                         id="combo-box-demo"
        //                                                         options={familyRelationshipList}
        //                                                         getOptionLabel={option => option.name}
        //                                                         getOptionSelected={(option, value) => option?.id === value?.id}
        //                                                         onChange={(e, value) => {
        //                                                             setSelectedNationality(value);
        //                                                         }}
        //                                                         sx={{ width: 270 }}
        //                                                         renderInput={(params) => 
        //                                                         <TextField {...params} 
        //                                                          label="Quan hệ" />}
        //                                                     /> */}
        //                                                     {/* <GlobitsAutoComplete

        //                                                         options={familyRelationshipList}
        //                                                         onChange={(newValue) => {
        //                                                             setFieldValue(
        //                                                                 "department",
        //                                                                 newValue
        //                                                             );
        //                                                             setValue(newValue);
        //                                                         }}
        //                                                         getOptionLabel={option => option.name}
        //                                                         name={`familyRelationships.${index}.familyRelationship`}
        //                                                     /> */}
        //                                                 </Grid>
        //                                             </Grid>
        //                                             <Grid container>
        //                                                 <GlobitsTextField
        //                                                     id="address"
        //                                                     name={`familyRelationships.${index}.address`}
        //                                                     label="Địa chỉ"
        //                                                 />
        //                                             </Grid>
        //                                             <Grid container>
        //                                                 <GlobitsTextField
        //                                                     id="description"
        //                                                     name={`familyRelationships.${index}.description`}
        //                                                     label="Mô tả"
        //                                                 />
        //                                             </Grid>
        //                                         </Grid>
        //                                     </div>
        //                                 )
        //                             )}
        //                             <Grid
        //                                 style={{ marginTop: "10px" }}
        //                                 container
        //                                 spacing={2}
        //                                 justifyContent="flex-end"
        //                             >
        //                                 <Grid item>
        //                                     {" "}
        //                                     <Button
        //                                         variant="contained"
        //                                         type="submit"
        //                                     // onClick={() => {
        //                                     //     history.push(
        //                                     //         ConstantList.ROOT_PATH +
        //                                     //             "category/staff"
        //                                     //     );
        //                                     // }}
        //                                     >
        //                                         Lưu quan hệ nhân thân
        //                                     </Button>
        //                                 </Grid>
        //                             </Grid>
        //                         </Box>
        //                     )}
        //                 />
        //             </Form>
        //         )
        //         }
        //     />
        // </Box >
        <FieldArray
            name="familyRelationships"
            render={(arrayHelpers) => (
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            arrayHelpers.push({
                                // fullName: "",
                                // profession: "",
                                // birthDate
                                // familyRelationship: null,
                                // address: "",
                                // description: "",
                                fullName: "",
                                profession: "",
                                birthDay: null,
                                familyRelationship: null,
                                address: "",
                                description: "",
                            });
                        }}
                        style={{ marginBottom: "8px" }}
                    >
                        {/* show this when user has removed all friends from the list */}
                        Thêm mới
                    </Button>

                    {values.familyRelationships.map(
                        (familyRelationship, index) => (
                            <div key={index}>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={1}
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "center",
                                        }}
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            style={{
                                                color: "#f44336",
                                            }}
                                            onClick={() =>
                                                arrayHelpers.remove(
                                                    index
                                                )
                                            } // remove a friend from the list
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        {/* <IconButton
                                                            // aria-label="submit"
                                                            type="submit"
                                                            style={{
                                                                color: "#4caf50",
                                                            }}
                                                            onClick={() =>
                                                                arrayHelpers.insert(
                                                                    index,
                                                                    ""
                                                                )
                                                            } // insert an empty string at a position
                                                        >
                                                            <CheckIcon />
                                                        </IconButton> */}
                                    </Grid>
                                    <Grid container spacing={2}>

                                        <Grid item xs={6}>
                                            <GlobitsTextField
                                                id="fullName"
                                                name={`familyRelationships.${index}.fullName`}
                                                label="Tên"
                                            // value={values?.idNumber || ""}
                                            />
                                            {/* <TextField
                                                                fullWidth
                                                                id="fullName"
                                                                onChange={handleChange}
                                                                name={`familyRelationships.${index}.fullName`}
                                                                label="Tên"
                                                                margin="dense"
                                                                value={values?.fullName || ""}


                                                            /> */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GlobitsTextField
                                                id="profession"
                                                name={`familyRelationships.${index}.profession`}
                                                label="Nghề nghiệp"


                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            {/* <GlobitsTextField
                                                                id="birthDate"
                                                                name={`familyRelationships.${index}.birthDate`}
                                                                type="date"
                                                            /> */}
                                            {/* <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    label="Ngày sinh"
                                                    value={values?.birthDay}
                                                    // inputFormat="YYYY-MM-DD"
                                                    name={`familyRelationships.${index}.birthDay`}
                                                    index={index}
                                                    onChange={(newValue) => {
                                                        setFieldValue(
                                                            "birthDay",
                                                            newValue
                                                        );
                                                        setValue(newValue);
                                                    }}
                                                    // name="foundedDate"
                                                    renderInput={(params) => (
                                                        <GlobitsTextField
                                                            {...params}

                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider> */}
                                            <DatePickerRelationship
                                                name={`familyRelationships[${index}].birthDate`}
                                                label="Ngày sinh"
                                                // index={index}
                                                value={familyRelationship?.birthDate}
                                            />
                                            {/* <DatePickerRelationship
                                                                name={`familyRelationships[${index}].birthDate`}
                                                                label="Ngày sinh"
                                                                index={index}
                                                                value={value?.birthDate}
                                                            /> */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* <Autocomplete
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                options={familyRelationshipList}
                                                                getOptionLabel={option => option.name}
                                                                sx={{ width: 270 }}
                                                                renderInput={(params) => <TextField
                                                                    {...params}
                                                                    //  name={`familyRelationships.${index}.familyRelationship`}
                                                                    label="Quan hệ" />}familyRelationship
                                                            /> */}
                                            {/* <FamilyRelationshipAutocomplete
                                                name={`familyRelationships[${index}].familyRelationship`}
                                                index={index}
                                                value={value?.familyRelationship}
                                            /> */}
                                            <FamilyRelationshipAutocomplete
                                                name={`familyRelationships[${index}].familyRelationship`}
                                                // index={index}
                                                value={familyRelationship?.familyRelationship}
                                            />
                                            {/* <Autocomplete
                                                                disablePortal
                                                                id="combo-box-demo"
                                                                options={familyRelationshipList}
                                                                getOptionLabel={option => option.name}
                                                                getOptionSelected={(option, value) => option?.id === value?.id}
                                                                onChange={(e, value) => {
                                                                    setSelectedNationality(value);
                                                                }}
                                                                sx={{ width: 270 }}
                                                                renderInput={(params) => 
                                                                <TextField {...params} 
                                                                 label="Quan hệ" />}
                                                            /> */}
                                            {/* <GlobitsAutoComplete

                                                                options={familyRelationshipList}
                                                                onChange={(newValue) => {
                                                                    setFieldValue(
                                                                        "department",
                                                                        newValue
                                                                    );
                                                                    setValue(newValue);
                                                                }}
                                                                getOptionLabel={option => option.name}
                                                                name={`familyRelationships.${index}.familyRelationship`}
                                                            /> */}
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <GlobitsTextField
                                            id="address"
                                            name={`familyRelationships.${index}.address`}
                                            label="Địa chỉ"
                                        />
                                    </Grid>
                                    <Grid container>
                                        <GlobitsTextField
                                            id="description"
                                            name={`familyRelationships.${index}.description`}
                                            label="Mô tả"
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    )}
                    {/* <Grid
                        style={{ marginTop: "10px" }}
                        container
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Grid item>
                            {" "}
                            <Button
                                variant="contained"
                                type="submit"
                            // onClick={() => {
                            //     history.push(
                            //         ConstantList.ROOT_PATH +
                            //             "category/staff"
                            //     );
                            // }}
                            >
                                Lưu quan hệ nhân thân
                            </Button>
                        </Grid>
                    </Grid> */}
                </Box>
            )}
        />

    );
}
