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
import Search from "./Search";


export default observer(function FamilyRelationshipList() {
    const { familyRelationshipStore } = useStore();
    const {
        familyRelationshipList,
        totalPages,
        updatePageDataFamilyRelationship,
        handleCreateFamilyRelationship,
        openFormDialog,
        handleClose,
        handleUpdateFamilyRelationship,
        handleDeleteFamilyRelationship,
        deleteFamilyRelationship,
        openConfirmDialog,
        handleChangePage,
        handleChangeRowsPerPage,
    } = familyRelationshipStore;

    useEffect(() => {
        updatePageDataFamilyRelationship();
    }, [updatePageDataFamilyRelationship]);

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
                        onClick={handleCreateFamilyRelationship}
                    >
                        Thêm FamilyRelationship
                    </Button>
                </Grid>
                <Grid xs={12} sm={6} md={6} style={{ marginBottom: "8px" }}>
                    <Search search={updatePageDataFamilyRelationship} />
                </Grid>
            </Grid>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Mã FamilyRelationship
                                </TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                    Tên FamilyRelationship
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
                            {familyRelationshipList?.map((familyRelationship) => (
                                <TableRow
                                    key={familyRelationship.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{familyRelationship.code}</TableCell>
                                    <TableCell>{familyRelationship.name}</TableCell>
                                    <TableCell>{familyRelationship.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            onClick={() => {
                                                handleUpdateFamilyRelationship(familyRelationship);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ color: "#f44336" }}
                                            aria-label="delete"
                                            onClick={() => {
                                                handleDeleteFamilyRelationship(familyRelationship);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                    handleDeleteFamilyRelationshipc={deleteFamilyRelationship}
                />
            </Paper>
        </Box>
    );
});
