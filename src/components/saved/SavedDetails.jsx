import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown';
import { getSavedRecipeDetails } from "@/utils/save";
import PropTypes from 'prop-types'

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
            <div className="saved-details"><ReactMarkdown>{contents}</ReactMarkdown></div>
        </div>
    )
}
SavedDetails.propTypes = {
    id: PropTypes.number
}