const modelsByMake = {
    "Toyota": ["Corolla", "Camry", "Aqua"],
    "Honda": ["Civic", "Accord", "Fit"],
    "Ford": ["Mustang", "Focus", "Explorer"],
    "Mazda": ["Axela"],
};

let carData = []; // Store JSON data globally

document.addEventListener("DOMContentLoaded", function () {
    // Load all cars initially
    fetch("cars.json")  // Load a JSON file containing all car data
        .then(response => response.json())
        .then(data => {
            carData = data; 
            populateTable(carData); // Initially display all cars
        })
        .catch(error => console.error("Error loading JSON:", error));
});

// Handle the change event of the make dropdown
document.getElementById("make").addEventListener("change", function() {
    const selectedMake = this.value.trim();
    const modelSelect = document.getElementById("model");

    // Clear current options (except the default one)
    modelSelect.innerHTML = '<option value="default">Model</option>';

    if (selectedMake !== "default") {
        const models = modelsByMake[selectedMake] || [];
        
        // Add the models for the selected make to the model dropdown
        models.forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

// Handle the change event of the model dropdown
document.getElementById("model").addEventListener("change", function () {
    const selectedModel = this.value.trim();
    
    if (selectedModel !== "default") {
        fetch(`${selectedModel}_cars.json`)  // Fetch JSON dynamically based on the selected model
            .then(response => response.json())
            .then(data => {
                carData = data; // Store JSON data
                populateTable(carData); // Display cars for the selected model
            })
            .catch(error => console.error("Error loading JSON:", error));
    } else {
        // Reset to show all cars when no model is selected
        fetch("cars.json")  
            .then(response => response.json())
            .then(data => {
                carData = data; 
                populateTable(carData);
            })
            .catch(error => console.error("Error loading JSON:", error));
    }
});

// Function to display filtered results in the table
function showAuctionTable() {
    const selectedYear = document.getElementById("year").value;
    const selectedGrade = document.getElementById("grade").value;
    const selectedMileage = document.getElementById("mileage").value;

    // Filter cars based on selection
    const filteredCars = carData.filter(car => {
        return (selectedYear === "default" || car.g === selectedYear) &&
               (selectedGrade === "default" || car.r === selectedGrade) &&
               (selectedMileage === "default" || car.o === selectedMileage);
    });

    // Update table with filtered results
    populateTable(filteredCars);
}

// Helper function to populate the table
function populateTable(filteredCars) {
    const tableBody = document.querySelector("#carTable tbody");
    tableBody.innerHTML = ""; // Clear previous rows

    filteredCars.forEach((car, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="https://14.ajes.com/imgs/${car.x}&h=50">
            </td>
            <td>${car.c || "N/A"}</td>
            <td>${car.e || "N/A"}</td>
            <td>${car.d || "N/A"}</td>
            <td>${car.g || "N/A"}</td>
            <td>${car.j || "N/A"}</td>
            <td>${car.h || "N/A"}</td>
            <td>${car.o || "N/A"}</td>
            <td>${car.r || "N/A"}</td>
            <td>${car.v || "N/A"}</td>
            <td>${car.k || "N/A"}</td>
            <td>${car.w || "N/A"}</td>
        `;

        // Add click event to redirect user to car details page
        row.addEventListener("click", function () {
            const queryParams = new URLSearchParams({
                image: car.x,
                model: car.c,
                engine: car.e,
                transmission: car.d,
                year: car.g,
                chassis: car.j,
                color: car.h,
                mileage: car.o,
                grade: car.r,
                price: car.v,
                auction: car.k,
                location: car.w
            }).toString();

            window.location.href = `car_details.html?${queryParams}`;
        });

        tableBody.appendChild(row);
    });
}
