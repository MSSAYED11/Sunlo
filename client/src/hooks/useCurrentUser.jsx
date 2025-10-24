import { useEffect } from "react";
import { getCurrentUser } from "../apicalls/authCalls";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.user.user);

  useEffect(() => {
    // ✅ Only fetch if user isn't already in Redux
    if (!storedUser) {
      const fetchUser = async () => {
        try {
          const result = await getCurrentUser();
          if (result) {
            dispatch(setUserData(result));
          }
        } catch (err) {
          console.error("Error fetching current user:", err);
          // ❌ Don't clear user immediately on error
          // dispatch(clearUserData());
        }
      };
      fetchUser();
    }
  }, [dispatch, storedUser]);
};

export default useCurrentUser;
