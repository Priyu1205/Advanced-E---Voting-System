const backendUrl = "http://127.0.0.1:5000";  // Flask backend URL

// Function to request OTP
function requestOTP() {
    const aadhaarNumber = document.getElementById("aadhaar_number").value;

    if (aadhaarNumber.length !== 12) {
        alert("Invalid Aadhaar number. Must be 12 digits.");
        return;
    }

    fetch(`${backendUrl}/request_otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar_number: aadhaarNumber }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert("OTP sent successfully!");
            document.getElementById("otp_section").style.display = "block";
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error("Error:", error));
}

// Function to verify OTP
function verifyOTP() {
    const otp = document.getElementById("otp").value;

    fetch(`${backendUrl}/verify_otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert("Authentication successful!");
            document.getElementById("voter_section").innerHTML = 
                `<h3>Welcome, Voter! Your Aadhaar: ${data.aadhaar}</h3>`;
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error("Error:", error));
}
