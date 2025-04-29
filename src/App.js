import Loader from "./components/Loader/Loader";
import { getAllRecipes } from "./utils/api";
import { useEffect, useState } from "react";
import styles from "./components/Loader/Loader.module.scss";
import Header from "./components/Header/Header.js";
import RecipeList from "./components/RecipeList/RecipeList.js";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const response = await getAllRecipes();
        setRecipes(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchRecipesData();
  }, []);

  return (
    <div className={styles.App}>
      <Header title={"Recipe App"} />
      {loading ? (
        <Loader name={"Recipe is Loading..."} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
}

export default App;
