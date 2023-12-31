﻿
const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {
    // Arrays to store cell collections for each row in the grid
    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];


  // Function to add cell markup to the specified cell collection
    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            // Find the item with matching ranking
            let item = items.find(o => o.ranking === rankNum);
            // Push a cell with a unique ID for each ranking item
            cellCollection.push(<div id={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item != null) ? <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} />
                    : null}
            </div>);
        }
        else {
            // Push a row label cell when rankNum is 0
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    // Function to create cells for a specific row in the grid
    function createCellsForRow(rowNum) {
        let rankNum = 0;
        let currCollection = [];
        let label = "";
        const numCells = 5;

        for (let a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)) + a - rowNum;

            // Determine which cell collection to use based on the row number
            if (rowNum === 1) {
                currCollection = cellCollectionTop;
                label = "Top Tier";
            }
            else if (rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = "Middle Tier";
            }
            else if (rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = "Bottom Tier";
            }
            else if (rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = "Worst Tier";
            }
            // Create and push cell markup to the appropriate collection
            pushCellMarkupToArr(currCollection, rankNum, label);

        }

    }

    // Function to create cells for all rows in the grid
    function createCellsForRows() {
        const maxRows = 4;
        for (let row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    // Function to create rows for the grid with their respective cell collections
    function createRowsForGrid() {
        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    }

    // Function to create the entire ranking grid
    function createRankingGrid() {
        createCellsForRows();
        return createRowsForGrid();
    }

    // Return the JSX markup for the RankingGrid component
    return (
        <div className="rankings">
            {createRankingGrid()}
        </div>
    )
}

export default RankingGrid;