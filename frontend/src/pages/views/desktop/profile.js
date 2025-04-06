import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { DEFAULT_PROFILE_IMAGE } from "../../../data/placeholderData";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../components/controller/authController";
import { axiosInstance } from "../../../components/controller/authController";
import Swal from "sweetalert2";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempUserData, setTempUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, setUser } = useAuth();

  const serverUrl =
    process.env.REACT_APP_BACKEND_URL || "http://192.168.8.181:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        if (!user || !user.token || !user.id) {
          throw new Error("User is not authenticated.");
        }

        const response = await axiosInstance.get(`/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log("User data fetched successfully:", response.data);
        setUserData(response.data);
        setTempUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditClick = async () => {
    console.log("Edit/Save button clicked");
    if (editMode) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the changes?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        try {
          console.log("Preparing to save changes...");

          const updatedData = {
            fullName: tempUserData.fullName,
            email: tempUserData.email,
            employeeId: tempUserData.employeeId,
            role: tempUserData.role,
          };

          if (selectedImage) {
            console.log("Uploading new profile image...");
            const formData = new FormData();
            formData.append("profileImage", selectedImage);
            const imageResponse = await axiosInstance.post(
              `/users/${user.id}/upload-profile-image`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );

            setTempUserData((prev) => ({
              ...prev,
              profileImage: imageResponse.data.profileImage,
            }));

            console.log(
              "Profile image uploaded successfully:",
              imageResponse.data
            );
            updatedData.profileImage = imageResponse.data.profileImage;

            const updatedUser = {
              ...user,
              profileImage: imageResponse.data.profileImage,
            };
            setUser(updatedUser);
          }

          console.log("Updating user data...");
          const response = await axiosInstance.put(
            `/users/${user.id}`,
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          console.log("User data updated successfully:", response.data);

          setUserData(response.data);
          setTempUserData(response.data);

          setEditMode(false);
          setSelectedImage(null);

          Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Your profile has been updated successfully!",
          });
        } catch (err) {
          console.error("Error updating profile:", err.message);
          setError(err.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update profile. Please try again.",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setEditMode(false);
        setSelectedImage(null);
        console.log("Edit mode exited without saving changes.");
      }
    } else {
      console.log("Entering edit mode...");
      setEditMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setTempUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    console.log("File input changed");
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {   
        console.log("File read successfully:", reader.result);

        setTempUserData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));

        console.log("Updated profileImage:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found.</div>;

  return (
    <div className="h-full shadow-md bg-white rounded-lg p-6">
      <div className="mx-auto shadow-md bg-white rounded-lg p-6">
        <div className="flex gap-8">
          {/* Profile Picture Section - Left Side */}
          <div className="relative">
            <div className="relative">
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={
                    tempUserData.profileImage
                      ? tempUserData.profileImage
                      : DEFAULT_PROFILE_IMAGE
                  }
                  alt={tempUserData.fullName}
                  onError={(e) => {
                    console.error(
                      "Failed to load profile image:",
                      e.target.src
                    );
                    e.target.src = DEFAULT_PROFILE_IMAGE;
                  }}
                />
                <AvatarFallback>
                  {tempUserData.fullName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <div className="absolute bottom-2 right-2">
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    style={{
                      opacity: "0",
                      position: "absolute",
                      left: "-40px",
                    }}
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="profileImage"
                    style={{ cursor: "pointer", zIndex: 10 }}
                  >
                    <button
                      type="button"
                      className="bg-white rounded-full shadow-md hover:bg-gray-50 p-2"
                      aria-label="Change profile picture"
                    >
                      <Camera className="w-5 h-5 text-gray-600" />
                    </button>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information Form - Right Side */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={tempUserData.fullName || ""}
                  disabled={!editMode}
                  onChange={handleInputChange}
                  className={editMode ? "bg-white" : "bg-gray-100"}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={tempUserData.email || ""}
                  disabled={!editMode}
                  onChange={handleInputChange}
                  className={editMode ? "bg-white" : "bg-gray-100"}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Employee ID
                </label>
                <Input
                  type="text"
                  name="employeeId"
                  value={tempUserData.employeeId || ""}
                  disabled={!editMode}
                  onChange={handleInputChange}
                  className={editMode ? "bg-white" : "bg-gray-100"}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Position</label>
                <Input
                  type="text"
                  name="role"
                  value={tempUserData.role || ""}
                  disabled={true}
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save/Edit Button */}
        <div className="flex justify-end mt-8">
          <Button
            variant="default"
            className="bg-Icpetgreen hover:bg-Icpetgreen/90"
            onClick={handleEditClick}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
