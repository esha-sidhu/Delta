import React, {useEffect, useState} from 'react';

function ToDoList()
{
    const [todoitems, setToDoItems] = useState([]);

    async function handleTask() 
    {
        let val = document.getElementById("taskValue").value;
        setToDoItems(val);
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
                    <label for="itemAdditionPrompt">Add a task here:</label>
                    <input type="text" size="20" id="taskValue" placeholder="To-Do" name="taskValue"></input>
                    <button onClick={handleTask}>Add</button>
                </div>
            </div>
            <div>
                {todoitems}
            </div>
        </div>
    );

}

export default ToDoList;

