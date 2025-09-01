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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
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
        "http://localhost:5000/user/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Account created");
        navigate("/verify");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-green-50 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-green-700">Create your account</CardTitle>
            <CardDescription className="text-sm text-green-600">Start organizing your thoughts and ideas today</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullname" className="text-sm">Full name</Label>
                <Input
                  id="fullname"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full mt-2"
                />
              </div>

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
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a strong password"
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
                <p id="passwordHelp" className="mt-2 text-xs text-gray-500">Use at least 8 characters — mix letters & numbers for a stronger password.</p>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-green-50 p-4 flex flex-col items-center gap-2">
            <p className="text-sm">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm underline text-green-600"
            >
              Login
            </button>

            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
