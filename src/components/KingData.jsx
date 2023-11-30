import axios from "axios";
import { useState, useEffect } from "react";

function KingData(){
    const [kings, setKings] = useState([])
    const [filter, setFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function getData(){
        setIsLoading(true)
        axios.get("http://raw.githubusercontent.com/JHarry444/LBG-React-Demo/main/src/data/kings.json")

        .then( (response) =>{
            setKings(response.data); 
            setIsLoading(false)
        } )

        .catch( (error) => console.log(error) )
    }
    
    // Runs once upon first time loading
    useEffect(() => {
        getData()
    }, [])

    const kingsComponents = []
    for (const king of kings){
        if (filter === "" || king.nm.toLowerCase().startsWith(filter.toLowerCase()))
        {
        kingsComponents.push(
        <div key={king.nm}> 
            <h4>Name: {king.nm}</h4>
            <p>{king.yrs}</p>
        </div>)
        }
    }

    if (isLoading) {
        return <h1>LOADING</h1>
    }

    if (kings.length == 0){
        return (
            <div>
                <h1>Kings</h1>
            </div>)
    }else{
        return (
            <div>
                <h1>Kings</h1>
                <input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
                {kingsComponents}
            </div>)
    }

    
    // return (
    //     <div>
    //         <h1>Kings</h1>
    //         {kings.length == 0 && <button onClick={getData}>Get Data</button>}

    //         <input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
    //         {kingsComponents}
    //     </div>)



}

export default KingData;