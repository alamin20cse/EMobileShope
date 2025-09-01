import React, { useState, useEffect } from "react";
import useProfile from "../hooks/useProfile";
import { Helmet } from "react-helmet-async";
import { ACCESS_TOKEN } from "../constants";
import Swal from "sweetalert2"; // ✅ sweetalert2 import

const EditProfile = () => {
  const [profile, isLoading] = useProfile();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    photo: null,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        photo: null,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const res = await fetch(`${BASE_URL}/user/update_profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Helmet>
        <title>Emobile Shope | Edit Profile</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Edit Profile
        </h2>

        {/* Username (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly
            className="mt-1 block w-full p-2 border border-red-400 rounded bg-red-50 text-red-700 cursor-not-allowed"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full p-2 border border-red-400 rounded bg-red-50 text-red-700 cursor-not-allowed"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Profile Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
