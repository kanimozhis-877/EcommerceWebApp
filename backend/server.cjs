const http = require("http");

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499 },
  { id: 2, name: "Smart Watch", price: 1999 },
  { id: 3, name: "Laptop Backpack", price: 899 },
  { id: 4, name: "Wireless Mouse", price: 599 }
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/products" && req.method === "GET") {
    res.end(JSON.stringify(products));
  } 
  else if (req.url === "/api/orders" && req.method === "GET") {
    res.end(JSON.stringify([
      { id: 1, status: "Order Placed" }
    ]));
  } 
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "API not found" }));
  }
});

server.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});