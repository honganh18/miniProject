import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@material-ui/core";
import CreateUpdateDialog from "./CreateUpdateDialog";
import ConfirmDialog from "./ConfirmDialog";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MaterialTable from "material-table";

function MaterialButton({ handleUpdateProject, handleDeleteProject }) {
    return (
        <div>
            <IconButton
                color="primary"
                aria-label="edit"
                onClick={handleUpdateProject}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                style={{ color: "#f44336" }}
                aria-label="delete"
                onClick={handleDeleteProject}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
}

export default observer(function ProjectList() {
    const { projectStore } = useStore();
    const {
        projectList,
        totalPages,
        updatePageData,
        handleCreateProject,
        openFormDialog,
        handleClose,
        handleUpdateProject,
        handleDeleteProject,
        deleteProject,
        openConfirmDialog,
        handleChangePage,
        handleChangeRowsPerPage,
        search,

    } = projectStore;

    useEffect(() => {
        updatePageData();
    }, [updatePageData]);
    const columns = [
        {
            title: "Thao tác",
            field: "type",
            render: (rows) => (
                <MaterialButton
                    handleUpdateProject={() => {
                        handleUpdateProject(rows?.id);
                        // console.log("parentId", rows.parentId);
                    }}
                    handleDeleteProject={() => {
                        handleDeleteProject(rows);
                    }}
                // rows={rows}
                />
            ),
        },
        { title: 'Mã dự án', field: 'code' },
        { title: 'Tên dự án', field: 'name' },
        { title: 'Mô tả', field: 'description' },
        { title: 'Nhân viên', field: 'projectStaff' },
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
                        onClick={handleCreateProject}
                    >
                        Thêm dự án
                    </Button>
                </Grid>
                <Grid xs={12} sm={6} md={6} style={{ marginBottom: "8px" }}>
                    {/* <EthnicsSearch search={updatePageData} /> */}
                </Grid>
            </Grid>
            {/* <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Mã dự án
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Tên dân tộc
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Mô tả
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ethnicList?.map((ethnic) => (
                                <TableRow
                                    key={ethnic.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{ethnic.code}</TableCell>
                                    <TableCell>{ethnic.name}</TableCell>
                                    <TableCell>{ethnic.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            onClick={() => {
                                                handleUpdateEthnic(ethnic);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ color: "#f44336" }}
                                            aria-label="delete"
                                            onClick={() => {
                                                handleDeleteEthnic(ethnic);
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
                data={projectList}
                columns={columns}
                // onSelectionChange={(rows) => {
                //     handleSelectStaffList(rows);
                // }}
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
                open={openFormDialog}
                handleClose={handleClose}
            />
            <ConfirmDialog
                handleOpen={openConfirmDialog}
                handleClose={handleClose}
                handleDeleteProject={deleteProject}
            />
            {/* </Paper> */}
        </Box>
    );
});
