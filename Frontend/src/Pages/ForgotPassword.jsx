import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/user/forgot-password", { email });

      if (res.data?.success) {
        // show in-page success and also give user a path to verify
        setIsSubmitted(true);
        toast.success(res.data.message || "Reset link sent");
      } else {
        setError(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-green-50 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-green-700">Reset your password</CardTitle>
            <CardDescription className="text-sm text-green-600">
              Enter your email and we'll send instructions to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Check your inbox</h3>
                  <p className="text-sm text-gray-600">
                    We've sent a password reset link to <span className="font-medium text-gray-800">{email}</span>
                  </p>
                  <div className="flex gap-3 justify-center pt-2">
                    <Button onClick={() => navigate(`/verify-otp/${encodeURIComponent(email)}`)}>
                      Verify OTP
                    </Button>
                    <Button variant="ghost" onClick={() => setIsSubmitted(false)}>
                      Send again
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full mt-2"
                  />
                </div>

                <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="bg-green-50 p-4 flex flex-col items-center gap-2">
            <p className="text-sm">Remember your password?</p>
            <Link to="/login" className="text-sm underline text-green-600">Sign In</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
