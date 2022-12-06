import React, { useCallback, useMemo, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";

import * as S from "./styles";
import { Checkup } from "../components";
import { ICheckItem, ICheckItemType } from "./types";
import { ReportServices } from "../services";

const InstallModal = () => {
  const [count, setCont] = useState<number>(0);
  const [network_speed, setNetwork_speed] = useState<string>("0");
  const [server_access, setServer_access] = useState<boolean>(false);
  const [pjeoffice_uninstalled, setPjeoffice_uninstalled] =
    useState<boolean>(false);
  const [shodo_uninstalled, setShodo_uninstalled] = useState<boolean>(false);
  const [websigner_uninstalled, setWebsigner_uninstalled] =
    useState<boolean>(false);
  const [user_email, setuser_email] = useState<string>("Null");
  const [isExtensionId, setIsExntensioId] = useState<boolean>(true);
  const [isSendReport, setIsSendReport] = useState<boolean>(false);

  const chrome_version = window.navigator.userAgent
    .match(/Chrom(e|ium)\/(\d+)\./)
    ?.at(2);

  const payloadReport = useCallback((type: ICheckItemType, value: any) => {
    if (type === ICheckItemType.NetworkSpeed) setNetwork_speed(value);
    if (type === ICheckItemType.ServerAccess) setServer_access(value);
    if (type === ICheckItemType.PjeOfficeUninstalled)
      setPjeoffice_uninstalled(value);
    if (type === ICheckItemType.ShodoUninstalled) setShodo_uninstalled(value);
    if (type === ICheckItemType.WebSignerUninstalled)
      setWebsigner_uninstalled(value);
  }, []);

  const sendReport = useCallback(() => {
    const { userId } = JSON.parse(localStorage.getItem("doc9") as string) || {
      userId: "Null",
    };

    const extension_id = userId as string;

    console.log("UserId >", extension_id);

    if (extension_id !== "Null") {
      console.log("dados enviados >", {
        extension_id,
        network_speed,
        server_access,
        pjeoffice_uninstalled,
        shodo_uninstalled,
        websigner_uninstalled,
        chrome_version,
        user_email,
      });
      ReportServices.send({
        extension_id,
        network_speed,
        server_access,
        pjeoffice_uninstalled,
        shodo_uninstalled,
        websigner_uninstalled,
        chrome_version,
        user_email,
      });
    } else {
      if (user_email === "Null") {
        setIsExntensioId(false);
        toast.warn("Informe seu email de contato");
      } else {
        console.log("dados enviados >", {
          extension_id,
          network_speed,
          server_access,
          pjeoffice_uninstalled,
          shodo_uninstalled,
          websigner_uninstalled,
          chrome_version,
          user_email,
        });

        ReportServices.send({
          extension_id,
          network_speed,
          server_access,
          pjeoffice_uninstalled,
          shodo_uninstalled,
          websigner_uninstalled,
          chrome_version,
          user_email,
        });
        setIsExntensioId(true);
        setIsSendReport(true);
      }
    }
  }, [
    chrome_version,
    network_speed,
    pjeoffice_uninstalled,
    server_access,
    shodo_uninstalled,
    user_email,
    websigner_uninstalled,
  ]);

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

        {isExtensionId !== true ? (
          <S.Input
            placeholder="Informe o seu email de contato"
            type={"email"}
            onChange={(e) => {
              setuser_email(e.target.value);
            }}
          />
        ) : (
          <></>
        )}

        <S.Button disabled={count < 5 || isSendReport} onClick={sendReport}>
          {count < 5 ? (
            <ImSpinner3 className="spin" style={{ color: " #777" }} size={15} />
          ) : isSendReport ? (
            "Enviado"
          ) : (
            "Concluir"
          )}
        </S.Button>
      </S.Card>
    </S.Container>
  );
};

export { InstallModal };
