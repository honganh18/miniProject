import { makeAutoObservable } from "mobx";
import {
    pagingStaff,
    getStaff,
    createStaff,
    editStaff,
    deleteStaff,
} from "./StaffService";

export default class StaffStore {
    staffList = [];
    initStaff = {
        // id: "",
        // lastName: "",
        // firstName: "",
        // displayName: "",
        // gender: "",
        // birthDay: null,
        // value: "",
        // nationality: null,
        // ethnics: null,
        // religion: null,
        // department: null,
        // familyRelationships: [],
        id: "",
        lastName: "",
        firstName: "",
        displayName: "",
        gender: "",
        birthDate: null,
        birthPlace: "",
        permanentResidence: "",
        currentResidence: "",
        email: "",
        phoneNumber: "",
        idNumber: "",
        value: "",
        nationality: null,
        ethnics: null,
        religion: null,
        department: null,
        familyRelationships: [],

    };
    // initialFamilyRelationships = {
    //     fullName: "",
    //     profession: "",
    //     birthDate: "",
    //     familyRelationship: null,
    //     address: "",
    //     description: "",
    //   };
    //   selectedFamilyRelationships = this.initialFamilyRelationships;
    selectedStaff = null;
    // selectedStaff = null;
    selectedStaffList = [];
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    loadingInitial = false;
    openCreateUpdateDialog = false;
    // gender = '';
    openCreateUpdateFamilyRelationship = false;
    openConfirmDialog = false;
    selectedStaffList = [];
    constructor() {
        makeAutoObservable(this);
    }

    search = async () => {
        this.loadingInitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };
        try {
            let data = await pagingStaff(searchObject);
            console.log(data)
            this.staffList = data.data.content;
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    updatePageDataStaff = (item) => {
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
        this.updatePageDataStaff();
    };
    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage((event.target.value));
        console.log(event.target.value);
    };

    // Pagination
    setPage = (page) => {
        this.page = page;
        this.updatePageDataStaff();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };
    handleCreateStaff = () => {
        this.openCreateUpdateDialog = true;
    };
    handleCreateFamilyRelationship = () => {
        this.openCreateUpdateFamilyRelationship = true;
    }
    handleClose = () => {
        this.openCreateUpdateDialog = false;
        this.openCreateUpdateFamilyRelationship = false;
        this.openConfirmDialog = false;
        this.handleSelectStaffList([]);
    }
    // setGender = (gender) => {
    //     this.gender = gender;
    //     this.updatePageDataStaff();
    // };
    // handleChangeGender = (event) => {
    //     this.setGender((event.target.value));
    //     console.log(event.target.value);
    //};
    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

    createStaff = async (staff) => {
        try {
            staff.displayName =
                staff.lastName + (staff.lastName ? " " : "") + staff.firstName;
            // staff.gender = this.gender;
            await createStaff(staff);
            this.handleClose();
            this.updatePageDataStaff();
        } catch (error) {
            console.log(error);
        }
    };
    // Update
    // handleSelectStaff = (staff) => {
    //     this.selectedStaff = staff;
    //     console.log(staff)
    // };

    // getStaff = async (id) => {
    //     if (id != null) {
    //         try {
    //             let data = await getStaff(id);
    //             this.handleSelectStaff(data.data);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         this.handleSelectStaff = this.initStaff;
    //     }
    // };
    getStaff = async (id) => {
        if (id != null) {
            try {
                let data = await getStaff(id);
                this.handleSelectStaff(data.data);
                // this.handleSelectFamilyRelationships(data.data.familyRelationships)
            } catch (error) {
                console.log(error);

            }
        } else {
            this.handleSelectStaff(null);
        }
    };

    handleSelectStaff = (staff) => {
        this.selectedStaff = staff;
    };
    //   handleSelectListStaff = (staffs) => {
    //     this.selectedStaffList = staffs;
    //     // console.log(this.selectedStaffList);
    //   };

    handleSelectStaffList = (staffList) => {
        this.selectedStaffList = staffList;
    };
    //   handleSelectFamilyRelationships = (familyRelationships) => {
    //     this.selectedFamilyRelationships = familyRelationships;
    // };

    handleUpdateStaff = (id) => {
        this.getStaff(id).then(() => {
            this.openCreateUpdateDialog = true;
        });
    };

    editStaff = async (staff) => {
        try {
            staff.displayName =
                staff.lastName + (staff.lastName ? " " : "") + staff.firstName;
            // staff.gender = this.gender;
            await editStaff(staff);
            this.handleClose();
            this.updatePageDataStaff();
        } catch (error) {
            console.log(error);
        }
    };
    // Delete
    handleDeleteStaff = (staff) => {
        this.openConfirmDialog = true;
        this.selectedStaff = staff;
        console.log(staff)
    };

    // deleteStaff = async (id) => {
    //     try {
    //         for (let i = 0; i < this.selectedStaff.length; i++) {
    //             await deleteStaff(this.selectedStaff[i].id);    
    //         }
    //         this.handleClose();
    //         this.updatePageDataStaff();
    //     } catch (error) {
    //         console.log(error);

    //     }
    //     // for (let i = 0; i < this.selectedStaff.length; i++) {
    //     //     await deleteStaff(this.selectedStaff[i].id);    
    //     // }
    //     // this.handleClose();
    //     // this.updatePageDataStaff();
    // };
    deleteStaff = async () => {
        try {
            await deleteStaff(this.selectedStaff.id);
            this.handleClose();
            this.updatePageDataStaff();

        } catch (error) {
            console.log(error);

        }
    };


}