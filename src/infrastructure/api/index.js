import EmployeeApi from "./Employee.js";
import UserApi from "./Users.js";
import AuthApi from "./Auth.js";
import RolesApi from "./Roles.js";
import PermissionApi from "./Permissions.js";
import MetadataApi from "./Metadata.js";
import CentralArchiveApi from "./CentralArchive.js";


const Api = (db) => {

  const api = [
    EmployeeApi(db),
    UserApi(db),
    AuthApi(db),
    RolesApi(db),
    PermissionApi(db),
    MetadataApi(db),
    CentralArchiveApi(db)
  ];

  return api;

}




export {Api}