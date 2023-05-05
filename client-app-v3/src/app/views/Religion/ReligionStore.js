import { makeAutoObservable } from "mobx";
import {
    pagingReligions,
    getReligion,
    editReligion,
    createReligion,
    deleteReligion,
} from "./ReligionService";

export default class ReligionStore {
    religionList = [];
    initialReligion = {
        id: "",
        code: "",
        name: "",
        description: "",
    };
    selectedReligion = this.initialReligion;
    // totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    loadingInitial = false;
    openFormDialog = false;
    openConfirmDialog = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

    search = async () => {
        this.loadingInitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };
        try {
            let data = await pagingReligions(searchObject);
            this.religionList = data.data.content;
            // this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    updatePageData1 = (item) => {
        if (item != null) {
            this.page = 1;
            this.keyword = item.keyword;
            this.search();
        } else {
            this.search();
        }
    };
    setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
        this.updatePageData1();
    };
    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage((event.target.value));
        console.log(event.target.value);
    };

    // Pagination
    setPage = (page) => {
        this.page = page;
        this.updatePageData1();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    // Modal
    handleClose = () => {
        this.selectedEthnic = this.initialEthnic;
        this.openConfirmDialog = false;
        this.openFormDialog = false;
        this.updatePageData1();
    };

    // Create
    handleCreateReligion = () => {
        this.openFormDialog = true;
    };

    createReligion = async (religion) => {
        try {
            await createReligion(religion);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Update
    handleSelectReligion = (religion) => {
        this.selectedReligion = religion;
    };

    getReligion = async (religion) => {
        if (religion.id != null) {
            try {
                let data = await getReligion(religion.id);
                this.handleSelectReligion(data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.handleSelectReligion = this.initialReligion;
        }
    };

    handleUpdateReligion = (id) => {
        this.getReligion(id).then(() => {
            this.openFormDialog = true;
        });
    };

    editReligion = async (religion) => {
        try {
            await editReligion(religion);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete
    handleDeleteReligion = (religion) => {
        this.openConfirmDialog = true;
        this.selectedReligion = religion;
    };

    deleteReligion = async (id) => {
        await deleteReligion(id);
        this.handleClose();
    };
}
