import SavedSidebar from '@/components/saved/SavedSidebar';
import SavedDetails from '@/components/saved/SavedDetails';
import './SavedRecipes.css';
import { useState } from 'react';

const SavedRecipes = () => {
  const [recipeId, setRecipeId] = useState();
  return (
    <div>
      <SavedSidebar setRecipeId={setRecipeId} />
      <SavedDetails recipeId={recipeId} />
    </div>
  );
};

export default SavedRecipes;