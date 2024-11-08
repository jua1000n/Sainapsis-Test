import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Order } from "@/types/Order";
import { OrderState } from "@/types/OrderState";
import { OrderStatusHistory } from "@/types/OrderStatusHistory";

export const StateControl: React.FC<{
  order: Order;
  updateOrderState: (id: string, newState: OrderState) => void;
  addOrderStatusHistory: (orderStatusHistory: OrderStatusHistory) => void;
}> = ({ order, updateOrderState, addOrderStatusHistory }) => {
  const [statePopover, setStatePopover] = useState(false);

  const valueToReview = 1000;

  const stateConfig = {
    [OrderState.Pending]: {
      buttonText:
        order.amount <= valueToReview ? "Start Preparation" : "Review Order",
      nextState:
        order.amount <= valueToReview
          ? OrderState.InPreparation
          : OrderState.Review,
    },
    [OrderState.Review]: {
      buttonText: "Start Preparation",
      nextState: OrderState.InPreparation,
    },
    [OrderState.InPreparation]: {
      buttonText: "Send Order",
      nextState: OrderState.Shipped,
    },
    [OrderState.Shipped]: {
      buttonText: "Confirm Delivery",
      nextState: OrderState.Delivered,
    },
    [OrderState.Delivered]: {
      buttonText: "Delivered",
      nextState: OrderState.InPreparation,
    },
    [OrderState.Canceled]: {
      buttonText: "Canceled",
      nextState: null,
    },
  };

  const handleButtonClick = (nextState: OrderState | null = null) => {
    const currentState = order.currentState;
    const targetState = nextState ?? stateConfig[currentState].nextState;

    if (targetState) {
      updateOrderState(order.id, targetState);
      const date = new Date();

      const newOrderStatusHistory: OrderStatusHistory = {
        orderId: order.id,
        previewState: currentState,
        currentState: targetState,
        date: date,
      };
      addOrderStatusHistory(newOrderStatusHistory);
    }
  };

  const currentButton = stateConfig[order.currentState];

  return (
    <Popover open={statePopover} onOpenChange={setStatePopover}>
      <PopoverTrigger asChild>
        <Button>Manage status</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Manage status</h4>
          <p className="text-sm text-muted-foreground">
            In this area you can manage the status of your order
          </p>
        </div>
        <div className="flex justify-between">
          <Button
            className="w-32"
            onClick={() => handleButtonClick(OrderState.Canceled)}
            disabled={[
              OrderState.Delivered,
              OrderState.Canceled,
              OrderState.Shipped,
            ].includes(order.currentState)}
          >
            Cancel Order
          </Button>
          <Button
            className="w-32"
            onClick={() => handleButtonClick()}
            disabled={[OrderState.Delivered, OrderState.Canceled].includes(
              order.currentState
            )}
          >
            {currentButton.buttonText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
