// verify if user is logged in
requireLogin();
// fetching logged in user details from session storage and showing on the sidebar
const user = JSON.parse(sessionStorage.getItem("user"));
document.getElementById("user-name").textContent = user.name;
document.getElementById("user-role").textContent = user.role;
// console.log("Logged in user:", user);
const registeredCustomers = [
  {
    id: 1,
    name: "John Doe",
    phone: "+256 789 456 123",
    nin: "AB1234567890C",
    createdAt: "2026-03-02T10:14:00Z",
  },
  {
    id: 2,
    name: "Sarah Achieng",
    phone: "+256701234567",
    nin: "CF12345678UG",
    createdAt: "2026-03-02T10:15:00Z",
  },
  {
    id: 3,
    name: "Michael Kato",
    phone: "+256702345678",
    nin: "CM98765432UG",
    createdAt: "2026-03-02T11:10:00Z",
  },
];
const registeredVehicles = [
  {
    id: 1,
    plate: "UAJ 123A",
    type: "Car",
    model: "Toyota Camry",
    color: "Blue",
  },
  {
    id: 2,
    plate: "UAB 456B",
    type: "Boda-boda",
    model: "Honda CBR",
    color: "Red",
  },
];
// populate customer and vehicle options in the registration form
document.getElementById("customer-options").innerHTML = registeredCustomers
  .map((c) => `<option value="${c.id}">${c.name} (${c.phone})</option>`)
  .join("");
document.getElementById("vehicle-options").innerHTML = registeredVehicles
  .map((v) => `<option value="${v.id}">${v.plate}</option>`)
  .join("");

// handle registration form submission
const registerForm = document.getElementById("register-entry");
const registerMessage = document.getElementById("register-message");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const customerId = document.getElementById("customer-id").value.trim();
  const vehicleId = document.getElementById("vehicle-id").value.trim();
  if (!customerId) {
    showError("customer-id", "Please select a customer.");
    return;
  }
  clearError("customer-id");
  if (!vehicleId) {
    showError("vehicle-id", "Please select a vehicle.");
    return;
  }
  clearError("vehicle-id");
  // simulate successful registration and receipt printing
  const customer = registeredCustomers.find((c) => c.id == customerId);
  const vehicle = registeredVehicles.find((v) => v.id == vehicleId);
  console.log("Registered Entry:", {
    customer,
    vehicle,
    attendant: user.name,
    time: new Date().toISOString(),
  });
  let successMessage = `Successfully!! Registered ${customer.name} with vehicle ${vehicle.plate}. Receipt ${generateReceipt()} is being printed...`;
  notify(successMessage, "success");

  //   registerMessage.innerHTML = `<span class="text-center text-bold text-blue">Successful!!</span> <br> Registered ${customer.name} with vehicle ${vehicle.plate}. Receipt is being printed...`;
  //   registerMessage.className = "success";
});

//handle customer form submission
const customerForm = document.getElementById("customer-form");
customerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const isBodaBoda = document.getElementById("bodaCheck").checked;
  const ninField = document.getElementById("ninField");
  const nin = document.getElementById("customerNIN").value.trim();
  if (!validateName(name)) {
    showError("nameField", "Please enter the customer's full name.");
    return;
  }
  clearError("nameField");
  if (!validatePhone(phone)) {
    showError("phoneField", "Valid phone number starts with +256 and be followed by 9 digits or 07XX / 06XX format.");
    return;
  }
  clearError("phoneField");
  if (isBodaBoda && !nin) {
    showError("customerNIN", "NIN number is required for boda boda drivers.");
    ninField.classList.add("nin-active");
    return;
  } else {
    if (!validateNIN(nin) && isBodaBoda) {
      showError("customerNIN", "Please enter a valid NIN number.");
      return;
    }

    clearError("customerNIN");
    ninField.classList.remove("nin-active");
  }

  // simulate adding customer to database
  const newCustomer = {
    id: registeredCustomers.length + 1,
    name: name,
    phone: phone,
    nin: nin,
    createdAt: new Date().toISOString(),
  };
  registeredCustomers.push(newCustomer);
  // update customer options in the registration form
  document.getElementById("customer-options").innerHTML = registeredCustomers
    .map((c) => `<option value="${c.id}">${c.name} (${c.phone})</option>`)
    .join("");
    notify(`Customer added successfully!`, "success");
  // reset the customer form
  customerForm.reset();
});

// handle vehicle form submission
const vehicleForm = document.getElementById("vehicle-form");
vehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const plate = document.getElementById("plateNumber").value.trim();
  if (!validatePlateNumber(plate)) {
    showError("plateField", "Please enter a valid Ugandan plate number(Upper case letters).");
    return;
  }
    clearError("plateField");
  if(!validateModel(document.getElementById("model").value.trim())){
    showError("model", "Please enter a valid vehicle model.");
    return;
  }
  clearError("model");
  if(!validateColor(document.getElementById("color").value.trim())){
    showError("color", "Please enter a valid vehicle color.");
    return;
  }
  clearError("color");
  if(!vehicleType.value){
    showError("vehicleType", "Please select the vehicle type.");
    return;
  }

  // simulate adding vehicle to database
  const newVehicle = {
    id: registeredVehicles.length + 1,
    plate: plate,
    model: document.getElementById("model").value.trim(),
    color: document.getElementById("color").value.trim(),
    type: document.getElementById("vehicleType").value,
    createdAt: new Date().toISOString(),
  };
  registeredVehicles.push(newVehicle);
   // update vehicle options in the registration form
  document.getElementById("vehicle-options").innerHTML = registeredVehicles
    .map((v) => `<option value="${v.id}">${v.plate} (${v.model})</option>`)
    .join("");
  // reset the vehicle form
notify(`Vehicle added successfully!`, "success")
  vehicleForm.reset();
});

//cancel behaviour
document.getElementById("cancel-btn").addEventListener("click", () => {
  location.reload();
});

// function to generate parking receipt number
function generateReceipt() {
  // 1. Capture the current date and time
  const now = new Date();

  // 2. Extract the 4-digit year (e.g., 2026)
  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so we add 1. padStart ensures it's always 2 digits (e.g., "03" for March)
  const day = String(now.getDate()).padStart(2, "0");

  const rand = Math.floor(Math.random() * 9000 + 1000); // 4-digit random number between 1000 and 9999
  return `PE-${year}-${month}-${day}-${rand}`;
}
// console.log(generateReceipt());

// function to display toastr message
function notify(message, type = "success") {
  // 1. Create a wrapper element for the icon + text
  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.offset = "center";
  content.style.gap = "15px";

  // 2. Set the icon based on the type
  const iconClass =
    type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";

  // 3. Combine icon and message into the HTML
  content.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;

  Toastify({
    node: content, // Use 'node' instead of 'text' to inject HTML
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: type === "success" ? "#042a4a" : "#d9534f",
      color: type === "success" ? "#fb8515" : "#ffffff",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
    },
  }).showToast();
}
