import { Router } from "express"

const router = Router()


import { criarEvento, getTodosEventos, listarEvento } from "../controllers/Eventos-CONTROLLERS.js";

router.get("/", getTodosEventos)
router.post("/criar", criarEvento)
router.get("/agenda/:id", listarEvento)

export default router;