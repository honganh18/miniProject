import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Box, Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";
// import AutocompleteRelationship from "./AutocompleteRelationship";
import { useStore } from "../../stores";
import DeleteIcon from "@material-ui/icons/Delete";

import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@material-ui/core";
import FamilyRelationshipAutocomplete from "./FamilyRelationshipAutocomplete";
import DatePickerRelationship from "./DatePickerRelationship";
// import DatePickerRelationship from "./DatePickerRelationship";

function Row(props) {
    const { index, arrayHelpers, value, setFieldValue } = props;
    return (
        <TableRow key={index}>
            <TableCell item xs={3}>
                <GlobitsTextField
                    id="fullName"
                    name={`familyRelationships[${index}].fullName`}
                />
            </TableCell>
            <TableCell>
                <GlobitsTextField
                    id="profession"
                    name={`familyRelationships[${index}].profession`}
                />
            </TableCell>
            <TableCell>
                <DatePickerRelationship
                    name={`familyRelationships[${index}].birthDate`}
                    label="Ngày sinh"
                    index={index}
                    value={value?.birthDate}
                />
            </TableCell>
            <TableCell>
                <FamilyRelationshipAutocomplete
                    name={`familyRelationships[${index}].familyRelationship`}
                    index={index}
                    value={value?.familyRelationship}
                />
            </TableCell>
            <TableCell>
                <GlobitsTextField
                    id="address"
                    name={`familyRelationships[${index}].address`}
                />
            </TableCell>
            <TableCell>
                <GlobitsTextField
                    id="description"
                    name={`familyRelationships[${index}].description`}
                />
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="delete"
                    style={{
                        color: "#f44336",
                    }}
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

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
    const { values, setFieldValue } = useFormikContext();

    return (
        <>
            <FieldArray
                name="familyRelationships"
                render={(arrayHelpers) => (
                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() =>
                                arrayHelpers.push({
                                    fullName: "",
                                    profession: "",
                                    birthDate: null,
                                    familyRelationship: null,
                                    address: "",
                                    description: "",
                                })
                            }
                            style={{ marginBottom: "8px" }}
                        >
                            {/* show this when user has removed all friends from the list */}
                            Thêm mới
                        </Button>
                        <Box>
                            <Table style={{ tableLayout: "auto" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Họ và tên</TableCell>
                                        <TableCell>Nghề nghiệp</TableCell>
                                        <TableCell>Ngày sinh</TableCell>
                                        <TableCell>Quan hệ</TableCell>
                                        <TableCell>Địa chỉ</TableCell>
                                        <TableCell>Mô tả</TableCell>
                                        <TableCell
                                            style={{
                                                width: "10%",
                                                textAlign: "center",
                                            }}
                                        ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {values?.familyRelationships?.map(
                                        (familyRelationship, index) => (
                                            <Row
                                                value={familyRelationship}
                                                index={index}
                                                arrayHelpers={arrayHelpers}
                                            />
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                )}
            />
        </>
    );
}
