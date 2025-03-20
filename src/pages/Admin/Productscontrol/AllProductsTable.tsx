import { useState, useEffect } from "react";
import { Button, Modal, message, Popconfirm, Space, Table, Row, Col, Form, Input } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import MainForm from "../../../components/Form/MainForm";
import FormInput from "../../../components/Form/FormInput";
import Selectfield from "../../../components/Form/Selectfield";
import categoryOptions from "../../../components/constatnt/categoryconts";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/Books/Books.api";

const AllProductsTable = () => {
  const { data, isLoading, refetch } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useEditProductMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const { control, reset, handleSubmit } = useForm();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleEdit = (book: any) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (selectedBook) {
      reset({
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
        price: selectedBook.price,
        quantity: selectedBook.quantity,
        bookCover: selectedBook.bookCover,
      });
    }
  }, [selectedBook, reset]);

  const onSubmit = async (values: FieldValues) => {
    console.log("🚀 Form Values:", values);
  
    const formData = new FormData();
    formData.append("title", values.title || selectedBook.title);
    formData.append("author", values.author || selectedBook.author);
    formData.append("category", values.category || selectedBook.category);
    formData.append("price", values.price?.toString() || selectedBook.price.toString());
    formData.append("quantity", values.quantity?.toString() || selectedBook.quantity.toString());
  
    // Append the bookCover only if a new image is selected
    if (values.bookCover && values.bookCover instanceof File) {
      formData.append("bookCover", values.bookCover);
    }
  
    try {
      console.log("📤 Sending FormData:", formData);
      const response = await updateProduct({ id: selectedBook._id, body: formData }).unwrap();
  
      console.log("✅ API Response:", response);
  
      if (response?.success) {
        message.success(response.message || "Product updated successfully");
        refetch();
        setIsModalVisible(false);
      } else {
        message.error(response.message || "Update failed.");
      }
    } catch (error) {
      console.error("❌ API Update Error:", error);
      toast.error("Failed to update product.");
    }
  };
  

  const columns = [
    {
      title: "Book Cover",
      dataIndex: "bookCover",
      key: "bookCover",
      render: (text: string) => (
        <img src={text} alt="Book Cover" width={50} height={70} />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>All Products</h2>
      <Table
        columns={columns}
        dataSource={Array.isArray(data?.data?.products) ? data.data.products : []}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: isLoading ? "Loading..." : "No products found" }}
      />

      <Modal
        key={selectedBook?._id}
        title="Edit Book"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <MainForm onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={12}>
              <FormInput type="text" name="title" label="Title" control={control} />
            </Col>
            <Col span={12}>
              <FormInput type="text" name="author" label="Author" control={control} />
            </Col>
            <Col span={12}>
              <Controller
                name="bookCover"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Book Cover">
                    <Input
                      type="file"
                      {...field} // Spread other props from Controller
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        console.log("Selected File:", file); // Debugging
                        onChange(file); // Update with the file selected
                      }}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Selectfield label="Category" name="category" control={control} options={categoryOptions} />
            </Col>
            <Col span={12}>
              <FormInput type="number" name="price" label="Price" control={control} />
            </Col>
            <Col span={12}>
              <FormInput type="number" name="quantity" label="Quantity" control={control} />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" style={{ width: "100%" }} disabled={isLoading}>
            Save Changes
          </Button>
        </MainForm>
      </Modal>
    </div>
  );
};

export default AllProductsTable;
