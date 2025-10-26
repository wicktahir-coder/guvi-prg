function ran(name, email, aadhar, type) {
  this.name = name;
  this.email = email;
  this.aadhar = aadhar;
  this.type = type;
}

function display() {}

display.prototype.validate = function (ran) {
  const isDigits12 = /^\d{12}$/.test(ran.aadhar);
  if (ran.name.length < 2 || ran.email.length < 5 || !isDigits12) {
    return false;
  } else {
    return true;
  }
};

display.prototype.clear = function () {
  let ranform = document.getElementById("registerform");
  ranform.reset();
};

display.prototype.add = function (covid) {
  let tablebody = document.getElementById("tablebody");
  let uilist = `
        <tr>
            <td>${covid.name}</td>
            <td>${covid.email}</td>
            <td>${covid.aadhar}</td>
            <td>${covid.type || ""}</td>
        </tr>`;
  tablebody.innerHTML += uilist;
};

display.prototype.show = function (type, displaymsg) {
  let message = document.getElementById("showmsg");
  message.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${displaymsg}
        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 3000);
};

let ranform = document.getElementById("registerform");
ranform.addEventListener("submit", ranformsubmit);

function ranformsubmit(e) {
  e.preventDefault();

  console.log("form is getting submitted");

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let aadhar = document.getElementById("aadhar").value.trim();

  
  let male = document.getElementById("male");
  let female = document.getElementById("female");

  console.log(name, email, aadhar, male, female);

  let type;
  if (male && male.checked) {
    type = male.value;
  } else if (female && female.checked) {
    type = female.value;
  } else {
    type = "";
  }

  let data = new ran(name, email, aadhar, type);
  let Display = new display();

  if (Display.validate(data)) {
    Display.add(data);
    Display.clear();
    Display.show("success", "registration successful");
  } else {
    Display.show("danger", "registration failed");
    
  }
}
