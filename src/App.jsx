import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import OrderBook from './OrderBook';
import useWebSocket from './CustomComponent/useWebSocket';
import { useTranslation } from 'react-i18next';


const App = () => {
  const [precision, setPrecision] = useState(2);
  const { buyOrders, sellOrders } = useSelector((state) => state.orderBook);
  const { i18n } = useTranslation();

  // WebSocket hook
  useWebSocket('wss://api-pub.bitfinex.com/ws/2', precision);
  const maxDisplayCount = 20;

  const limitedBuyOrders = useMemo(() => buyOrders.slice(-maxDisplayCount).reverse(), [buyOrders]);
  const limitedSellOrders = useMemo(() => sellOrders.slice(-maxDisplayCount).reverse(), [sellOrders]);

  const handleIncreasePrecision = () => setPrecision((prev) => prev + 1);
  const handleDecreasePrecision = () => setPrecision((prev) => Math.max(prev - 1, 0));

  return (
    <div className="app">
      <div className="controls">
        <button className='btn btn-primary precision-btn' onClick={handleIncreasePrecision}>{i18n.t('home.increasePrecision')}</button>
        <button className='btn btn-primary precision-btn' onClick={handleDecreasePrecision}>{i18n.t('home.decreasePrecision')}</button>
      </div>
      <OrderBook buyOrders={limitedBuyOrders} sellOrders={limitedSellOrders} precision={precision} />
    </div>
  );
};

export default App;
