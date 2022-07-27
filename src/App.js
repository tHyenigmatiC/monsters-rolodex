import { Component } from "react";
import "./App.css";

// custom imports
import { SearchBox } from "./components/search-box/search-box.component";
import { CardList } from "./components/card-list/card-list.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    // if it was a normal function defined in the same way as render and componentDidMount
    // then we wouldn't have been able to use this as js doesn't automatically bind this
    // to our custom function but as we are utilizing the feature of es6 , we can use 
    // arrow function which automatically binds this context to the function
    this.setState({ searchField: e.target.value}); 
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())  
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder="search monsters"
          handleChange={this.handleChange}/>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
