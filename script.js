const btnModal = document.querySelector(".btn-add");
const modal = document.querySelector(".modal-fill-data");
const btnAdd = document.querySelector(".submit");
const form = document.querySelector(".modal-fill-data");
btnModal.addEventListener("click", ()=>{
	modal.classList.remove("hidden");
	//addItem();
	today();
	validationDate();
})
btnAdd.addEventListener('click', (e)=>{
	e.preventDefault();
	addItem();
	
	form.reset();
})
function addItem(){
	const container = document.querySelector(".container");
	const priority = document.querySelector(".priority").value;
	let reminder = document.querySelector(".reminder").value;
	const status = document.querySelector(".status").value;
	const post = document.createElement("LI");
	const text = document.createTextNode(`Task: ${document.querySelector(".input-description").value} --- Priority: ${priority} --- Remind me on: ${reminder} --- Task Status: ${status}`);
	post.appendChild(text);
	container.appendChild(post);
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
			console.log("De año vamos bien");
		}
		if (day < dayToday && yearToday > 2020){
			reminder.value = today();
		}else{
			count++;
			console.log("De día vamos bien");
		}
		if (month < monthToday && yearToday > 2020) {
			reminder.value = today();
		}else{
			count++;
			console.log("De mes vamos bien");
		}
		if (count < 3 ) {
			console.log(count);
			alert("Ingrese una fecha válida");
		}else{
			alert("Todo bien, todo correcto");
		}
	});
}
//Hacer funcion para guardar el item en el LS