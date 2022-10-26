import React, { useCallback, useMemo, useState } from "react";

import * as S from "./styles";
import { Checkup } from "../components";
import { ICheckItem, ICheckItemType } from "./types";
import { ImSpinner3 } from "react-icons/im";

const InstallModal = () => {
  const [count, setCont] = useState<number>(0);

  console.log(window.navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./));

  //parseInt(raw[2], 10)

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
          />
        ))}

        <S.Button disabled={count < 5}>
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
