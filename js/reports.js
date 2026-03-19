// verify if user is logged in
requireLogin();

// reports.js

// adding pagnation to the table
const rowsPerPage = 5;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  // setupPagination();
  setupSearch();
});

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("#reportsTable tbody tr");
  const pageButtons = document.querySelectorAll(".pageBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  function showPage(page) {
    currentPage = page;

    // 1. Handle Row Visibility
    rows.forEach((row, index) => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      row.style.display = (index >= start && index < end) ? "" : "none";
    });

    // 2. Handle Button Styling
    pageButtons.forEach((btn, index) => {
      if (index + 1 === currentPage) {
        btn.classList.add("bg-blue", "text-white");
      } else {
        btn.classList.remove("bg-blue", "text-white");
      }
    });
  }

  // Event Listeners for Numbered Buttons
  pageButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      showPage(index + 1);
    });
  });

  // Event Listeners for Prev/Next
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  // Initialize first page
  showPage(1);
});

// search function
function setupSearch() {
  const input = document.getElementById("searchInput");

  input.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll("#reportsTable tbody tr").forEach((row) => {
      const text = row.innerText.toLowerCase();

      row.style.display = text.includes(value) ? "" : "none";
    });
  });
}

// function setupPagination() {

//     const table = document.getElementById("reportsTable");
//     const rows = table.querySelectorAll("tbody tr");

//     const totalPages = Math.ceil(rows.length / rowsPerPage);

//     showPage(1);

//     document.getElementById("nextBtn").addEventListener("click", () => {
//         if (currentPage < totalPages) {
//             currentPage++;
//             showPage(currentPage);
//         }
//     });

//     document.getElementById("prevBtn").addEventListener("click", () => {
//         if (currentPage > 1) {
//             currentPage--;
//             showPage(currentPage);
//         }
//     });

// }

// function showPage(page) {

//     const rows = document.querySelectorAll("#reportsTable tbody tr");

//     rows.forEach((row, index) => {

//         if (
//             index >= (page - 1) * rowsPerPage &&
//             index < page * rowsPerPage
//         ) {
//             row.style.display = "";
//         } else {
//             row.style.display = "none";
//         }

//     });

// }
