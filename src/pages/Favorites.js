import React from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
function Favorites() {
    const { favorites, removeFromFavorites } = useNutriCartContext();
    return (
        <div>
            <ul>
                {favorites.length > 0 ? (
                favorites.map((item, index) => (
                    <li key={index}>
                    {item} 
                    <button onClick={() => removeFromFavorites(item)}>Remove</button>
                    </li>
                ))
                ) : (
                <p>No favorites added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default Favorites;