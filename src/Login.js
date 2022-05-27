import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {connect} from "./redux/blockchain/blockchainActions.js";
import { fetchData } from "./redux/data/dataActions";
import swal from 'sweetalert';

function Login() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setfeedback] = useState("May be it's your lucky day!");
  const [claimingNft, setClamingNft] = useState(false);

  const claimNfts = (_amount) => {
    setClamingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei(
          (0.02 * _amount).toString(),
          "ether"
        ),
      })
      .once("error", (err) => {
        console.log(err);
        setfeedback("Error");
        setClamingNft(false);
      })
      .then((receipt) => {
        setfeedback("Success");
        setClamingNft(false);
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  })
 
  function onSuccess() {
    console.log(blockchain);
    swal('Success', " ", "success");
  }

  function onError() {
    swal("Error", "Connect to polygon network only!", "error");
  }

  return (
    <div className="h-screen px-64  bg-gradient-to-b from-pink-300 to-purple-500 flex flex-col box-border">
      <div className="bg-red-500 text-white rounded-b-2xl w-28 h-24 font-semibold relative flex justify-center items-center">
        NFT MINTER
      </div>
      <div className="mt-24 justify-center items-center ">
        <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-2 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-30 border border-gray-200">
          <div className="my-18 mr-24 ml-9 px-10 py-8 box-border">
            <p className="text-5xl mb-3 font-montserrat font-semibold text-gray-700">
              Connect MetaMask Wallet
            </p>
            <button onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                  }}
              class="bg-red-500 shadow-lg shadow-red-500/50 text-white rounded-md my-4 px-16 py-2"
            >
              MATIC
            </button>
          </div>
          <div className="flex justify-center items-center h-auto">
            <img
              src="https://github.com/shubhamdharpude26/generative-art-opensource/blob/v4/output/metamask.png?raw=true"
              className="w-64"
              alt="..."
            />
          </div>
          {blockchain.errorMsg !== "" ? (
            onError()
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
