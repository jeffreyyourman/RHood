import React from "react";

import { useLocalStore, observer } from "mobx-react";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import { allStocksResponseInterface } from "../../../App";
import StockInformation from "../../stockInformation/container/StocksInformation";
import '../myStocks.css';

const MyStocks: React.FC = observer(() => {
  const indexStore = useIndexStore();

  const localStore = useLocalStore(() => ({
    chosenStock: {},
    showStockInfo: false,
    backToAllStocks(){this.showStockInfo = !this.showStockInfo}
  }));
  return (
    <div className="myStocksContainer">
      {!localStore.showStockInfo ? (
        <>
          My stocks are:
          {indexStore.allStocksResponse.map((stock: allStocksResponseInterface) => {
            return (
              <div key={stock.symbol}>
                <p>{stock.symbol}</p>
                <button
                  onClick={() => {
                    localStore.chosenStock = stock;
                    localStore.backToAllStocks()
                  }}
                >
                  info
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {Object.keys(localStore.chosenStock).length !== 0 && (
            <StockInformation backToAllStocks={localStore.backToAllStocks} chosenStock={localStore.chosenStock} />
          )}
        </>
      )}
    </div>
  );
});

export default MyStocks;
