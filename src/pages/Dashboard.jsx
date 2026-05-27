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

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-blue-600">
          Orders Dashboard 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders.map((order) => (

          <div
            key={order.orderId}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >

            <h2 className="text-2xl font-bold text-gray-700">
              {order.product}
            </h2>

            <p className="mt-3 text-gray-600">
              <span className="font-semibold">
                Customer:
              </span>{" "}
              {order.customerName}
            </p>

            <p className="mt-2 text-gray-600">
              <span className="font-semibold">
                Quantity:
              </span>{" "}
              {order.quantity}
            </p>

            <p className="mt-3 text-gray-400 text-sm break-words">
              {order.createdAt}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;