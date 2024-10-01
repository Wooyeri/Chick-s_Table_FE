import SavedSidebar from '@/components/saved/SavedSidebar';
import SavedDetails from '@/components/saved/SavedDetails';
import './SavedRecipes.css';
import { useState } from 'react';

const SavedRecipes = () => {
  const [recipeId, setRecipeId] = useState();
  return (
    <div className='saved-recipes-page'>
      <div className='saved-sidebar-container'>
        <SavedSidebar setRecipeId={setRecipeId} />
      </div>
      <div className='saved-details-container'>
        {recipeId && <SavedDetails recipeId={recipeId} />}
      </div>
    </div>
  );
};

export default SavedRecipes;