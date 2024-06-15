// Read all products data from the API URI (see .env.local).
// Note - All data available in the API URI is retrieved from the database
// beforehand (see src/pages/api/products.js).
async function getDataFromApiUri() {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API_URI) {
      return [];
    }

    const uri = `${process.env.NEXT_PUBLIC_BASE_API_URI}/api/products`;
    let res = await fetch(uri);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default getDataFromApiUri;
