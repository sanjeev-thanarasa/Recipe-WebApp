import React from "react";
import { useState, useEffect } from "react";
import { getRecipeById } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import styles from "./RecipeDetail.module.scss";
import classNames from "classnames";

function RecipeDetail() {
  const [recipe, setRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const response = await getRecipeById(id);
        setRecipes(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchRecipesData();
  }, [id]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    const isFav = fav.some((item) => item.id === recipe.id);
    setIsFavorite(isFav);
  }, [recipe]);

  const handleToggleFavorite = () => {
    setIsFavorite((preVal) => !preVal);
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    const updateFav = isFavorite
      ? fav.filter((item) => item.id !== recipe.id)
      : [...fav, recipe];
    localStorage.setItem("fav", JSON.stringify(updateFav));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.recipeDetail}>
          <Link to={`/`}>Go Back</Link>

          <div className={styles["header-section"]}>
            <h5 className={styles.title}>{recipe.title}</h5>
            <button
              onClick={handleToggleFavorite}
              className={styles["favorite-button"]}
            >
              {isFavorite ? "- Remove from Favorites" : "+ Add to Favorites"}
            </button>
          </div>

          <div className={styles["img-section"]}>
            <img
              className={styles.image}
              src={recipe.image}
              alt={recipe.title}
            />
          </div>

          <div className={styles.receipeInfo}>
            <span className={classNames(styles.tag, styles.level)}>
              {recipe.level}
            </span>
            <span className={classNames(styles.tag, styles.time)}>
              {recipe.time}
            </span>
            <span className={classNames(styles.tag, styles.veg)}>
              {recipe.isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>

          <div className={styles["ingredients-section"]}>
            {recipe.ingredients.map((ingredient, key) => {
              return (
                <span key={key} className={styles.ingredient}>
                  {ingredient}
                </span>
              );
            })}
          </div>

          <div className={styles["instructions-section"]}>
            <h3>Instructions</h3>
            <ol className={styles["instruction-list"]}>
              {recipe.instructions.map((instruction, index) => {
                return <li key={index}>{instruction}</li>;
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
