import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { getSavedRecipeDetails } from "@/utils/save";

import "./SavedDetails.css";

export default function SavedDetails ({ id }){
    const [contents, setContents] = useState('');
    useEffect(() => {
        getSavedRecipeDetails.then(res => {
            setContents(res.contents);
        })
    }, [id])
    return(
        <div className="saved-details-container">
            <div className="saved-details">{contents}</div>
        </div>
    )
}
SavedDetails.propTypes = {
    id: PropTypes.number
}