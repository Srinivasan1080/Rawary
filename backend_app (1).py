from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory "database"
vendors = []
suppliers = [
    {"id": 1, "name": "Fresh Veggies", "products": ["potato", "tomato"], "location": "Delhi", "priceList": {"potato": 20, "tomato": 30}, "rating": 4.5},
    {"id": 2, "name": "Grain House", "products": ["rice", "wheat"], "location": "Mumbai", "priceList": {"rice": 40, "wheat": 35}, "rating": 4.2},
]
orders = []

@app.route("/api/vendors", methods=["POST"])
def register_vendor():
    data = request.json
    vendors.append(data)
    return jsonify({"message": "Vendor registered!"}), 201

@app.route("/api/suppliers", methods=["GET"])
def get_suppliers():
    return jsonify(suppliers)

@app.route("/api/orders", methods=["POST"])
def place_order():
    data = request.json
    orders.append(data)
    return jsonify({"message": "Order placed!"}), 201

@app.route("/api/orders/<vendor>", methods=["GET"])
def get_orders(vendor):
    vendor_orders = [o for o in orders if o["vendor"] == vendor]
    return jsonify(vendor_orders)

if __name__ == "__main__":
    app.run(port=5000)