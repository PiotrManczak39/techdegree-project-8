const mainContent = document.getElementById('main-content');
const employeeArrays = [];
let index = 0;

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => {
      generateEmployees(data.results);
      // console.log(data.results);
    })


function generateEmployees(data) {
  data.map(result => {
    const html = `
      <section class = 'card' index = ${index}>
        <img class = 'image' src='${result.picture.large}' alt = 'profile-image'>
        <h3 class = 'employee-info'>${result.name.first} ${result.name.last}</h3>
        <p class = 'employee-info'>${result.email}</p>
        <p class = 'employee-info'>${result.location.city}</p>

      </section>
    `
    index += 1;
    employeeArrays.push(result);
    mainContent.innerHTML += html;
  });
}

console.log(employeeArrays[1]);
