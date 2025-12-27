import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmationDialog from "../Dialogs";
import {
  useDuplicateTaskMutation,
  useTrashTastMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const TaskDialog = ({ task }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.isAdmin;
  const isAssigned = task?.team?.some((member) => member?._id === user?._id);
  const canOpenTask = isAdmin || isAssigned;

  const [openSubTask, setOpenSubTask] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [deleteTask] = useTrashTastMutation();
  const [duplicateTask] = useDuplicateTaskMutation();

  const duplicateHandler = async () => {
    try {
      const res = await duplicateTask(task._id).unwrap();
      toast.success(res?.message);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({ id: task._id, isTrashed: "trash" }).unwrap();
      toast.success(res?.message);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" />,
      onClick: () => navigate(`/task/${task._id}`),
      allowed: canOpenTask,
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" />,
      onClick: () => setOpenEdit(true),
      allowed: isAdmin,
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className="mr-2 h-5 w-5" />,
      onClick: () => setOpenSubTask(true),
      allowed: isAdmin,
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className="mr-2 h-5 w-5" />,
      onClick: duplicateHandler,
      allowed: isAdmin,
    },
  ];

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center px-4 py-2 text-gray-600">
          <BsThreeDots />
        </MenuButton>

        <Transition as={Fragment}>
          <MenuItems className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 p-2">
            {items.map((el) => (
              <MenuItem key={el.label}>
                {({ active }) => (
                  <button
                    disabled={!el.allowed}
                    onClick={el.onClick}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } flex w-full items-center rounded-md px-2 py-2 text-sm disabled:text-gray-400`}
                  >
                    {el.icon}
                    {el.label}
                  </button>
                )}
              </MenuItem>
            ))}

            <MenuItem>
              {({ active }) => (
                <button
                  disabled={!isAdmin}
                  onClick={() => setOpenDialog(true)}
                  className={`${
                    active ? "bg-red-100 text-red-900" : "text-red-900"
                  } flex w-full items-center rounded-md px-2 py-2 text-sm disabled:text-gray-400`}
                >
                  <RiDeleteBin6Line className="mr-2 h-5 w-5" />
                  Delete
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>

      {/* Dialogs */}
      <AddTask open={openEdit} setOpen={setOpenEdit} task={task} />
      <AddSubTask open={openSubTask} setOpen={setOpenSubTask} id={task._id} />
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default TaskDialog;
