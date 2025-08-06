import { Router } from 'express';
import authenticateToken from '../../middleware/auth.js';


const DepartamentoApi = (db) => {
   const router = Router();
   const Model = db.departamentos;


   router.get("/api/departamento/list",authenticateToken,  async (req, res) => {
    const departamentos = await Model.findAll();
    res.json(departamentos);
   });


   return router;
}

export default DepartamentoApi;