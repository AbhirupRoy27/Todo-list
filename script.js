document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
// Load tasks from localStorage when page loads
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task.text);
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
        updateEmptyState();
    }
// Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function updateEmptyState() {
        emptyState.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }
function createTaskElement(taskText) {
        const li = document.createElement('li');
        
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        li.appendChild(taskContent);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        
        li.addEventListener('click', function(e) {
            if (e.target !== removeBtn && e.target !== removeBtn.querySelector('i')) {
                li.classList.toggle('completed');
                // Add animation class
                li.classList.add('task-toggle');
                setTimeout(() => li.classList.remove('task-toggle'), 300);
                saveTasks(); // Save when task is toggled
            }
        });
