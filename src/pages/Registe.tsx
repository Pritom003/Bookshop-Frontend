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
import { useRegisterMutation } from "../redux/features/auth/authApi";
const { Title } = Typography;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      const user = verifiedToken(res.data.accessToken) ;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Registration successful");
      navigate(`/`);
    } catch (err) {
      toast.error("Something went wrong");
    } };

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
        Register your accunt 
      </Title>
      <p style={{ marginBottom: 30, color: "#6c757d" }}>
        Home / Create Account
      </p>

      <Card
        style={{
          width: 500,
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MainForm onSubmit={onSubmit}>
          <FormInput type="text" name="name" label="Name:" control={undefined} />
          <FormInput type="text" name="email" label="Email:" control={undefined} />
          <FormInput type="text" name="password" label="Password" control={undefined} />
          <Button htmlType="submit">Register</Button>
        </MainForm>
        <p style={{ marginTop: "20px", color: "#6c757d" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1D7B84", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;