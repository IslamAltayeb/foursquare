import React, {useState} from "react";
import axios from "axios";
function App() {

  const [searchWord, setSearchWord] = useState('')
  const [err, setErr] = useState('')
  const [fours, setFour] = useState([])
  const clientId = 'PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR';
  const clientSecret = 'CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0';

const handleSubmit = (e)=>{
  e.preventDefault()
  setErr('')
  if (searchWord === '') {
    setErr('this field is required')
  }
  else{
    axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&ll=40.7,-74&query=${searchWord}&v=20230629`)
    .then(result =>{
      console.log(result.data.response)
      setFour(result.data.response.venues)
    }).catch(err => console.log(err))      
    
  }
}

const handleChange = (e) =>{
  setSearchWord(e.target.value)
}

  return (
    <div>
      <input placeholder="Search for Places" type="input" onChange={handleChange} />
          <button onClick={handleSubmit}>Search</button>
      {err ? <h5>{err}</h5> : null}
      <div>
        {fours && fours.map(four => 
        <div key = {four.id}>
          <p>{four.name}</p>
         </div> 
          )}
      </div>
    </div>
    
  );
}

export default App;
