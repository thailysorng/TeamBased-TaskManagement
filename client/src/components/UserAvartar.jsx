import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";
import { toast } from "sonner";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { logout } from "../redux/slices/authSlice";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const UserAvartar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("log-in");
    } catch(error) {
      toast.error("Something went wrong")
    }
  };

  return (
    <>    
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-blue-600">
            <span className="text-white font-semibold">
              {getInitials(user?.name)}
            </span>
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/2 focus:outline-none">
            <MenuItem>
              <button
                onClick={() => setOpen(true)}
                className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
              >
                <FaUser className="mr-2" aria-hidden="true" />
                Profile
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setOpenPassword(true)}
                className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
              >
                <FaUserLock className="mr-2" aria-hidden="true" />
                Change Password
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={logoutHandler}
                className="text-red-500 group flex w-full items-center rounded-md px-2 py-2 text-base"
              >
                <IoLogOutOutline className="mr-2" aria-hidden="true" />
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default UserAvartar;
