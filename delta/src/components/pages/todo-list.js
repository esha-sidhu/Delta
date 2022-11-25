import React, {useEffect, useState} from 'react';


function ToDoList()
{
    const [todoitems, setToDoItems] = useState([]);
    const taskCount = useState(0);
    const taskMax = 10;


    function handleTask()
    {
        let val = document.getElementById("taskValue").value;
        let tempTodoitems = [];
        
        if (todoitems.includes(val) === false && val !== '') {
            for (let i = 0; i < todoitems.length; i++)
            {
                tempTodoitems.push(todoitems[i]);
            }
            tempTodoitems.push(val);
            setToDoItems(tempTodoitems); 
            console.log(todoitems);
        }
        document.getElementById("taskValue").value = ''; 
    }

    function handleDelete(val)
    {
        // TODO: fix bug where X button doesn't render button click until second press
        // explanation: this only happens when the user first enters an element. Once the
        // element is added, any X button click will not be registered but any other
        // button click after that does (so only the very very first button click after adding
        // a new item won't get registered, weird huh)

        // this is also a bug with the list because when an item is added, the console
        // log doesn't get the updated list until the next action is made (which is weird
        // because the list on the website visually does get updated)

        var copiedList = [];
        const indexOfClick = todoitems.indexOf(val);

        for (let i = 0; i < todoitems.length; i++)
        {
            if (i !== indexOfClick)
            {
                copiedList.push(todoitems[i]);
            }
            console.log(copiedList);
            setToDoItems(copiedList);
        }

        console.log(val);
        console.log(todoitems.includes(val));
        
        // idea: implement by making there max of 10 buttons and then
        // just index the value with the button's
    }


    return (
        <div>
            <div>
                <br></br>
                <font size="6">
                    To-Do List! 
                </font>
                <font size="3">
                    <br></br><br></br>
                    You're doing amazing! 
                    <br></br>
                    Keep trying your best today ʕ•ᴥ•ʔ
                    <br></br> 
                </font>
                <font size="1">
                    Only add up to 10 items to help with stress management.
                    <br></br><br></br>
                </font>
                <div id="newItem">
                    <label>Add a task here:</label>
                    <input type="text" size="20" id="taskValue" placeholder="To-Do" name="taskValue"></input>
                    <button onClick={handleTask}>Add</button>
                </div>
            </div>
            <ol>
                {todoitems.map((val) => {
                    return (
                        <div key={val}>
                            <input type="checkbox"></input>
                            {val} &ensp;
                            <button type="button" onClick={() => handleDelete(val)}> X </button>
                        </div>
                    );
                })}
            </ol>
        </div>
    );

}

export default ToDoList; 