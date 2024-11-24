from enum import Enum

from rest_framework import serializers


class OrderState(Enum):
    Pending = "Pending"
    Review = "Review"
    InPreparation = "In Preparation"
    Shipped = "Shipped"
    Delivered = "Delivered"
    Canceled = "Canceled"


class CustomerSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.CharField(max_length=100, required=True)


class ProductDetailSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=True)
    unitPrice = serializers.FloatField(min_value=0, required=True)
    quantity = serializers.IntegerField(min_value=1, required=True)


class OrderSerializer(serializers.Serializer):
    id = serializers.CharField(required=True)
    amount = serializers.IntegerField(min_value=0, required=True)
    currentState = serializers.ChoiceField(choices=[(state.name, state.value) for state in OrderState], required=True)
    creationDate = serializers.DateField(required=True)
    customer = CustomerSerializer(required=True)
    productDetails = ProductDetailSerializer(many=True, required=True, )
    notes = serializers.CharField(required=False, allow_blank=True)

    def validate_product_details(self, value):
        if not value or len(value) < 1:
            raise serializers.ValidationError("productDetails should has a minimum a 1 productDetail.")
        return value


class OrderStatusHistorySerializer(serializers.Serializer):
    date = serializers.DateField()
    orderId = serializers.CharField()
    previewState = serializers.ChoiceField(choices=[(state.name, state.value) for state in OrderState], required=False)
    currentState = serializers.ChoiceField(choices=[(state.name, state.value) for state in OrderState],
                                           default=OrderState.Pending.value)
