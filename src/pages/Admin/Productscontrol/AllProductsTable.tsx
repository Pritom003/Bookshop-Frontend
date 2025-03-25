import { useState, useEffect } from "react";
import { Button, Modal, message, Popconfirm, Space, Table, Row, Col, Form, Input } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import MainForm from "../../../components/Form/MainForm";
import FormInput from "../../../components/Form/FormInput";
import Selectfield from "../../../components/Form/Selectfield";
import categoryOptions from "../../../components/constatnt/categoryconts";
import { useDeleteProductMutation, useEditProductMutation, useGetProductsQuery } from "../../../redux/features/Books/Books.api";
import { Edit2Icon, Trash2 } from "lucide-react";

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
    const formData = new FormData();
    formData.append("title", values.title || selectedBook.title);
    formData.append("author", values.author || selectedBook.author);
    formData.append("category", values.category || selectedBook.category);
    formData.append("price", values.price?.toString() || selectedBook.price.toString());
    formData.append("quantity", values.quantity?.toString() || selectedBook.quantity.toString());

    if (values.bookCover && values.bookCover instanceof File) {
      formData.append("bookCover", values.bookCover);
    }

    try {
      const response = await updateProduct({ id: selectedBook._id, body: formData }).unwrap();
      if (response?.success) {
        message.success(response.message || "Product updated successfully");
        refetch();
        setIsModalVisible(false);
      } else {
        message.error(response.message || "Update failed.");
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const columns = [
    {
      title: "Book Cover",
      dataIndex: "bookCover",
      key: "bookCover",
      render: (text: string) => (
        <img src={text} alt="Book Cover" className="w-12 h-16 object-cover" />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Price ",
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
          <Button onClick={() => handleEdit(record)}>
            <Edit2Icon size={8}></Edit2Icon>
          </Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
            <Button  danger>
            <Trash2 size={8}></Trash2>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Products</h2>
      <Table
        columns={columns}
        dataSource={Array.isArray(data?.data?.products) ? data.data.products : []}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: isLoading ? "Loading..." : "No products found" }}
        className="overflow-x-auto text-xs md:text-sm lg:text-lg"
      />

      <Modal
        key={selectedBook?._id}
        title="Edit Book"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <MainForm onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <FormInput type="text" name="title" label="Title" control={control} />
            </Col>
            <Col xs={24} md={12}>
              <FormInput type="text" name="author" label="Author" control={control} />
            </Col>
            <Col xs={24} md={12}>
              <Controller
                name="bookCover"
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Item label="Book Cover">
                    <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12}>
              <Selectfield label="Category" name="category" control={control} options={categoryOptions} />
            </Col>
            <Col xs={24} md={12}>
              <FormInput type="number" name="price" label="Price" control={control} />
            </Col>
            <Col xs={24} md={12}>
              <FormInput type="number" name="quantity" label="Quantity" control={control} />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" className="w-full mt-4" disabled={isLoading}>
            Save Changes
          </Button>
        </MainForm>
      </Modal>
    </div>
  );
};

export default AllProductsTable;