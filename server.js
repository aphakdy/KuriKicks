const express = require("express");
const app = express();
const path = require("path");
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// MongoDB Connection Setup
mongoose.connect("mongodb+srv://kurikaraalex:Kurikara1@alexkuri.iqfaviw.mongodb.net/?retryWrites=true&w=majority&appName=AlexKuri", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB."))
.catch(err => console.error("Could not connect to MongoDB.", err));

// Gallery Item Schema and Model
const gallerySchema = new mongoose.Schema({
    title: String,
    description: String,
    photographerName: String,
    imageUrl: String
});
const Gallery = mongoose.model("Gallery", gallerySchema);

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public', 'uploads'),  
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Joi validation function
const validateGallery = (gallery) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    });
    return schema.validate(gallery);
};

// Serve index.html as the entry point to the website at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routing for serving HTML files
app.get(['/', '/index.html', '/inventory.html', '/addItem.html', '/login.html', '/newarrivals.html', '/checkout.html', '/gallery.html', '/contact.html', '/checkoutconfirm.html'], (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// API Routes
app.get("/api/gallery", async (req, res) => {
    try {
        const galleryItems = await Gallery.find();
        res.send(galleryItems);
    } catch (err) {
        console.error("Fetch gallery items error:", err);
        res.status(500).send("Error fetching gallery items: " + err.message);
    }
});

app.post("/api/gallery", upload.single("image"), async (req, res) => {
    console.log("Received body: ", req.body);
    console.log("Received file: ", req.file);

    const { error } = validateGallery(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newItem = new Gallery({
        title: req.body.title,
        description: req.body.description,
        photographerName: req.body.photographerName,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : 'default.jpg'
    });

    try {
        await newItem.save();
        res.send(newItem);
    } catch (err) {
        console.error("Save gallery item error:", err);
        res.status(500).send("Error saving gallery item: " + err.message);
    }
});


app.listen(3002, () => {
    console.log("Server successfully running on port 3002.");
});
