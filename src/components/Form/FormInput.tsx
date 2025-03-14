/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  control: any; // Add control prop for react-hook-form
};

const FormInput = ({ type, name, label, control }: TInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control} // Ensure control is passed down here
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type === "password" && !visible ? "password" : "text"}
              id={name}
              size="large"
              suffix={
                type === "password" ? (
                  visible ? (
                    <EyeInvisibleOutlined onClick={() => setVisible(false)} style={{ cursor: "pointer" }} />
                  ) : (
                    <EyeOutlined onClick={() => setVisible(true)} style={{ cursor: "pointer" }} />
                  )
                ) : null
              }
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
