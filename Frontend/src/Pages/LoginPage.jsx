import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { getData } from "@/context/userContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = getData();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message || "Logged in");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-green-50 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-green-700">Welcome back</CardTitle>
            <CardDescription className="text-sm text-green-600">Login to your account</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full mt-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">Forgot?</Link>
                </div>

                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full pr-12"
                    aria-describedby="passwordHelp"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 rounded-md hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <p id="passwordHelp" className="mt-2 text-xs text-gray-500">Keep your account safe — don’t share your password.</p>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-green-50 p-4 flex flex-col items-center gap-2">
            <p className="text-sm">Don’t have an account?</p>
            <Link to="/signup" className="text-sm underline text-green-600">Create one</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
