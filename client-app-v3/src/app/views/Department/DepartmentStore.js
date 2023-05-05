
import { update } from "lodash";
import { makeAutoObservable } from "mobx";

import {
    pagingDepartments,
    getDepartment,
    createDepartment,
    editDepartment,
    deleteDepartment,
    checkCode,
} from "./DepartmentService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import i18n from "i18n";
// import { withTranslation, WithTranslation } from 'react-i18next';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
export default class DepartmentStore {
    departmentList = [];
    selectDepartment = [
        {
            label: "",
            value: "",
            children: [],
        },
    ];
    selectedDepartment = this.initDepartment;
    initDepartment = {
        id: "",
        code: "",
        name: "",
        value: "",
        parent: null,
        foundedDate: null,
    };
    selectedParent = this.initDepartment;
    selectedDepartmentList = [];
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingInitial = false;
    openCreateUpdateDialog = false;
    openSelectParentDialog = false;
    openConfirmDeleteDialog = false;
    openConfirmDeleteListDialog = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

    getListItemChild(item) {
        var result = [];
        var root = {};
        root.name = item.name;
        root.code = item.code;
        root.id = item.id;
        root.description = item.description;
        root.displayOrder = item.displayOrder;
        root.foundedDate = item.foundedDate;
        root.parentId = item.parentId;
        root.industryBlock = item.industryBlock;
        root.foundedNumber = item.foundedNumber;
        root.func = item.func;
        root.children = item.children;
        result.push(root);
        if (item.children) {
            item.children.forEach((child) => {
                var childs = this.getListItemChild(child);
                result.push(...childs);
            });
        }
        return result;
    }

    search = async () => {
        this.loadingInitial = true;
        var searchObject = {};
        searchObject.keyword = this.keyword;
        searchObject.pageIndex = this.page;
        searchObject.pageSize = this.rowsPerPage;

        try {
            let data = await pagingDepartments(searchObject);

            var treeValues = [];

            let itemListRes = data.data.content;

            itemListRes.forEach((item) => {
                var items = this.getListItemChild(item);
                treeValues.push(...items);
            });
            this.departmentList = treeValues;
            console.log(treeValues);
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    updatePageDataDepartment = (item) => {
        if (item != null) {
            this.page = 1;
            this.keyword = item.keyword;
            this.search();
        } else {
            this.search();
        }
    };

    setPage = (page) => {
        this.page = page;
        this.updatePageDataDepartment();
    };

    setRowsPerPage = (event) => {
        this.rowsPerPage = event.target.value;
        this.page = 1;
        this.updatePageDataDepartment();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleClose = () => {
        this.openConfirmDeleteDialog = false;
        this.openCreateUpdateDialog = false;
        this.openSelectParentDialog = false;
        this.openConfirmDeleteListDialog = false;
        this.handleSelectDepartment(this.initDepartment);
        this.handleSelectParent(null);
        // this.updatePageDataDepartment();
    };

    handleSelectDepartment = (department) => {
        this.selectedDepartment = department;
    };

    handleSelectDepartmentList = (department) => {
        this.selectedDepartmentList = department;
        console.log(this.selectedDepartmentList);
    };

    getDepartment = async (id) => {
        if (id != null) {
            try {
                let data = await getDepartment(id);
                this.handleSelectDepartment(data.data);
                this.handleSelectParent(data.data.parent);
                console.log(data.data.parent);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.handleSelectDepartment(null);
        }
    };

    // Edit
    handleUpdateDepartment = (id) => {
        this.getDepartment(id).then(() => {
            this.openCreateUpdateDialog = true;
        });
    };

    updateDepartment = async (department) => {
        try {
            await editDepartment(department);
            this.handleClose();
            this.updatePageDataDepartment();
            toast.success("Cập nhật thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật thất bại!");
        }
    };

    // Create
    handleCreateDepartment = () => {
        this.openCreateUpdateDialog = true;
    };

    createDepartment = async (department) => {
        try {
            let responseCheckCode = await checkCode(
                department.id,
                department.code
            );
            if (responseCheckCode.data) {
            } else {
                await createDepartment(department);
                toast.success("Thêm thành công!");
                this.handleClose();
                this.updatePageDataDepartment();
            }
        } catch (error) {
            console.log(error);
            toast.error("Thêm thất bại!");
        }
    };

    // Delete
    handleDeleteDepartment = (department) => {
        this.getDepartment(department.id).then(() => {
            this.openConfirmDeleteDialog = true;
        });
    };

    handleDeleteDepartmentList = () => {
        this.openConfirmDeleteListDialog = true;
    };

    deleteDepartment = async () => {
        try {
            await deleteDepartment(this.selectedDepartment.id);
            this.handleClose();
            this.updatePageDataDepartment();
            toast.success("Xóa thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    };

    deleteDepartmentList = async () => {
        let listDepartment = [];
        for (var i = 0; i < this.selectedDepartmentList.length; i++) {
            try {
                await deleteDepartment(this.selectedDepartmentList[i].id);
                toast.success("Xóa thành công!");
            } catch (error) {
                listDepartment.push(this.selectedDepartmentList[i].name);
                console.log(error);
                toast.error("Xóa thất bại!");
            }
        }
        this.handleClose();
        this.updatePageDataDepartment();
    };

    // select Parent
    handleOpenSelectParent = (department) => {
        this.handleSelectParent(department?.parent);
        this.openSelectParentDialog = true;
        // console.log(department.parent.id);
    };

    handleSelectParent = (parent) => {
        this.selectedParent = parent;
    };

    handleCloseParentDialog = () => {
        this.openSelectParentDialog = false;
        if (!this.selectedParent) {
            this.selectedParent = this.initDepartment;
        }
    };
}
