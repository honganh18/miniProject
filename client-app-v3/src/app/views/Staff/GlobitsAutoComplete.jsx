import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import GlobitsTextField from "./GlobitsTextField";

export default function GlobitsAutoComplete(props) {
    const {
        name,
        options,
        api,
        variant = "outlined",
        size = "small",
        // searchObject,
        // label,
        // sortOptions,
        
        field,
        meta,
        setFieldValue,
        onChange,
        // getOptionSelected,
        getOptionLabel,

        ...otherProps
    } = props;
    return (
        <Autocomplete
            {...field}
            {...otherProps}
            onChange={onChange}
            id={name}
            getOptionLabel={getOptionLabel}
            options={options}
            renderInput={(params) => (
                <GlobitsTextField
                    {...params}
                />)}

        />
    )

}
