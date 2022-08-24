import AdminLayout from "../layouts/admin/AdminLayout";
import {
  Dashboard,
  DeliveryCertificates,
  EquipmentSpecifications,
  LicensingTables,
} from "../pages/admin";
import { AdminPaths, RouteInterface } from "../helpers/interfaces";

const adminRoutes: RouteInterface[] = [
  {
    path: AdminPaths.Dashboard,
    layout: AdminLayout,
    component: Dashboard,
  },
  {
    path: AdminPaths.DeliveryCertificates,
    layout: AdminLayout,
    component: DeliveryCertificates,
  },
  {
    path: AdminPaths.EquipmentSpecifications,
    layout: AdminLayout,
    component: EquipmentSpecifications,
  },
  {
    path: AdminPaths.LicensingTables,
    layout: AdminLayout,
    component: LicensingTables,
  },
];

export default adminRoutes;
