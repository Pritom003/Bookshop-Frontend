/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/features/auth/authApi';
import MainForm from '../components/Form/MainForm';
import FormInput from '../components/Form/FormInput';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [resetPassword] = useResetPasswordMutation(); // Assuming you have this mutation set up
  const navigate = useNavigate();
  const { search } = useLocation(); // To retrieve query parameters like token and userId
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');
  const userId = queryParams.get('id');

  const onSubmit = async (data: FieldValues) => {
    // Create a FormData instance to send the data
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('newPassword', data.newPassword);
    formData.append('token', token || ''); // Ensure token is provided
    formData.append('userId', userId || ''); // Ensure userId is provided

    try {
      // Call the mutation with FormData
      await resetPassword(formData).unwrap();
      toast.success('Password successfully updated');
    //   navigate('/login');
    } catch (err) {
      toast.error('Error resetting password');
      console.error(err);
    }
  };

  return (
    <MainForm onSubmit={onSubmit}>
      <FormInput type="email" name="email" label="Email" control={undefined} />
      <FormInput type="password" name="newPassword" label="New Password" control={undefined} />
      <Button htmlType="submit" type="primary">
        Reset Password
      </Button>
    </MainForm>
  );
};

export default ChangePassword;
