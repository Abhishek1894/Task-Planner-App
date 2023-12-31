// global object to maintain id's
const idRecord = {};

// for testing
// idRecord['1'] = null;
// idRecord['2'] = null;
// idRecord['3'] = null;

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
        return `${this._startDate.getDate()}/${this._startDate.getMonth() + 1}/${this._startDate.getFullYear()}`;
    }

    get endDate()
    {
        return `${this._endDate.getDate()}/${this._endDate.getMonth() + 1}/${this._endDate.getFullYear()}`;
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

// data for testing
// taskList.push(new Task("1","Complete Homework","2023-10-01","2023-10-07","completed"));
// taskList.push(new Task("2","Complete Login Page","2023-10-01","2023-10-07","pending"));
// taskList.push(new Task("3","Complete Fetch Api task","2023-10-01","2023-10-07","pending"));
// taskList.push(new Task("4","Complete Login Page with Validation","2023-10-01","2023-10-07","completed"));
// taskList.push(new Task("5","Complete Operating System","2023-10-01","2023-10-07","cancelled"));
// taskList.push(new Task("6","Complete JavaScript","2023-10-01","2023-10-07","completed"));
// taskList.push(new Task("7","Complete Python","2023-10-01","2023-10-07","in-progress"));

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
            let str = `<option value="pending">PENDING</option>
            <option value="inprogress">IN-PROGRESS</option>
            <option value="cancelled">CANCELLED</option>
            <option value="completed">COMPLETED</option>`
            select.innerHTML = str;
        }
        else if(cDate > eDate)
        {
            console.log("This is invoked");
            console.log("cdate :",cDate,"endate:",eDate);
            let str = `<option value="pending">PENDING</option>
            <option value="duepassed">DUEPASSED</option>
            <option value="cancelled">CANCELLED</option>
            <option value="completed">COMPLETED</option>`
            select.innerHTML = str;
        }
        else
        {
            let str = `<option value="pending">PENDING</option>
            <option value="inprogress">IN-PROGRESS</option>
            <option value="cancelled">CANCELLED</option>
            <option value="completed">COMPLETED</option>`
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


// 2. function for checking taskID (once a id is used it cannot be used
function checkTaskId(taskId)
{
    if(taskId.value in idRecord)
    {
        setIdError("Entered Task ID is already used");
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
startDate.addEventListener("change",disableEndDate); // event listner for disabling dates samller than start date

// validation for end date
const endDate = document.getElementById("end-date");
endDate.addEventListener("change",checkEndDate);
endDate.addEventListener("change",disableStartDate);

// Complete validation function which returns true if all validatins are cleared else return false;
function validation(taskId,taskName,startDate,endDate,status)
{
    checkEmptyField(taskId,taskName,startDate,endDate,status);
    checkTaskId(taskId);
    checkTaskName(taskName);

    // validation for date when add button is clicked
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


    const errors = document.getElementsByClassName("error");

    let flag = true;
    // checks whether every error message is blank or not. if all are blanks means no error then return true
    for(let i = 0; i < errors.length; i++)
    {
        if(errors[i].innerText != "")
        {
            console.log("validation");
            flag = false;
        }
    
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
        cell.innerHTML = `<button class = "fa fa-edit" style="width:25px; height:25px;" onclick="updateTaskUi(${taskList[i].taskId})"></button> <button style="width:25px; height:25px;" class = "fa fa-trash" onclick="deleteTask(${taskList[i].taskId})"></button>`;
        row.appendChild(cell);

        tbody.appendChild(row);
    }

}

// function to delete a task from task List
function deleteTask(id)
{
    // when delete button is clicked there should not be update task ui
    cancelUpdate();
    
    console.log("Delete Task Invoked for",id);
    // dialog message here which confirms to delete a task or not
    if(confirm("Are you sure you want to delete task ?"))
    {
        // filter method to filter the task list array
        taskList = taskList.filter((task) => {
            return task.taskId != id;
        })

        console.log(taskList);
        showData();
    }
}

// function to update/edit task
function updateTaskUi(id)
{
    clearErrors(); // errors will be refressed

    const taskContainer = document.getElementById("addTaskContainer");
    if(taskContainer.style.display == "none")
        taskContainer.style.display = "flex";

    let taskToBeUpdated;
    taskList.forEach(task => {
        if(task.taskId == id)
            taskToBeUpdated = task;
    });

    console.log(taskToBeUpdated);

    let taskId,taskName,startDate,endDate,status;

    taskId = document.getElementById("taskId");
    taskName = document.getElementById("taskName");
    startDate = document.getElementById("start-date");
    endDate = document.getElementById("end-date");
    status = document.getElementById("status");

    let t = taskToBeUpdated;
    let year;
    let date;
    let month;

    // console.log(`${t._startDate.getDate()}`.length);
    // HERE ID NAME START DATE AND END DATE ARE DISPLAYED WHEN EDIT BUTTON IS CLICKED (bit of complicated)
    if(`${t._startDate.getDate()}`.length === 1)
        date = "0"+t._startDate.getDate();
    else
        date = t._startDate.getDate();

    sm = t._startDate.getMonth() + 1;
    if(`${sm}`.length === 1)
        month = "0"+sm;
    else
        month = sm;

    year = t._startDate.getFullYear();
    let s = `${year}-${month}-${date}`;
    console.log(s);
    startDate.value = s;


    if(`${t._endDate.getDate()}`.length === 1)
        date = "0"+t._endDate.getDate();
    else
        date = t._endDate.getDate();

    em = t._endDate.getMonth() + 1;
    if(`${em}`.length === 1)
        month = "0"+em;
    else
        month = em;

    year = t._startDate.getFullYear();
    let e = `${year}-${month}-${date}`;
    console.log(e);
    endDate.value = e;

    taskId.value = taskToBeUpdated.taskId;
    taskName.value = taskToBeUpdated.taskName;

    status.value = taskToBeUpdated.status;

    // selects status elements based on start date and end data
    setSelectElements(startDate,endDate);

    // apply min max to start date and end date based on start date and end date
    disableEndDate();
    disableStartDate();

    // here we will change the ui to make it for update
    const heading = document.getElementById("addTaskContainer-heading");
    heading.innerText = "Update Task Here";
    const div = document.getElementById("actionButtons");
    div.innerHTML = `<button class = "editBtn" onClick = "updateTask(${id})">Update</button><button class = "editBtn" onClick = "cancelUpdate()">Cancel</button>`;
}

// This function will be invoked when update is cancelled
function cancelUpdate()
{
    const heading = document.getElementById("addTaskContainer-heading");
    heading.innerText = "Add Task Here";

    const div = document.getElementById("actionButtons");
    div.innerHTML = `<button id = "addTaskButton" onClick = "addTask()">Add Task</button>`;

    // sets all input fields to null
    const taskId = document.getElementById("taskId");
    const taskName = document.getElementById("taskName");
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    const status = document.getElementById("status");
    taskId.value = taskName.value = startDate.value = endDate.value = status.value = null;

    // removing min max attribute of start date and end date
    startDate.removeAttribute("max");
    endDate.removeAttribute("min");

    // Clears all errors while cancelling the update of task
    clearErrors();
};

// This function will be invoked when update button is clicked (will perform validation and updates task)
function updateTask(id)
{
    // errors  will be refressed every time update button is clicked
    clearErrors();
    let taskId = document.getElementById("taskId");
    let taskName = document.getElementById("taskName");
    let startDate = document.getElementById("start-date");
    let endDate = document.getElementById("end-date");
    let status = document.getElementById("status");

    // validation of empty field
    checkEmptyField(taskId,taskName,startDate,endDate,status);
    // validation of task name
    checkTaskName(taskName);

    if(!endDate.value)
    {
        setEndDateError("End-date is required");
    }

    if(!startDate.value)
    {
        setStartDateError("Start-date is required");
    }

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

    // validation of taskId
    if(id != taskId.value)
    {
        if(taskId.value in idRecord)
            setIdError("Entered Task ID is alerady used");                
    }

    let flag = true;
    // checks whether every error message is blank or not. if all are blanks means no error then flag will be true
    const errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++)
    {
        if(errors[i].innerText != "")
            flag = false;
    
    }
    
    if(flag)
    {
        // so new all validations are done
        // (IMP) we have to check whether new id assiged or not to task, if new id is assigned then we have to delete previous id and add this new id to id record table 
        if(id != taskId.value)
        {
            delete idRecord[id];
        }

        idRecord[taskId.value] = null;

        for(let i = 0; i < taskList.length; i++)
        {
            if(taskList[i].taskId == id)
            {
                taskList[i] = new Task(taskId.value,taskName.value,startDate.value,endDate.value,status.value);
                console.log("value updated");
                // Invoking alert box to tell user that row is updated
                alert("Task updated successfully");
                // removing min max attribute of start date and end date
                startDate.removeAttribute("max");
                endDate.removeAttribute("min");

                break;
            }
        }

        // once validation and updation is done successfully now its time to show the data
        showData();

        // we also have to change update module to add task module
        const heading = document.getElementById("addTaskContainer-heading");
        heading.innerText = "Add Task Here";
        const div = document.getElementById("actionButtons");
        div.innerHTML = `<button id = "addTaskButton" onClick = "addTask()">Add Task</button>`;

        // once the updation is input field should also be refressed
        taskId.value = taskName.value = startDate.value = endDate.value = status.value = null;
    }
}

// for testing
showData(); // data should be show when user is enterd for first time

// function to add task in list
function addTask()
{
    console.log("Add task Invoked");
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
        
        // removing min max attribute of start date and end date
        startDate.removeAttribute("max");
        endDate.removeAttribute("min");
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

// event listner to display or close
const dashButton = document.querySelector(".dashButton");

// button to close or open the side bar of add task
dashButton.addEventListener("click",sideBar);

function sideBar(){
    const element = document.getElementById("addTaskContainer");
    
    if(element.style.display == "flex")
        element.style.display = "none";
    else
        element.style.display = "flex";
}




let filter = [];
// code for filter;

// function to show the filtered data;
function showFilterData()
{
    const tbody = document.getElementById("table-body");

    // to clear html content before displaying (if not don same values will be displayed)
    tbody.innerHTML = "";
    
    let taskList = filter;

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
        cell.innerHTML = `<button class = "fa fa-edit" style="width:25px; height:25px;" onclick="updateTaskUi(${taskList[i].taskId})"></button> <button style="width:25px; height:25px;" class = "fa fa-trash" onclick="deleteTask(${taskList[i].taskId})"></button>`;
        row.appendChild(cell);

        tbody.appendChild(row);
    }
}


// function to filter data
function filterData()
{
    console.log("filter data invoked")
    const input = document.getElementById("filter-input");

    let value = input.value;

    if(!value)
    {
        alert("Enter some value in filter input box");
        return;
    }

    filter =  taskList.filter((task) => 
    {
        const taskData = `${task.taskId} ${task.taskName} ${task.status}`;
        const lowerValue = value.toLowerCase();
        
        // Check if the input value is included in any part of the task data
        if (taskData.toLowerCase().includes(lowerValue)) 
        {
            return true;
        }

        // check if the input value matches to any date or not
        if(value.includes("/") || value.includes("-"))
        {
            value = value.replaceAll('-','/');
            if(task.startDate.includes(value) || task.endDate.includes(value))
            {
                return true;
            }
        }

        return false;
    });

    showFilterData();
}

// button to filter data and show it on table
const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click",filterData);


// Adding event listner for removing the filter and showing original data
const removeFilter = document.getElementById("remove-filter");
removeFilter.addEventListener("click",()=>{
    const input = document.getElementById("filter-input");
    input.value = null;
    showData();
});

// function to disable certain values of end date
function disableEndDate()
{
    const startDate = document.getElementById("start-date");
    let date = new Date(startDate.value);
    date.setDate(date.getDate() + 1);

    let month = String(date.getMonth() + 1).padStart(2, '0');
    let dat = String(date.getDate()).padStart(2,'0');

    let str = `${date.getFullYear()}-${month}-${dat}`;
    const endDate = document.getElementById("end-date");
    endDate.setAttribute("min",str);
}

function disableStartDate()
{
    const endDate = document.getElementById("end-date");

    let date = new Date(endDate.value);
    date.setDate(date.getDate() - 1);

    let month = String(date.getMonth() + 1).padStart(2, '0');
    let dat = String(date.getDate()).padStart(2,'0');

    let str = `${date.getFullYear()}-${month}-${dat}`;
    const startDate = document.getElementById("start-date");

    startDate.setAttribute("max",str);
}




// below is testing code

// function isValidNumber(str) {
    //     // Use the unary plus operator to convert the string to a number
    //     // and check if it's a finite number (not NaN or Infinity)
    //     return !isNaN(+str) && isFinite(+str);
    // }
    
// function filterByName(name)
// {
//     filter = taskList.filter(element => {
//         return element.taskName.toLowerCase().includes(name.toLowerCase());
//     });
// }

// function filterById(id)
// {
//     filter = taskList.filter(element => {
//         return element.taskId == id;
//     });
// }

// function filterByStatus(taskStatus)
// {
//     filter = taskList.filter(element => {
//         return element.status == taskStatus;
//     });
// }





// let inputed = input.value;

    // if(isValidNumber(inputed))
    // {
    //     console.log("searching for number")
    //     filterById(inputed);
    //     console.log(filter);
    //     showFilterData();
    // }
    // else if(inputed == "pending" || inputed == "in-progress" || inputed == "due-passed" || inputed == "completed" || inputed == "cancelled")
    // {
    //     console.log("searching for status");
    //     filterByStatus(inputed);
    //     showFilterData();
    // }
    // else if(inputed.includes("/") || inputed.includes("-"))
    // {

    // }
    // else
    // {
    //     filterByName(inputed);
    //     showFilterData();
    // }