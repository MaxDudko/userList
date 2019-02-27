let data;
//function getUser() {
  let ajax = new XMLHttpRequest();
  ajax.open('GET', 'https://randomuser.me/api/?results=100', true);
  //ajax.responseType = 'json';
  ajax.send();
  ajax.onload = () => {
    data = JSON.parse(ajax.responseText);
    document.getElementById('preloader').remove();
    getUser();
  }
  /*ajax.onreadystatechange = () => {
    if (this.readyState != 4) return;
    if (this.status != 200) {
      alert( xhr.status + ': ' + xhr.statusText );
    } else {
      try {
        data = JSON.parse(ajax.responseText);
      } catch(e) {
        alert( "ERROR: " + e.message );
      }
    }
  }
//}*/
/*
$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: (data) => {
    console.log(data.results[0]);
  }
});*/

let getUser = () => {
  let avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered;
  for (let i = 0; i < data.results.length; i++) {
    avatar = data.results[i].picture.thumbnail;
    avatarBig =  data.results[i].picture.large;
    lastName = data.results[i].name.last.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
    firstName = data.results[i].name.first.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
    userName = data.results[i].login.username;
    birthday = data.results[i].dob.date;
    phone = data.results[i].phone;
    cell = data.results[i].cell;
    email = data.results[i].email
    location = data.results[i].location.state.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
    city = data.results[i].location.city;
    address = data.results[i].location.street;
    zipCode = data.results[i].location.postcode;
    registered = data.results[i].registered.date;
    addUsers(avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered, i);
  }
}

let addUsers = (avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered, i) => {
  let userList = document.querySelector('#userList');
  let user = document.createElement('tr');
  user.className = "user-tr";
  user.innerHTML = `<td><img src=${avatar} alt=${firstName + ' ' + lastName}></td>
                    <td>${lastName}</td>
                    <td>${firstName}</td>
                    <td>${userName}</td>
                    <td>${phone}</td>
                    <td>${location}</td>
                    <td onClick = "showDetails(this.parentNode.nextSibling)">+</td>`;
  userList.appendChild(user);
  let userDetails = document.createElement('tr');
  userDetails.className = "hidden";
  userDetails.innerHTML = `<td colSpan="7">
                             <div><div><ul>
                               <li><h2>${firstName}</h2></li>
                               <li><b>Username: </b><i>${userName}</i></li>
                               <li><b>Registered: </b><i>${registered}</i></li>
                               <li><b>Email: </b><i>${email}</i></li>
                             </ul></div>
                             <div><ul>
                               <li><b>Address: </b><i>${address}</i></li>
                               <li><b>City: </b><i>${city}</i></li>
                               <li><b>Zip Code: </b><i>${zipCode}</i></li>
                             </ul></div>
                             <div><ul>
                               <li><b>Birthday: </b><i>${birthday}</i></li>
                               <li><b>Phone: </b><i>${phone}</i></li>
                               <li><b>Cell: </b><i>${cell}</i></li>
                             </ul></div>
                             <div><img src=${avatarBig} alt=${firstName + ' ' + lastName}></div></div></td>`;
  userList.appendChild(userDetails);
  
  if(i % 2 == 0) {
    user.style.backgroundColor = "#C0C0C0";
    userDetails.style.backgroundColor = "#C0C0C0";
  } 
}
  

let showDetails = (user) => {
  if(document.querySelector('.dropdown-tr') != null) { 
    document.querySelector('.dropdown-tr').previousSibling.lastChild.innerText = "+";  
    document.querySelector('.dropdown-tr').className = "hidden";
  } else {
    user.previousSibling.lastChild.innerText = "-";
    user.className = "dropdown-tr";
  }
}

/*
if(document.querySelector('.dropdown-tr').previousSibling.lastChild.textContent == '-') document.querySelector('.dropdown-tr').previousSibling.lastChild.innerText = "+";
*/






















