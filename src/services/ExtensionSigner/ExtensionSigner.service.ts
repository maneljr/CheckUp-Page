import axios from "axios";

const ExtensionSigner = {
  shodo: async () => {
    const { status } = await axios.options(
      "https://127.0.0.1:9000/assinarTexto"
    );
    return status;
  },
  pjeoffice: async () => {
    const { status } = await axios.options(
      "http://localhost:8800/pjeOffice/?&u=1665683500680"
    );
    return status;
  },
  cloud: async () => {
    const { status } = await axios.options(
      "https://cloud.doc9.com.br/api/autenticacao/nps"
    );
    return status;
  },
};

export { ExtensionSigner };
