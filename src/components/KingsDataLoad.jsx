import axios from "axios";
import { useState } from "react";

function KingsDataLoad(){
    const [kings, setKings] = useState([]); 

    function getData(){
        axios.get("https://raw.githubusercontent.com/JHarry444/LBG-React-Demo/main/src/data/kings.json")
            .then((response) => { setKings(response.data)} )
            .catch((error) => {console.log(error)})
    }

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