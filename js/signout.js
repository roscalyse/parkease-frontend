// verify if user is logged in
requireLogin();
// fetching logged in user details from session storage and showing on the sidebar
const user = JSON.parse(sessionStorage.getItem("user"));
document.getElementById("user-name").textContent = user.name;
document.getElementById("user-role").textContent = user.role;

const records = [
  {
    receipt: "PE-2026-03-0001",
    driver: "John Kato",
    phone: "+256772345678",
    plate: "UBA 324X",
    type: "Personal Car",
    modelColor: "Toyota Premio - Silver",
    arrival: "2026-03-08T08:12:00",
  },
  {
    receipt: "PE-2026-03-0002",
    driver: "Sarah Namusoke",
    phone: "0775123456",
    plate: "UAT 554K",
    type: "Taxi",
    modelColor: "Toyota Wish - White",
    arrival: "2026-03-08T08:35:00",
  },
  {
    receipt: "PE-2026-03-0003",
    driver: "David Okello",
    phone: "+256704223344",
    plate: "UBF 789D",
    type: "Truck",
    modelColor: "Isuzu Truck - Blue",
    arrival: "2026-03-08T09:05:00",
  },
  {
    receipt: "PE-2026-03-0004",
    driver: "Moses Ssenyonga",
    phone: "0709123456",
    plate: "UAX 232P",
    type: "Coaster",
    modelColor: "Toyota Coaster - Yellow",
    arrival: "2026-03-08T09:42:00",
  },
  {
    receipt: "PE-2026-03-0005",
    driver: "Patrick Ouma",
    phone: "0788123456",
    plate: "UAR 441L",
    type: "Boda-boda",
    modelColor: "Bajaj Boxer - Red",
    nin: "CM12345678A",
    arrival: "2026-03-08T10:11:00",
  },
];
console.log(records);

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", function () {
    // read text from the search input
    const query = document.getElementById("search-input").value.trim();

    // try to find a matching record in our mock dataset
    const record = records.find(
      (r) => r.plate === query || r.receipt === query,
    );

    if (!record) {
      alert("Vehicle not found");
      return;
    }

    // compute various values we will show
    const arrival = new Date(record.arrival);
    const now = new Date();
    const fee = calculateFee(record.type, arrival, now);

    // calculate human‑readable duration
    const diffMs = now - arrival;
    const hrs = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const durationText = `${hrs}h ${mins}m`;

    // rate text for later use
    const rate = (() => {
      const hour = arrival.getHours();
      const isDay = hour >= 6 && hour < 19;
      const r = {
        Truck: { short: 2000, day: 5000, night: 10000 },
        "Personal Car": { short: 2000, day: 3000, night: 2000 },
        Taxi: { short: 2000, day: 3000, night: 2000 },
        Coaster: { short: 3000, day: 4000, night: 2000 },
        "Boda-boda": { short: 1000, day: 2000, night: 2000 },
      }[record.type] || { short: 2000, day: 3000, night: 2000 };
      if (hrs < 3) return r.short + "/hr";
      if (isDay) return r.day + "/hr";
      return r.night + "/hr";
    })();

    // populate the details panel by overwriting its innerHTML
    const details = document.querySelector(".details");
    details.innerHTML = `
      <div class="display-flex">
        <h4 class="text-blue"><i class="fas fa-car small-icon"></i>Vehicle &amp; Arrival Details</h4>
        <span class="badge font-sm">Pending Sign-Out</span>
      </div>
      <div class="detail-row"><label>Driver Name</label><span>${record.driver}</span></div>
      <div class="detail-row"><label>Vehicle Type</label><span>${record.type}</span></div>
      <div class="detail-row"><label>Arrival Time</label><span>${arrival.toLocaleString()}</span></div>
      <div class="detail-row"><label>Duration</label><span>${durationText}</span></div>
      <div class="detail-row text-blue light-bg align-items-center">
        <div>
          <span>Calculated Parking Fee</span>
          <h2>UGX ${fee.toLocaleString()}</h2>
          <span>Rate Applied: UGX ${rate} (${record.type})</span>
        </div>
        <span><i class="fas fa-credit-card"></i></span>
      </div>

      <h4 class="text-blue text-center"><i class="fas fa-user small-icon"></i> Receiver Information
      <hr>
      </h4>
      <form class="receiver-form">
        <input type="text" placeholder="Receiver full name" class="input-field" id="receiver-name" />
        <input type="text" placeholder="Phone number" class="input-field" id="receiver-phone" />
        <input type="text" placeholder="NIN Number (National ID)" class="input-field" id="receiver-nin" />
        <select class="form-select" id="receiver-gender">
          <option>Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <div class="btn-container">
          <button type="button" class="blue-btn" id="confirm-btn">Confirm Payment &amp; Sign-out</button>
          <button class="blue-btn-outline" type="button" id="cancel-btn">Cancel</button>
        </div>
      </form>
    `;

    // attach listener to the newly inserted confirm button
    document.getElementById("confirm-btn").addEventListener("click", () => {
        let badge = document.getElementsByClassName("badge")[0];
        badge.innerHTML = "Signed Out";
        badge.classList.remove("font-sm");
         badge.style.color = "yellow";
        badge.style.backgroundColor = "green";
      let names = document.getElementById("receiver-name");
      let phone = document.getElementById("receiver-phone");
      let nin = document.getElementById("receiver-nin");
      let gender = document.getElementById("receiver-gender");
      if (
        !names.value.trim() &&
        !phone.value.trim() &&
        !nin.value.trim() &&
        !gender.value.trim()
      ) {
        if (!validateName(names.value)) {
          showError(
            "receiver-name",
            "Please enter a valid name (at least 2 characters, starting with a capital letter)",
          );
          return;
        }
        clearError("receiver-name");
        if (!validatePhone(phone.value)) {  
            showError("receiver-phone", "Please enter a valid Ugandan phone number (starting with +256 or 0, followed by 9 digits)");
            return;
        }
        clearError("receiver-phone");
        if (!validateNIN(nin.value)) {
            showError("receiver-nin", "Please enter a valid NIN (2 letters followed by 8-10 alphanumeric characters and a final letter)");
            return;
        }
         clearError("receiver-nin");
      }

      // gather receiver form values
      const receiver = {
        name: names.value,
        phone: phone.value,
        nin: nin.value,
        gender: gender.value,
      };

      // update receipt preview using the same record data
      const preview = document.querySelector(".receipt-preview");
      const nowStr = new Date().toLocaleString();
      preview.querySelector("table tbody")?.remove(); // remove existing body if any
      preview.innerHTML = `
        <div class="logo"><img src="./assets/parking-logo.png" alt="ParkEase" width="80" /></div>
        <table class="font-sm">
          <tr><td>Receipt No:</td><td>${record.receipt}</td></tr>
          <tr><td>Date:</td><td>${nowStr}</td></tr>
          <tr><td>Plate No:</td><td>${record.plate}</td></tr>
          <tr><td>Category:</td><td>${record.type}</td></tr>
          <tr><td>Check-in:</td><td>${arrival.toLocaleString()}</td></tr>
          <tr><td>Duration:</td><td>${durationText} @ UGX ${rate}</td></tr>
          <tr><td><strong>Total:</strong></td><td><strong>UGX ${fee.toLocaleString()}</strong></td></tr>
        </table>
        <div class="customer-info">
          <div class="receiver-info">
            <h5 class="text-blue">Receiver Information</h5>
            <p><i class="fas fa-user small-icon"></i><span>${!receiver.name.trim() ? record.driver : receiver.name}</span></p>
            <p><i class="fas fa-phone small-icon"></i> <span>${!receiver.phone.trim() ? record.phone : receiver.phone}</span></p>
            <p><i class="fas fa-id-card small-icon"></i> <span>${!receiver.nin.trim() ? record.nin ?? "NAN" : receiver.nin}</span></p>
          </div>
          <div class="receiver-info">
            <h5 class="text-blue">Customer Information</h5>

            <p><i class="fas fa-user small-icon"></i><span>${record.driver}</span></p>
            <p><i class="fas fa-phone small-icon"></i> <span>${record.phone}</span></p>
            <p><i class="fas fa-id-card small-icon"></i> <span>${record.nin ?? "NAN"}</span></p>
           </div>
        </div>
        <p id="prepared_by"> <span>Prepared By: ${user.name ?? "(current user)"} </span></p>
        <div class="scan-area">
          <div><i class="fas fa-qrcode qr-icon"></i></div>
          <span class="font-sm">SCAN TO VERIFY</span>
        </div>
        <h4 class="text-center  mb-0 text-blue">THANK YOU FOR USING PARKEASE</h4>
        <p class="font-sm italic text-center mt-0">SoftWare By: Namukasa Proscovia</p>
      `;

      alert("Payment confirmed and vehicle signed out");
    });

    // optional cancel behaviour
    document.getElementById("cancel-btn").addEventListener("click", () => {
      location.reload();
    });
  }); // end searchBtn click
}); // end DOMContentLoaded

// function to calculate fee based on vehicle type and duration
function calculateFee(vehicleType, arrivalTime, signOutTime) {
  const durationMs = signOutTime - arrivalTime;
  const durationHrs = durationMs / (1000 * 60 * 60);
  console.log(durationHrs);
  const hour = new Date(arrivalTime).getHours();
  const isDay = hour >= 6 && hour < 19;
  const isShort = durationHrs < 3;

  const rates = {
    Truck: { short: 2000, day: 5000, night: 10000 },
    "Personal Car": { short: 2000, day: 3000, night: 2000 },
    Taxi: { short: 2000, day: 3000, night: 2000 },
    Coaster: { short: 3000, day: 4000, night: 2000 },
    "Boda-boda": { short: 1000, day: 2000, night: 2000 },
  };

  const r = rates[vehicleType] || rates["Personal Car"];

  return isShort ? r.short : (isDay ? r.day : r.night) * Math.ceil(durationHrs);
}
// console.log(calculateFee("Personal Car", new Date("2026-03-08 07:12:00"), new Date("2026-03-08 11:30:00")));
