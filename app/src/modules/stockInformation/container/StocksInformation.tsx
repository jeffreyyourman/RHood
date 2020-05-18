// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${chosenStock}`)
import React, { useEffect } from "react";
import { API_STOCKS_DIVIDEND_URL } from "../../../helpers/variables";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../contexts/IndexStoreContext";
import Axios from "axios";
import { useLocalStore, useObserver } from "mobx-react";

export interface MyStockDividend {
  chosenStock;
  backToAllStocks;
}
export interface DividendHistory {
  annualizedDividend: string,
  dividendPaymentDate: string,
  dividends: any,
  exDividendDate: string,
  payoutRatio: string,
  ticker: string,
  yield: string,

}

const StocksInformation: React.FC<MyStockDividend> = observer(
  ({ backToAllStocks, chosenStock }) => {
    const indexStore = useIndexStore();
    const localStore = useLocalStore(() => ({
      stockDividendResponse: {} as any
    }));
    useEffect(() => {
      (async function () {
        try {
          const StockDividendResponse = await Axios.get(
            `${API_STOCKS_DIVIDEND_URL}/${chosenStock.symbol}`
          );
          const stockDividend = StockDividendResponse.data.response.data;
          // console.log('stockDividend',stockDividend);
          localStore.stockDividendResponse = stockDividend;
        } catch (err) {
          console.log("error", err);
        }
      })();
    }, []);
    console.log('localStore.stockDividendResponse',localStore.stockDividendResponse);
    if (Object.keys(localStore.stockDividendResponse).length === 0) {
      return <div>loading...</div>;

    }
    
    return (
      <>
        <div>
          <p>Name: {chosenStock.name}</p>
          <p>Average buy price: {chosenStock.average_buy_price}</p>
          <p>Average stock price: {chosenStock.intraday_average_buy_price}</p>
          <p>Quantity:{chosenStock.quantity}</p>
          <p>Symbol: {chosenStock.symbol}</p>
          <table style={{"width":"100%"}}>
            <thead>
            <tr>
              <th>{localStore.stockDividendResponse.dividends.headers.amount}</th>
              <th>{localStore.stockDividendResponse.dividends.headers.declarationDate}</th>
              <th>{localStore.stockDividendResponse.dividends.headers.exOrEffDate}</th>
              <th>{localStore.stockDividendResponse.dividends.headers.paymentDate}</th>
              <th>{localStore.stockDividendResponse.dividends.headers.recordDate}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{localStore.stockDividendResponse.dividends.rows[0].amount}</td>
              <td>{localStore.stockDividendResponse.dividends.rows[0].declarationDate}</td>
              <td>{localStore.stockDividendResponse.dividends.rows[0].exOrEffDate}</td>
              <td>{localStore.stockDividendResponse.dividends.rows[0].paymentDate}</td>
              <td>{localStore.stockDividendResponse.dividends.rows[0].recordDate}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <button onClick={() => backToAllStocks()}>back</button>
      </>
    );
  }
);

export default StocksInformation;
