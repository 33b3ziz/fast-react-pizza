import { useRouteError } from "react-router-dom";
import LinkBtn from "./LinkBtn";

type RouteError = {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
};

function Error() {
  const error = useRouteError() as RouteError;
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.error.message}</p>
      <LinkBtn to="-1">&larr; Go back</LinkBtn>
    </div>
  );
}

export default Error;
