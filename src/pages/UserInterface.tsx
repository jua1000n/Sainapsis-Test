import { FormNewOrder } from "@/components/FormNewOrder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TransitionLog } from "@/pages/TransitionLog";
import { Link } from "react-router-dom";

export const UserInterface = () => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent className="w-full flex justify-between mt-6">
          <Button>
            <Link to="/order-management">Go to management orders</Link>
          </Button>
          <FormNewOrder />
        </CardContent>
      </Card>
      <TransitionLog />
    </div>
  );
};
