import { makeAutoObservable } from "mobx";
import {
    pagingEthnicities,
    getEthnics,
    editEthnics,
    createEthnics,
    deleteEthnics,
} from "./EthnicsService";

export default class EthnicsStore {
    ethnicList = [];
    initialEthnic = {
        id: "",
        code: "",
        name: "",
        description: "",
    };
    selectedEthnic = this.initialEthnic;
    totalElements = 0;
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
            let data = await pagingEthnicities(searchObject);
            console.log(data)
            this.ethnicList = data.data.content;
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    updatePageData = (item) => {
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
        this.updatePageData();
    };
    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage((event.target.value));
        console.log(event.target.value);
    };

    // Pagination
    setPage = (page) => {
        this.page = page;
        this.updatePageData();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    // Modal
    handleClose = () => {
        this.selectedEthnic = this.initialEthnic;
        this.openConfirmDialog = false;
        this.openFormDialog = false;
        this.updatePageData();
    };

    // Create
    handleCreateEthnic = () => {
        this.openFormDialog = true;
    };

    createEthnic = async (ethnic) => {
        try {
            await createEthnics(ethnic);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Update
    handleSelectEthnic = (ethnic) => {
        this.selectedEthnic = ethnic;
    };

    getEthnic = async (ethnic) => {
        if (ethnic.id != null) {
            try {
                let data = await getEthnics(ethnic.id);
                this.handleSelectEthnic(data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.handleSelectEthnic = this.initialEthnic;
        }
    };

    handleUpdateEthnic = (id) => {
        this.getEthnic(id).then(() => {
            this.openFormDialog = true;
        });
    };

    editEthnic = async (ethnic) => {
        try {
            await editEthnics(ethnic);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete
    handleDeleteEthnic = (ethnic) => {
        this.openConfirmDialog = true;
        this.selectedEthnic = ethnic;
    };

    deleteEthnic = async (id) => {
        await deleteEthnics(id);
        this.handleClose();
    };
}
