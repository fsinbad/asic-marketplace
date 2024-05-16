if (!process.env.NEXT_PUBLIC_API_URI) {
  throw new Error('Invalid/Missing environment variable: "PUBLIC_API_URI"');
}

const uri = process.env.NEXT_PUBLIC_API_URI;

// Read all products data from the database via our API handler (products.js)
async function getProductsFromDB(str) {
  try {
    console.log(`${str} - FETCHING FROM THE DATABASE ...`);
    let res = await fetch(uri);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default getProductsFromDB;
