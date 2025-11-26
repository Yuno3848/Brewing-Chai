import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../redux/slices/auth.slice";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(fetchMe());
    }
  }, [user, dispatch, isLoading]);

  return children;
};

export default PublicRoute;
