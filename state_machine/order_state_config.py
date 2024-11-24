from state_machine.serializers import OrderState

stateConfig = {
    OrderState.Pending: OrderState.InPreparation.value,
    OrderState.Review: OrderState.InPreparation.value,
    OrderState.InPreparation: OrderState.Shipped.value,
    OrderState.Shipped: OrderState.Delivered.value,
    OrderState.Delivered: None,
    OrderState.Canceled: None
}


def get_order_state_config(order, value_to_review):
    current_state = OrderState(order['currentState'])

    if current_state == OrderState.Pending:
        if order['amount'] <= value_to_review:
            return stateConfig[OrderState.Pending]
        else:
            return OrderState.Review.value

    elif current_state in stateConfig:
        return stateConfig[current_state]

    raise ValueError("Invalid state transition")
