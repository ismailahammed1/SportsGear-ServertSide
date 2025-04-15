require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb"); 
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.dyugevw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");

    const database = client.db("SportsEquipmentDB");
    const equipmentsCollection = database.collection("SportsEquipment");
    const userCollection = client.db("SportsEquipmentDB").collection('userDB')

    // equepments section

    app.get("/allequipments", async (req, res) => {
      const cursor =equipmentsCollection.find();
      const Allequipments = await cursor.toArray(); 
      res.json(Allequipments);
    });


    // Get a single equipment item by ID
    app.get("/equipments/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        const equipment = await equipmentsCollection.findOne({ _id: objectId });
    
        if (!equipment) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.json(equipment);
      } catch (error) {
        console.error("Error fetching equipment:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

//update
    app.put("/equipments/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log("Received ID:", id); // Log the ID
        console.log("Request body:", req.body); // Log the incoming data
  
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid equipment ID" });
        }
    
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedEquipment = req.body;
    
        const equipment = {
          $set: {
            image: updatedEquipment.image,
            itemName: updatedEquipment.itemName,
            category: updatedEquipment.category,
            subCategory: updatedEquipment.subCategory,
            description: updatedEquipment.description,
            price: updatedEquipment.price,
            rating: updatedEquipment.rating,
            customization: updatedEquipment.customization,
            processingTime: updatedEquipment.processingTime,
            stockStatus: updatedEquipment.stockStatus,
            userName: updatedEquipment.userName,
            userEmail: updatedEquipment.userEmail,
          },
        };
    
        const result = await equipmentsCollection.updateOne(filter, equipment, options);
        console.log("Update result:", result); // Log the result
    
        if (result.matchedCount === 0 && result.upsertedCount === 0) {
          return res.status(404).json({ message: "Equipment not found and not upserted" });
        }
    
        res.json({ message: "Equipment updated successfully", result });
      } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });
//delete
    app.delete("/equipments/:id", async (req, res) => {
      try {
        const id = req.params.id;  
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid equipment ID" });
        }
    
        const query = { _id: new ObjectId(id) };
        const result = await equipmentsCollection.deleteOne(query);  
        res.json({ message: "Equipment updated successfully", result });
      } catch (error) {
        console.error("Error updating equipment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });
    
    app.post("/equipments", async (req, res) => {
      const equipment = req.body;
      console.log("Adding equipment:", equipment);
      const result = await equipmentsCollection.insertOne(equipment);
      res.json({ message: "Equipment added successfully", result });
    });

    //user seciton
    app.post("/equipments", async (req, res) => {
      const users = req.body;
      console.log("Adding equipment:", users);
      const result = await userCollection.insertOne(users);
      res.json({ message: "Equipment added successfully", result });
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
