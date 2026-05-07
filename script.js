let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function saveToStorage() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

//<<---------------ADD----------------------------------------
function addJob() {
  const company = document.getElementById("company").value.trim();
  const role = document.getElementById("role").value.trim();
  const status = document.getElementById("status").value;

  if (!company || !role) {
    alert("Please enter company name and job role");
    return;
  }

  const job = {
    id: Date.now(),
    company: company,
    role: role,
    status: status
  };

  jobs.push(job);

  saveToStorage();
  filterJobs();

  document.getElementById("company").value = "";
  document.getElementById("role").value = "";
  document.getElementById("status").value = "Applied";
}

//<------------EDIT-------------------------------------------
function editJob(id){
    const job = jobs.find(job => job.id === id);

    if(!job){
        alert("Job not found");
        return;
    }

    const newCompany = prompt("Enter updated company name:", job.company);
    const newRole = prompt("Enter updated job role:", job.role);
    const newStatus = prompt("Enter updated status (Applied, Interview, Rejected, Offer):", job.status);

    if(!newCompany || !newRole || !newStatus){
        alert("Fields cannot be empty");
        return;
    }

    job.company = newCompany.trim();
    job.role = newRole.trim();
    job.status = newStatus.trim();

    saveToStorage();
    filterJobs();
}

//<----------------DISPLAY-------------------------------------
function displayJobs(filteredJobs = jobs) {
  const list = document.getElementById("jobList");
  list.innerHTML = "";

  if (filteredJobs.length === 0) {
    list.innerHTML = "<p>No jobs added yet</p>";
    return;
  }

  filteredJobs.forEach((job) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${job.company}</strong><br>
        <span>${job.role}</span><br>
        <small>Status: ${job.status}</small>
      </div>

      <div>
        <button onclick="editJob(${job.id})">Edit</button>
        <button onclick="deleteJob(${job.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

//<--------------------FILTER---------------------------------
function filterJobs() {
    const selectedStatus = document.getElementById("filterStatus").value;

    if(selectedStatus === "All") {
        displayJobs();
        return;
    }

    const filteredJobs = jobs.filter(job => job.status === selectedStatus);

    displayJobs(filteredJobs);
}

//<-----------------DELETE--------------------------------
function deleteJob(id) {
  const confirmDelete = confirm("Are you sure you want to delete this job?");

  if (!confirmDelete) 
    return;

  jobs = jobs.filter(job => job.id !== id);

  saveToStorage();
  filterJobs();
}

displayJobs();