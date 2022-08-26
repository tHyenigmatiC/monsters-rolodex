import { useEffect } from "react";

// custom imports
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import CounterButton from "./components/counter-button/counter-button.component";

// dispatch and selector hooks
import { useAppDispatch, useAppSelector } from "./app/hooks";

// reduxjs toolkit actions
import { setSearchField } from "./redux/searchSlice";
import { fetchMonsters } from "./redux/monstersSlice";

import { API_URL } from './api/api'

const App = ({ err }) => {

  const dispatch = useAppDispatch();

  const { data, error, isLoading} = useAppSelector(state => state.monsters);
  const { searchField } = useAppSelector(state => state.search);

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
    const promise = dispatch(fetchMonsters(err ? '/err' : API_URL));

    // cleanup function
    return () => {
      promise.abort();
    }
  }, [dispatch, err]);
  
  const handleChange = (e) => {
    dispatch(setSearchField(e.target.value));
  }

  let content;

  if (isLoading){
    content = (<p>Loading...</p>)
  } else if (data.length){
    const filteredMonsters = data.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())  
    );
    content = (
      <CardList monsters={filteredMonsters} />
    )
  } else if (error){
    content = (<p>Error</p>)
  }
  return (
    <div className="App">
      <div className="header">
        <CounterButton/>
        <h1>Monster Rolodex</h1>
        <SearchBox 
          placeholder="Search Monsters"
          handleChange={handleChange}/>
      </div>
      {content}
    </div>
  );
}

export default App;
