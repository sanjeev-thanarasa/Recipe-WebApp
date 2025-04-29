//API URL & ENDPOINTS
const BASE_URL = "https://api-recipe.vercel.app";
const END_POINTS = {
  getAllRecipes: `${BASE_URL}/recipes`,
  getRecipeById: "recipes/:id",
};

// GET ALL RECIPES
export async function getAllRecipes() {
  const response = await fetchData(END_POINTS.getAllRecipes);
  return response;
}

// GET RECIPE BY ID
export async function getRecipeById(id) {
  const url = `${BASE_URL}/${END_POINTS.getRecipeById}`.replace(":id", id);
  const response = await fetchData(url);
  return response;
}

// API HELPER FUNCTIONS
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("response failed");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
