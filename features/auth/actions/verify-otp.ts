"use server";

export const verifyOTP = async () => {
  try {
    const response = await fetch(`/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Invalid OTP. Please try again.");
      return;
    }

    // Success - cleanup localStorage
    localStorage.removeItem("email");
    localStorage.removeItem(OTP_EXPIRATION_TIMER_KEY);
    localStorage.removeItem(OTP_VALIDATION_TIME);

    toast.success(data.message || "OTP verified successfully.");

    window.location.href = "/dashboard";
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    setIsVerifying(false);
  }
};
