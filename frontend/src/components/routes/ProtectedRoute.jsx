import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { fetchMe } from "../../redux/slices/auth.slice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchMe()).finally(() => setHasFetched(true));
    } else {
      setHasFetched(true);
    }
  }, [user, dispatch]);

  if (!hasFetched || isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
