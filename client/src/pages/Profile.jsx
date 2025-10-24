import React, { useState, useEffect } from "react";
import { User, Mail, Edit, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { putUser, getCurrentUser } from "../apicalls/authCalls.js";

function Profile() {
  const dispatch = useDispatch();

  const [userData, setUserDataState] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [backupData, setBackupData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getCurrentUser();
        setUserDataState(res);
        setFormData({
          name: res.name || "",
          email: res.email || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    setBackupData(formData);
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(backupData);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await putUser(formData);
      if (updatedUser) {
        setUserDataState(updatedUser);
        dispatch(setUserData(updatedUser));
        setEditMode(false);
      }
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!userData) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex justify-center py-12 px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow hover:scale-105 transition-all"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-blue-100 transition-all">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <User className="text-blue-700" size={56} />
          <div>
            <h2 className="text-2xl font-bold text-blue-700">{formData.name}</h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
          {!editMode && (
            <button
              onClick={handleEditToggle}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
            >
              <Edit size={16} /> Edit
            </button>
          )}
        </div>

        {/* Editable Fields */}
        {editMode && (
          <div className="flex flex-col gap-4">
            <Field
              label="Name"
              value={formData.name}
              onChange={(v) => updateField("name", v)}
            />
            <Field
              label="Email"
              type="email"
              value={formData.email}
              onChange={(v) => updateField("email", v)}
            />

            {/* Save / Cancel Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow hover:shadow-lg transition-all hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Field Component
const Field = ({ label, value, onChange, type = "text" }) => (
  <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-all">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Profile;
