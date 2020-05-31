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
    backToAllStocks(){this.showStockInfo = !this.showStockInfo},
    totalStocksEarnings: 0,
    totalStocksPurchase: 0

  }));
  // let totalPurchase = 0;
  // let totalEarnings = 0;

  const displayStocks = indexStore.allStocksResponse.map((stock: allStocksResponseInterface) => {
    // let totalPurchasePerShare = parseInt(stock.average_buy_price) * parseInt(stock.quantity)
    // let totalEarningsPerShare = parseInt(stock.intraday_average_buy_price) * parseInt(stock.quantity)
    // totalPurchase = totalPurchase += totalPurchasePerShare;
    // totalEarnings = totalEarnings += totalEarningsPerShare;

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
        <hr />
      </div>
      
    );
  })
  return (
    <div className="myStocksContainer">
      {!localStore.showStockInfo ? (
        <>
          <h3>My Stocks: 
            {/* {indexStore.formatter().format(parseInt(localStore.chosenStock.average_buy_price))} */}
          </h3>
          {/* <h5>Total Purchased: {totalPurchase === 0 ? 0 : totalPurchase}</h5>
          <h5>Total Equity: {totalEarnings === 0 ? 0 : totalEarnings}</h5> */}
          {displayStocks}

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
