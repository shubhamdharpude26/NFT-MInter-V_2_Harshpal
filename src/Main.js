import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
function Main() {
  const blockchain = useSelector((state) => state.blockchain);
  const dispatch = useDispatch();
  const [feedback, setfeedback] = useState("May be it's your lucky day!");
  // const [input, setInput] = useState(0);
  const [claimingNft, setClamingNft] = useState(false);
  var tmp2;

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

  function onSuccess() {
    console.log(blockchain);
    swal("Success", " ", "success");
  }

  function save() {
    var tmp = document.getElementById("custom-css-outlined-input");
    tmp2 = tmp.value;
    // alert(tmp1);
    // setInput(tmp1);
  }

  return (
    <div className="bg-gradient-to-b from-pink-300 to-purple-500">
      <div className="h-screen px-64 bg-hero-pattern bg-auto bg-no-repeat flex flex-col justify-start">
        {/* <img src="/src/vectorArt.svg" alt="" /> */}
        <div className="bg-red-500 text-white rounded-b-2xl w-28 h-24 font-semibold flex justify-center items-center">
          NFT MINTER
        </div>
        <div className="mt-24 w-3/5">
          <div className="bg-white shadow-lg sm:rounded-3xl bg-opacity-30 backdrop-blur-md border border-white pb-8 pl-8">
            <div className="my-18 mr-60 ml-9 pt-9">
              <p className="text-3xl mb-3 font-montserrat font-semibold text-white">
                Grab a NFT for{" "}
                <span className="text-gray-700">0.02 MATIC</span> before they
                are gone!
              </p>
            </div>
            <div className=" mr-64 ml-9">
              <p className="text-base mb-3 font-montserrat font-semibold text-neutral-500">
              {feedback}
              </p>
            </div>
            <div className="mr-64 ml-9">
              <input
                class="placeholder:italic shadow-xl shadow-red-500/30 placeholder:text-slate-400 block bg-white border-red-300 border-2 rounded-md py-2 pl-4 pr-4 shadow-sm focus:outline-none focus:border-red-300 focus:ring-red-400 focus:ring-1 sm:text-sm w-full"
                placeholder="Enter no. of NFT to Buy"
                type="text"
                id="custom-css-outlined-input"
              />
              <button
                class="bg-red-500 shadow-lg shadow-red-500/50 text-white rounded-md my-6 py-2 w-5/12"
                type="submit"
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  save();
                  // alert(tmp2);
                  claimNfts(tmp2);
                }}
              >
                {claimingNft ? "Busy Claiming" : "Claim NFT"}
              </button>
            </div>
            <div className="mr-64 ml-9 text-blue-800">
              <a href="https://testnets.opensea.io/collection/teamnftminter-v2">Visit OpenSea Market Place</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
