import { useSelector } from "react-redux/es/hooks/useSelector";
import { StoreState } from "../../store";

function Username() {
  const username = useSelector((state: StoreState) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
