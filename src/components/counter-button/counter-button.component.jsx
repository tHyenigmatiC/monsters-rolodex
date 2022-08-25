import React from "react";


import './counter-button.styles.css';

class CounterButton extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            counter: 0
        }
    }

    // only update the value if the value of counter state is changed
    shouldComponentUpdate(nextProps, nextState){
        return nextState.counter !== this.state.counter;
    }

    render() {
        return (
            <button
                onClick={() => this.setState( state => ({ counter: state.counter + 1}))}>
                Count: { this.state.counter }
            </button>
        );
    }
}

export default CounterButton;