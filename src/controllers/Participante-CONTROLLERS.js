import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"
import { request, response } from "express"


export const getTodosParticipantes = (request, response) => {

    const getsql = `SELECT * FROM participantes`

    conn.query(getsql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar participantes" })
            return;
        }
        const participantes = data
        response.status(200).json(participantes)
    })
}

export const cadastrarParticipante = (request, response) => {
    const { nome, email } = request.body;

    if (!nome) {
        response.status(400).json({ err: "O nome do participante é obrigatório" })
        return;
    }

    if (!email) {
        response.status(400).json({ err: "O email do participante é obrigatório" })
        return;
    }

    if (!email.includes("@")) {
        response.status(422).json({ err: "O email deve conter @" })
        return;
    }


    const checkSQL = `SELECT * FROM participantes WHERE ?? = ?
 AND  ?? = ?`

    const DatacheckSQL = ["nome", nome, "email", email]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar participantes" })
            return;
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Participante já existe" })
            return;
        }

        const id = uuidv4()

        const insertSQL = `INSERT INTO participantes(??, ??, ??) VALUES(?, ?, ?)`

        const DataInsertSQL = ["id_participante", "nome", "email", id, nome, email]


        conn.query(insertSQL, DataInsertSQL, (err) => {
            if (err) {
                response.status(500).json({ err: "Erro ao inserir dados" })
            }
            response.status(201).json({ message: "Palestrante cadastrado com sucesso" })
        })


    })
}