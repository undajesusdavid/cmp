import RelCentralArchive from "./RelCentralArchive.js";
import RelEmployee from "./RelEmployee.js";
import RelPermisionRole from "./RelPermisionRole.js";
import RelUser from "./RelUser.js";

const AllRelationships = (db) => {
  RelPermisionRole(db);
  RelUser(db);
  RelEmployee(db);
  RelCentralArchive(db);
};

export default AllRelationships;
