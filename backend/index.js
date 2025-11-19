import db from "./db/db.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

db()
  .then(() => {
    app.listen(port, () => {
      console.log("✅ Database Connected...");
      console.log(`🚀 Server running on port : ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  });
