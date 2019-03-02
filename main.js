//let data;
window.onload = () => {
  let data;
  let ajax = new XMLHttpRequest();
  ajax.open('GET', 'https://randomuser.me/api/?results=100', true);
  ajax.send();
  
  ajax.onload = () => {
    data = JSON.parse(ajax.responseText);
    document.getElementById('preloader').remove();
    getUser(data);
  
    document.querySelector('#chart').addEventListener('click', () => {
      document.querySelector('#popupChart').className = "popup-container";
      showChart(data);
    });
  
    document.querySelector('#popupExit').addEventListener('click', () => {
      document.querySelector('#popupChart').className += " hidden";
    });
  
    document.querySelector('#search').addEventListener('keyup', () => searchUser());
  }


  let getUser = (data) => {
    let avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered;
    for (let i = 0; i < data.results.length; i++) {
      avatar = data.results[i].picture.thumbnail;
      avatarBig =  data.results[i].picture.large;
      lastName = data.results[i].name.last.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
      firstName = data.results[i].name.first.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
      userName = data.results[i].login.username;
      birthday = data.results[i].dob.date.slice(0, 10).split('-').reverse().join('/');
      phone = data.results[i].phone;
      cell = data.results[i].cell;
      email = data.results[i].email
      location = data.results[i].location.state.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
      city = data.results[i].location.city;
      address = data.results[i].location.street;
      zipCode = data.results[i].location.postcode;
      registered = data.results[i].registered.date.slice(0, 10).split('-').reverse().join('/');
      addUsers(avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered, i);
    }
  }

  let addUsers = (avatar, avatarBig, lastName, firstName, userName, birthday, phone, cell, email, location, city, address, zipCode, registered, i) => {
    let userList = document.querySelector('#userList');
    let user = document.createElement('tr');
    user.className = "user-tr";
    user.innerHTML = `<td><img src = ${avatar} alt = ${firstName + ' ' + lastName}></td>
                      <td>${lastName}</td>
                      <td>${firstName}</td>
                      <td>${userName}</td>
                      <td>${phone}</td>
                      <td>${location}</td>
                      <td><a className = "" href="#" onClick = "showDetails(this.parentNode.parentNode.nextSibling)">+</a></td>`;
    userList.appendChild(user);
    let userDetails = document.createElement('tr');
    userDetails.className = "hidden";
    userDetails.innerHTML = `<td colSpan="7">
                               <div><div><ul>
                                 <h2>${firstName}</h2>
                                 <li><b>Username: </b><span>${userName}</span></li>
                                 <li><b>Registered: </b><span>${registered}</span></li>
                                 <li><b>Email: </b><span>${email}</span></li>
                               </ul></div>
                               <div><ul>
                                 <li><b>Address: </b><span>${address}</span></li>
                                 <li><b>City: </b><span>${city}</span></li>
                                 <li><b>Zip Code: </b><span>${zipCode}</span></li>
                               </ul></div>
                               <div><ul>
                                 <li><b>Birthday: </b><span>${birthday}</span></li>
                                 <li><b>Phone: </b><span>${phone}</span></li>
                                 <li><b>Cell: </b><span>${cell}</span></li>
                               </ul></div>
                               <div><img src=${avatarBig} alt=${firstName + ' ' + lastName}></div></div></td>`;
    userList.appendChild(userDetails);

    if(i % 2 == 0) {
      user.style.backgroundColor = "#A9A9A9";
      userDetails.style.backgroundColor = "#A9A9A9";
    }
  }


  let showDetails = (user) => {
    if(document.querySelector('.dropdown-tr') != null && user.previousSibling.lastChild.lastChild.textContent != '-') {
      document.querySelector('.dropdown-tr').previousSibling.lastChild.lastChild.innerText = "+";
      document.querySelector('.dropdown-tr').className = "hidden";
      user.previousSibling.lastChild.lastChild.innerText = "-";
      user.className = "dropdown-tr";
    } else if(user.previousSibling.lastChild.lastChild.textContent == '-') {
      user.previousSibling.lastChild.lastChild.innerText = "+";
      user.className = "hidden";
    } else {
      user.previousSibling.lastChild.lastChild.innerText = "-";
      user.className = "dropdown-tr";
    }
  }

  let showChart = (data) => {

    let getValue = (name) => {
      let counter = 0;
      for (let i = 0; i < data.results.length; i++) {
        if(data.results[i].gender == name) counter++;
      }
      return counter;
    }
  
    let results = [
                   {name: 'male', color: 'blue', value: getValue('male')},
                   {name: 'female', color: 'pink', value: getValue('female')}
                  ];
  
    let total = (() => {
      let total = 0;
      for(i in results) {
        total += results[i].value;
      }
      return total;
    })();
  
    let cx = document.querySelector('#genderUsers').getContext('2d');
    cx.font = '15px Georgia';
  
    let currentAngle = -0.5 * Math.PI;
    let centerX = 300;
    let centerY = 150;

    results.forEach((result) => {
      let sliceAngle = (result.value / total) * 2 * Math.PI;
      let middleAngle = currentAngle + 0.5 * sliceAngle;
  
      cx.beginPath();
      cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);
      currentAngle += sliceAngle;
      cx.lineTo(centerX, centerY);
      cx.fillStyle = result.color;
      cx.fill();
  
      if (middleAngle < - 0.5 * Math.PI || middleAngle > 0.5 * Math.PI) {
        cx.textAlign = 'right';
      } else {
        cx.textAlign = 'left';
      }
      cx.textBaseline = 'middle';
      cx.fillText(`${result.name} ${total / 100 * result.value}%`, Math.cos(middleAngle) * 120 + centerX, Math.sin(middleAngle) * 120 + centerY);
    });
  }

  let searchUser = () => {
    let name = document.getElementById('search');
    let userList = document.getElementById('userList');
    let regPhrase = new RegExp(name.value, 'i');
    let flag = false;
    for (let i = 1; i < userList.rows.length; i++) {
      flag = false;
      for (let j = userList.rows[i].cells.length - 1; j >= 0; j--) {
        if (j != 1 && j != 2) continue;
        flag = regPhrase.test(userList.rows[i].cells[j].innerHTML);
        if (flag) break;
      }
      if (flag) {
        userList.rows[i].style.display = "";
      } else {
        userList.rows[i].style.display = "none";
      }
    }
  }
}
