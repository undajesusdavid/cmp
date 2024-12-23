import { orm } from "../config/orm.js";
import "../models/Employee.js";


orm.sync();