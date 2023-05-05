import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@material-ui/core";
// import CreateUpdateDialog from "./CreateUpdateDialog";
// import ConfirmDialog from "./ConfirmDialog";
// import EthnicsSearch from "./EthnicsSearch";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CreateUpdateDialog from "./CreateUpdateDialog";
import ConfirmDialog from "./ConfirmDialog";
import MaterialTable from "material-table";
function MaterialButton({ handleUpdateStaff, handleDeleteStaff }) {
    return (
        <div>
            <IconButton
                color="primary"
                aria-label="edit"
                onClick={handleUpdateStaff}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                style={{ color: "#f44336" }}
                aria-label="delete"
                onClick={handleDeleteStaff}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
}

export default observer(function StaffList() {
    const { staffStore } = useStore();
    const {
        openCreateUpdateDialog,
        openConfirmDialog,
        handleCreateStaff,
        handleClose,
        handleChangeRowsPerPage,
        handleChangePage,
        totalPages,
        rowsPerPage,
        updatePageDataStaff,
        staffList,
        handleSelectListStaff,
        handleUpdateStaff,
        handleDeleteStaff,
        deleteStaff,
        handleSelectStaffList
    } = staffStore;

    useEffect(() => {
        console.log(staffList)
        updatePageDataStaff();
    }, [updatePageDataStaff]);
    const columns = [
        {
            title: "Thao tác",
            field: "type",
            render: (rows) => (
                <MaterialButton
                    handleUpdateStaff={() => {
                        handleUpdateStaff(rows?.id);
                        // console.log("parentId", rows.parentId);
                    }}
                    handleDeleteStaff={() => {
                        handleDeleteStaff(rows);
                    }}
                // rows={rows}
                />
            ),
        },
        { title: 'Họ tên', field: 'displayName' },
        { title: 'Giới tính', field: 'gender' },
        { title: 'Ngày sinh', field: 'birthDay' },
    ]
    return (
        <Box sx={{ padding: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginBottom: 10 }}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    style={{ marginBottom: "8px" }}
                >
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={handleCreateStaff}
                    >
                        Thêm Nhân viên
                    </Button>
                </Grid>
                <Grid xs={12} sm={6} md={6} style={{ marginBottom: "8px" }}>
                    {/* <EthnicsSearch search={updatePageData} /> */}
                </Grid>
            </Grid>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                {/* <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Tên
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Nghề nghiệp
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                   Ngày sinh
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                   Quan hệ
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                   Địa chỉ
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Mô tả
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffList?.map((staff) => (
                                <TableRow
                                    key={staff.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{staff.displayName}</TableCell>
                                    <TableCell>{staff.gender}</TableCell>
                                    <TableCell>{staff.birthDay}</TableCell>
                                    <TableCell>{staff.national}</TableCell>
                                    <TableCell>{staff.familyRelationships}</TableCell>
                                    <TableCell>{staff.id}</TableCell>
                                    
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            onClick={() => {
                                                handleUpdateStaff(staff.id);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ color: "#f44336" }}
                                            aria-label="delete"
                                            onClick={() => {
                                                handleDeleteStaff(staff);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <MaterialTable
                    // selection
                    data={staffList}
                    // handleSelectList={handleSelectListStaff}
                    columns={columns}
                    // totalPages={totalPages}
                    // handleChangePage={handleChangePage}
                    // setRowsPerPage={setRowsPerPage}
                    // pageSize={rowsPerPage}
                    // pageSizeOption={[1, 2, 3, 5, 10, 25]}
                    // totalElements={totalElements}
                    // page={page}
                    onSelectionChange={(rows) => {
                        handleSelectStaffList(rows);
                    }}
                    options={{
                        sorting: true,
                        paging: false,
                        paginationType: "stepped",
                        search: false,
                        toolbar: false,
                        selection: false,
                    }}
                />
                <Grid
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
                </Grid>
                <CreateUpdateDialog
                    open={openCreateUpdateDialog}
                    handleClose={handleClose}
                />
                <ConfirmDialog
                    handleOpen={openConfirmDialog}
                    handleClose={handleClose}
                    handleDeleteStaff={deleteStaff}
                />
            </Paper>
        </Box>
    );
});
