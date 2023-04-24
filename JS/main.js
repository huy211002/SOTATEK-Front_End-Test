// Lấy thẻ input và gắn sự kiện onchange
var dateInput = document.getElementById("date");
dateInput.addEventListener("change", function () {
    // Lấy giá trị ngày được chọn
    var selectedDate = dateInput.value;
    if (selectedDate < today) {
        // Nếu ngày được chọn là ngày trong quá khứ, hiển thị thông báo
        alert("Please select a date that is not in the past.");
        dateInput.value = today; // Reset lại giá trị ngày thành ngày hiện tại
    }
});

//render ra todolist
var tasks = [];

// Kiểm tra nếu LocalStorage có chứa dữ liệu
console.log(localStorage.getItem('tasks'));
if (localStorage.getItem('tasks') !== null) {
    // Lấy dữ liệu từ LocalStorage và xử lý
    var taskLocal = JSON.parse(localStorage.getItem('tasks'));
    // Gọi hàm hiển thị danh sách công việc
    show(taskLocal);
} else {
    // Nếu LocalStorage không có dữ liệu, khởi tạo một mảng rỗng và lưu vào LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
show(taskLocal);

function addTask() {
    //get value
    let taskName = document.querySelector('.taskname').value
    let taskDescription = document.querySelector('#desc').value
    let taskDate = document.querySelector('#date').value
    let taskPriority = document.querySelector('select').value

    //add in new task
    var task = {
        'name': taskName,
        'description': taskDescription,
        'date': taskDate,
        'priority': taskPriority
    };
    if (taskName !== '') {
        taskLocal.push(task)
        localStorage.setItem('tasks', JSON.stringify(taskLocal))
    }

    //render
    showTask(taskLocal);
}

function show(taskLocal) {
    let list = '';
    taskLocal.map((task, index) => {
        // var taskJSONIdex = JSON.priority(task[index]);
        // console.log(taskJSONIdex);
        list += `
                    <div class="d-flex justify-content-between" style="border: 1px solid black; padding: 10px; margin-top: 5px">
                        <input type="checkbox" class="check" style="width: 4%">
                        <span class="todo-task taskname w-25" style="font-size: 20px;">${task.name}</span>
                        <button class="btn btn-info w-25 justify-content-end" onClick="detailTask('${index}')">Detail</button>
                        <button class="btn btn-danger w-25" onClick="removeTask(${index})">Remove</button>
                    </div>
                `;
    })
    document.querySelector('.todo-task').innerHTML = list;
}

function removeTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Xóa task ở vị trí index khỏi mảng tasks
        taskLocal.splice(index, 1);
        // Cập nhật lại localStorage
        localStorage.setItem('tasks', JSON.stringify(taskLocal));
        // Render lại danh sách task
        show(taskLocal);
    }

}


function detailTask(index) {
    let task = taskLocal[index];
    let taskName = task.name;
    let taskDescription = task.description;
    let taskDate = task.date;
    let taskPriority = task.priority;
    let detail = '';
    detail += `
    <form>
                <input style="margin: 2px" type="text" required value="${taskName}" placeholder="Edit name task..." class="w-100 taskname">
                <label for="desc" class="fw-bolder">Description</label>
                <textarea name="desc" id="desc" class="w-100" rows="3">${taskDescription}</textarea>
                <div class="row">
                    <div class="taskdate col-5">
                        <label for="date" class="fw-bolder">Due Date</label>
                        <input class="w-100" type="date" name="datetime" value="${taskDate}" id="date">
                    </div>
                    <div class="taskpriority offset-2 col-5 ">
                        <label for="priority" class="fw-bolder">Priority</label>
                        <br>
                        <select class="w-100" id="priority">
                            <option value="low" ${taskPriority === "low" ? "selected" : ""}>low</option>
                            <option value="normal" ${taskPriority === "normal" ? "selected" : ""}>normal</option>
                            <option value="high" ${taskPriority === "high" ? "selected" : ""}>high</option>
                        </select>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button type="button" class="btn btn-success w-100" onClick="updateTask(${index})">Update</button>
                </div>
                </form>
                `;
    document.querySelector('.todo-detail').innerHTML = detail;
}

function search() {
    let txtSearch = document.querySelector('.search').value;
    let taskFound = taskLocal.filter((task) => {
        return task.name.toLowerCase().includes(txtSearch.toLowerCase());
    })
    if (taskFound.length > 0) {
        show(taskFound);
    } else {
        document.querySelector('.todo-task').innerHTML = '<h3 class="not-found text-center">Not Found</h3>';
    }
}

function detailTask(index) {
    let task = taskLocal[index];
    let taskName = task.name;
    let taskDescription = task.description;
    let taskDate = task.date;
    let taskPriority = task.priority;
    let detail = '';
    detail += `
    <form>
                <input style="margin: 2px" type="text" required value="${taskName}" placeholder="Edit name task..." class="w-100 taskname">
                <label for="desc" class="fw-bolder">Description</label>
                <textarea name="desc" id="desc" class="w-100" rows="3">${taskDescription}</textarea>
                <div class="row">
                    <div class="taskdate col-5">
                        <label for="date" class="fw-bolder">Due Date</label>
                        <input class="w-100" type="date" name="datetime" value="${taskDate}" id="date">
                    </div>
                    <div class="taskpriority offset-2 col-5 ">
                        <label for="priority" class="fw-bolder">Priority</label>
                        <br>
                        <select class="w-100" id="priority">
                            <option value="low" ${taskPriority === "low" ? "selected" : ""}>low</option>
                            <option value="normal" ${taskPriority === "normal" ? "selected" : ""}>normal</option>
                            <option value="high" ${taskPriority === "high" ? "selected" : ""}>high</option>
                        </select>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button type="button" class="btn btn-success w-100" onClick="updateTask(${index})">Update</button>
                </div>
                </form>
                `;
    document.querySelector('.todo-detail').innerHTML = detail;
}

function search() {
    let txtSearch = document.querySelector('.search').value;
    let taskFound = taskLocal.filter((task) => {
        return task.name.toLowerCase().includes(txtSearch.toLowerCase());
    })
    if (taskFound.length > 0) {
        show(taskFound);
    } else {
        document.querySelector('.todo-task').innerHTML = '<h3 class="not-found text-center">Not Found</h3>';
    }
}
function updateTask(index) {
    var taskName = document.querySelector('.taskname').value
    var taskDescription = document.querySelector('#desc').value
    console.log(taskName);
    var taskDate = document.querySelector('#date').value
    var taskPriority = document.querySelector('select').value
    var taskUpdate = taskLocal[index];
    console.log(taskUpdate);
    taskUpdate.name = taskName;
    taskUpdate.description = taskDescription;
    taskUpdate.date = taskDate;
    taskUpdate.priority = taskPriority;
    // taskLocal.splice(index, 1);
    // taskLocal.push(taskUpdate);
    // show(taskLocal);
    show(taskLocal);
}
var checkbox = document.querySelector('.check');
var ischecked = checkbox.checked;
console.log(ischecked);