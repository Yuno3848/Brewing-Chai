import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { fetchMe } from "../../redux/slices/auth.slice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch(fetchMe());
    }
  }, [user, dispatch, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  
  if (!user) {
    <Navigate to="/signin" replace />;
    return null;
  }
  return children;
};

export default ProtectedRoute;
