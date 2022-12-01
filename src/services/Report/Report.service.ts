import { sendMessageToExtension } from "../../utils/utils";
import { api } from "../api";
import { IReport } from "./types";
import { toast } from "react-toastify";

const ReportServices = {
  send: async (payload: IReport) => {
    await api
      .post("support/checkup", payload)
      .then((res) => {
        console.log("relatorio enviado com sucesso", res);
        toast.success("relatorio enviado com sucesso");

        const doc9 = JSON.parse(localStorage.getItem("doc9") as string) || {
          extId: "",
        };

        setTimeout(() => {
          sendMessageToExtension(doc9.extId, "CLOSE/TAB", null);
        }, 4000);
      })
      .catch((err) => {
        console.log("Erro ao enviar relatorio", err);
        toast.error("Erro ao enviar relatorio");
      });
  },
};

export { ReportServices };
