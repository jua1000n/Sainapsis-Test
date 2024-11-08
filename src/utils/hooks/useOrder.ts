import useStore from "@/store/useStore";

export const useOrder = () => {
  const orders = useStore((state) => state.orders);

  return { orders };
};
