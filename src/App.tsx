import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InstallModal } from "./InstallMoldal";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
      />
      <GlobalStyle />
      <InstallModal />
    </>
  );
}

export default App;
