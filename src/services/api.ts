import axios from 'axios';
import excel from 'exceljs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();


async function requestAPI() {
    const data = await axios.get("https://api.brasil.io/v1/dataset/covid19/caso/data/?state=PB&is_last=True", {
        withCredentials: true,
        headers: {
            "Authorization": process.env.API_KEY
        }
    });

    let workbook = new excel.Workbook();
    workbook.xlsx.readFile(path.join(__dirname, '..', 'utils', 'dadosIndicadoresPB1.xlsx')).then(
        () => {
            const worksheet = workbook.getWorksheet("dadosIndicadoresPB2");

            data.data.results.forEach((cidade) => {
                worksheet.getColumn(2).eachCell((cell, indexCell) => {
                    const celulaName = cell.value.toString().toUpperCase();
                    let cidadePesquisada = cidade.city;

                    if (cidadePesquisada != null) {
                        cidadePesquisada = cidade.city.toString().toUpperCase();
                    }

                    if (celulaName == cidadePesquisada) {
                        worksheet.getColumn(14).eachCell((cell, index) => {
                            if (index == indexCell) {
                                cell.value = cidade.confirmed;
                            }
                        });

                    }
                })
            });


            return workbook.xlsx.writeFile(path.join(__dirname, '..', 'utils', 'dadosIndicadoresPB3.xlsx'));
        }).then(() => {
            console.log("escrita feita");
        }).catch(
            error => {
                console.log(error);
            }
        )

}

export default requestAPI;