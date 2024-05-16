import clientPromise from "@/lib/mongodb";

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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// export default function handler(req, res) {
//     res.status(200).json({name: 'John Doe'})
// }
