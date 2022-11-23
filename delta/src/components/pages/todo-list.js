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
        
        if (todoitems.includes(val) === false) {
            for (let i = 0; i < todoitems.length; i++)
            {
                tempTodoitems.push(todoitems[i]);
            }
            tempTodoitems.push(val);
            setToDoItems(tempTodoitems); 
        }
        document.getElementById("taskValue").value = ''; 
        console.log(todoitems);
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
                            {val}
                        </div>
                    );
                })}
            </ol>
        </div>
    );

}

export default ToDoList; 