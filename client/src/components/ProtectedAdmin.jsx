import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({
  children,
}) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // NOT LOGGED IN
  if (!userInfo) {

    return <Navigate to="/login" />;
  }

  // NOT ADMIN
  if (userInfo.role !== "admin") {

    return <Navigate to="/" />;
  }

  // ADMIN
  return children;
};

export default ProtectedAdmin;