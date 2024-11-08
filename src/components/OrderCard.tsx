import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Order } from "@/types/Order";
import { StateControl } from "./StateControl";
import useStore from "@/store/useStore";

export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { updateOrderState, addOrderStatusHistory } = useStore();

  return (
    <Card className="text-left min-w-72 max-w-96">
      <CardHeader>
        <p className="text-lg font-medium leading-none">
          <span className="font-bold">Order Id: </span> {order.id}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="text-left">
          <p className="text-sm font-normal leading-none">
            <span className="font-bold">Current State: </span>
            {order.currentState}
          </p>
        </div>
        <div className="text-left">
          <p className="text-sm font-normal leading-none">
            <span className="font-bold">Amount: </span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.amount)}
          </p>
        </div>
        <div className="text-left">
          <p className="text-sm font-normal leading-none">
            <span className="font-bold">Date: </span>
            {new Intl.DateTimeFormat("en-US").format(
              new Date(order.creationDate)
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <StateControl
          order={order}
          updateOrderState={updateOrderState}
          addOrderStatusHistory={addOrderStatusHistory}
        />
      </CardFooter>
    </Card>
  );
};
