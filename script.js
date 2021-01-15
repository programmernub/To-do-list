const btnModal = document.querySelector(".btn-add");
const modal = document.querySelector(".modal-fill-data");
const btnAdd = document.querySelector(".submit");
const form = document.querySelector(".modal-fill-data");
const deteleBtn = document.querySelector(".delete-task");
renderData();
deteleBtn.addEventListener('click', ()=>{
	deleteTask();
});
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
	renderData();
}

function renderData(){
	const tableBody = document.querySelector(".body-table");
	tableBody.innerHTML = "";
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(task => {
		const row = `<tr>
			<td>${task.description}</td>
			<td>${task.priority}</td>
			<td>${task.status}</td>
			<td>${task.reminder}</td>
			<td><input type="checkbox" class="checkbox" id="checkbox"></td>

		</tr>`
		document.querySelector(".body-table").insertAdjacentHTML('beforeend', row);
	});
}

function deleteTask(){
	let tasks = document.querySelectorAll(".checkbox");
	console.log(tasks);
	tasks.forEach(task =>{
		const array = [];
		if (tasks == "checked") {
			array.push(task);
			console.log(array);
		}
	});
}