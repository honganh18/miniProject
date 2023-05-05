// import React, { useEffect, useState } from "react";
// import { pagingCountries, deleteCountry, editCountry, createCountry } from "./CountryService";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Edit from "./Edit";
// import Add from "./Add";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';


// import Pagination from '@mui/material/Pagination';
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";




// export default function CountryIndex() {
//   const [countries, setCountries] = useState();
//   const initCountry = {
//     id: "",
//     name: "",
//     code: "",
//     description: "",
//   };
//   const [openPopup, setOpenPopup] = React.useState(false);
//   const [openAdd, setOpenAdd] = React.useState(false);
//   const [totalPages, setTotalPages] = React.useState(0);

//   const [currentCountry, setCurrentCountry] = useState(initCountry);

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   // async function loadCountries() {
//   //   let searchObject = {
//   //     pageIndex: 1,
//   //     pageSize: 25,
//   //   };
//   //   let data = await pagingCountries(searchObject);
//   //   setCountries(data.data.content);
//   // }
//   async function loadCountries() {
//     let searchObject = {
//       pageIndex: page,
//       pageSize: rowsPerPage,
//     };
//     let data = await pagingCountries(searchObject);
//     // setTotalElement(data.data.totalElements)
//     setCountries(data.data.content);
//     setTotalPages(data.data.totalPages)
//     console.log(data);
//   }
//   const handleRemove = async (currCountry) => {
//     console.log(currCountry);
//     let confirm = `Bạn có muốn xóa  ${currCountry.name} không?`;
//     if (window.confirm(confirm) === true) {
//       await deleteCountry(currCountry.id);
//       loadCountries();
//     }
//   };

//   const handleEdit = async (currCountry) => {
//     console.log(currCountry.name);
//     await editCountry(currCountry);
//     setOpenPopup(false);
//     setCurrentCountry(initCountry);
//     loadCountries();
//   };
//   const handleAdd = async (newcountry) => {
//     await createCountry(newcountry)
//     setOpenAdd(false)

//     loadCountries()
//   }

//   const [page, setPage] = React.useState(1);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   // const [totalElement, setTotalElement] = useState(0)
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage((event.target.value));
//     console.log(event.target.value);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   useEffect(() => {
//     loadCountries();
//   }, [page, rowsPerPage,]);

//   const [keywords, setKeywords] = useState('')
//   const handleSearch = async (keywords) => {
//     let searchObject = {
//       keyword: keywords.keyword,
//       pageIndex: page,
//       pageSize: rowsPerPage,
//     };
//     let data = await pagingCountries(searchObject);
//     setCountries(data.data.content);
//   };

//   return (
//     <div>

//       <div
//         className="search"
//         style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
//       >
//         <input
//           placeholder="Nhập từ khóa"
//           style={{
//             borderTop: "2px solid #E4E4E4",
//             borderLeft: "2px solid #E4E4E4",
//             borderBottom: "2px solid #E4E4E4",
//             borderRight: "none ",
//             outline: "none",
//             padding: "6px",
//             width: "500px",
//             borderBottomLeftRadius: "4px",
//             borderTopLeftRadius: "4px",
//           }}
//           type="text"
//           onChange={(e) => setKeywords(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               var searchObject = {}
//               searchObject.keyword = keywords
//               handleSearch(searchObject)
//             }
//           }}
//         />
//         <span
//           style={{
//             color: "#fff",
//             backgroundColor: "#01C0C8",
//             width: "30px",
//             textAlign: "center",
//             borderBottomRightRadius: "4px",
//             borderTopRightRadius: "4px",
//           }}
//         >
//           <SearchIcon sx={{ mt: "4px" }} />
//         </span>
//       </div>
//       <Button
//         sx={{ marginBottom: 2, marginTop: 2 }}
//         variant="contained"
//         endIcon={<AddIcon />}
//         onClick={() => {
//           setOpenAdd(true);
//         }}
//       >
//         Add New Country
//       </Button>

//       <TableContainer sx={{ width: "100%", overflow: "hidden" }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ fontWeight: "bold" }}>Code</TableCell>
//               <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
//               <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
//               <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {countries?.map((country) => (
//               <TableRow
//                 key={country.id}
//                 sx={{
//                   "&:last-child td, &:last-child th": {
//                     border: 0,
//                   },
//                 }}
//               >
//                 <TableCell>{country.code}</TableCell>
//                 <TableCell>{country.name}</TableCell>
//                 <TableCell>{country.description}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     aria-label="edit"
//                     onClick={() => {
//                       setCurrentCountry(country);
//                       setOpenPopup(true);
//                     }}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     style={{ color: "#f44336" }}
//                     aria-label="delete"
//                     onClick={() => handleRemove(country)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       { }
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <p>Số hàng mỗi trang</p>
//         <FormControl sx={{ m: 1 }} variant="standard">
//           <Select
//             labelId="demo-customized-select-label"
//             id="demo-customized-select"

//             onChange={handleChangeRowsPerPage}

//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={20}>20</MenuItem>
//             <MenuItem value={30}>30</MenuItem>
//           </Select>
//         </FormControl>

//         <Pagination
//           onChange={handleChangePage}
//           count={totalPages}
//           showFirstButton
//           showLastButton
//           sx={{ marginBottom: 2 }}
//         />

//       </div>
//       <Edit
//         open={openPopup}
//         country={currentCountry}
//         handleClose={() => setOpenPopup(false)}
//         handleEdit={handleEdit}
//       />
//       <Add
//         open={openAdd}
//         handleClose={() => setOpenAdd(false)}
//         handleAdd={handleAdd}
//       />
//     </div >
//   );
// }
import React from 'react'
import CountryList from './CountryList'

const CountryIndex = () => {
  return (
    <div>
      <CountryList/>
    </div>
  )
}

export default CountryIndex
