const mainContent = document.getElementById('main-content');
const employeeArrays = [];
const profiles = document.getElementsByClassName('profile');
const modal = document.getElementById('modal');
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
        <img class='image' src='${result.picture.large}' alt='profile-image'>
        <div class="card-info">
          <h3 class='employee-info'>${result.name.first} ${result.name.last}</h3>
          <p class='employee-info'>${result.email}</p>
          <p class='employee-info'>${result.location.city}</p>
        </div>
      </section>
    `
    index += 1;
    mainContent.innerHTML += html;
  });
}

function birthdayF(string) {
  let osobneLitery = Array.from(string);
  let nowy = osobneLitery.slice(0, 10);
  let joined = nowy.join('');
  return joined;
}

function generateModal(number) {
  let modal = document.getElementById('modal')
  let employee = employeeArrays[number];
  let birthday = birthdayF(employee.dob.date);
  let html = `
    <div class="modal-inside">
      <div class="wrap">
        <img src="${employee.picture.large}" />
        <h3>${employee.name.first} ${employee.name.last}</h3>
        <p>${employee.email}</p>
        <p class="location">${employee.location.city}</p>
        <p>${employee.phone}</p>
        <p>${employee.location.street.number}  ${employee.location.street.name}, ${employee.location.postcode}</p>
        <p>Birthday: ${birthday}</p>
      </div>
    </div>
  `
  modal.innerHTML = html;
  let modalInside = document.querySelector('.modal-inside');
  const closeModal = document.createElement('span');
  closeModal.className = 'closeModal';
  closeModal.textContent = '+';
  modalInside.appendChild(closeModal);
}

modal.style.display = 'none';

mainContent.addEventListener('click', (e) => {
  if (event.target.className === 'card') {
    let cel = event.target.getAttribute('index');
    generateModal(cel);
    modal.style.display = 'flex';
  } else if ( event.target.className === 'employee-info') {
    let parent = event.target.parentNode.parentNode;
    let cel = parent.getAttribute('index');
    generateModal(cel);
    modal.style.display = 'flex';
  } else if (event.target.className === 'image' || event.target.className === 'card-info') {
    let parent = event.target.parentNode;
    let cel = parent.getAttribute('index');
    generateModal(cel);
    modal.style.display = 'flex';
  }
});

modal.addEventListener('click', (e) => {
  if (event.target.className === 'closeModal') {
    modal.style.display = 'none';
  }
});
