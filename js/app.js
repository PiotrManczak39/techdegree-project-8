const profiles = document.querySelectorAll('.profiles');
const card = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');
let index = 0;
const queue = [];

const pics = [];
const fullNames = [];
const emails = [];
const cities = [];
const cells = [];
const addresses = [];
const dobs = [];
const seeds = [];
const modals = [];

function generateCard(address, name, email, city) {
  const html = `
    <div class="card">
      <img src='${address}' alt="Picture of the very important person" index =${index}>
      <div class="inside">
        <p><strong>${name}</strong></p>
        <p>${email}</p>
        <p>${city}</p>
      </div>
    </div>
  `
  index += 1;
  return html;
}

function generateModal(pic, fullName, email, city, cell, address, dob) {
  const html = `
    <div class="insideModal">
      <img src='${pic}' alt="Massive picture" />
      <p>${fullName}</p>
      <p>${email}</p>
      <p>${city}</p>
      <p>${cell}</p>
      <p>${address}</p>
      <p>${dob}</p>
    </div>
  `
  return html;
}

for (let i=0; i<12; i++) {
  fetch('https://randomuser.me/api/')
      .then( response => response.json() )
      // .then(data => console.log(data.results[0].dob.date))
      .then( data => {
        queue.push(data.results);
        let pic = data.results[0].picture.medium;
        let fullName = data.results[0].name.first + ' ' + data.results[0].name.last;
        let email = data.results[0].email;
        let city = data.results[0].location.city;
        let cell = data.results[0].cell;
        let address = data.results[0].location.street.number + ' '
                      + data.results[0].location.street.name + ', '
                      + data.results[0].location.state + ', '
                      + data.results[0].location.postcode;
        let birth = data.results[0].dob.date;
        let seed = data.info.seed;
        pics.push(pic);
        fullNames.push(fullName);
        emails.push(email);
        cities.push(city);
        cells.push(cell);
        addresses.push(address);
        dobs.push(birth);
        seeds.push(seed);
        profiles[i].innerHTML = generateCard(pic, fullName, email, city);
        modals.push(generateModal(pic, fullName, email, city, cell, address, birth));
      })
}
