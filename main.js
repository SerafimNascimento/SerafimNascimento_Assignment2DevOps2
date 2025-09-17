document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let role = document.getElementById("role").value.trim();

    if (name === "" || email === "" || role === "") {
        alert("All fields are required!");
        return;
    }

    // Show success message on the page (instead of only alert)
    document.getElementById("success").style.display = "block";
});