async function searchStudents(e) {
  e.preventDefault();

  const branch = document.getElementById("branch").value;
  const year = document.getElementById("year").value;
  const skill = document.getElementById("skill").value;

  const params = new URLSearchParams({ branch, year, skill });
  const res = await fetch(`${API_URL}/students/search?${params.toString()}`);
  const data = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No students found</p>";
    return;
  }

  data.forEach((student) => {
    resultsDiv.innerHTML += `
      <div class="card">
        <p><b>${student.username}</b></p>
        <p>Branch: ${student.branch}</p>
        <p>Year: ${student.year}</p>
        <p>Skills: ${student.skills?.join(", ") || "None"}</p>
      </div>
    `;
  });
}
