import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
// import DepartmentSearch from "./DepartmentSearch.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import { Grid } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
// import CreateUpdateDialog from "./CreateUpdateDialog";
import MaterialTable from "material-table";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ParentSearch from "./ParentSearch";

export default observer(function ProjectStaffList(props) {
    const { projectStore } = useStore();
    const {
        selectedParent,
        handleSelectParent,
        handleCloseParentDialog,
        updatePageData,
        handleSelectDepartment,
        handleChangeRowsPerPage,
        totalPages,
        handleChangePage,
    } = projectStore;
    const [parent, setParent] = useState({});

    useEffect(() => {
        if (selectedParent) setParent(selectedParent);
    }, [selectedParent, parent]);

    const columns = [
        // {
        //     title: "",
        //     render: (rowData) => (
        //         <Radio
        //             id={`radio${rowData.id}`}
        //             name="radSelected"
        //             value={rowData}
        //             checked={parent?.id === rowData.id}
        //             onClick={() => {
        //                 handleSelectParent(rowData);
        //             }}
        //         />
        //     ),
        // },
        { title: "Mã phòng ban", field: "code" },
        { title: "Tên phòng ban", field: "name" },
        { title: "Mô tả", field: "description" },
    ];

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Lựa chọn phòng ban</DialogTitle>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer
                        sx={{ maxHeight: 280, width: 600, height: 280 }}
                    >
                        {/* <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item style={{ paddingTop: 15 }}>
                                <ParentSearch search={updatePageData} />
                            </Grid>
                        </Grid> */}
                        <MaterialTable
                            title="Basic Tree Data Preview"
                            data={props.data}
                            columns={columns}
                            parentChildData={(row, rows) =>
                                rows.find((a) => a.id === row.parentId)
                            }
                            // onRowClick={(e, row) => {
                            //     console.log(row.id);
                            // }}
                            // onSelectionChange={(rows) => {
                            //     // handleSelectParent(rows);
                            //     let parent = JSON.parse(JSON.stringify(rows));
                            //     handleSelectParent(parent[0]);
                            //     console.log("Parent Selected", parent[0]);
                            // }}
                            options={{
                                sorting: true,
                                paging: false,
                                paginationType: "stepped",
                                search: false,
                                toolbar: false,
                                selection: true,
                            }}
                        />
                    </TableContainer>

                    < Grid Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={12}
                md={12}
                sm={12}
            >
                <p>Số hàng mỗi trang</p>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"

                        onChange={handleChangeRowsPerPage}

                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    onChange={handleChangePage}
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    sx={{ marginBottom: 2 }}
                />
            </ Grid>
                        {/* <ConfirmDialog
                        handleOpen={openConfirmDialog}
                        handleClose={handleClose}
                        handleDeleteCountry={deleteCountry}
                    /> */}
                    
                    <DialogActions>
                        <Button
                            onClick={() => {
                                // resetForm();
                                handleCloseParentDialog();
                            }}
                        >
                            Hủy
                        </Button>
                        {/* {button} */}
                        <Button
                            onClick={() => {
                                props.setFieldValue("parent", parent);
                                console.log(parent?.name);
                                handleCloseParentDialog();
                            }}
                        >
                            LƯU
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    );
});
