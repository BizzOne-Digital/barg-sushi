// One-off: upload the 8 new client-provided photos to Cloudinary and add
// them as Gallery entries. Purely additive — creates new documents only,
// never touches MenuItem or any existing Gallery entry.
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const { cloudinary } = require("../config/cloudinary");
const Gallery = require("../models/Gallery");

const files = ["new1.jpg", "new2.jpg", "new3.jpg", "new4.jpg", "new5.jpg", "new6.jpg", "new7.jpg", "new8.jpg"];
const publicDir = path.join(__dirname, "../../frontend/public");

const run = async () => {
  await connectDB();

  const maxSort = await Gallery.findOne().sort({ sortOrder: -1 });
  let nextSort = (maxSort?.sortOrder ?? -1) + 1;

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const result = await cloudinary.uploader.upload(filePath, { folder: "barg-sushi" });
    await Gallery.create({
      title: "",
      image: { url: result.secure_url, publicId: result.public_id },
      sortOrder: nextSort++,
    });
    console.log(`✅ Added ${file} -> ${result.secure_url}`);
  }

  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });
