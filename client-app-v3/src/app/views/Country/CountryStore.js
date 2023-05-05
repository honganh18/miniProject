import { makeAutoObservable } from "mobx";
import {
    pagingCountries,
    getCountry,
    createCountry,
    editCountry,
    deleteCountry,
} from "./CountryService";

export default class CountryStore {
    countryList = [];
    initialCountry = {
        id: "",
        code: "",
        name: "",
        description: "",
    };
    selectedCountry = this.initialCountry;
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
            let data = await pagingCountries(searchObject);
            console.log(data)
            this.countryList = data.data.content;
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    updatePageDataCountry = (item) => {
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
        this.updatePageDataCountry();
    };
    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage((event.target.value));
        console.log(event.target.value);
    };

    // Pagination
    setPage = (page) => {
        this.page = page;
        this.updatePageDataCountry();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    // Modal
    handleClose = () => {
        this.selectedCountry = this.initialCountry;
        this.openConfirmDialog = false;
        this.openFormDialog = false;
        this.updatePageDataCountry();
    };

    // Create
    handleCreateCountry = () => {
        this.openFormDialog = true;
    };

    createCountry = async (country) => {
        try {
            await createCountry(country);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Update
    handleSelectCountry = (country) => {
        this.selectedCountry = country;
    };

    getCountry = async (country) => {
        if (country.id != null) {
            try {
                let data = await getCountry(country.id);
                this.handleSelectCountry(data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.handleSelectCountry = this.initialCountry;
        }
    };

    handleUpdateCountry = (id) => {
        this.getCountry(id).then(() => {
            this.openFormDialog = true;
        });
    };

    editCountry = async (country) => {
        try {
            await editCountry(country);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete
    handleDeleteCountry = (country) => {
        this.openConfirmDialog = true;
        this.selectedCountry = country;
    };

    deleteCountry = async (id) => {
        await deleteCountry(id);
        this.handleClose();
    };
}
