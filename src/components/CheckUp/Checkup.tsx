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
  const { text, type, counter, payload } = props;
  const [status, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const measureConnectionSpeed = useCallback(() => {
    const imageAddr =
      "https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg";
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

      payload(ICheckItemType.NetworkSpeed, `${speedMbps} Mbps`);

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
  }, [counter]);

  const shodoInstalled = useCallback(async () => {
    try {
      await ExtensionSigner.shodo().then((status) => {
        if (status === 200) {
          console.log("Shodo ativo");
          payload(ICheckItemType.ShodoUninstalled, false);
          setStatus(false);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Shodo não instalado ou desativado ->", error);
      payload(ICheckItemType.ShodoUninstalled, true);
      setStatus(true);
      setLoading(false);
    } finally {
      counter();
    }
  }, [counter]);

  const pjeOfficeInstalled = useCallback(async () => {
    let imagem = new Image();
    imagem.onload = function () {
      console.log("PjeOffice está ativo");
      payload(ICheckItemType.PjeOfficeUninstalled, false);
      setStatus(false);
      setLoading(false);
      counter();
    };

    imagem.onerror = function (err, msg) {
      console.log("PjeOffice não instalado ou desativado", err, msg);
      payload(ICheckItemType.PjeOfficeUninstalled, true);
      setStatus(true);
      setLoading(false);
      counter();
    };

    imagem.src = "http://localhost:8800/pjeOffice/?&u=" + new Date().getTime();
  }, [counter]);

  const serverAccess = useCallback(async () => {
    try {
      await ExtensionSigner.cloud().then((status) => {
        if (status === 200) {
          console.log("Servidor acessado com sucesso");
          payload(ICheckItemType.ServerAccess, true);
          setStatus(true);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Erro ao acessar servidor do whom ->", error);
      payload(ICheckItemType.ServerAccess, false);
      setStatus(false);
      setLoading(false);
    } finally {
      counter();
    }
  }, [counter]);

  const webSignerInstalled = useCallback(() => {
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
          payload(ICheckItemType.WebSignerUninstalled, false);
          setStatus(false);
          setLoading(false);
        } else {
          console.log("Web Signer desativado ou desinstalado");
          payload(ICheckItemType.WebSignerUninstalled, true);
          setStatus(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Erro ao tentar acesso ao Web Signer", err);
        payload(ICheckItemType.WebSignerUninstalled, true);
        setStatus(true);
        setLoading(false);
      })
      .finally(() => {
        counter();
      });
  }, [counter]);

  useEffect(() => {
    if (type === ICheckItemType.NetworkSpeed) {
      measureConnectionSpeed();
    }
  }, [type, measureConnectionSpeed]);

  useEffect(() => {
    if (type === ICheckItemType.ServerAccess) {
      serverAccess();
    }
  }, [type, serverAccess]);

  useEffect(() => {
    if (type === ICheckItemType.PjeOfficeUninstalled) {
      pjeOfficeInstalled();
    }
  }, [type, pjeOfficeInstalled]);

  useEffect(() => {
    if (type === ICheckItemType.ShodoUninstalled) {
      shodoInstalled();
    }
  }, [type, shodoInstalled]);

  useEffect(() => {
    if (type === ICheckItemType.WebSignerUninstalled) {
      webSignerInstalled();
    }
  }, [type, webSignerInstalled]);

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
