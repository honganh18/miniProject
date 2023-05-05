import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
import { useStore } from "../../stores";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";

export default function EthnicsAutocomplete({ name, value, ...props }) {
    const { ethnicsStore } = useStore();
    const {
        ethnicList,
        updatePageData,


    } = ethnicsStore;


    const { setFieldValue, values } = useFormikContext();
    const [selectedEthnic, setSelectedEthnic] = useState(value);

    useEffect(() => {
        updatePageData();
        setFieldValue(name, selectedEthnic);
    }, [name, selectedEthnic, setFieldValue, updatePageData]);

    return (
        <Autocomplete
            // value={values?.ethnics}
            value={value || null}
            options={ethnicList}
            getOptionLabel={(option) => option?.name}
            getOptionSelected={(option, value) => option?.id === value?.id}
            onChange={(e, value) => {
                setSelectedEthnic(value);
            }}
            renderInput={(params) => (
                <GlobitsTextField {...params} name={name} label="Dân tộc" />
            )}
        />
    );
}