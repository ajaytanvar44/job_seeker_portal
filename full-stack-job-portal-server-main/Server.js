// ✅ Load env first!
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./App");

// ✅ DB connection
const DBConnectionHandler = require("./Utils/DBconnect");
DBConnectionHandler();

const port = process.env.PORT || 3000;

// ✅ Routes
app.get("/", (req, res) => {
    res.send("Job Hunter Server is running!");
});

// ✅ 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next("There was a problem");
    } else {
        res.status(err.status || 500).send(err.message || "Something went wrong");
    }
});

// ✅ Start server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
