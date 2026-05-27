import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [orders, setOrders] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [editingOrderId, setEditingOrderId] = useState(null);

  const [editCustomerName, setEditCustomerName] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

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

  const createOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://h945eqfehj.execute-api.ap-south-1.amazonaws.com/Prod/orders",
        {
          customerName,
          product,
          quantity,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Order Created Successfully 🚀");

      setCustomerName("");
      setProduct("");
      setQuantity("");

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to create order");
    }
  };

  const deleteOrder = async (orderId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://h945eqfehj.execute-api.ap-south-1.amazonaws.com/Prod/orders/${orderId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Order Deleted 🗑️");

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to delete order");
    }
  };

  const updateOrder = async (orderId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://h945eqfehj.execute-api.ap-south-1.amazonaws.com/Prod/orders/${orderId}`,
        {
          customerName: editCustomerName,
          product: editProduct,
          quantity: editQuantity,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Order Updated ✏️");

      setEditingOrderId(null);

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to update order");
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

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Create Order
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        <button
          onClick={createOrder}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Create Order
        </button>

      </div>

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-400"
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders
          .filter((order) =>
            order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((order) => (

            <div
              key={order.orderId}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >

              {editingOrderId === order.orderId ? (

                <>

                  <input
                    type="text"
                    value={editProduct}
                    onChange={(e) => setEditProduct(e.target.value)}
                    className="w-full p-2 border rounded-xl mb-3"
                  />

                  <input
                    type="text"
                    value={editCustomerName}
                    onChange={(e) => setEditCustomerName(e.target.value)}
                    className="w-full p-2 border rounded-xl mb-3"
                  />

                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="w-full p-2 border rounded-xl mb-3"
                  />

                  <button
                    onClick={() => updateOrder(order.orderId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl mr-3"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingOrderId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>

                </>

              ) : (

                <>

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

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => {

                        setEditingOrderId(order.orderId);

                        setEditCustomerName(order.customerName);
                        setEditProduct(order.product);
                        setEditQuantity(order.quantity);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteOrder(order.orderId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </>

              )}

            </div>
          ))}

      </div>

    </div>
  );
}

export default Dashboard;