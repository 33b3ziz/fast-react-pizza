import { Params, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
// import { orderData } from "./Order";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: { params: Params<string> }) {
  const data = { priority: true };
  await updateOrder(params.orderID!, data);
  return null;
}
