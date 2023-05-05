// import React, { useEffect, useState } from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// // import MyTextField from "../TextField/MyTextField";
// import { useStore } from "../../stores";
// import { useFormikContext } from "formik";
// import GlobitsTextField from "./GlobitsTextField";

// export default function NationalAutocomplete({ name, value, ...props }) {
//     const { countryStore } = useStore();
//     const {
//         countryList,
//         updatePageDataCountry,

//     } = countryStore;
//     const { setFieldValue, values } = useFormikContext();
//     console.log(values)
//     const [selectedNational, setSelectedNational] = useState(null);

//     useEffect(() => {
//         updatePageDataCountry();
//         setFieldValue(name, selectedNational);
//     }, [name, selectedNational, setFieldValue, updatePageDataCountry]);

//     return (
//         <Autocomplete
//             value={value || null}
//             // value={values?.nationality}
//             options={countryList}
//             getOptionLabel={(option) => option?.name}
//             getOptionSelected={(option, value) => option?.id === value?.id}
//             onChange={(e, value) => {
//                 setSelectedNational(value);
//             }}
//             renderInput={(params) => (
//                 <GlobitsTextField {...params} name={name} label="Quốc tịch" />
//             )}
//         />
//     );
// }
import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
import { useStore } from "../../stores";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";

export default function AutocompleteNationality({ name, value, ...props }) {
    const { countryStore } = useStore();
    const { countryList, updatePageDataCountry } = countryStore;
    const { setFieldValue, values } = useFormikContext();
    const [selectedNationality, setSelectedNationality] = useState(value);

    useEffect(() => {
        updatePageDataCountry();
        setFieldValue(name, selectedNationality);
    }, [name, selectedNationality, setFieldValue, updatePageDataCountry]);

    return (
        <Autocomplete
            // value={values?.nationality}
            value={value || null}
            options={countryList}
            getOptionLabel={(option) => option?.name}
            getOptionSelected={(option, value) => option?.id === value?.id}
            onChange={(e, value) => {
                setSelectedNationality(value);
            }}
            renderInput={(params) => (
                <GlobitsTextField {...params} name={name} label="Đất nước" />
            )}
        />
    );
}
