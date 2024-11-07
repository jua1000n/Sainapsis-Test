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
import useStore from "@/store/useStore";
import { Order } from "@/types/Order";
import { v4 as uuidv4 } from "uuid";
import { OrderState } from "@/types/OrderState";

const formNewOrder = z.object({
  idCustomer: z.string().regex(/^\d+$/),
  amount: z.string().regex(/^\d+$/),
  firstName: z.string().min(1),
  lastName: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  note: z.string(),
});

export const FormNewOrder = () => {
  const { addOrder, orders } = useStore();

  const form = useForm<z.infer<typeof formNewOrder>>({
    resolver: zodResolver(formNewOrder),
    defaultValues: {
      idCustomer: "",
      amount: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      note: "",
    },
  });

  const [listProductDetails, setListProductDetails] = useState<ProductDetail[]>(
    []
  );

  const { control, handleSubmit } = form;

  const onHandleSubumitCreateOrder = (values: z.infer<typeof formNewOrder>) => {
    const newUUID = uuidv4();

    const newOrder: Order = {
      id: newUUID,
      amount: Number(values.amount),
      currentState: OrderState.Pending,
      creationDate: new Date(),
      customer: {
        id: Number(values.idCustomer),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
        city: values.city,
        country: values.country,
      },
      productDetails: listProductDetails,
      notes: values.note,
    };
    addOrder(newOrder);
  };

  return (
    <div className="flex gap-5">
      <Card>
        <Form {...form}>
          <form onSubmit={handleSubmit(onHandleSubumitCreateOrder)}>
            <CardContent className="grid grid-cols-4 gap-5">
              <FormField
                control={control}
                name="idCustomer"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Identification number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="firstName"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Last Name</FormLabel>
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
                name="address"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="city"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="country"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
  );
};
