import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => Promise<void>;
  isLoading: boolean;
}

const OtpVerification = ({ email, onVerify, onResend, isLoading }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds cooldown
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (resendCount >= 3) {
      toast.error("Rate limit exceeded. Please wait 1 hour.");
      return;
    }

    try {
      await onResend();
      setResendCount((prev) => prev + 1);
      setTimeLeft(60);
      setCanResend(false);
      setOtp(""); 
      toast.success("OTP Resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <RefreshCw className={`h-6 w-6 text-primary ${isLoading ? 'animate-spin' : ''}`} />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent a 6-digit verification code to <br/>
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup className="gap-2">
            <InputOTPSlot index={0} className="h-12 w-10 border-muted-foreground/20" />
            <InputOTPSlot index={1} className="h-12 w-10 border-muted-foreground/20" />
            <InputOTPSlot index={2} className="h-12 w-10 border-muted-foreground/20" />
            <InputOTPSlot index={3} className="h-12 w-10 border-muted-foreground/20" />
            <InputOTPSlot index={4} className="h-12 w-10 border-muted-foreground/20" />
            <InputOTPSlot index={5} className="h-12 w-10 border-muted-foreground/20" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button 
        className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all" 
        onClick={() => onVerify(otp)} 
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
          </>
        ) : (
          "Verify Securely"
        )}
      </Button>

      <div className="text-center text-sm mt-6">
        {canResend ? (
          <p className="text-muted-foreground">
            Didn't receive code?{" "}
            <button 
              onClick={handleResend} 
              className="font-medium text-primary hover:underline focus:outline-none"
            >
              Resend
            </button>
          </p>
        ) : (
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Resend code in <span className="font-mono font-medium text-foreground">{timeLeft}s</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;