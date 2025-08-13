import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ElementoApi = (db) => {
  const router = Router();

  // Modelo
  const Elemento = db.ElementoArchivado;

  // Rutas
  router.get(
    "/api/archivo/elemento/list",
    authenticateToken,
    async (req, res) => {
      const items = await Elemento.findAll({
        include: [
          { model: db.departamentos, as: "departamento" },
          { model: db.Clasificacion, as: "clasificacion" },
          { model: db.Contenedor, as: "contenedor" },
          { model: db.Expediente, as: "expediente" },
        ],
      });
      res.json(items);
    }
  );

  //Elementos sin contenedor
  router.get(
    "/api/archivo/elemento/list/sin_contenedor",
    authenticateToken,
    async (req, res) => {
      //const departamento_id = req.query.departamento_id;
      const elementos = await Elemento.findAll({
        where: {'$contenedor.id$': null},
        include: [
          { model: db.departamentos, as: "departamento" },
          { model: db.Clasificacion, as: "clasificacion" },
          { model: db.Contenedor, as: "contenedor" },
          { model: db.Expediente, as: "expediente" },
        ],
      });
      
      res.json(elementos);
    }
  );

  router.get(
    "/api/archivo/elemento/get",
    authenticateToken,
    async (req, res) => {
      try {
        const id = req.query.id;
        const elemento = await Elemento.findOne({
          where: { id: id },
          include: [
            { model: db.departamentos, as: "departamento" },
            { model: db.Clasificacion, as: "clasificacion" },
            { model: db.Contenedor, as: "contenedor" },
            { model: db.Expediente, as: "expediente" },
          ],
        });

        res.json(elemento);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/api/archivo/elemento/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const newItem = await Elemento.create({
        codigo: data.codigo,
        titulo: data.titulo,
        ejercicio_fiscal: data.ejercicio_fiscal,
        soporte: data.soporte,
        observacion: data.observacion,
        clasificacion_id: data.clasificacion_id,
        departamento_id: data.departamento_id,
      });

      res.json(newItem);
    }
  );

  router.put(
    "/api/archivo/elemento/update",
    authenticateToken,
    async (req, res, next) => {
      try {
        const data = req.body;
        const elementoActualizado = await Elemento.update(data, {
          where: { id: data.id },
        });
        res.json(elementoActualizado);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/api/archivo/elemento/delete",
    authenticateToken,
    async (req, res, next) => {
      try {
        const id = req.query.id;
        const status = await Elemento.destroy({
          where: { id: id },
        });
        res.json(status);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

export default ElementoApi;
