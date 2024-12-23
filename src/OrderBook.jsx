import React from 'react';
import { useTranslation } from 'react-i18next';


const OrderBook = ({ buyOrders, sellOrders, precision = 2 }) => {
  const maxBuyTotal = Math.max(...buyOrders.map((order) => order.total));
  const maxSellTotal = Math.max(...sellOrders.map((order) => order.total));
  const { i18n } = useTranslation();

  return (
    <div className="order-book">
      {/* Buy Orders */}
      <div className="buy-orders">
        <h3>{i18n.t('home.orderBook.buyOrders')}</h3>
        {[...buyOrders].reverse().map((order, index) => {
          const fillWidth = `${(order.total / maxBuyTotal) * 100}%`;
          return (
            <div
              key={index}
              className="order buy"
              style={{ '--fill-width': fillWidth }}
            >
              <span>{order.count}</span>
              <span>{order.price.toFixed(precision)}</span>
              <span>{order.amount}</span>
              <span>{order.total.toFixed(precision)}</span>
            </div>
          );
        })}
      </div>

      {/* Sell Orders */}
      <div className="sell-orders">
        <h3>{i18n.t('home.orderBook.sellOrders')}</h3>
        {[...sellOrders].reverse().map((order, index) => {
          const fillWidth = `${(order.total / maxSellTotal) * 100}%`;
          return (
            <div
              key={index}
              className="order sell"
              style={{ '--fill-width': fillWidth }}
            >
              <span>{order.count}</span>
              <span>{order.price.toFixed(precision)}</span>
              <span>{order.amount}</span>
              <span>{order.total.toFixed(precision)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBook;
