

import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import {instrumentResponse} from '../../../App';
const MyStocks: React.FC = observer(() => {
  const indexStore = useIndexStore();

  return (
    <>
      <div>My stocks are: {indexStore.instrumentResponse.map((stock: instrumentResponse)=>{return <p key={stock.symbol}>{stock.symbol}</p>})}</div>
    </>
  );
});

export default MyStocks;
