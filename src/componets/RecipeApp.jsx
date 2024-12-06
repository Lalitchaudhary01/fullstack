import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4 flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">Recipe Search</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          className="border rounded-lg p-2 w-2/3 lg:w-1/3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className="flex justify-center mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border-r-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <h2 className="text-xl font-bold m-3">{recipe.name}</h2>
            {recipe.image && (
              <img
                alt={recipe.name}
                src={recipe.image}
                className="w-full border-r-4 h-48 object-cover ml-4"
              />
            )}
            <div className="p-4">
              <p className="font-semibold mb-1">Ingredients:</p>
              <ul className="list-disc list-inside mb-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p className="font-semibold mb-1">Instructions:</p>
              <ul className="list-decimal list-inside text-gray-600 text-sm">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <p className="mt-4 text-gray-500 text-sm">
                Prep Time: {recipe.prepTimeMinutes} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeApp;
