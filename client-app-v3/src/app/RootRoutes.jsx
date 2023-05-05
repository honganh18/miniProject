import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
// import userRoutes from "./views/User/UserRoutes";
// import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";
import countryRoutes from "./views/Country/CountryRoutes";
import ethnicsRoutes from "./views/Ethnics/EthnicsRoutes";
import religionRoutes from "./views/Religion/ReligionRoutes"
import familyRelationshipRoutes from "./views/FamilyRelationship/FamilyRelationshipRoutes"
import departmentRoutes from "./views/Department/DepartmentRoutes"
import staffRoutes from "./views/Staff/StaffRoutes"
import projectRoutes from "./views/Project/ProjectRoutes"

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...redirectRoute,
  // ...userRoutes,
  // ...roleRoutes,
  ...countryRoutes,
  ...ethnicsRoutes,
  ...religionRoutes,
  ...familyRelationshipRoutes,
  ...departmentRoutes,
  ...staffRoutes,
  ...projectRoutes,
  ...errorRoute,

];

export default routes;
