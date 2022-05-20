import { CameraIcon, CloseIcon } from "assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "features/auth/authSlice";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";

const EditProfileModal = ({ setShowEditModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userForm, setUserForm] = useState({});

  const updateHandler = () => {
    dispatch(updateUserDetails({ ...userForm }));
    setShowEditModal(false);
    toast.success("User details updated!");
  };

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  const updateImageHandler = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "lldan9bz");
      data.append("cloud_name", "dqtzqp7ks");
      const requestOptions = {
        method: "POST",
        body: data,
      };
      await fetch(
        "https://api.cloudinary.com/v1_1/dqtzqp7ks/image/upload",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("----", data, data.url);
          setUserForm({ ...userForm, profilePic: data.url });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-overlay flex z-10"
        onClick={() => setShowEditModal(false)}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="m-auto bg-white p-6 rounded-md form-wrapper  relative"
        >
          <CloseIcon
            className="absolute right-[-0.5rem] top-[-0.5rem] bg-red-400 rounded-full cursor-pointer"
            size={22}
            onClick={() => setShowEditModal(false)}
          />
          <div className="flex flex-col gap-4 items-center mb-2">
            <div className="relative">
              <img
                src={userForm?.profilePic}
                className="h-[5rem] w-[5rem] rounded-full object-cover"
              />
              <span className="absolute right-[-0.5rem] bottom-0 bg-blue-100 p-1 rounded-full">
                <CameraIcon size={20} />
              </span>

              <input
                className="cursor-pointer absolute right-[-0.5rem] bottom-0 opacity-0 w-8"
                accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                type="file"
                onChange={(e) => updateImageHandler(e.target.files[0])}
              />
            </div>
            <div className="text-xl font-semibold">
              {userForm?.firstName} {userForm?.lastName}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="text-gray-500 font-semibold">Link: </p>{" "}
            <input
              className="grow py-1 border-b-2 focus:outline-none"
              value={userForm?.link}
              onChange={(e) =>
                setUserForm({ ...userForm, link: e.target.value })
              }
            />
          </div>
          <p className="text-gray-500 font-semibold gap-4">
            Write description about yourself:
          </p>
          <TextareaAutosize
            minRows={1}
            maxRows={5}
            className="resize-none mt-2 border-2 rounded-md p-2 w-full focus:outline-none"
            value={userForm?.bio}
            onChange={(e) => setUserForm({ ...userForm, bio: e.target.value })}
          />
          <div className="px-1 py-1 text-right">
            <button
              className="px-4 py-1 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600"
              onClick={() => updateHandler()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditProfileModal };
