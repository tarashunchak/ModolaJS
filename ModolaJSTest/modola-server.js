const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
    console.log("post received");
    let codeArray = req.body.code;

    function flattenDeep(arr) {
        return arr.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)
        , []);
    }

    if (!Array.isArray(codeArray)) {
        return res.status(400).send("Expected 'code' to be an array.");
    }

    codeArray = flattenDeep(codeArray);

    const code = codeArray.join("\n");

    console.log("Flattened codeArray type:", typeof codeArray);
    console.log("Is array:", Array.isArray(codeArray));
    console.log("Flattened codeArray:", codeArray);

    fs.writeFile("project.js", code, (err) => {
        if (err) {
            console.error("Error saving:", err);
            return res.status(500).send("Error saving file.");
        }

        console.log("project.js saved successfully.");
        res.send("Saved.");
    });
});



app.listen(2727, () => {
    console.log("Modola Dev Server running on http://localhost:2727");
});
