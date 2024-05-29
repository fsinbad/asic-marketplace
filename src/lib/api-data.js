// Read all products data from the API URI (see .env.local).
// Note - All data available in the API URI is retrieved from the database
// beforehand (see src/pages/api/products.js).
async function getDataFromApiUri() {
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

export default getDataFromApiUri;
