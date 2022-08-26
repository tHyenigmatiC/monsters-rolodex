import { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import "./App.css";

// custom imports
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import CounterButton from "./components/counter-button/counter-button.component";

// redux actions
import { setSearchField, searchRobots} from './actions';

// redux selector
import { selectSearchField, selectMonsters } from './selectors';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    this.props.searchRobots();
  }

  handleChange = (e) => {
    this.props.setSearchField(e.target.value);
  }

  render() {
    const { monsters, searchField } = this.props;
    const filteredMonsters = monsters.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())  
    );
    return (
      <div className="App">
        <div className="header">
          <CounterButton/>
          <h1>Monsters Rolodex</h1>
          <SearchBox 
            placeholder="Search Monsters"
            handleChange={this.handleChange}/>
        </div>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSearchField: text => dispatch(setSearchField(text)),
  searchRobots: () => dispatch(searchRobots())
});

const mapStateToProps = createStructuredSelector({
  searchField: selectSearchField,
  monsters: selectMonsters
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
