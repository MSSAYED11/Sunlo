import React, { useState } from "react";
import { User, Mail, Edit, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { putUser } from "../apicalls/authCalls.js";

function Profile() {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.user.user);

  const [formData, setFormData] = useState({
    name: reduxUser?.name || "",
    email: reduxUser?.email || "",
  });
  const [editMode, setEditMode] = useState(false);
  const [backupData, setBackupData] = useState({});

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 flex justify-center py-12 px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-2xl shadow hover:scale-105 transition-all"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="w-full max-w-md bg-pink-50/80 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-pink-200 transition-all">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <User className="text-pink-500" size={56} />
          <div>
            <h2 className="text-2xl font-bold text-pink-600">{formData.name}</h2>
            <p className="text-pink-400">{formData.email}</p>
          </div>
          {!editMode && (
            <button
              onClick={handleEditToggle}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-2xl flex items-center gap-2 hover:scale-105 hover:shadow-md transition-all"
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
              color="pink"
            />
            <Field
              label="Email"
              type="email"
              value={formData.email}
              onChange={(v) => updateField("email", v)}
              color="pink"
            />

            {/* Save / Cancel Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-pink-100 text-pink-600 rounded-2xl hover:bg-pink-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-2xl shadow hover:shadow-md transition-all hover:scale-105"
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
const Field = ({ label, value, onChange, type = "text", color = "pink" }) => (
  <div className={`bg-${color}-50 rounded-2xl p-5 shadow hover:shadow-md transition-all`}>
    <label className={`block text-sm font-semibold text-${color}-600 mb-1`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-${color}-400`}
    />
  </div>
);

export default Profile;
