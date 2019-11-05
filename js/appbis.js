const mainContent = document.getElementById('main-content');
const employeeArrays = [];
const profiles = document.getElementsByClassName('profile');
let index = 0;

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => {
      generateEmployees(data.results);
      console.log(data.results);
    })
    .catch(error => console.log('Looks like there was a problem.', error))


function generateEmployees(data) {
  data.forEach( item => employeeArrays.push(item) );
  data.map(result => {
    const html = `
      <section class='card' index = ${index}>
        <img class='image' src='${result.picture.large}' alt = 'profile-image'>
        <h3 class='employee-info'>${result.name.first} ${result.name.last}</h3>
        <p class='employee-info'>${result.email}</p>
        <p class='employee-info'>${result.location.city}</p>
      </section>
    `
    index += 1;
    mainContent.innerHTML += html;
  });
}

function generateModal(number) {
  let modal = document.getElementById('modal')
  let employee = employeeArrays[number];
  let html = `
    <div class="modal-inside">
      <img src="${employee.picture.large}" />
      <h3>${employee.name.first} ${employee.name.last}</h3>
      <p>${employee.email}</p>
      <p>${employee.location.city}</p>
      <p>${employee.phone}</p>
      <p>${employee.location.street.number}  ${employee.location.street.name}, ${employee.location.postcode}</p>
      <p>Birthday: ${employee.dob.date}</p>
    </div>
  `
  modal.innerHTML = html;
}

mainContent.addEventListener('click', (e) => {
  console.log(event.target);
  if (event.target.className === 'card') {
    let cel = event.target.getAttribute('index');
    generateModal(cel);
  } else if (event.target.className === 'image' || event.target.className === 'employee-info') {
    let parent = event.target.parentNode;
    let cel = parent.getAttribute('index');
    generateModal(cel);
  }
});
