import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"
import { response } from "express"


export const getTodosEventos = (request, response) => {

    const getsql = `SELECT * FROM eventos`

    conn.query(getsql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar eventos" })
            return;
        }
        const eventos = data
        response.status(200).json(eventos)
    })
}

export const criarEvento = (request, response) => {
    const { titulo, data, palestranteId} = request.body;

    if (!titulo) {
        response.status(400).json({ err: "O titulo do evento é obrigatório" })
        return;
    }

    if (!data) {
        response.status(400).json({ err: "A data do evento é obrigatório" })
        return;
    }

    if(!palestranteId){
        response.status(400).json({err: "O Id do palestrante é obrigatório"})
        return;
    }


    //se existir um evento 
    const checkSQL = `SELECT * FROM eventos WHERE ?? = ? AND ?? = ?`

    const DatacheckSQL = ["titulo", titulo, "data", data]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar evento" })
            return;
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Evento já existe" })
            return;
        }
        });

        const id = uuidv4()

        const insertSql = `INSERT INTO eventos(??,??,??,??) VALUES(?,?,?,?)`
        const DataInsertSQL = ["id_evento","titulo","data", "palestrante_id", id, titulo, data, palestranteId]
    
            conn.query(insertSql, DataInsertSQL, (err) => {
                if (err) {
                    response.status(500).json({ message: "Erro ao inserir dados" });
                }
                response.status(201).json({ message: "Evento criado com sucesso ✨ " })
            })
}

export const listarEvento = (request, response)=> {

    const { id } = request.params

    const sql = `SELECT * FROM eventos WHERE ?? = ?`

    const dataSql = ["id_eventos", id]

    conn.query(sql, dataSql, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar eventos" })
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ message: "evento não encontrado" })
        }

        const evento = data[0]
        response.status(200).json(evento)
    })



 


 const innerjoin = `SELECT eventos.titulo, palestrantes.nome FROM eventos INNER JOIN palestrantes ON eventos.palestrante_id = palestrantes.id_palestrante`


 console.log(sql)
 

}