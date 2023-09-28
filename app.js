// global hash set to maintain id's
const idRecord = {};

// for testing

console.log(idRecord);

// creating class Task for task object
class Task
{
    // constructor
    constructor(taskId,taskName,startDate,endDate,status)
    {
        this._taskId = taskId;
        this._taskName = taskName
        this._startDate = new Date(startDate);
        this._endDate = new Date(endDate);
        this._status = status;
    }

    // getter methods // useful while displaying data
    get taskId()
    {
        return this._taskId;
    }

    get taskName()
    {
        return this._taskName;
    }

    get startDate()
    {
        return `${this._startDate.getDate()}/${this._startDate.getMonth()}/${this._startDate.getFullYear()}`;
    }

    get endDate()
    {
        return `${this._endDate.getDate()}/${this._endDate.getMonth()}/${this._endDate.getFullYear()}`;
    }

    get status()
    {
        return this._status;
    }


    // setter methods // usefull while editing data
    set taskId(id)
    {
        this._taskId = id;
    }

    set taskName(newName)
    {
        this._taskName = newName;
    }

    set startDate(newDate)
    {
        this._startDate = new Date(newDate);
    }

    set endDate(newDate)
    {
        this._endDate = new Date(newDate);
    }

    set status(newStatus)
    {
        this._status = newStatus;
    }

}

// array to instances/objects of Task class
let taskList = [];

