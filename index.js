import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import qr from 'qr-image';
import path from 'path';

const app = express();
const port = 3000;

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // To handle form data


// Route to show the form and QR code
app.get("/", (req, res) => {
    res.render("main", { qrImage: null, username: null });
});

// Route to handle form submission and generate QR code
app.post("/generate", (req, res) => {
    const usertext = req.body.usertext; // Retrieve user input
    const qrImage = qr.imageSync(usertext, { type: 'png' }).toString('base64'); // Generate QR code
    res.render("main", { qrImage, username: usertext }); // Render the view with QR code and username
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
