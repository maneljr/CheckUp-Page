import React, { useCallback, useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";

import * as S from "./styles";
import { ICheckup } from "./types";
import { ICheckItemType } from "../../InstallMoldal/types";

const Checkup = (props: ICheckup) => {
  const { text, type } = props;
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
    };

    download.onerror = function (err, msg) {
      console.log("Invalid image, or error downloading", err, msg);
    };
  }, []);

  useEffect(() => {
    if (type === ICheckItemType.NetworkSpeed) {
      measureConnectionSpeed();
    }
  }, []);

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
