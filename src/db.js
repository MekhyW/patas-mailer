import mysqlx from "@mysql/xdevapi";

import dotenv from "dotenv";
import { SendEmail } from "./mail.js";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';


dotenv.config({ path: './.env.development' });

const url = process.env["DATABASE_URL"];

const mysqlConnection = mysqlx.getSession(url).then(session => { return session; });

export const processData = async (dataP) => {

    const connection = await mysqlConnection;

    let mercadinhoData = [];

    fs.readFile('./database/mercadinho.json', "utf8", (err, data) => {

        if (err) {
            console.log("Erro ao ler o arquivo:", err);
            return;
        }

        mercadinhoData = JSON.parse(data);

        for (let da of dataP) {

            let uuid = uuidv4();
            if (da.ticketTier.trim() != "Mercadinho") {
                const query = `INSERT INTO TicketEmail (name, email, ticketTier, transactionId)
        SELECT * FROM (SELECT '${da.name}','${da.email.trim()}','${da.ticketTier}','${uuid}') AS tmp
        WHERE NOT EXISTS (
            SELECT email FROM TicketEmail WHERE email = '${da.email.trim()}'
        ) LIMIT 1`;

                connection.sql(query).execute();
            }

            else if (da.ticketTier.trim() == "Mercadinho") {

                let isRepeated = mercadinhoData.filter(a => a.transactionId === da.transactionId).length > 0;

                if (!isRepeated) {
                    mercadinhoData.push({ transactionId: da.transactionId, name: da.name, email: da.email.trim(), sended: 0 });
                }
            }
        }

        fs.writeFile('./database/mercadinho.json', JSON.stringify(mercadinhoData), err => {
            if (err) {
                console.log("Erro ao atualizar o banco de dados do mercadinho:", err);
            }

            else {
                console.log("Banco de dados do mercadinho atualizado com sucesso");
            }
        });
    });
}

export const checkEmails = async () => {
    const connection = await mysqlConnection;

    const query = `SELECT id,name,email,ticketTier,transactionId FROM TicketEmail Where sended = false;`

    const data = (await connection.sql(query).execute()).fetchAll();
    let mercadinhoData = [];

    await data.map(async (d) => {
        await SendEmail(d[2], d[1], d[3], d[4]);
        await connection.sql(`UPDATE TicketEmail SET sended = true WHERE id = ${d[0]}`).execute();
    });

    fs.readFile('./database/mercadinho.json', "utf8", async (err, data) => {

        if (err) {
            console.log("Erro ao ler o arquivo:", err);
            return;
        }

        mercadinhoData = JSON.parse(await data);

        if (mercadinhoData.length > 0) {
            const updatedData = mercadinhoData.map((md) => {
                if (md.sended == 0) {
                    SendEmail(md.email, md.name, 'Mercadinho', md.transactionId);
                    md.sended = 1;
                }
                return md;
            });

            fs.writeFile('./database/mercadinho.json', JSON.stringify(updatedData), err => {
                if (err) {
                    console.log("Erro ao atualizar o registro de envio de e-mails do mercadinho:", err);
                }

                else {
                    console.log("Registro de envio de e-mails do mercadinho atualizado com sucesso");
                }
            });
        }
    });

    connection.close();
}