import { Button, Row, Col } from 'antd'; 
import { FieldValues } from 'react-hook-form';
import MainForm from "../../components/Form/MainForm";
import FormInput from "../../components/Form/FormInput";
import { useCreateProductMutation } from '../../redux/features/Books/Books.api';

const AddBooks = () => {
  const [createProduct , {  error }] = useCreateProductMutation();
console.log(error);
  const onSubmit = async (data: FieldValues) => {
    console.log("Form data:", data); // Log the form data
    try {
      const bookData = {
        title: data.title,
        author: data.author,
        authorImage: data.authorImage,
        category: 'Fiction',
        price: data.price,
        description: data.description,
        quantity: data.quantity,
        bookCover: data.bookCover,
      };
  
      console.log("Book data to be sent:", bookData); // Log the book data
  
      await createProduct(bookData).unwrap();
      alert("Book Added Successfully");
    } catch (err) {
      console.error(err);
      alert("Error while adding the book");
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
            <FormInput type="file" name="authorImage" label="Author Image URL" control={undefined} />
          </Col>
          <Col span={12}>
            <FormInput type="text" name="category" label="Category" control={undefined} />
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
            <FormInput type="text" name="bookCover" label="Book Cover URL" control={undefined} />
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
