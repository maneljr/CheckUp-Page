import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";

import * as S from "./styles";

const InstallModal = () => {
  return (
    <S.Container>
      <S.Card>
        <S.Image src="WHOM_LOGO_CINZA_256.png" />
        <S.TitleContainer>
          Verificando compatibilidade com o Whom.
        </S.TitleContainer>
        <S.CheckContainer>
          <BsCheckCircleFill style={{ color: " #18AB4E" }} />
          <span className="span"> teste de velocidade de internet </span>
        </S.CheckContainer>
        <S.CheckContainer>
          <BsCheckCircleFill style={{ color: " #18AB4E" }} />
          <span className="span"> teste de acesso ao servidor </span>
        </S.CheckContainer>
        <S.CheckContainer>
          <RiCloseCircleFill style={{ color: " #c71913" }} size={19} />
          <span className="span"> pjeoffice desinstalado </span>
        </S.CheckContainer>
        <S.CheckContainer>
          <ImSpinner3 className="spin" style={{ color: " #777" }} size={15} />
          <span className="span"> shodô desinstalado </span>
        </S.CheckContainer>
        <S.CheckContainer>
          <ImSpinner3 className="spin" style={{ color: " #777" }} size={15} />
          <span className="span"> websigner desinstalado</span>
        </S.CheckContainer>
        <S.Button>Concluir</S.Button>
      </S.Card>
    </S.Container>
  );
};

export { InstallModal };
