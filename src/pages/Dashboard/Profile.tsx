/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "../../redux/features/user/userApi";
import { Alert, Card, Spin, Upload, Button, Input, message, Avatar } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {EditOutlined } from "@ant-design/icons";

const Profile = () => {
  const { data, error, isLoading } = useGetMyProfileQuery({});
  const [updateProfile] = useUpdateMyProfileMutation();
  const userProfile = data?.data;

  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    Profileimage: File | null;
  }>({
    id: "",
    name: "",
    email: "",
    role: "",
    Profileimage: null,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        id: userProfile.id,
        name: userProfile.name || "",
        email: userProfile.email,
        role: userProfile.role,
        Profileimage: null,
      });
      setImagePreview(userProfile.Profileimage );
    }
  }, [userProfile]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: { target: { name: string; value: any; }; }) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (options: any) => {
    const { file } = options;
    // Update image preview with the selected image
    setImagePreview(URL.createObjectURL(file as File));
    // Update formData with the selected file
    setFormData((prev) => ({ ...prev, Profileimage: file as File }));
  };
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("id", formData.id);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("role", formData.role);

    if (formData.Profileimage) {
      console.log("Image to be sent:", formData.Profileimage); // Log the image file
      form.append("Profileimage", formData.Profileimage);
    
    }
    // Include password fields only if changing password
    if (isChangingPassword && passwords.oldPassword && passwords.newPassword) {
      form.append("oldPassword", passwords.oldPassword);
      form.append("newPassword", passwords.newPassword);
    }

    try {
      await updateProfile(form).unwrap();
      message.success("Profile updated successfully!");
    } catch (err) {
      message.error("Failed to update profile");
    }
  };

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;
  if (error) return <Alert message="Failed to fetch profile" type="error" className="text-center" />;

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar src={imagePreview} size={120} className="border-4 border-gray-300" />
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button className="absolute bottom-2 right-2 bg-white shadow-md p-1 rounded-full" shape="circle" icon={<EditOutlined />} />
          </Upload>
        </div>
      </div>

      <Title level={3} className="text-center mt-4">My Profile</Title>
      <Input name="name" className="mt-2 p-2 border rounded w-full" value={formData.name} onChange={handleChange} placeholder="Enter new name" />
      <Paragraph className="mt-3"><strong>Email:</strong> {formData.email}</Paragraph>
      <Paragraph className="mt-1"><strong>Role:</strong> {formData.role}</Paragraph>
      <Paragraph className="mt-1"><strong>Status:</strong> {userProfile.is_blocked ? "Blocked ❌" : "Active ✅"}</Paragraph>
      
      {/* Optional Password Change */}
      <Title level={4} className="mt-4">Change Password (Optional)</Title>
      <Button onClick={() => setIsChangingPassword(!isChangingPassword)} type="link">
        {isChangingPassword ? "Cancel" : "Change Password"}
      </Button>

      {isChangingPassword && (
        <>
          <Input.Password name="oldPassword" className="mt-2 p-2 border rounded w-full" value={passwords.oldPassword} onChange={handlePasswordChange} placeholder="Enter old password" />
          <Input.Password name="newPassword" className="mt-2 p-2 border rounded w-full" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="Enter new password" />
        </>
      )}
      
      <Button type="primary" onClick={handleSubmit} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
        Update Profile
      </Button>
    </Card>
  );
};

export default Profile;