taskList.push(new Task(1,"Play Basketball","2015-03-25","2015-03-26","pending"));
taskList.push(new Task(2,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(3,"Play Basketball","2015-03-25","2015-03-26","pending"));
taskList.push(new Task(4,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(5,"Play Basketball","2015-03-25","2015-03-26","pending"));
taskList.push(new Task(6,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(7,"Play Basketball","2015-03-25","2015-03-26","pending"));
taskList.push(new Task(8,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(9,"Play Basketball","2015-03-25","2015-03-26","pending"));
taskList.push(new Task(10,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(11,"Play Football","2015-03-25","2015-03-26","completed"));
taskList.push(new Task(12,"Play Basketball","2015-03-25","2015-03-26","pending"));

// taskList.push(new Task(8,"Play Football","2015-03-25","2015-03-26","completed"));

console.log(taskList);

// clears error messages
function clearErrors()
{
    const errors = document.getElementsByClassName("error");
    
    for(let i = 0; i < errors.length; i++)
        errors[i].innerText = "";
}

// set Error message functions
// sets error message for id
function setIdError(error)
{
    const element = document.getElementById("taskIdError");
    element.innerText = error;
}

// sets error message for task-name
function setTaskNameError(error)
{
    const element = document.getElementById("taskNameError");
    element.innerText = error;
}

// sets error message for start-date
function setStartDateError(error)
{
    const element = document.getElementById("startDateError");
    element.innerText = error;
}

// sets error message for end-date
function setEndDateError(error)
{
    const element = document.getElementById("endDateError");
    element.innerText = error;
}

function setStatusError(error)
{
    const element = document.getElementById("statusError");
    element.innerText = error;
}


// function to set select elements
function setSelectElements(startDate,endDate)
{
    let cDate = new Date();
    let sdate = new Date(startDate.value);
    let eDate = new Date(endDate.value);
    const select = document.getElementById("status");

    if((startDate.value && endDate.value) && sdate < eDate)
    {
        

        if(cDate >= sdate && cDate <= eDate)
        {
            let str = `<option value="PENDING">PENDING</option>
            <option value="IN-PROGRESS">IN-PROGRESS</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="COMPLETED">COMPLETED</option>`
            select.innerHTML = str;
        }
        else if(cDate > eDate)
        {
            let str = `<option value="PENDING">PENDING</option>
            <option value="DUEPASSED">DUEPASSED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="COMPLETED">COMPLETED</option>`
            select.innerHTML = str;
        }
        else
        {
            let str = `<option value="PENDING">PENDING</option>
            <option value="IN-PROGRESS">IN-PROGRESS</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="COMPLETED">COMPLETED</option>`
            select.innerHTML = str;
        }
    }
}

// validation functions
// 1. function for checking empty field
function checkEmptyField(taskId,taskName,startDate,endDate,status)
{
    let flag = true;

    if(!taskId.value.trim())
    {   
        flag = false;
        setIdError("Task Id is required");
    }

    if(!taskName.value.trim())
    {
        flag = false;
        setTaskNameError("Task Name is required");
    }

    if(!startDate.value)
    {
        flag = false;
        setStartDateError("Start-date is required");
    }

    if(!endDate.value)
    {
        flag = false;
        setEndDateError("End-date is required");
    }

    if(!status.value)
    {
        setStatusError("Status is required");
    }

    // if all fields are filled returns true else false;
    return flag;
}

// 2. function for checking taskID (once a id is used it cannot be used)
function checkTaskId(taskId)
{
    if(taskId.value in idRecord)
    {
        setIdError("Entered Task ID is alerady used");
        return false;
    }

    return true;
}

// 3. function for checking taskname (taskname shoulg consist of only alphabets);
function checkTaskName(taskName)
{
    let name = taskName.value.trim();
    name = name.toLowerCase();

    for(let i = 0; i < name.length; i++)
    {
        if(name[i] == " ")
            continue;

        if(!(name[i] >= "a" && name[i] <= "z"))
        {
            setTaskNameError("Task Name should consist of only alphabets");
            return false;
        }
    }

    // if taskname is valid returns true;
    return true;
}

// 4. function for checking start date validation
function checkStartDate()
{
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    let s = new Date(startDate.value);
    let e = new Date(endDate.value);

    if(endDate.value)
    {
        if(s >= e)
        {
            setStartDateError("Start-Date must be less than End-date");
            setEndDateError("");
            return;
        }
    }

    setStartDateError("");
    setEndDateError("");

    setSelectElements(startDate,endDate);
}

// 5. function for checking end date validation
function checkEndDate()
{
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    let s = new Date(startDate.value);
    let e = new Date(endDate.value);

    if(startDate.value)
    {
        if(s >= e)
        {
            setEndDateError("End-date must be greater than Start-date");
            setStartDateError("");
            return;
        }
    }

    setStartDateError("");
    setEndDateError("");

    setSelectElements(startDate,endDate);
}

// validation for start date
const startDate = document.getElementById("start-date");
startDate.addEventListener("change",checkStartDate);

// validation for end date
const endDate = document.getElementById("end-date");
endDate.addEventListener("change",checkEndDate);

// Complete validation function which returns true if all validatins are cleared else return false;
function validation(taskId,taskName,startDate,endDate,status)
{
    checkEmptyField(taskId,taskName,startDate,endDate,status);
    checkTaskId(taskId);
    checkTaskName(taskName);

    const errors = document.getElementsByClassName("error");

    let flag = true;
    // checks whether every error message is blank or not. if all are blanks means no error then return true
    for(let i = 0; i < errors.length; i++)
    {
        if(errors[i].innerText != "")
            flag = false;
    
    }

    return flag;
}

// function to display data

function showData()
{
    console.log("Showing data");
    const tbody = document.getElementById("table-body");

    // to clear html content before displaying (if not don same values will be displayed)
    tbody.innerHTML = "";
    for(let i = 0; i < taskList.length; i++)
    {
        const row = document.createElement("tr");
        
        let cell = document.createElement("td");
        let cellText = document.createTextNode(`${taskList[i].taskId}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(`${taskList[i].taskName}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(`${taskList[i].startDate}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(`${taskList[i].endDate}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(`${taskList[i].status}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = `<button class = "fa fa-edit" style="width:25px; height:25px;"></button> <button style="width:25px; height:25px;" class = "fa fa-trash" onclick="deleteTask(${taskList[i].taskId})"></button>`;
        row.appendChild(cell);

        tbody.appendChild(row);
    }

}

// function to delete a task from task List
function deleteTask(id)
{
    // add dialog message here which confirms to delete a task or not

    // filter method to filter the task list array
    taskList = taskList.filter((task) => {
        return task.taskId != id;
    })

    console.log(taskList);
    showData();
}

showData();

// function to add task in list
function addTask()
{
    clearErrors();

    let taskId,taskName,startDate,endDate,status;

    taskId = document.getElementById("taskId");
    taskName = document.getElementById("taskName");
    startDate = document.getElementById("start-date");
    endDate = document.getElementById("end-date");
    status = document.getElementById("status");

    

    // check validations
    // if validation function returns true following code will be invoked else not
    if(validation(taskId,taskName,startDate,endDate,status))
    {

        console.log("Data is addded");

        // mapping the task id
        idRecord[taskId.value] = null;

        // creating new task object
        const task = new Task(taskId.value,taskName.value,startDate.value,endDate.value,status.value);

        // adding it to task list array
        taskList.push(task);

        // reseting input boxes
        taskId.value = taskName.value = startDate.value = endDate.value = status.value = null;

        // once the task is added it must be displayed in table so show data is used
        showData();
    }
    
    // testing
    // console.log(taskList);
    // console.log(idRecord);
}

// event listener to add task button
const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click",addTask);



// testing code for dashboard
// const b = document.getElementById("dash");
// b.addEventListener("click",()=> {
//     const container = document.getElementById("addTaskContainer");
//     console.log(container);

//     if(container.style.display != "none")
//         container.style.display = "none";
//     else
//         container.style.display = "flex";
// })

// Testing code
// addTask(1,"Play Basketball","2015-03-25","2015-03-26","pending");
// addTask(2,"Play Football","2015-03-25","2015-03-26","completed");

// console.log(taskList);
// console.log(idRecord);
















// const element = document.getElementById("date");
// const button = document.querySelector("#send");
// console.log(element);
// console.log(button);

// let date;

// button.addEventListener("click",()=>
// {
//     date = new Date(element.value);
//     console.log(date.getDate(),date.getMonth(),date.getFullYear());
// });