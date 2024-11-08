import { OrderCard } from "./OrderCard";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Order } from "@/types/Order";
import { useOrder } from "@/utils/hooks/useOrder";

export const OrderList = () => {
  const { orders } = useOrder();
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);

  const [listOrders, setListOrders] = useState<Order[]>([]);

  useEffect(() => {
    setListOrders(
      orders.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
    );
  }, [orders, pageSize, currentPage]);

  const onHandlePageChange = (num: number) => {
    const toChange = currentPage + num;
    if (0 <= toChange && toChange < orders.length) {
      setCurrentPage((old) => old + num);
    }
  };

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {listOrders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
      <div className="w-full flex gap-5 mt-10 justify-end">
        <Button
          onClick={() => onHandlePageChange(-1)}
          disabled={currentPage * pageSize <= 0}
        >
          Preview page
        </Button>
        <Button
          onClick={() => onHandlePageChange(1)}
          disabled={pageSize * (currentPage + 1) >= orders.length}
        >
          Next page
        </Button>
      </div>
    </div>
  );
};
