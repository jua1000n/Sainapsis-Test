import { OrderList } from "@/components/OrderList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const OrderManagement = () => {
  return (
    <Card>
      <CardHeader className="w-full flex justify-between items-center">
        <CardTitle className="w-full text-left">Order Management</CardTitle>
        <div className="w-full text-right">
          <Button>
            <Link to={"/transition-logs"}>Watch history status</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <OrderList />
      </CardContent>
    </Card>
  );
};
