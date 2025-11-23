import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const OtpVerification = ({ email, onVerify, onResend, isLoading }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          We sent a code to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="otp">Enter 6-Digit Code</Label>
        <Input
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          className="text-center text-lg tracking-widest"
          maxLength={6}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
        {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Verify"}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          disabled={timeLeft > 0}
          onClick={() => {
            onResend();
            setTimeLeft(60);
          }}
          className="text-sm"
        >
          {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend Code"}
        </Button>
      </div>
    </form>
  );
};

export default OtpVerification;