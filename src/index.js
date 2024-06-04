import fs from "fs";
import { parse } from "csv-parse";
import { checkEmails, processData } from "./db.js";

const readDataFromCSV = () =>{

    let fileData = [];
    fs.createReadStream('./input/upload_data.csv')
    .pipe(parse({delimiter:',', from_line: 2}))
    .on("data", function (row){
        fileData.push({
            name:row[0],
            email:row[1],
            transactionId:row[2],
            ticketTier:row[5]
        });
    });

    return fileData;
}

const data = readDataFromCSV();

processData(data);

await checkEmails();
