import { api } from "../api";
import { IReport } from "./types";

const ReportServices = {
  send: async (payload: IReport) => {
    await api
      .post("support/checkup", payload)
      .then((res) => console.log("relatorio enviado com sucesso", res))
      .catch((err) => console.log("Erro ao enviar relatorio", err));
  },
};

export { ReportServices };
