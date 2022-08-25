import { useState } from "react";
import "./App.css";

// custom imports
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import { useGetMonstersQuery } from "./redux/apiSlice";

const App = () => {
  const [searchField, setSearchField] = useState('');
  const {
    data: monsters = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMonstersQuery();

  const handleChange = (e) => {
    setSearchField(e.target.value);
  }

  const filteredMonsters = monsters.filter( monster => 
    monster.name.toLowerCase().includes(searchField.toLowerCase())  
  );

  let content;

  if (isLoading){
    content = (<p>Loading data from server.....</p>);
  }else if (isSuccess){
    content = (
      <CardList monsters={filteredMonsters} />
    )
  } else if (isError){
    content = (<p>{error.toString()}</p>)
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder="Search Monsters"
          handleChange={handleChange}/>
      </div>
      {content}
    </div>
  );
}

export default App;
