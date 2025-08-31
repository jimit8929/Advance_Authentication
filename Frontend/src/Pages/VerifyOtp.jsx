import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import axios from "axios";

export default function VerifyOtp() {
  // 6-digit OTP (fix: original had 7)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const email = params?.email ? decodeURIComponent(params.email) : "";

  const focusInput = (index) => inputRefs.current[index]?.focus();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit 0-9
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < otp.length - 1) focusInput(index + 1);
    setError("");
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          const prevIndex = index - 1;
          const next = [...otp];
          next[prevIndex] = "";
          setOtp(next);
          focusInput(prevIndex);
        }
      } else {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      }
    }

    if (key === "ArrowLeft" && index > 0) focusInput(index - 1);
    if (key === "ArrowRight" && index < otp.length - 1) focusInput(index + 1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (!paste) return;

    const chars = paste.split("").slice(0, otp.length);
    const next = [...otp];
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setOtp(next);
    const focusIndex = Math.min(chars.length, otp.length - 1);
    focusInput(focusIndex);
  };

  const handleVerify = async (e) => {
    e?.preventDefault?.();
    setError("");
    const finalOtp = otp.join("");
    if (finalOtp.length !== otp.length) {
      setError(`Please enter all ${otp.length} digits`);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5000/user/verify-otp/${encodeURIComponent(email)}`,
        { otp: finalOtp }
      );

      setSuccessMessage(res.data.message || "Code verified");
      setIsVerified(true);

      setTimeout(() => {
        navigate(`/change-password/${encodeURIComponent(email)}`);
      }, 1400);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp(new Array(6).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-white px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-green-50 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-green-700">Verify your email</CardTitle>
            <p className="text-sm text-green-600 mt-1">Enter the 6-digit code we sent to <span className="font-medium">{email || "your email"}</span></p>
          </CardHeader>

          <CardContent className="p-6">
            {error && (
              <div className="mb-4">
                <Alert>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}

            {isVerified ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Verification Successful</h3>
                  <p className="text-sm text-gray-600">Redirecting to reset your password…</p>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600">Please wait</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerify} onPaste={handlePaste} className="space-y-6">
                <div className="flex justify-between gap-2 mb-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-14 h-14 text-center text-xl font-bold"
                      aria-label={`Digit ${index + 1}`}
                    />
                  ))}
                </div>

                {successMessage && (
                  <p className="text-green-600 text-sm text-center">{successMessage}</p>
                )}

                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isLoading || otp.some((d) => d === "") }>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <Button variant="outline" onClick={clearOtp} className="w-full" disabled={isLoading}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Clear
                  </Button>
                </div>
              </form>
            )}
          </CardContent>

            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Wrong Email?{" "}
                <Link to={"/forgot-password"} className="text-green-600 hover:underline font-medium">
                  Go Back
                </Link>
              </p>

            </CardFooter>
        </Card>

            <div className="text-center text-xs text-muted-foreground">
              <p>For Testing Purposes, use Code: <span className="font-mono font-medium">123456</span></p>
            </div>

      </div>
    </div>
  );
}
