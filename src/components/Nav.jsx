import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";

const Nav = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: logoutDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch({
        type: "LOGOUT",
      });
      showToast(logoutDispatch, "Successfully logout", 3000);
      navigate("/admin/login");
    } catch (error) {
      if (error.message) {
        setError({ message: error.message });
        showToast(logoutDispatch, "Something went wrong.", 3000);
      }
    }
  };
  return (
    <div className="flex justify-between items-center bg-[#21261c] p-3 rounded-md sticky top-0">
      <div>
        <h3 className="text-5xl font-bold">APP</h3>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-[#9BFF00] rounded-3xl py-1 px-3 font-semibold text-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
