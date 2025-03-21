import { Card, Statistic, Spin } from "antd";
import { useGetRevenueQuery, useGetTopOrderedProductsQuery } from "../../../redux/features/Order/orderApi";
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from "recharts";

// Function to map month number to month name
const getMonthName = (month: number) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1]; // Months are 1-indexed
};

const RevenueStats = () => {
  const { data, isLoading, isError } = useGetRevenueQuery(undefined);
  const { data: topbook, isLoading: topbookLoading, isError: topbookErr } = useGetTopOrderedProductsQuery(undefined);

  // Handle undefined data
  const revenue = data?.data.totalRevenue || { totalRevenue: 0, monthlyRevenue: 0, yearlyRevenue: 0 };
  const currentMonth = data?.data?.currentMonth || 3;  // Defaulting to March if not available
  const currentYear = data?.data?.currentYear || 2025; // Defaulting to 2025 if not available

  const revenueData = [
    { name: "Monthly Revenue", revenue: revenue.monthlyRevenue },
    { name: "Yearly Revenue", revenue: revenue.yearlyRevenue },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Total Revenue Card */}
      <Card title="Total Revenue" style={{ width: "100%", textAlign: "center" }}>
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <p>Error fetching revenue</p>
        ) : (
          <Statistic value={revenue.totalRevenue} prefix="৳" />
        )}
      </Card>

      {/* Revenue Bar Chart Card */}
      <Card title="Revenue Overview" style={{ width: "100%" }}>
        <BarChart width={350} height={250} data={revenueData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `৳ ${value}`} 
            labelFormatter={() => `${getMonthName(currentMonth)} ${currentYear}`}
          />
          <Bar dataKey="revenue">
            {revenueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === "Monthly Revenue" ? "#1D7B84" : "#2972b6"} />
            ))}
          </Bar>
        </BarChart>
      </Card>

      {/* Top 3 Products Card */}
      <Card title="Top 3 Selling Products" style={{ width: "100%" }}>
        {topbookLoading ? (
          <Spin />
        ) : topbookErr ? (
          <p>Error fetching products</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center align-middle items-center gap-2 ">
            {topbook?.data?.map((product: any, index: number) => (
              <Card key={index} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                <img
                  src={product?.productCover || "https://via.placeholder.com/150"} // Fallback image for missing cover
                  alt={product?.name || "Unknown Product"}
                  className="h-44 w-24"
                />
                <div style={{ flex: 1 }}>
                  <p>{product?.name || "Unknown Product"}</p>
                  <p>Price: ৳{product?.Price || 0}</p>
                  <p>Sold: {product?.totalQuantity || 0}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default RevenueStats;
