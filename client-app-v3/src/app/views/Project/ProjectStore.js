import { makeAutoObservable } from "mobx";
import {
    pagingProject,
    getProject,
    editProject,
    createProject,
    deleteProject,
} from "./ProjectService";

export default class ProjectStore {
    projectList = [];
    initialProject = {
        id: "",
        code: "",
        name: "",
        description: "",
        // projectStaff: [],
    };
    selectedProject = this.initialProject;
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
            let data = await pagingProject(searchObject);
            console.log(data)
            this.projectList = data.data.content;
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
        this.selectedProject = this.initialProject;
        this.openConfirmDialog = false;
        this.openFormDialog = false;
        this.updatePageData();
    };

    // Create
    handleCreateProject = () => {
        this.openFormDialog = true;
    };

    createProject = async (project) => {
        try {
            await createProject(project);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Update
    handleSelectProject = (project) => {
        this.selectedProject = project;
    };

    getProject = async (project) => {
        if (project.id != null) {
            try {
                let data = await getProject(project.id);
                this.handleSelectProject(data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            this.handleSelectProject = this.initialProject;
        }
    };

    handleUpdateProject = (id) => {
        this.getProject(id).then(() => {
            this.openFormDialog = true;
        });
    };

    editProject = async (project) => {
        try {
            await editProject(project);
            this.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete
    handleDeleteProject = (project) => {
        this.openConfirmDialog = true;
        this.selectedProject = project;
    };

    deleteProject = async (id) => {
        await deleteProject(id);
        this.handleClose();
    };
}
