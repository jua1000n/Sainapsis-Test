import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FormNewProduct } from "./FormNewProduct";
import { ProductDetail } from "@/types/ProductDetail";
import { useState } from "react";
import { Order } from "@/types/Order";
import { v4 as uuidv4 } from "uuid";
import { OrderState } from "@/types/OrderState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useCreateOrder } from "@/utils/hooks/useCreateOrder ";

const formNewOrder = z.object({
  amount: z.string().regex(/^\d+$/),
  name: z.string().min(1),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  note: z.string(),
});

export const FormNewOrder = () => {
  const { createOrder } = useCreateOrder();

  const [stateDialog, setStateDialog] = useState(false);

  const form = useForm<z.infer<typeof formNewOrder>>({
    resolver: zodResolver(formNewOrder),
    defaultValues: {
      amount: "",
      name: "",
      email: "",
      note: "",
    },
  });

  const [listProductDetails, setListProductDetails] = useState<ProductDetail[]>(
    []
  );

  const { control, handleSubmit, reset } = form;

  const onHandleSubumitCreateOrder = (values: z.infer<typeof formNewOrder>) => {
    const newUUID = uuidv4();
    const date = new Date();

    const newOrder: Order = {
      id: newUUID,
      amount: Number(values.amount),
      currentState: OrderState.Pending,
      creationDate: date,
      customer: {
        name: values.name,
        email: values.email,
      },
      productDetails: listProductDetails,
      notes: values.note,
    };

    reset();
    createOrder(newOrder);
    setListProductDetails([]);
    setStateDialog(false);
  };

  return (
    <Dialog open={stateDialog} onOpenChange={setStateDialog}>
      <DialogTrigger asChild>
        <Button>Create New Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1400px]">
        <DialogHeader>
          <DialogTitle>Create a new order</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5">
          <Card>
            <Form {...form}>
              <form onSubmit={handleSubmit(onHandleSubumitCreateOrder)}>
                <CardContent className="grid grid-cols-4 gap-5">
                  <FormField
                    control={control}
                    name="name"
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    rules={{ required: true }}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="text-left col-span-4">
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add notes about your order"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit">Submit</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          <FormNewProduct
            listProductDetails={listProductDetails}
            setListProductDetails={setListProductDetails}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
