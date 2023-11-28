import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItemFromCart } from "./cartSlice";

interface Props {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: Props) {
  const dispatch = useDispatch();

  return (
    <Button type="sm" onClick={() => dispatch(deleteItemFromCart(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
