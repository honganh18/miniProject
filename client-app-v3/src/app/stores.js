import { createContext, useContext } from "react";
import DepartmentStore from "./views/Department/DepartmentStore";
import CountryStore from "./views/Country/CountryStore";
import EthnicsStore from "./views/Ethnics/EthnicsStore";
import FamilyRelationshipStore from "./views/FamilyRelationship/FamilyRelationshipStore";
import ReligionStore from "./views/Religion/ReligionStore";
import StaffStore from "./views/Staff/StaffStore";
import ProjectStore from "./views/Project/ProjectStore";

export const store = {
  countryStore: new CountryStore(),
  ethnicsStore: new EthnicsStore(),
  religionStore: new ReligionStore(),
  familyRelationshipStore: new FamilyRelationshipStore(),
  departmentStore: new DepartmentStore(),
  staffStore: new StaffStore(),
  projectStore: new ProjectStore

};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
