import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

const app = express();
const port = 5000;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const period = Date.now() - start;

        const log = `${req.method} ${req.url} ${res.statusCode} ${period} ms\n`;

        fs.appendFile("./server.log", log, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    next();
};

app.use(logger);


// Validation middleware
const validatePatient = (req, res, next) => {

    const { name, age, ward } = req.body;

    if (!name || !age || !ward) {
        return res.status(400).send("Invalid patient data");
    }

    next();
};


// POST - Create patient
app.post("/api/v1/patients", validatePatient, (req, res) => {

    console.log("Creating new patient:", req.body);

    res.status(201).send("Patient created successfully");
});


// GET - Read all patients
app.get("/api/v1/patients", (req, res) => {

    console.log("Fetching all patients");

    res.status(200).send("Patients fetched successfully");
});


// GET - Read patient by ID
app.get("/api/v1/patients/:id", (req, res) => {

    const { id } = req.params;

    console.log("Fetching patient with ID:", id);

    res.status(200).send("Patient details fetched successfully");
});


// PUT - Update patient by ID
app.put("/api/v1/patients/:id", validatePatient, (req, res) => {

    const { id } = req.params;

    console.log("Updating patient with ID:", id);

    res.status(200).send("Patient updated successfully");
});


// DELETE - Delete patient by ID
app.delete("/api/v1/patients/:id", (req, res) => {

    const { id } = req.params;

    console.log("Deleting patient with ID:", id);

    res.status(200).send("Patient deleted successfully");
});


// Error handling middleware
app.use((err, req, res, next) => {

    console.log(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).send(message);
});


// Handle 404 errors
app.use((req, res, next) => {

    res.status(404).send("Resource not found");
});


// Start server
app.listen(port, () => {

    console.log(
        "Server is running on port http://localhost:5000/api/v1/patients/"
    );

});