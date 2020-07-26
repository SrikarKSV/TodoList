// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded', getAllTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
filterTodo.addEventListener('click', filterList);

// Functions
function addTodo(e) {
	e.preventDefault();

	if (todoInput.value) {
		// Create the div
		const newDiv = document.createElement('div');
		newDiv.classList.add('todo');

		// Create the li
		const newLi = document.createElement('li');
		newLi.classList.add('todo-item');
		newLi.innerText = todoInput.value;
		newDiv.appendChild(newLi);

		// Saving to local storage
		saveLocalStorage(todoInput.value);

		// Create MARK button
		const newMarkButton = document.createElement('button');
		newMarkButton.classList.add('complete-btn');
		newMarkButton.innerHTML = '<i class="fas fa-check"></i>';
		newDiv.appendChild(newMarkButton);

		// Create Trash button
		const newTrashButton = document.createElement('button');
		newTrashButton.classList.add('trash-btn');
		newTrashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		newDiv.appendChild(newTrashButton);

		// Append the div to ul
		todoList.appendChild(newDiv);

		todoInput.value = '';
	}
}

function deleteItem(e) {
	let item = e.target;

	// Marking as completed
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	} else if (item.classList[0] === 'trash-btn') {
		// Deleting the item
		const todo = item.parentElement;

		// Deleting from local storage
		text = todo.children[0].innerText;
		deleteFromLocalStorage(text);

		todo.classList.add('fall');
		todo.addEventListener('transitionend', function() {
			todo.remove();
		});
	}
}

function filterList(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalStorage(item) {
	let todo;
	if (localStorage.getItem('todos')) {
		todo = JSON.parse(localStorage.getItem('todos'));
	} else {
		todo = [];
	}

	todo.push(item);
	localStorage.setItem('todos', JSON.stringify(todo));
}

function deleteFromLocalStorage(text) {
	let todo;
	if (localStorage.getItem('todos')) {
		todo = JSON.parse(localStorage.getItem('todos'));
	} else {
		todo = [];
	}

	todo.splice(todo.indexOf(text), 1);
	localStorage.setItem('todos', JSON.stringify(todo));
}

function getAllTodo() {
	let todo;
	if (localStorage.getItem('todos')) {
		todo = JSON.parse(localStorage.getItem('todos'));
	} else {
		todo = [];
	}

	todo.forEach(function(item) {
		// Create the div
		const newDiv = document.createElement('div');
		newDiv.classList.add('todo');

		// Create the li
		const newLi = document.createElement('li');
		newLi.classList.add('todo-item');
		newLi.innerText = item;
		newDiv.appendChild(newLi);

		// Create MARK button
		const newMarkButton = document.createElement('button');
		newMarkButton.classList.add('complete-btn');
		newMarkButton.innerHTML = '<i class="fas fa-check"></i>';
		newDiv.appendChild(newMarkButton);

		// Create Trash button
		const newTrashButton = document.createElement('button');
		newTrashButton.classList.add('trash-btn');
		newTrashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		newDiv.appendChild(newTrashButton);

		// Append the div to ul
		todoList.appendChild(newDiv);
	});
}
