/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Card, Form, Input, Typography } from "antd";
import "antd/dist/reset.css";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { verifiedToken } from "../utils/verifiedToken";
import { setUser } from "../redux/features/auth/authSlice";
import MainForm from "../components/Form/MainForm";
import FormInput from "../components/Form/FormInput";
import { useAppDispatch } from "../redux/hooks";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import Buttons from "../components/ui/Button/Button";
import Container from "../utils/container";

const { Title } = Typography;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const { control, handleSubmit, setValue } = useForm(); // ✅ Initialize useForm

  const onSubmit = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      // If file is selected, append to FormData
      if (data.Profileimage) {
        formData.append("Profileimage", data.Profileimage);
      }
  
      // Sending formData to the backend for processing
      const res = await register(formData).unwrap();
      const user = verifiedToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
  
      toast.success("Registration successful");
      navigate(`/`);
    } catch (err) {
      toast.error((err as any).error ||(err as any) .message ||'something is wrong ') ;
   
    }
  };
  

  return (
    <Container>
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
          Register your account
        </Title>
        <p style={{ marginBottom: 30, color: "#6c757d" }}>Home / Create Account</p>

        <Card
      className=" w-66 md:w-96 shadow-2xl "
        >
        
         <MainForm onSubmit={handleSubmit(onSubmit)}> {/* ✅ Use handleSubmit */}
            <FormInput type="text" name="name" label="Name:" control={control} />
            <FormInput type="text" name="email" label="Email:" control={control} />
            <FormInput type="password" name="password" label="Password" control={control} />

            {/* ✅ Fixed Profile Image Upload */}
            <Controller
              name="Profileimage"
              control={control}
              render={() => (
                <Form.Item label="Profile Image">
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setValue("Profileimage", file); // ✅ Correctly update file in form state
                    }}
                  />
                </Form.Item>
              )}
            />

            <div className="w-full flex justify-center align-middle items-center">
              <Buttons
                type="submit"
                className="px-16 items-center py-2 bg-gray-400 text-lg"
                label="Register"
              />
            </div>
          </MainForm>
      

          <p style={{ marginTop: "20px", color: "#6c757d" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1D7B84", fontWeight: "bold" }}>
              Login here
            </Link>
          </p>
        </Card>
      </div>
    </Container>
  );
};

export default Register;