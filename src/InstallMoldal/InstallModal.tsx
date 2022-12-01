import React, { useCallback, useMemo, useState } from "react";

import * as S from "./styles";
import { Checkup } from "../components";
import { ICheckItem, ICheckItemType } from "./types";
import { ImSpinner3 } from "react-icons/im";
import { ReportServices } from "../services";
import { sendMessageToExtension } from "../utils/utils";

const InstallModal = () => {
  const [count, setCont] = useState<number>(0);
  const [network_speed, setNetwork_speed] = useState<string>("0");
  const [server_access, setServer_access] = useState<boolean>(false);
  const [pjeoffice_uninstalled, setPjeoffice_uninstalled] =
    useState<boolean>(false);
  const [shodo_uninstalled, setShodo_uninstalled] = useState<boolean>(false);
  const [websigner_uninstalled, setWebsigner_uninstalled] =
    useState<boolean>(false);

  const chrome_version = window.navigator.userAgent
    .match(/Chrom(e|ium)\/(\d+)\./)
    ?.at(2);
  const { userId } = JSON.parse(localStorage.getItem("doc9") as string) || {
    userId: "",
  };

  const extension_id = userId as string;

  const payloadReport = useCallback((type: ICheckItemType, value: any) => {
    if (type === ICheckItemType.NetworkSpeed) setNetwork_speed(value);
    if (type === ICheckItemType.ServerAccess) setServer_access(value);
    if (type === ICheckItemType.PjeOfficeUninstalled)
      setPjeoffice_uninstalled(value);
    if (type === ICheckItemType.ShodoUninstalled) setShodo_uninstalled(value);
    if (type === ICheckItemType.WebSignerUninstalled)
      setWebsigner_uninstalled(value);
  }, []);

  const sendReport = () => {
    console.log(
      extension_id,
      network_speed,
      server_access,
      pjeoffice_uninstalled,
      shodo_uninstalled,
      websigner_uninstalled,
      chrome_version
    );

    ReportServices.send({
      extension_id,
      network_speed,
      server_access,
      pjeoffice_uninstalled,
      shodo_uninstalled,
      websigner_uninstalled,
      chrome_version,
    });
  };

  const counter = useCallback(() => {
    setCont((prev) => prev + 1);
  }, []);

  const checkList: ICheckItem[] = useMemo(
    () => [
      {
        label: "Teste de velocidade de internet",
        type: ICheckItemType.NetworkSpeed,
      },
      {
        label: "Teste de acesso ao servidor",
        type: ICheckItemType.ServerAccess,
      },
      {
        label: "Pjeoffice desativado",
        type: ICheckItemType.PjeOfficeUninstalled,
      },
      { label: "Shodô desativado", type: ICheckItemType.ShodoUninstalled },
      {
        label: "Websigner desativado",
        type: ICheckItemType.WebSignerUninstalled,
      },
    ],
    []
  );

  return (
    <S.Container>
      <S.Card>
        <S.Image src="WHOM_LOGO_CINZA_256.png" />
        <S.TitleContainer>
          Verificando compatibilidade com o Whom.
        </S.TitleContainer>

        {checkList.map((item, index) => (
          <Checkup
            text={item.label}
            type={item.type}
            key={index}
            counter={counter}
            payload={payloadReport}
          />
        ))}

        <S.Button disabled={count < 5} onClick={sendReport}>
          {count < 5 ? (
            <ImSpinner3 className="spin" style={{ color: " #777" }} size={15} />
          ) : (
            "Concluir"
          )}
        </S.Button>
      </S.Card>
    </S.Container>
  );
};

export { InstallModal };
