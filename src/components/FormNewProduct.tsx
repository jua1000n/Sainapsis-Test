import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TableBasic } from "./TableBasic";
import { ColumnDef } from "@tanstack/react-table";
import { ProductDetail } from "@/types/ProductDetail";

const formNewProduct = z.object({
  name: z.string().min(1),
  unitPrice: z.string().regex(/^\d+$/),
  quantity: z.string().regex(/^\d+$/),
});

export const columns: ColumnDef<ProductDetail>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "unitPrice",
    header: () => <div className="text-right">Unit Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unitPrice"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

interface FormNewProductProps {
  listProductDetails: ProductDetail[];
  setListProductDetails: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
}

export const FormNewProduct: React.FC<FormNewProductProps> = ({
  listProductDetails,
  setListProductDetails,
}) => {
  const form = useForm<z.infer<typeof formNewProduct>>({
    resolver: zodResolver(formNewProduct),
    defaultValues: {
      name: "",
      unitPrice: "",
      quantity: "",
    },
  });

  const { handleSubmit, reset, setFocus } = form;

  const onHandleSubmitCreateProduct = (
    value: z.infer<typeof formNewProduct>
  ) => {
    setFocus("name");
    setListProductDetails((old) => [
      ...old,
      {
        name: value.name,
        unitPrice: Number(value.unitPrice),
        quantity: Number(value.quantity),
      },
    ]);
    reset();
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={handleSubmit(onHandleSubmitCreateProduct)}>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-5">
            <div>
              <FormField
                control={form.control}
                name="name"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <TableBasic data={listProductDetails} columns={columns} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
