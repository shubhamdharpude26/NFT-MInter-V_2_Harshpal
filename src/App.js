import React from "react";
import Login from "./Login";
import Main from "./Main";
import { useSelector } from "react-redux";

function App() {
  const blockchain = useSelector((state) => state.blockchain);
  return (
    <div>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <Login />
      ) : (
        <Main />
      )}
    </div>
  );
}

export default App;
