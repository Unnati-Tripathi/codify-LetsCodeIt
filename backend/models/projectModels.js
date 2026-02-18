
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    projectType: {
        type: String,
        enum: ["html", "cpp", "java"],
        default: "html"
    },
    htmlCode: {
        type: String,
        default: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>

    <!-- CSS File -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Welcome to My Website</h1>
    </header>

    <main>
        <section>
            <p>Hello , lets write our HTLM code..</p>
        </section>
    </main>

    <footer>
        <p>© 2026 My Website</p>
    </footer>

</body>
</html>`
    },
    cssCode: {
        type: String,
        default: `body {
    margin: 0;
    padding: 0;
    background-color: white;
}`
    },
    jsCode: {
        type: String,
        default: `console.log("Hello World from JS");`
    },
    code: {
        type: String,
        default: "" 
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;