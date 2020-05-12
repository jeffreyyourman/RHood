// const dividendsResponse = Axios.get(`API_DIVIDENDS_URL/${ticker}`)
import React from "react";

// import { observable } from "mobx";
// import { useIndexStore } from "../../../contexts/IndexStoreContext";
import PaymentHistory from "../../payments/container/PaymentHistory";
import DividendHistory from "../../dividends/dividendHistory/container/DividendHistory";
import MyStocks from "../../myStocks/container/MyStocks";
// // import Draggable from "react-draggable";
import { useLocalStore, observer } from "mobx-react";
import GridLayout from 'react-grid-layout';

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
  // const handleDrag = (e, ui) => {
  //   const { x, y } = this.state.deltaPosition;
  //   localStore.deltaPosition.x = x + ui.deltaX;
  //   localStore.deltaPosition.y = y + ui.deltaY;
  // };

  // const onStart = () => {
  //   localStore.activeDrags = localStore.activeDrags++;
  //   // this.setState({activeDrags: ++this.state.activeDrags});
  // };

  // const onStop = () => {
  //   localStore.activeDrags = localStore.activeDrags--;
  //   // this.setState({activeDrags: --this.state.activeDrags});
  // };

  // // For controlled component
  // const adjustXPos = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   localStore.controlledPosition.x = localStore.controlledPosition.x - 10;
  //   localStore.controlledPosition.y = localStore.controlledPosition.y;
  // };

  // const adjustYPos = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // const {controlledPosition} = this.state;
  //   // const {x, y} = controlledPosition;
  //   localStore.controlledPosition.x = localStore.controlledPosition.x;
  //   localStore.controlledPosition.y = localStore.controlledPosition.y - 10;
  //   // this.setState({controlledPosition: {x, y: y - 10}});
  // };

  // const onControlledDrag = (e, position) => {
  //   const { x, y } = position;
  //   localStore.controlledPosition.x = x;
  //   localStore.controlledPosition.y = y;
  //   // this.setState({controlledPosition: {x, y}});
  // };

  // const onControlledDragStop = (e, position) => {
  //   this.onControlledDrag(e, position);
  //   this.onStop();
  // };
  // const dragHandlers = { onStart: onStart, onStop: onStop };
  const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ];
  return (
    <>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>

          <div key="PaymentHistory"><PaymentHistory /></div>
          <div key="DividendHistory"><DividendHistory /></div>
          <div key="MyStocks"><MyStocks /> </div>
        </GridLayout>
    </>
  );
});

export default Dashboard;
