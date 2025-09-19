import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ElementoApi = (sequelize) => {
  const db = sequelize.models;
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
          { model: db.Contenedor, as: "contenedores" },
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
        where: { "$contenedores.id$": null },
        include: [
          { model: db.departamentos, as: "departamento" },
          { model: db.Clasificacion, as: "clasificacion" },
          { model: db.Contenedor, as: "contenedores" },
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
            { model: db.Contenedor, as: "contenedores"},
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

      try {
        // 1. Crear el nuevo elemento
        const newItem = await Elemento.create({
          codigo: data.codigo,
          titulo: data.titulo,
          ejercicio_fiscal: data.ejercicio_fiscal,
          soporte: data.soporte,
          observacion: data.observacion,
          departamento_id: data.departamento_id,
          clasificacion_id: data.clasificacion_id,
          expediente_id: data.expediente_id || null,
        });

        // 2. Validar y agregar contenedores (puede ser uno o varios)
        if (data.contenedor_id) {
          const contenedorIds = Array.isArray(data.contenedor_id)
            ? data.contenedor_id
            : [data.contenedor_id];

          // Verificar que todos los contenedores existan
          const contenedores = await db.Contenedor.findAll({
            where: { id: contenedorIds },
          });

          if (contenedores.length !== contenedorIds.length) {
            return res.status(400).json({
              error: "Uno o más contenedores no existen",
            });
          }

          // Asociar los contenedores al nuevo elemento
          await newItem.addContenedores(contenedores);
        }

        // 3. Retornar el nuevo elemento
        res.status(201).json(newItem);
      } catch (error) {
        console.error("Error al registrar el elemento:", error);
        res.status(500).json({
          error: "No se pudo registrar el elemento",
          detalle: error.message,
        });
      }
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
