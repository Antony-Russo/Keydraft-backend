const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Branch = require("../models/branch"); 

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" });

// Routes
// 1. Create a new branch
router.post("/branches", async (req, res) => {
    try {
      const branchData = req.body; 
      const newBranch = new Branch(branchData); 
      await newBranch.save(); 
      res.status(201).send({ message: "Branch details saved successfully", newBranch });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error saving branch details", error });
    }
  });
  

// 2. Get all branches with pagination and search
router.get("/data", async (req, res) => {
    try {
      const branches = await Branch.find();
      res.status(200).json({ success: true, data: branches });
    } catch (err) {
      console.error('Error fetching branches:', err);
      res.status(500).send({ success: false, error: err.message });
    }
  });

router.get("/data/:id", async (req, res) => {
    const { id } = req.params; 
    try {
      console.log(`Fetching branch with ID: ${id}`);
      const branch = await Branch.findById(id); 
  
      if (!branch) {
        return res.status(404).json({ success: false, message: "Branch not found" });
      }
  
      console.log("Branch fetched:", branch);
      res.status(200).json({ success: true, data: branch });
    } catch (err) {
      console.error("Error fetching branch:", err);
      res.status(500).send({ success: false, error: err.message });
    }
});

// 3. Update an existing branch
router.put("/branches/:id", async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!branch) {
      return res.status(404).send({ error: "Branch not found" });
    }
    res.send(branch);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 4. Delete a branch
router.delete("/branches/:id", async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) {
      return res.status(404).send({ error: "Branch not found" });
    }

    res.send({ message: "Branch deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 5. Import branches from Excel file
router.post("/branches/import", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]]; 
    const data = xlsx.utils.sheet_to_json(sheet); 

    // Insert data into the database
    await Branch.insertMany(data);
    res.status(201).send({ message: "Data imported successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 6. Export branches to Excel file
router.get("/branches/export", async (req, res) => {
  try {
    const branches = await Branch.find({}); 
    const worksheet = xlsx.utils.json_to_sheet(branches);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Branches");
    const filePath = "branches.xlsx";
    xlsx.writeFile(workbook, filePath);
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Error exporting file" });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
