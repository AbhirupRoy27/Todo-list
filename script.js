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
    removeBtn.addEventListener('click', function() {
            li.classList.add('remove-animation');
            setTimeout(() => {
                li.remove();
                updateEmptyState();
                saveTasks(); // Save when task is removed
            }, 300);
        });

        li.appendChild(removeBtn);
        return li;
    }
    
addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            taskInput.classList.add('shake');
            setTimeout(() => taskInput.classList.remove('shake'), 500);
            return;
        }

        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = '';
        updateEmptyState();
        saveTasks(); // Save when new task is added

        // Add appear animation
        li.style.opacity = '0';
        li.style.transform = 'translateY(20px)';
        setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateY(0)';
        }, 50);
    });
