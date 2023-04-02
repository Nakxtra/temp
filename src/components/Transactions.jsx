import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const Field = ({data}) => {
  return (
    <label class="relative block m-2">
      <input class="cursor-pointer block bg-[#C0C0C0] w-full border border-slate-300 rounded-md py-1 pr-3 shadow-lg focus:outline-none sm:text-sm" placeholder={data} type="text" disabled/>
    </label>
  )
}

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[370px]
      2xl:max-w-[450px]
      sm:min-w-[300px]
      sm:max-w-[350px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-3 p-2">
          <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-xs">From <Field data = {shortenAddress(addressFrom)}/></p>
          </a>
          <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-xs">To <Field data = {shortenAddress(addressTo)}/></p>
          </a>
          <p className="text-white text-xs">Amount <Field data = {amount}/> </p>
          {message && (
            <>
              <span className="text-xs text-white">Message </span><span className="text-[#C0C0C0] text-s mt-4">{message}</span>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-75 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#D4D4D4] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
