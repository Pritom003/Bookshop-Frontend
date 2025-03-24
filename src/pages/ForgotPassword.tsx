import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import MainForm from "../components/Form/MainForm";
import FormInput from "../components/Form/FormInput";
import { Button } from "antd";
import { useForgetPasswordMutation } from "../redux/features/auth/authApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const navigate = useNavigate(); // Initialize the navigate hook

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await forgotPassword({ email: data.email }).unwrap(); // Sending as JSON
      if (response.success) {
        toast.success("Password reset link sent to your email.");
        
        // Get the reset link from the response
        const resetLink = response.data.resetUILink;
        console.log(resetLink); // Ensure resetLink is correct

        // Navigate to the reset password link
        // navigate(resetLink); // Redirect to the reset link
        window.location.href = resetLink;
      } else {
        toast.error(response.message || "Failed to send reset link.");
      }
    } catch (err) {
      toast.error("Error sending reset link.");
      console.error(err);
    }
  };

  return (
    <MainForm onSubmit={onSubmit}>
      <FormInput type="email" name="email" label="Email" control={undefined} />
      <Button htmlType="submit" type="primary" loading={isLoading}>
        Send Reset Link
      </Button>
    </MainForm>
  );
};

export default ForgotPassword;
