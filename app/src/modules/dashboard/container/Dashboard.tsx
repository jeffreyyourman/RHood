// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React from "react";

// import { observable } from "mobx";
// import { useIndexStore } from "../../../contexts/IndexStoreContext";
import PaymentHistory from "../../payments/container/PaymentHistory";
import DividendHistory from "../../dividends/dividendHistory/container/DividendHistory";
import MyStocks from "../../myStocks/container/MyStocks";
// // import Draggable from "react-draggable";
import { useLocalStore, observer } from "mobx-react";
import '../Dashboard.css';

const Dashboard: React.FC = observer(() => {
  // const localStore = useLocalStore(() => ({
  //   activeDrags: 0,
  //   deltaPosition: {
  //     x: 0,
  //     y: 0,
  //   },
  //   controlledPosition: {
  //     x: -400,
  //     y: 200,
  //   },
  // }));
  // // const indexStore = useIndexStore();

  return (
    <div className="dashboardContainer">
      <PaymentHistory />
      <DividendHistory />
      <MyStocks />
    </div>
  );
});

export default Dashboard;
