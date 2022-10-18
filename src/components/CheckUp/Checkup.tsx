import React, { useCallback, useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";

import * as S from "./styles";
import { ICheckup } from "./types";
import { ICheckItemType } from "../../InstallMoldal/types";
import { ExtensionSigner } from "../../services";
import { sendMessageToExtension } from "../../utils/utils";

const Checkup = (props: ICheckup) => {
  const { text, type, counter } = props;
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const measureConnectionSpeed = useCallback(() => {
    const imageAddr =
      "https://svs.gsfc.nasa.gov/vis/a030000/a030800/a030877/frames/5760x3240_16x9_01p/BlackMarble_2016_928m_europe_labeled.png";
    const downloadSize = 24332 * 1024;

    const download = new Image();
    let endTime = 0;
    const startTime = new Date().getTime();
    const cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    download.onload = function () {
      endTime = new Date().getTime();

      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (+speedBps / 1024).toFixed(2);
      const speedMbps = (+speedKbps / 1024).toFixed(2);

      console.log([
        "Your connection speed is :",
        speedBps + " bps",
        speedKbps + " kbps",
        speedMbps + " Mbps",
      ]);

      if (+speedMbps > 5.0) {
        setStatus(true);
        setLoading(false);
      } else {
        setStatus(false);
        setLoading(false);
      }

      counter();
    };

    download.onerror = function (err, msg) {
      console.log("Invalid image, or error downloading", err, msg);
      counter();
    };
  }, []);

  const shodoInstalled = async () => {
    try {
      await ExtensionSigner.shodo().then((status) => {
        if (status === 200) {
          console.log("Shodo ativo");
          setStatus(false);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Shodo não instalado ou desativado ->", error);
      setStatus(true);
      setLoading(false);
    } finally {
      counter();
    }
  };

  const pjeOfficeInstalled = async () => {
    let imagem = new Image();
    imagem.onload = function () {
      console.log("PjeOffice está ativo");
      setStatus(false);
      setLoading(false);
      counter();
    };

    imagem.onerror = function (err, msg) {
      console.log("PjeOffice não instalado ou desativado", err, msg);
      setStatus(true);
      setLoading(false);
      counter();
    };

    imagem.src = "http://localhost:8800/pjeOffice/?&u=" + new Date().getTime();
  };

  const serverAccess = async () => {
    try {
      await ExtensionSigner.cloud().then((status) => {
        if (status === 200) {
          console.log("Servidor acessado com sucesso");
          setStatus(true);
          setLoading(false);
        } else {
          console.log("Erro ao acessar servidor do whom");
          setStatus(false);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Erro ao acessar servidor do whom ->", error);
      setStatus(false);
      setLoading(false);
    } finally {
      counter();
    }
  };

  const webSignerInstalled = () => {
    const doc9 = JSON.parse(localStorage.getItem("doc9") as string) || {
      extId: "",
    };

    console.log("extId >", doc9.extId);

    sendMessageToExtension(doc9.extId, "GET/INSTALLED_EXTENSIONS", null)
      .then((response) => {
        if (
          response.data.map((r) => {
            return r.name.includes("Web Signer") && r.enabled;
          })
        ) {
          console.log("Web Signer ativo");
          setStatus(false);
          setLoading(false);
        } else {
          console.log("Web Signer desativado ou desinstalado");
          setStatus(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Erro na verificação do Websigner ", err);
        setStatus(true);
        setLoading(false);
      })
      .finally(() => {
        counter();
      });
  };

  useEffect(() => {
    if (type === ICheckItemType.NetworkSpeed) {
      measureConnectionSpeed();
    }
    if (type === ICheckItemType.ServerAccess) {
      serverAccess();
    }
    if (type === ICheckItemType.PjeOfficeUninstalled) {
      pjeOfficeInstalled();
    }
    if (type === ICheckItemType.ShodoUninstalled) {
      shodoInstalled();
    }
    if (type === ICheckItemType.WebSignerUninstalled) {
      webSignerInstalled();
    }
  }, [type]);

  if (loading) {
    return (
      <S.CheckContainer>
        <ImSpinner3 className="spin" style={{ color: " #777" }} size={15} />
        <span className="span">{text}</span>
      </S.CheckContainer>
    );
  } else if (status) {
    return (
      <S.CheckContainer>
        <BsCheckCircleFill style={{ color: " #18AB4E" }} />
        <span className="span"> {text} </span>
      </S.CheckContainer>
    );
  } else {
    return (
      <S.CheckContainer>
        <RiCloseCircleFill style={{ color: " #c71913" }} size={19} />
        <span className="span"> {text} </span>
      </S.CheckContainer>
    );
  }
};

export { Checkup };
