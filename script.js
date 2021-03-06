const btnModal = document.querySelector(".btn-add");
const modal = document.querySelector(".modal-fill-data");
const btnAdd = document.querySelector(".submit");
const form = document.querySelector(".modal-fill-data");
const deteleBtn = document.querySelector(".delete-task");
const editStatus = document.querySelector(".edit-status");



if (localStorage.getItem('tasks') !== null) {
	renderData();
}



btnModal.addEventListener("click", ()=>{
	modal.classList.remove("hidden");
	today();
	validationDate();
})
btnAdd.addEventListener('click', (e)=>{
	e.preventDefault();
	addItem();
	form.reset();
	modal.classList.add("hidden");
})
function addItem(){
	const container = document.querySelector(".container");
	const priority = document.querySelector(".priority").value;
	let reminder = document.querySelector(".reminder").value;
	const status = document.querySelector(".status").value;
	const task = {
		description:  document.querySelector(".input-description").value,
		priority,
		reminder,
		status
	}
	saveData(task);
	renderData();
}
function today(){
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const today = String(date.getDate()).padStart(2,'0');
	const datePattern = `${year}-0${month+1}-${today}`
	const reminder = document.querySelector(".reminder").value = datePattern;
	return reminder;
}

function validationDate(){
	let hoy = today();
	reminder.addEventListener('change', ()=>{
		let reminder = document.querySelector(".reminder");
		reminder = reminder.value;
		let day = reminder.slice(8);
		let dayToday = hoy.slice(8);
		let month = reminder.slice(5,7);
		let monthToday = hoy.slice(5,7);
		let year = reminder.slice(0,4);
		let yearToday = hoy.slice(0,4);
		let count = 0;
		if (year < yearToday) {
			reminder.value = today();
		}else{
			count++;
		}
		if (day < dayToday && yearToday > 2020){
			reminder.value = today();
		}else{
			count++;
		}
		if (month < monthToday && yearToday > 2020) {
			reminder.value = today();
		}else{
			count++;
		}
		if (count < 3 ) {
			alert("Ingrese una fecha válida");
		}
	});
}
//Hacer funcion para guardar el item en el LS
function saveData(text){
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.push(text);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderData(){
	const tableBody = document.querySelector(".body-table");
	tableBody.innerHTML = "";
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(task => {
		const row = `<tr>
			<td class="td">${task.description}</td>
			<td class="td">${task.priority}</td>
			<td class="td">${task.status}</td>
			<td class="td">${task.reminder}</td>
			<td class="td"><input type="checkbox" class="checkbox" ></td>

		</tr>`
		document.querySelector(".body-table").insertAdjacentHTML('beforeend', row);
	});
}



const table = document.querySelector("#table");

	table.addEventListener('click', (e)=>{
		const action = e.target;
		let taskName = "";
	  	taskName = action.parentElement.parentElement.firstElementChild.textContent;
  		//localStorage.removeItem(taskName);
  		console.log(taskName);

  		if (deteleBtn.disabled == false) {
  			deteleBtn.disabled = true;
  			editStatus.disabled = true;
  		}else{
  			deteleBtn.disabled = false;
  			editStatus.disabled = false;
  		}
  		deteleBtn.addEventListener('click', ()=>{
			deleteTask(taskName);
		});
		editStatus.addEventListener('click', ()=>{
			changeStatus(taskName);
		});
	});




function deleteTask(taskName){
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	console.log(tasks);
	console.log("este es el taskName " + taskName );
	tasks = tasks.filter(task => task.description !== taskName);
		console.log(tasks);
	localStorage.clear();
		tasks.forEach(task => {
			saveData(task);
		});
	if (localStorage.getItem('tasks') !== null) {
		renderData();
	}else{
		const tableBody = document.querySelector(".body-table");
		tableBody.innerHTML = "";
	}
	taskName = "";
	document.querySelector(".delete-task").disabled = true;
  	document.querySelector(".edit-status").disabled = true;
	//console.log("programa terminado");
}
	

function changeStatus(taskName){
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	let task = tasks.filter(task => task.description === taskName);
	document.querySelector(".modal-to-change-status").classList.remove("hidden");
	const newStatus = document.querySelector("#change-status");
	newStatus.addEventListener('change', ()=>{
		task[0].status = document.querySelector("#change-status").value;
		//Tengo que hacer un push a tasks y meterle la task que saqué
		//tasks.push(task[0]);
		localStorage.clear();
		tasks.forEach(task => {
			saveData(task);
		});
		if (localStorage.getItem('tasks') !== null) {
		renderData();
		}else{
			const tableBody = document.querySelector(".body-table");
			tableBody.innerHTML = "";
		}
		document.querySelector(".modal-to-change-status").classList.add("hidden");
	});
	taskName = "";
	document.querySelector(".delete-task").disabled = true;
  	document.querySelector(".edit-status").disabled = true;
}

const searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener('click', ()=>{
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	let nameTask = document.querySelector("#search-input").value.toLowerCase();
	searchTask(tasks,nameTask);
});
function searchTask(tasks,nameTask){
	let task = tasks.filter(task => task.description.toLowerCase().includes(nameTask));
	console.log(task);
}