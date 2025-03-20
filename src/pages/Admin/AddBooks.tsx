/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row, Col, Form, Input } from 'antd'; 
import { Controller, FieldValues, useForm } from 'react-hook-form';
import MainForm from "../../components/Form/MainForm";
import FormInput from "../../components/Form/FormInput";
import { useCreateProductMutation } from '../../redux/features/Books/Books.api';
import Selectfield from '../../components/Form/Selectfield';
import categoryOptions from '../../components/constatnt/categoryconts';
import { useState } from 'react';
import { toast } from 'sonner';

const AddBooks = () => {
  const [category, setCategory] = useState('');
  const { control } = useForm();
  const [createProduct , {  error }] = useCreateProductMutation();
console.log(error);
const onSubmit = async (data: FieldValues) => {
  console.log("Form data:", data); 

  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("category", category);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);

    if (data.authorImage) {
      formData.append("authorImage", data.authorImage);
    }
    if (data.bookCover) {
      formData.append("bookCover", data.bookCover);
    }

    console.log("FormData to be sent:", formData); 

    await createProduct(formData).unwrap();
    toast.error("Something went wrong");
  } catch (err : any) {
   
    console.error(err, 'look there 3 ' );

 toast.error(err.data.message||'something  went wrong');
  }
};

  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Book</h1>
      <MainForm onSubmit={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormInput type="text" name="title" label="Title" control={undefined} />
          </Col>
          <Col span={12}>
            <FormInput type="text" name="author" label="Author" control={undefined} />
          </Col>
          <Col span={12}>
          <Controller
                name="authorImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Author Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
          </Col>
          <Col span={12}>
          {/* <Col xs={24} sm={12} md={12}> */}
          <Selectfield
            label="Category"
            name="category"
            control={control} 
            options={categoryOptions} 
            disabled={false} 
            value={category} 
            width={'200px'}
            onChange={(value) => setCategory(value)} // Update the selected category
          />
        {/* </Col> */}
          </Col>
          <Col span={12}>
            <FormInput type="number" name="price" label="Price" control={undefined} />
          </Col>
          <Col span={12}>
            <FormInput type="text" name="description" label="Description" control={undefined} />
          </Col>
          <Col span={12}>
            <FormInput type="number" name="quantity" label="Quantity" control={undefined} />
          </Col>
          <Col span={12}>
          <Controller
                name="bookCover"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Book Cover">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
          </Col>
        </Row>
        <Button htmlType="submit" type="primary" style={{ width: '100%', marginTop: '20px' }}>
          Add Book
        </Button>
      </MainForm>
    </div>
  );
};

export default AddBooks;
