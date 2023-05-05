import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
import { useStore } from "../../stores";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";

export default function DepartmentAutocomplete({ name, value, ...props }) {
    const { departmentStore } = useStore();
    const {
        departmentList,
        updatePageDataDepartment,

    } = departmentStore;



    const { setFieldValue, values } = useFormikContext();
    const [selectedDepartment, setSelectedDepartment] = useState(value);

    useEffect(() => {
        updatePageDataDepartment();
        setFieldValue(name, selectedDepartment);
    }, [name, selectedDepartment, setFieldValue, updatePageDataDepartment]);

    return (
        <Autocomplete
            // value={values?.department}
            value={value || null}
            options={departmentList}
            getOptionLabel={(option) => option?.name}
            getOptionSelected={(option, value) => option?.id === value?.id}
            onChange={(e, value) => {
                setSelectedDepartment(value);
            }}
            renderInput={(params) => (
                <GlobitsTextField {...params} name={name} label="Phòng ban" />
            )}
        />
    );
}