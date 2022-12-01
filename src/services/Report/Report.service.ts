import { sendMessageToExtension } from "../../utils/utils";
import { api } from "../api";
import { IReport } from "./types";

const ReportServices = {
  send: async (payload: IReport) => {
    await api
      .post("support/checkup", payload)
      .then((res) => {
        console.log("relatorio enviado com sucesso", res);

        const doc9 = JSON.parse(localStorage.getItem("doc9") as string) || {
          extId: "",
        };

        sendMessageToExtension(doc9.extId, "CLOSE/TAB", null);
      })
      .catch((err) => console.log("Erro ao enviar relatorio", err));
  },
};

export { ReportServices };
