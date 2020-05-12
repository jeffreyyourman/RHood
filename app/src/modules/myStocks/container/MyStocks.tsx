import React from "react";

import { useLocalStore, observer } from "mobx-react";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import { allStocksResponseInterface } from "../../../App";
import StockInformation from "../../stockInformation/container/StocksInformation";

const MyStocks: React.FC = observer(() => {
  const indexStore = useIndexStore();

  const localStore = useLocalStore(() => ({
    chosenStock: {},
    showStockInfo: false,
    backToAllStocks(){this.showStockInfo = !this.showStockInfo}
  }));
  return (
    <div style={{'backgroundColor':'black', 'color': 'white'}}>
      {!localStore.showStockInfo ? (
        <>
          My stocks are:
          {indexStore.allStocksResponse.map((stock: allStocksResponseInterface) => {
            return (
              <>
                <p key={stock.symbol}>{stock.symbol}</p>
                <button
                  onClick={() => {
                    localStore.chosenStock = stock;
                    localStore.backToAllStocks()
                  }}
                >
                  info
                </button>
              </>
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
