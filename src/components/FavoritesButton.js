import React, { useState, useEffect } from 'react';
import { useNutriCartContext } from "../context/NutriCartContext";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoritesButton = ({item}) => {
    const { favorites, addToFavorites, removeFromFavorites, } = useNutriCartContext();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(favorites.some(favItem => favItem.name === item.name));
      }, [favorites, item]);

    const handleAddFavorite = (e) => {
        e.stopPropagation();

        if (favorite) {
            // Remove the item from favorites
            removeFromFavorites(item);
        } else {
            // Add the item to favorites
            addToFavorites(item);
        }
        // Toggle the favorite state
        setFavorite(!favorite);
    }

    return (
        <button onClick={(e) => handleAddFavorite(e)} className="favorites-heart button-sub">
            {favorite ? 
                <FaHeart size={24} color="red" /> 
                : <FaRegHeart size={24} color="red" />}
                <span>{favorite ? "Remove From" : "Add To" } Favorites</span>
        </button>
    )
}

export default FavoritesButton;