import { Request, Response, Router } from 'express';
import xlsx from 'node-xlsx';
let VectorMath = require('@seregpie/vector-math');

const routes = Router();

function ordenarPIB(a, b) {
    return b.pib - a.pib;
}

function ordenarPerCapita(a, b) {
    return b.renda_per_capita - a.renda_per_capita;
}

routes.get("/", (request, response) => {
    return response.json({ message: "Hello World" })
});

routes.get("/cidades/pib", (request: Request, response: Response) => {
    const cidades = [];

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (code != "code") {
            cidades.push({
                code,
                municipio,
                cvli,
                cpli,
                siva,
                cvp,
                pib,
                renda_per_capita,
                idh,
                ideb_anos_iniciais,
                ideb_anos_finais,
                pessoal_ocupado,
                total_crimes,
                mortes_covid
            });
        }

    });

    cidades.sort(ordenarPIB);

    return response.status(200).json(cidades);
});

routes.get("/cidades/renda", (request: Request, response: Response) => {
    const cidades = [];

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (code != "code") {
            cidades.push({
                code,
                municipio,
                cvli,
                cpli,
                siva,
                cvp,
                pib,
                renda_per_capita,
                idh,
                ideb_anos_iniciais,
                ideb_anos_finais,
                pessoal_ocupado,
                total_crimes,
                mortes_covid
            });
        }

    });

    cidades.sort(ordenarPerCapita);

    return response.status(200).json(cidades);
});

routes.get("/cidades/:cidade", (request: Request, response: Response) => {
    const { cidade } = request.params;

    let cidadePesquisada;

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (cidade.toUpperCase() == municipio.toString().toUpperCase()) {
            cidadePesquisada = {
                code,
                municipio,
                cvli,
                cpli,
                siva,
                cvp,
                pib,
                renda_per_capita,
                idh,
                ideb_anos_iniciais,
                ideb_anos_finais,
                pessoal_ocupado,
                total_crimes,
                mortes_covid
            }
        }
    });

    if (cidadePesquisada != null) {
        return response.status(200).json(cidadePesquisada)
    }

    return response.status(404).json({ message: "City Not Found!" });
});

routes.get("/correlacao", (request: Request, response: Response) => {
    let { variavel1 } = request.query;

    const vetor1 = [];
    const vetor2 = [];

    const resposta = {
        "Atributo 1": variavel1.toString().charAt(0).toUpperCase() + variavel1.toString().slice(1),
        "Atributo 2": "Mortes por Covid",
        "Valor da Correlação": null
    }

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (variavel1 == "renda" && renda_per_capita != "renda_per_capita" && mortes_covid != "total de mortes covid") {
            vetor1.push(renda_per_capita);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "cvli" && cvli != "cvli" && mortes_covid != "total de mortes covid") {
            vetor1.push(cvli);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "cpli" && cpli != "cpli" && mortes_covid != "total de mortes covid") {
            vetor1.push(cpli);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "siva" && siva != "siva" && mortes_covid != "total de mortes covid") {
            vetor1.push(siva);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "cvp" && cvp != "cvp" && mortes_covid != "total de mortes covid") {
            vetor1.push(cvp);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "pib" && pib != "pib" && mortes_covid != "total de mortes covid") {
            vetor1.push(pib);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "idh" && idh != "idh" && mortes_covid != "total de mortes covid") {
            vetor1.push(idh);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "ideb_iniciais" && ideb_anos_iniciais != "ideb anos iniciais" && mortes_covid != "total de mortes covid") {
            vetor1.push(ideb_anos_iniciais);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "ideb_finais" && ideb_anos_finais != "ideb anos finais" && mortes_covid != "total de mortes covid") {
            vetor1.push(ideb_anos_finais);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "pessoal" && pessoal_ocupado != "pessoal ocupado" && mortes_covid != "total de mortes covid") {
            vetor1.push(pessoal_ocupado);
            vetor2.push(mortes_covid);

        } else if (variavel1 == "crimes" && total_crimes != "total Crimes" && mortes_covid != "total de mortes covid") {
            vetor1.push(total_crimes);
            vetor2.push(mortes_covid);

        }
    });

    resposta["Valor da Correlação"] = VectorMath.PearsonCorrelationCoefficient(vetor1, vetor2).toFixed(4);

    if (resposta["Valor da Correlação"] == 0) {
        return response.status(404).json({ message: "Not Found!" });
    }

    return response.json(resposta);
});

routes.post("/crimes/:valor", (request: Request, response: Response) => {
    const { valor } = request.params;

    const cidades = [];

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (parseInt(total_crimes.toString()) >= parseInt(valor)) {

            cidades.push({
                code,
                municipio,
                cvli,
                cpli,
                siva,
                cvp,
                pib,
                renda_per_capita,
                idh,
                ideb_anos_iniciais,
                ideb_anos_finais,
                pessoal_ocupado,
                total_crimes,
                mortes_covid
            });
        }
    });

    if (cidades.length == 0) {
        return response.json({ message: "Cities not Found!" });
    }

    return response.json(cidades);
});

routes.post("/cidades/:cidade", (request: Request, response: Response) => {
    const { cidade } = request.params;

    const resposta = {
        cidade: "",
        porcentagem: ""
    };

    const data = xlsx.parse(__dirname.concat("/utils/dadosIndicadoresPB3.xlsx"));

    data[0].data.map(([
        code,
        municipio,
        cvli,
        cpli,
        siva,
        cvp,
        pib,
        renda_per_capita,
        idh,
        ideb_anos_iniciais,
        ideb_anos_finais,
        pessoal_ocupado,
        total_crimes,
        mortes_covid
    ]) => {

        if (cidade == municipio) {
            resposta.cidade = cidade,
                resposta.porcentagem =
                ` ${((parseInt(mortes_covid.toString()) / parseInt(pessoal_ocupado.toString())) / 100).toFixed(4)}%`
        }
    });



    return response.json(resposta);
});

export default routes;