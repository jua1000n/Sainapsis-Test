import datetime
from uuid import uuid4

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from state_machine.order_state_config import get_order_state_config
from state_machine.serializers import OrderSerializer, OrderState, OrderStatusHistorySerializer

orders = [
    {
        "id": "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
        "amount": 100,
        "currentState": OrderState.Shipped.value,
        "creationDate": datetime.datetime.now().date(),
        "customer": {
            "name": "Juan",
            "email": "juan@example.com",
        },
        "productDetails": [
            {
                "name": "Product 1",
                "quantity": 2,
                "unitPrice": 50,
            },
            {
                "name": "Product 2",
                "quantity": 1,
                "unitPrice": 75,
            },
        ],
        "notes": "Some notes",
    }, {
        "id": "d16c3bde-3abf-497b-8e6a-b3d92bd58141",
        "amount": 1100,
        "currentState": OrderState.Pending.value,
        "creationDate": datetime.datetime.now().date(),
        "customer": {
            "name": "Laura",
            "email": "laura@example.com",
        },
        "productDetails": [
            {
                "name": "Product 1",
                "quantity": 2,
                "unitPrice": 50,
            },
            {
                "name": "Product 2",
                "quantity": 1,
                "unitPrice": 450,
            },
        ],
        "notes": "Some notes",
    },
    {
        "id": "0a412d20-44de-4c74-9bd0-7dd93b1501ce",
        "amount": 500,
        "currentState": OrderState.Pending.value,
        "creationDate": datetime.datetime.now().date(),
        "customer": {
            "name": "Laura",
            "email": "laura@example.com",
        },
        "productDetails": [
            {
                "name": "Product 1",
                "quantity": 2,
                "unitPrice": 50,
            },
            {
                "name": "Product 2",
                "quantity": 1,
                "unitPrice": 450,
            },
        ],
        "notes": "Some notes",
    },
    {
        "id": "b0637395-21a6-44d4-a6ef-7eab30442401",
        "amount": 500,
        "currentState": OrderState.InPreparation.value,
        "creationDate": datetime.datetime.now().date(),
        "customer": {
            "name": "Laura",
            "email": "laura@example.com",
        },
        "productDetails": [
            {
                "name": "Product 1",
                "quantity": 2,
                "unitPrice": 50,
            },
            {
                "name": "Product 2",
                "quantity": 1,
                "unitPrice": 450,
            },
        ],
        "notes": "Some notes",
    },
]

order_status_history = [
    {
        "orderId": "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
        "previewState": None,
        "currentState": OrderState.Pending.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
        "previewState": OrderState.Pending.value,
        "currentState": OrderState.InPreparation.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
        "previewState": OrderState.InPreparation.value,
        "currentState": OrderState.Shipped.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "d16c3bde-3abf-497b-8e6a-b3d92bd58141",
        "previewState": None,
        "currentState": OrderState.Pending.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "0a412d20-44de-4c74-9bd0-7dd93b1501ce",
        "previewState": None,
        "currentState": OrderState.Pending.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "b0637395-21a6-44d4-a6ef-7eab30442401",
        "previewState": None,
        "currentState": OrderState.Pending.value,
        "date": datetime.datetime.now().date(),
    },
    {
        "orderId": "b0637395-21a6-44d4-a6ef-7eab30442401",
        "previewState": OrderState.Pending.value,
        "currentState": OrderState.InPreparation.value,
        "date": datetime.datetime.now().date(),
    }
]

value_to_review = 1000


# Create your views here.

@api_view(['GET'])
def get_orders(request):
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_orders_status_history(request):
    serializer = OrderStatusHistorySerializer(order_status_history, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_order(request):
    request.data['currentState'] = OrderState.Pending.value
    request.data['id'] = str(uuid4())
    request.data['creationDate'] = datetime.datetime.now().date()

    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        order = serializer.validated_data
        orders.append(order)
        order_status_history.append({
            "orderId": request.data['id'],
            "previewState": None,
            "currentState": OrderState.Pending.value,
            "date": datetime.datetime.now().date(),
        }, )
        return Response(order, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def next_order_state(request, id):
    result = next((order for order in orders if order['id'] == id), None)

    if not result:
        return Response(f"Not found id {id}", status=status.HTTP_400_BAD_REQUEST)

    try:
        state = get_order_state_config(result, value_to_review)

        if state:
            order_status_history.append({
                "orderId": id,
                "previewState": result['currentState'],
                "currentState": state,
                "date": datetime.datetime.now().date(),
            }, )
            result['currentState'] = state

    except ValueError as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    return Response(result, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def cancel_order(request, id):
    result = next((order for order in orders if order['id'] == id), None)
    if not result:
        return Response(f"Not found id {id}", status=status.HTTP_400_BAD_REQUEST)

    current_state = OrderState(result['currentState'])
    if current_state == OrderState.Delivered or current_state == OrderState.Shipped:
        return Response("The current status cannot be changed to Cancelled", status=status.HTTP_400_BAD_REQUEST)
    else:
        order_status_history.append({
            "orderId": id,
            "previewState": result['currentState'],
            "currentState": OrderState.Canceled.value,
            "date": datetime.datetime.now().date(),
        }, )
        result['currentState'] = OrderState.Canceled.value

    return Response(result, status=status.HTTP_200_OK)
