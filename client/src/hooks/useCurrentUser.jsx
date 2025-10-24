import { useEffect } from "react";
import { getCurrentUser } from "../apicalls/authCalls";
import { useDispatch } from "react-redux";
import { setUserData, clearUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();
        console.log(result);
        dispatch(setUserData(result));
      } catch (err) {
        dispatch(clearUserData());
        console.error(err);
      }
    };

    fetchUser();
  }, [dispatch]); // include dispatch in dependency array
};

export default useCurrentUser;
