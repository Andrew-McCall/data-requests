import axios from "axios";
import { useState, useEffect } from "react";

// Get data from jordans github on button press
// Render the kings as html

// Get the data upon page load

// Add another useState for filter
// Add form for filter
// Make filter, filter kings

// 15:00

function KingData(){
    const [kings, setKings] = useState([])

    function getData(){
        axios.get("http://raw.githubusercontent.com/JHarry444/LBG-React-Demo/main/src/data/kings.json")
        .then( (response) => setKings(response.data) )
        .catch( (error) => console.log(error) )
    }
    
    // Runs once upon first time loading
    useEffect(() => {
        getData()
    }, [])

    const kingsComponents = []
    for (const king of kings){
        kingsComponents.push(
        <div key={king.nm}> 
            <h4>Name: {king.nm}</h4>
            <p>{king.yrs}</p>
        </div>)
    }

    return (
    <div>
        <h1>Kings</h1>
        {kingsComponents}
    </div>)

}

export default KingData;