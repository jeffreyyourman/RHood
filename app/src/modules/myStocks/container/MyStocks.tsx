import React, { useEffect } from "react";

import { useLocalStore, observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import { instrumentResponse } from "../../../App";
import StocksDividend from "../../dividends/stockDividend/container/StocksDividend";

const MyStocks: React.FC = observer(() => {
  const indexStore = useIndexStore();
  
  const localStore = useLocalStore(() => ({
    ticker: "",
}));
  return (
    <>
      <div>
        My stocks are:
        {indexStore.instrumentResponse.map((stock: instrumentResponse) => {
          return (
            <>
              <p key={stock.symbol}>{stock.symbol}</p>
              <button onClick={() => {localStore.ticker = stock.symbol}}>info</button>
            </>
          );
        })}
        {localStore.ticker !== "" &&  <StocksDividend ticker={localStore.ticker} />}
        
      </div>
    </>
  );
});

export default MyStocks;
