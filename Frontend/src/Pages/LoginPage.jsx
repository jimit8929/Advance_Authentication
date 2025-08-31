import React, { useState } from "react";

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
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5000/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden">
      <div className="min-h-screen flex flex-col tomuted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">
                Login into your Account
              </h1>
              <p>Start organizing your thoughts and ideas today</p>
            </div>

            <Card className="w-full max-w-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Login
                </CardTitle>
                <CardDescription className="text-center">
                  Login into your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to={"/forgot-password"} className="text-sm hover:underline">Forgot your password?</Link>
                    </div>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        required
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-500"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Login into your account...
                    </>
                  ) : (
                    "login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
