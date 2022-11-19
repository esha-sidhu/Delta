import React from 'react';

const week = [new Date()]

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    week.push(previous)
  }
  

getPreviousDay(week[0]);
getPreviousDay(week[1]);
getPreviousDay(week[2]);
getPreviousDay(week[3]);
getPreviousDay(week[4]);
getPreviousDay(week[5]);

const day_convert = {0 : 'Sunday', 1 : 'Monday', 2: 'Tuesday', 3 : 'Thursday', 4 : 'Friday', 5 : 'Saturday', 6 : 'Sunday'};
const month_convert = {0 : 'January', 1 : 'Februrary', 2 : 'March', 3 : 'April', 4 : 'May', 5 : 'June', 6 : 'July', 7 : 'August', 8 : 'September', 9 : 'October', 10 : 'November', 11 : 'December'}

class SleepTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            One: 0,
            hours_one: '',
            Two: 0,
            hours_two: '',
            Three: 0,
            hours_three: '',
            Four: 0,
            hours_four: '',
            Five: 0,
            hours_five: '',
            Six: 0,
            hours_six: '',
            Seven: 0,
            hours_seven: '',
        };

        this.handleChangeOne = this.handleChangeOne.bind(this);
        this.handleSubmitOne = this.handleSubmitOne.bind(this);

        this.handleChangeTwo = this.handleChangeTwo.bind(this);
        this.handleSubmitTwo = this.handleSubmitTwo.bind(this);

        this.handleChangeThree = this.handleChangeThree.bind(this);
        this.handleSubmitThree = this.handleSubmitThree.bind(this);

        this.handleChangeFour = this.handleChangeFour.bind(this);
        this.handleSubmitFour = this.handleSubmitFour.bind(this);

        this.handleChangeFive = this.handleChangeFive.bind(this);
        this.handleSubmitFive = this.handleSubmitFive.bind(this);

        this.handleChangeSix = this.handleChangeSix.bind(this);
        this.handleSubmitSix = this.handleSubmitSix.bind(this);

        this.handleChangeSeven = this.handleChangeSeven.bind(this);
        this.handleSubmitSeven = this.handleSubmitSeven.bind(this);
    }


    handleChangeOne(event) {
            this.setState({hours_one: event.target.value},);
    }
    handleSubmitOne() {
        if(this.state.hours_one > 0 && this.state.hours_one <= 24 && this.state.hours_one % 1 === 0)
        {
            this.setState({One: this.state.hours_one/1, hours_one: ''});
        }
    }


     handleChangeTwo(event) {
        this.setState({hours_two: event.target.value},);
    }
    handleSubmitTwo() {
        if(this.state.hours_two > 0 && this.state.hours_two <= 24 && this.state.hours_two % 1 === 0)
        {
            this.setState({Two: this.state.hours_two/1, hours_two: ''});
        }
    }


    handleChangeThree(event) {
        this.setState({hours_three: event.target.value},);
    }
    handleSubmitThree() {
        if(this.state.hours_three > 0 && this.state.hours_three <= 24 && this.state.hours_three % 1 === 0)
        {
            this.setState({Three: this.state.hours_three/1, hours_three: ''});
        }
    }


    handleChangeFour(event) {
        this.setState({hours_four: event.target.value},);
    }
    handleSubmitFour() {
        if(this.state.hours_four > 0 && this.state.hours_four <= 24 && this.state.hours_four % 1 === 0)
        {
            this.setState({Four: this.state.hours_four/1, hours_four: ''});
        }
    }


    handleChangeFive(event) {
        this.setState({hours_five: event.target.value},);
    }
    handleSubmitFive() {
        if(this.state.hours_five > 0 && this.state.hours_five <= 24 && this.state.hours_five % 1 === 0)
        {
            this.setState({Five: this.state.hours_five/1, hours_five: ''});
        }
    }


    handleChangeSix(event) {
        this.setState({hours_six: event.target.value},);
    }
    handleSubmitSix() {
        if(this.state.hours_six > 0 && this.state.hours_six <= 24 && this.state.hours_six % 1 === 0)
        {
            this.setState({Six: this.state.hours_six/1, hours_six: ''});
        }
    }


    handleChangeSeven(event) {
        this.setState({hours_seven: event.target.value},);
      }
    
    handleSubmitSeven() {
        if(this.state.hours_seven > 0 && this.state.hours_seven <= 24 && this.state.hours_seven % 1 === 0)
        {
            this.setState({Seven: this.state.hours_seven/1, hours_seven: ''});
        }
    }

    render() {
        return (
        <>
        <div>Sleep Tracker</div>
        <br/>
        <div>{day_convert[week[6].getDay()]}, {week[6].getDate()} {month_convert[week[6].getMonth()]} {week[6].getFullYear()}</div>
        <div>{this.state.Seven}</div>
        <input type="text" value={this.state.hours_seven} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeSeven}/>
        <button onClick={this.handleSubmitSeven}>add</button>
        <div>{day_convert[week[5].getDay()]}, {week[5].getDate()} {month_convert[week[5].getMonth()]} {week[5].getFullYear()}</div>
        <div>{this.state.Six}</div>
        <input type="text" value={this.state.hours_six} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeSix}/>
        <button onClick={this.handleSubmitSix}>add</button>
        <div>{day_convert[week[4].getDay()]}, {week[4].getDate()} {month_convert[week[4].getMonth()]} {week[4].getFullYear()}</div>
        <div>{this.state.Five}</div>
        <input type="text" value={this.state.hours_five} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeFive}/>
        <button onClick={this.handleSubmitFive}>add</button>
        <div>{day_convert[week[3].getDay()]}, {week[3].getDate()} {month_convert[week[3].getMonth()]} {week[3].getFullYear()}</div>
        <div>{this.state.Four}</div>
        <input type="text" value={this.state.hours_four} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeFour}/>
        <button onClick={this.handleSubmitFour}>add</button>
        <div>{day_convert[week[2].getDay()]}, {week[2].getDate()} {month_convert[week[2].getMonth()]} {week[2].getFullYear()}</div>
        <div>{this.state.Three}</div>
        <input type="text" value={this.state.hours_three} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeThree}/>
        <button onClick={this.handleSubmitThree}>add</button>
        <div>{day_convert[week[1].getDay()]}, {week[1].getDate()} {month_convert[week[1].getMonth()]} {week[1].getFullYear()}</div>
        <div>{this.state.Two}</div>
        <input type="text" value={this.state.hours_two} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeTwo}/>
        <button onClick={this.handleSubmitTwo}>add</button>
        <div>{day_convert[week[0].getDay()]}, {week[0].getDate()} {month_convert[week[0].getMonth()]} {week[0].getFullYear()}</div>
        <div>{this.state.One}</div>
        <input type="text" value={this.state.hours_one} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeOne}/>
        <button onClick={this.handleSubmitOne}>add</button>
        </>
    );
    }
}

export default SleepTracker;