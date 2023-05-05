import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
import { useStore } from "../../stores";
import { useFormikContext } from "formik";
import GlobitsTextField from "./GlobitsTextField";

export default function FamilyRelationshipAutocomplete({name,
    value,
    index, ...props }) {
    const { familyRelationshipStore } = useStore();
    const {
        familyRelationshipList,

        updatePageDataFamilyRelationship,

    } = familyRelationshipStore;

    // useEffect(() => {
    //     console.log(familyRelationshipList)
    //     updatePageDataFamilyRelationship();
    // }, [updatePageDataFamilyRelationship]);

    const { setFieldValue, values } = useFormikContext();
    const [selectedFamilyRelationship, setSelectedFamilyRelationship] = useState(value);

    useEffect(() => {
        console.log(familyRelationshipList)
        updatePageDataFamilyRelationship();
        setFieldValue(name, selectedFamilyRelationship);
    }, [name, selectedFamilyRelationship, setFieldValue, updatePageDataFamilyRelationship]);
    // useEffect(() => {
    //     if (selectedParent) setParent(selectedParent);
    // }, [selectedParent, parent]);
    return (
        <Autocomplete
        value={value || null}
            options={familyRelationshipList}
            getOptionLabel={(option) => option?.name}
            getOptionSelected={(option, value) => option?.id === value?.id}
            onChange={(e, value) => {
                setSelectedFamilyRelationship(value);
            }}
            renderInput={(params) => (
                <GlobitsTextField {...params} name={name} label="Quan hệ" />
            )}
        />
    );
}
// import React, { useEffect, useState } from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import MyTextField from "../TextField/MyTextField";
// import { useStore } from "../../../stores";
// import { useFormikContext } from "formik";
// import GlobitsTextField from "./GlobitsTextField";

// export default function AutocompleteRelationship({
    // name,
    // value,
    // index,
//     ...props
// }) {
//     const { familyRelationshipStore } = useStore();
//     const { familyRelationshipList, updatePageData } = familyRelationshipStore;
//     const { setFieldValue, values } = useFormikContext();
//     const [selectedNationality, setSelectedNationality] = useState(value);

//     useEffect(() => {
//         updatePageData();
//         setFieldValue(name, selectedNationality);
//     }, [name, selectedNationality, setFieldValue, updatePageData]);

//     return (
//         <Autocomplete
//             value={value || null}
//             options={familyRelationshipList}
//             getOptionLabel={(option) => option?.name}
//             getOptionSelected={(option, value) => option?.id === value?.id}
//             onChange={(e, value) => {
//                 setSelectedNationality(value);
//             }}
//             renderInput={(params) => (
//                 <GlobitsTextField {...params} name={name} label="Quan hệ" />
//             )}
//         />
//     );
// }
