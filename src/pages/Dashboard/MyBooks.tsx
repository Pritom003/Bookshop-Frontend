
import { Table, Button, message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/features/Books/Books.api";

const MyBooks = () => {
    const { user } = useSelector((state: any) => state.auth); // Assuming auth state contains user info
    const { data, isLoading, error } = useGetProductsQuery({}); // You can add error handling here
    const [deleteProduct] = useDeleteProductMutation();
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error loading products...</p>;
    }
  
    const Mybooks = data?.data?.products;
    const userBooks = Mybooks.filter((book) => book.user === user.id);
  console.log(Mybooks, userBooks);
  console.log(user.id);
    const handleDelete = async (id: string) => {
      try {
        await deleteProduct(id);
        message.success("Book deleted successfully");
      } catch (error) {
        message.error("Failed to delete book");
      }
    };
  
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <div className="flex gap-2">
            <Button type="primary">Edit</Button>
            <Popconfirm
              title="Are you sure to delete this book?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ];
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Books</h2>
        <Table columns={columns} dataSource={userBooks} rowKey="_id" />
      </div>
    );
  };
  
  export default MyBooks;
  

