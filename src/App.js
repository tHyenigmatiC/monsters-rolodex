import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import "./App.css";

// custom imports
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import CounterButton from "./components/counter-button/counter-button.component";


// reduxjs toolkit actions
import { setSearchField } from "./redux/searchSlice";
import { fetchMonsters } from "./redux/monstersSlice";

const App = () => {

  const dispatch = useDispatch();

  const { data, error, isLoading} = useSelector(state => state.monsters);
  const { searchField } = useSelector(state => state.search);

  /* 
    ISSUE
      Here we every time when our app mounts we are calling the creatThunkAsync function 
      i.e.  `fetchMonsters` API call. In most web apps, when we are requesting API calls
      multiple times; only the last request should go through and all the previous requests
      should be aborted.

    SOLUTION
      We know dispatching the thunk returns a promise.
      Here `createAsyncThunk` attaches an `abort()` method to promise. thus we can call that to 
      abort our previous requests

 */
  useEffect(() => {
    // dispatching thunk returns promise
    const promise = dispatch(fetchMonsters());

    // cleanup function
    return () => {
      promise.abort();
    }
  }, [dispatch]);
  
  const handleChange = (e) => {
    dispatch(setSearchField(e.target.value));
  }

  let content;

  if (isLoading){
    content = (<p>Loading...</p>)
  } else if (data){
    const filteredMonsters = data.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())  
    );
    content = (
      <CardList monsters={filteredMonsters} />
    )
  } else if (error){
    content = (
      <p>Error: {error.toString()}</p>
    )
  }
  return (
    <div className="App">
      <div className="header">
        <CounterButton/>
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
