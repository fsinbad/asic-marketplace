import clientPromise from "@/lib/mongodb";

//##############################################################################

// Fetches all products data from the database.
async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error(e);
  }
}

export default handler;
