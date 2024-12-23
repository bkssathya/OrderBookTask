import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrders } from '../store/store.js';

const useWebSocket = (url, precision) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        const [, [price, count, amount]] = data;

        if (count > 0) {
          const order = {
            price: parseFloat(price.toFixed(precision)),
            amount: Math.abs(amount),
            total: parseFloat((price * Math.abs(amount)).toFixed(precision)),
            count: Math.abs(count),
          };

          if (amount > 0) {
            dispatch(addOrders({ buyOrders: [order], sellOrders: [] }));
          } else {
            dispatch(addOrders({ buyOrders: [], sellOrders: [order] }));
          }
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [url, precision, dispatch]);
};

export default useWebSocket;
