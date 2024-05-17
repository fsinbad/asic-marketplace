// Reads all products data from the database via the API handler (in products.js).
async function getProductsFromDB() {
  try {
    if (!process.env.NEXT_PUBLIC_API_URI) {
      throw new Error('Invalid/Missing environment variable: "PUBLIC_API_URI"');
    }
    let res = await fetch(process.env.NEXT_PUBLIC_API_URI);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default getProductsFromDB;
