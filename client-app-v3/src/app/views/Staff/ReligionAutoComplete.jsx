import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
import { useStore } from "../../stores";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";

export default function ReligionAutocomplete({ name, value, ...props }) {
    const { religionStore } = useStore();
    const {
        religionList,
        updatePageData1,

    } = religionStore;


    const { setFieldValue, values } = useFormikContext();
    const [selectedReligion, setSelectedReligion] = useState(value);

    useEffect(() => {
        updatePageData1();
        setFieldValue(name, selectedReligion);
    }, [name, selectedReligion, setFieldValue, updatePageData1]);

    return (
        <Autocomplete
            // value={values?.religion}
            value={value || null}
            options={religionList}
            getOptionLabel={(option) => option?.name}
            getOptionSelected={(option, value) => option?.id === value?.id}
            onChange={(e, value) => {
                setSelectedReligion(value);
            }}
            renderInput={(params) => (
                <GlobitsTextField {...params} name={name} label="Tôn giáo" />
            )}
        />
    );
}