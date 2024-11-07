import { FormNewOrder } from "@/components/FormNewOrder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const UserInterface = () => {
  // const { orders, addOrder } = useStore();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Order</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[1400px]">
          <DialogHeader>
            <DialogTitle>Create a new order</DialogTitle>
          </DialogHeader>
          <FormNewOrder />
        </DialogContent>
      </Dialog>
    </div>
  );
};
