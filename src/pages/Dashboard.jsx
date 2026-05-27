import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://h945eqfehj.execute-api.ap-south-1.amazonaws.com/Prod/orders",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-10">
        Orders Dashboard 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders.map((order) => (

          <div
            key={order.orderId}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-gray-700">
              {order.product}
            </h2>

            <p className="mt-2 text-gray-600">
              Customer: {order.customerName}
            </p>

            <p className="mt-2 text-gray-600">
              Quantity: {order.quantity}
            </p>

            <p className="mt-2 text-gray-400 text-sm">
              {order.createdAt}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;