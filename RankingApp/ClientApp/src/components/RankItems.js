import React, { useState, useEffect } from 'react';
import MovieImageArr from "./MovieImages.js";
import RankingGrid from "./RankingGrid.js"

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;

     // Effect hook to fetch data from the API when the component is mounted or dataType changes
    useEffect(() => {
         // Fetch data from the API using the specified dataType 
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();  // Convert the response to JSON format
            })
            .then(data => {
                setItems(data);  // Update the items state with the fetched data
            })
    }, []);

     // Conditional rendering: If items are available, display their titles
    return (
        <main>
            <RankingGrid items={items} imgArr={MovieImageArr} />
        <div className = "items-not=ranked">
            {
                    (items.length > 0) ? items.map((item) =>
                    <div className = "unranked-cell">
                        <img id={`item-${item.id}`} src={MovieImageArr.find(o=>o.id === item.imageId)?.image} />
                    </div>
                    ) : <div>Loading...</div>
                }
            </div>
        </main>
    )
}

export default RankItems;