import axios from "axios";
import { useState } from "react";

// This component will load data from a server
function KingsDataLoad(){
    const [kings, setKings] = useState([]); 

    // Axios Request (From Jordan's Github)
    function getData(){
        axios.get("https://raw.githubusercontent.com/JHarry444/LBG-React-Demo/main/src/data/kings.json")
            .then((response) => { setKings(response.data)} ) // Update state data with response data
            .catch((error) => {console.log(error)})
    }

    // Take state array and turn it to html
    const kingsData = []

    for (let king of kings){
        kingsData.push(<p>{king.nm}</p>)
    }

    return (
    <div>
        <h1> Data </h1>
        {kingsData}
        <button onClick={() => getData()} > Get Data </button>
    </div>)
}

export default KingsDataLoad;