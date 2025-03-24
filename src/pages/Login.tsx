/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Typography } from "antd";
import "antd/dist/reset.css";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { verifiedToken } from "../utils/verifiedToken";
import { setUser } from "../redux/features/auth/authSlice";
import MainForm from "../components/Form/MainForm";
import FormInput from "../components/Form/FormInput";
import { useAppDispatch } from "../redux/hooks";
import { useLoginMutation } from "../redux/features/auth/authApi";

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    console.log("Login Form Data:", data);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      
      console.log("Login API Response:", res);
  
      const user = verifiedToken(res.data.accessToken);
      
      console.log("Decoded User:", user);
      console.log("Token:", res.data.accessToken);
      
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful");
      navigate(`/`);
    } catch (err) {
      console.log("Login Error:", err);
      toast.error("Invalid credentials");
    }
  };
  
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Title level={2} style={{ marginBottom: 10 }}>
        Login to your account
      </Title>
      <p style={{ marginBottom: 30, color: "#6c757d" }}>
        Home / Login
      </p>

      <Card
        style={{
          width: 400,
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MainForm onSubmit={onSubmit}>
          <FormInput type="text" name="email" label="Email:" control={undefined} />
          <FormInput type="password" name="password" label="Password:" control={undefined} />
          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
            Login
          </Button>
        </MainForm>
        <p style={{ marginTop: "20px", color: "#6c757d" }}>
          Don't have an account? {" "}
          <Link to="/regi" style={{ color: "#1D7B84", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
        <p style={{ marginTop: "20px", color: "#6c757d" }}>
          Forgot your password? {" "}
          <Link to="/forget-password" style={{ color: "#1D7B84", fontWeight: "bold" }}>
            Forgot
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
