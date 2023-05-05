// import React, { useEffect, useState } from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// // import MyTextField from "../TextField/MyTextField";
// import { useStore } from "../../stores";
// import { useFormikContext } from "formik";
// import GlobitsTextField from "./GlobitsTextField";

// export default function AutocompleteRelationship({ name, ...props }) {
//     const { familyRelationshipStore } = useStore();
//     const { familyRelationshipList,
//          updatePageDataFamilyRelationship } = familyRelationshipStore;
//     const { setFieldValue, values } = useFormikContext();
//     const [selectedFamilyRelationship, setSelectedFamilyRelationship] = useState(null);

//     useEffect(() => {
//         updatePageDataFamilyRelationship();
//         setFieldValue(name, selectedFamilyRelationship);
//     }, [name, selectedFamilyRelationship, setFieldValue, updatePageDataFamilyRelationship]);

//     return (
//         <Autocomplete
//             // value={values?.nationality}
//             options={familyRelationshipList}
//             getOptionLabel={(option) => option?.name}
//             getOptionSelected={(option, value) => option?.id === value?.id}
//             onChange={(e, value) => {
//                 setSelectedFamilyRelationship(value);
//             }}
//             renderInput={(params) => (
//                 <GlobitsTextField {...params} name={name} label="Quan hệ" />
//             )}
//         />
//     );
// }
