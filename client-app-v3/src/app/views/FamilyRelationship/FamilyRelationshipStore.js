import { makeAutoObservable } from "mobx";
import {
  pagingFamilyRelationship,
  getFamilyRelationship,
  editFamilyRelationship,
  createFamilyRelationship,
  deleteFamilyRelationship,
} from "./FamilyRelationshipService";

export default class FamilyRelationshipStore {
  familyRelationshipList = [];
  initialFamilyRelationship = {
    id: "",
    code: "",
    name: "",
    description: "",
  };
  selectedFamilyRelationship = this.initialFamilyRelationship;
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
      let data = await pagingFamilyRelationship(searchObject);
      console.log(data)
      this.familyRelationshipList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  updatePageDataFamilyRelationship = (item) => {
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
    this.updatePageDataFamilyRelationship();
  };
  handleChangeRowsPerPage = (event) => {
    this.setRowsPerPage((event.target.value));
    console.log(event.target.value);
  };

  // Pagination
  setPage = (page) => {
    this.page = page;
    this.updatePageDataFamilyRelationship();
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  // Modal
  handleClose = () => {
    this.selectedFamilyRelationship = this.initialFamilyRelationship;
    this.openConfirmDialog = false;
    this.openFormDialog = false;
    this.updatePageDataFamilyRelationship();
  };

  // Create
  handleCreateFamilyRelationship = () => {
    this.openFormDialog = true;
  };

  createFamilyRelationship = async (familyRelationship) => {
    try {
      await createFamilyRelationship(familyRelationship);
      this.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Update
  handleSelectFamilyRelationship = (familyRelationship) => {
    this.selectedFamilyRelationship = familyRelationship;
  };

  getFamilyRelationship = async (familyRelationship) => {
    if (familyRelationship.id != null) {
      try {
        let data = await getFamilyRelationship(familyRelationship.id);
        this.handleSelectFamilyRelationship(data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.handleSelectFamilyRelationship = this.initialFamilyRelationship;
    }
  };

  handleUpdateFamilyRelationship = (id) => {
    this.getFamilyRelationship(id).then(() => {
      this.openFormDialog = true;
    });
  };

  editFamilyRelationship = async (ethnic) => {
    try {
      await editFamilyRelationship(ethnic);
      this.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  handleDeleteFamilyRelationship = (familyRelationship) => {
    this.openConfirmDialog = true;
    this.selectedFamilyRelationship = familyRelationship;
  };

  deleteFamilyRelationship = async (id) => {
    await deleteFamilyRelationship(id);
    this.handleClose();
  };
}
