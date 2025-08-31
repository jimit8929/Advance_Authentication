import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function ChangePassword() {
  const params = useParams();
  const email = params?.email ? decodeURIComponent(params.email) : "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // toggles for eye icons
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e?.preventDefault?.();
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5000/user/change-password/${encodeURIComponent(email)}`,
        { newPassword, confirmPassword }
      );

      setSuccess(res.data?.message || "Password changed successfully.");

      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-2 text-green-700">Set a new password</h2>
          <p className="text-sm text-center text-gray-600 mb-4">for <span className="font-medium">{email || "your email"}</span></p>

          {error && <div className="text-sm text-red-600 text-center mb-3">{error}</div>}
          {success && <div className="text-sm text-green-600 text-center mb-3">{success}</div>}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="relative">
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((s) => !s)}
                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-100"
                disabled={isLoading}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-100"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>

            <div className="text-center mt-2">
              <button type="button" onClick={() => navigate('/login')} className="text-sm text-green-600 hover:underline">Back to login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
