// Read all products data from the API URI (see .env.local).
// Note - All data available in the API URI is retrieved from the database
// beforehand (see src/pages/api/products.js).
async function getDataFromApiUri() {
  try {
    const uri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/products"
        : "https://ma-fath-asic-marketplace.vercel.app/api/products";
    // if (!process.env.NEXT_PUBLIC_API_URI) {
    //   throw new Error('Invalid/Missing environment variable: "PUBLIC_API_URI"');
    // }
    // let res = await fetch(process.env.NEXT_PUBLIC_API_URI);
    let res = await fetch(uri);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default getDataFromApiUri;
