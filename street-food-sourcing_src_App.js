import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change to your backend URL when deployed

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [vendor, setVendor] = useState("");
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({ supplierId: "", product: "", quantity: "" });

  // Fetch suppliers on mount
  useEffect(() => {
    axios.get(`${API_URL}/suppliers`).then((res) => setSuppliers(res.data));
  }, []);

  const handleRegister = () => {
    axios.post(`${API_URL}/vendors`, { name: vendor }).then(() => alert("Registered!"));
  };

  const handleOrder = () => {
    axios.post(`${API_URL}/orders`, { ...order, vendor }).then(() => alert("Order placed!"));
  };

  const fetchOrders = () => {
    axios.get(`${API_URL}/orders/${vendor}`).then((res) => setOrders(res.data));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Street Food Vendor Sourcing Platform</h1>
      <section>
        <h2>1. Vendor Registration</h2>
        <input
          placeholder="Your Vendor Name"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />
        <button onClick={handleRegister}>Register/Login</button>
      </section>
      <section>
        <h2>2. Browse Suppliers</h2>
        <ul>
          {suppliers.map((s) => (
            <li key={s.id}>
              <b>{s.name}</b> ({s.location})<br />
              Products: {s.products.join(", ")}<br />
              Prices: {Object.entries(s.priceList).map(([k, v]) => `${k}: ₹${v}`).join(", ")}<br />
              Rating: {s.rating}⭐
              <br />
              <button onClick={() => setOrder({ ...order, supplierId: s.id })}>
                Order from {s.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>3. Place Order</h2>
        <input
          placeholder="Product"
          value={order.product}
          onChange={(e) => setOrder({ ...order, product: e.target.value })}
        />
        <input
          placeholder="Quantity"
          value={order.quantity}
          onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
        />
        <button onClick={handleOrder}>Place Order</button>
      </section>
      <section>
        <h2>4. My Orders</h2>
        <button onClick={fetchOrders}>Load My Orders</button>
        <ul>
          {orders.map((o, i) => (
            <li key={i}>
              Supplier ID: {o.supplierId}, Product: {o.product}, Quantity: {o.quantity}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;