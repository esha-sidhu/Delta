import React from 'react';
import {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} from 'firebase/firestore';
import {database, author} from '../../firebase';
import {Link} from "react-router-dom";
import '../../styles/sleeptrackerstyle.css'
import Navigation from '../shared/navbar'

const week = [new Date()]
week[0].setHours(0, 0, 0, 0);

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    previous.setHours(0, 0, 0, 0);
    week.push(previous)
  }

getPreviousDay(week[0]);
getPreviousDay(week[1]);
getPreviousDay(week[2]);
getPreviousDay(week[3]);
getPreviousDay(week[4]);
getPreviousDay(week[5]);

const day_convert = {0 : 'Sunday', 1 : 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4 : 'Thursday', 5 : 'Friday', 6 : 'Saturday'};
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

    componentDidMount()
    {
        const retrieveSleepData = async () => {
            if (author.currentUser === null)
            {
                window.location.assign("/");
            }

            let userAndDate = author.currentUser.uid + `${day_convert[week[0].getDay()]}, ${week[0].getDate()} ${month_convert[week[0].getMonth()]} ${week[0].getFullYear()}`;
            let sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            let sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({One: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({One: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[1].getDay()]}, ${week[1].getDate()} ${month_convert[week[1].getMonth()]} ${week[1].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Two: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Two: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[2].getDay()]}, ${week[2].getDate()} ${month_convert[week[2].getMonth()]} ${week[2].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Three: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Three: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[3].getDay()]}, ${week[3].getDate()} ${month_convert[week[3].getMonth()]} ${week[3].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Four: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Four: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[4].getDay()]}, ${week[4].getDate()} ${month_convert[week[4].getMonth()]} ${week[4].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Five: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Five: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[5].getDay()]}, ${week[5].getDate()} ${month_convert[week[5].getMonth()]} ${week[5].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Six: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Six: 0});
            };

            userAndDate = author.currentUser.uid + `${day_convert[week[6].getDay()]}, ${week[6].getDate()} ${month_convert[week[6].getMonth()]} ${week[6].getFullYear()}`;
            sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
            sleepQRes = await getDocs(sleepQ);
            if (sleepQRes.docs.length !== 0)
            {
                this.setState({Seven: sleepQRes.docs[0]._document.data.value.mapValue.fields.value.integerValue});
            }
            else
            {
                this.setState({Seven: 0});
            };
        }

        retrieveSleepData();
    }

    async saveSleepData(c, dateNum)
    {
        const userAndDate = author.currentUser.uid + `${day_convert[week[dateNum].getDay()]}, ${week[dateNum].getDate()} ${month_convert[week[dateNum].getMonth()]} ${week[dateNum].getFullYear()}`;
        const sleepQ = query(collection(database, "sleepData"), where("userDateSearch", "==", userAndDate));
        const sleepQRes = await getDocs(sleepQ);
        if (sleepQRes.docs.length !== 0)
        {
            const sleepID = sleepQRes.docs[0].id;
            const trackerToUpdate = doc(getFirestore(), "sleepData", sleepID);
            await updateDoc(trackerToUpdate, {value: c});
        }
        else
        {
            await addDoc (collection(database, "sleepData"), {
                authorName: author.currentUser.displayName, 
                authorID: author.currentUser.uid, 
                date: week[dateNum],
                dateStr: `${day_convert[week[dateNum].getDay()]}, ${week[dateNum].getDate()} ${month_convert[week[dateNum].getMonth()]} ${week[dateNum].getFullYear()}`,
                value: c,
                userDateSearch: userAndDate
            }
            );
        }
    }

    handleChangeOne(event) {
            this.setState({hours_one: event.target.value},);
    }
    handleSubmitOne() {
        if(this.state.hours_one > 0 && this.state.hours_one <= 24 && this.state.hours_one % 1 === 0)
        {
            this.setState({One: this.state.hours_one/1, hours_one: ''}, () => this.saveSleepData(this.state.One, 0));
        }
    }


     handleChangeTwo(event) {
        this.setState({hours_two: event.target.value},);
    }
    handleSubmitTwo() {
        if(this.state.hours_two > 0 && this.state.hours_two <= 24 && this.state.hours_two % 1 === 0)
        {
            this.setState({Two: this.state.hours_two/1, hours_two: ''}, () => this.saveSleepData(this.state.Two, 1));
        }
    }


    handleChangeThree(event) {
        this.setState({hours_three: event.target.value},);
    }
    handleSubmitThree() {
        if(this.state.hours_three > 0 && this.state.hours_three <= 24 && this.state.hours_three % 1 === 0)
        {
            this.setState({Three: this.state.hours_three/1, hours_three: ''}, () => this.saveSleepData(this.state.Three, 2));
        }
    }


    handleChangeFour(event) {
        this.setState({hours_four: event.target.value},);
    }
    handleSubmitFour() {
        if(this.state.hours_four > 0 && this.state.hours_four <= 24 && this.state.hours_four % 1 === 0)
        {
            this.setState({Four: this.state.hours_four/1, hours_four: ''}, () => this.saveSleepData(this.state.Four, 3));
        }
    }


    handleChangeFive(event) {
        this.setState({hours_five: event.target.value},);
    }
    handleSubmitFive() {
        if(this.state.hours_five > 0 && this.state.hours_five <= 24 && this.state.hours_five % 1 === 0)
        {
            this.setState({Five: this.state.hours_five/1, hours_five: ''}, () => this.saveSleepData(this.state.Five, 4));
        }
    }


    handleChangeSix(event) {
        this.setState({hours_six: event.target.value},);
    }
    handleSubmitSix() {
        if(this.state.hours_six > 0 && this.state.hours_six <= 24 && this.state.hours_six % 1 === 0)
        {
            this.setState({Six: this.state.hours_six/1, hours_six: ''}, () => this.saveSleepData(this.state.Six, 5));
        }
    }


    handleChangeSeven(event) {
        this.setState({hours_seven: event.target.value},);
      }
    
    handleSubmitSeven() {
        if(this.state.hours_seven > 0 && this.state.hours_seven <= 24 && this.state.hours_seven % 1 === 0)
        {
            this.setState({Seven: this.state.hours_seven/1, hours_seven: ''}, () => this.saveSleepData(this.state.Seven, 6));
        }
    }

    render() {
        return (
        <div className='page' style={{width: '100vw'}}>
        <Navigation/>
        <div className='wrap-top'>
        <div className='title'>Sleep Tracker</div>
        <Link className='a' to="/SleepTrackerSearch">Search Past Entries</Link>
        </div>
        <br/>
        <br/>
        <div className='wrap'>
            
        <div className='box'>
        <div className='date'>{day_convert[week[0].getDay()]}, {week[0].getDate()} {month_convert[week[0].getMonth()]} {week[0].getFullYear()}</div>
        <div className='hour'>{this.state.One} hours</div>
        <input className='input' type="text" value={this.state.hours_one} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeOne}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitOne}>Log</button>
        </div>

        <div className='box' style={{marginLeft: "2%", marginBottom: "5%"}}>
        <div className='date'>{day_convert[week[1].getDay()]}, {week[1].getDate()} {month_convert[week[1].getMonth()]} {week[1].getFullYear()}</div>
        <div className='hour'>{this.state.Two} hours</div>
        <input className='input' type="text" value={this.state.hours_two} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeTwo}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitTwo}>Log</button>
        </div>

        <div className='box'>
        <div className='date'>{day_convert[week[2].getDay()]}, {week[2].getDate()} {month_convert[week[2].getMonth()]} {week[2].getFullYear()}</div>
        <div className='hour'>{this.state.Three} hours</div>
        <input className='input' type="text" value={this.state.hours_three} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeThree}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitThree}>Log</button>
        </div>

        </div>

        <div className='wrap'>

        <div className='box'>
        <div className='date'>{day_convert[week[3].getDay()]}, {week[3].getDate()} {month_convert[week[3].getMonth()]} {week[3].getFullYear()}</div>
        <div className='hour'>{this.state.Four} hours</div>
        <input className='input' type="text" value={this.state.hours_four} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeFour}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitFour}>Log</button>
        </div>

        <div className='box'>
        <div className='date'>{day_convert[week[4].getDay()]}, {week[4].getDate()} {month_convert[week[4].getMonth()]} {week[4].getFullYear()}</div>
        <div className='hour'>{this.state.Five} hours</div>
        <input className='input' type="text" value={this.state.hours_five} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeFive}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitFive}>Log</button>
        </div>

        <div className='box'>
        <div className='date'>{day_convert[week[5].getDay()]}, {week[5].getDate()} {month_convert[week[5].getMonth()]} {week[5].getFullYear()}</div>
        <div className='hour'>{this.state.Six} hours</div>
        <input className='input' type="text" value={this.state.hours_six} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeSix}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitSix}>Log</button>
        </div>

        </div>


        <div className='wrap-two'>

        <div className='box'> 
        <div className='date'>{day_convert[week[6].getDay()]}, {week[6].getDate()} {month_convert[week[6].getMonth()]} {week[6].getFullYear()}</div>
        <div className='hour'>{this.state.Seven} hours</div>
        <input className='input' type="text" value={this.state.hours_seven} placeholder={'enter a whole number between 0 and 24'} size="35" onChange={this.handleChangeSeven}/>
        <br/>
        <br/>
        <button className='button' onClick={this.handleSubmitSeven}>Log</button>
        </div>

        </div>
        
        </div>
    );
    }
}

export {day_convert, month_convert};
export default SleepTracker;