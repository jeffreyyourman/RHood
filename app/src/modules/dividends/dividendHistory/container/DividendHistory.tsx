import React, { useEffect } from "react";
import { API_DIVIDENDS_HISTORY_URL } from "../../../../helpers/variables";
import Axios from "axios";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { useIndexStore } from "../../../../contexts/IndexStoreContext";
import "../dividendHistory.css";

const DividendHistory: React.FC = observer(() => {
  const indexStore = useIndexStore();
  useEffect(() => {
    (async function () {
      const dividendHistoryResponse = await Axios.get(
        `${API_DIVIDENDS_HISTORY_URL}`
      );
      const dividendHistory = dividendHistoryResponse.data.response;
      console.log("dividendHistory", dividendHistory);
      indexStore.dividendHistoryResponse = dividendHistory;
    })();
  }, []);
  if (indexStore.dividendHistoryResponse.length === 0) {
    return <p>loading...</p>;
  }
  let totalAmt = 0;
  let displayName = '';
//   console.log({
//     stock: indexStore.allStocksResponse,

//     dividendHistoryResponse: indexStore.dividendHistoryResponse
// })
  const displayDividendHistory = indexStore.dividendHistoryResponse.map(
    (value, index) => {
      // if (indexStore.allStocksResponse.includes(value.url) ) {
      //   displayName = indexStore.allStocksResponse;
      // }

      // indexStore.allStocksResponse.some(item => {
      //   if(item.instruments === value.instruments ) {
      //     displayName = item.name
      //   }
      // }) 

      totalAmt = totalAmt + parseInt(value.amount);
      return (
        <React.Fragment key={index}>
          {/* <p>Name: {displayName}</p> */}
          <p>Amount: {indexStore.formatter().format(parseInt(value.amount))}</p>
          <p>Date: {value.payable_date}</p>
          <hr />
        </React.Fragment>
      );
    }
  );
  return (
    <div className="dividendHistoryContainer">
      <h3>Total: {indexStore.formatter().format(totalAmt)}</h3>
      {displayDividendHistory}
    </div>
  );
});

export default DividendHistory;
