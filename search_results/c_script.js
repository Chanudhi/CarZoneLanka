const modelsByMake = {
    "TOYOTA": ["COROLLA", "CAMRY", "AQUA"],
    "HONDA": ["CIVIC", "ACCORD", "FIT"],
    "FORD": ["MUSTANG", "FOCUS", "EXPLORER"],
    "MAZDA": ["AXELA"],
    "NISSAN": ["LEAF"],
};

let carData = [];

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedMake = urlParams.get("make") || "default";
    const selectedModel = urlParams.get("model") || "default";

    document.getElementById("make").value = selectedMake;
    populateModelDropdown(selectedMake, selectedModel);
    
    if (selectedMake !== "default" && selectedModel !== "default") {
        fetchCarData(`${selectedModel}_cars.json`);
    } else {
        fetchCarData("cars.json");
    }
});

function fetchCarData(file) {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            carData = data;
            populateTable(carData);
        })
        .catch(error => console.error("Error loading JSON:", error));
}

document.getElementById("make").addEventListener("change", function() {
    const selectedMake = this.value.trim();
    populateModelDropdown(selectedMake);
});

document.getElementById("model").addEventListener("change", function () {
    const selectedModel = this.value.trim();
    if (selectedModel !== "default") {
        fetchCarData(`${selectedModel}_cars.json`);
    } else {
        fetchCarData("cars.json");
    }
});

function populateModelDropdown(selectedMake, selectedModel = "default") {
    const modelSelect = document.getElementById("model");
    modelSelect.innerHTML = '<option value="default">Model</option>';

    if (selectedMake !== "default") {
        const models = modelsByMake[selectedMake] || [];
        models.forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            if (model === selectedModel) {
                option.selected = true;
            }
            modelSelect.appendChild(option);
        });
    }
}

function showAuctionTable() {
    const selectedYear = document.getElementById("year").value;
    const selectedGrade = document.getElementById("grade").value;
    const selectedMileage = document.getElementById("mileage").value;

    const filteredCars = carData.filter(car => {
        return (selectedYear === "default" || car.g === selectedYear) &&
               (selectedGrade === "default" || car.r === selectedGrade) &&
               (selectedMileage === "default" || car.q === selectedMileage);
    });

    populateTable(filteredCars);
}

function populateTable(filteredCars) {
    const tableBody = document.querySelector("#carTable tbody");
    tableBody.innerHTML = "";

    filteredCars.forEach((car, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="https://14.ajes.com/imgs/${car.x}&h=50">
                <img src="https://14.ajes.com/imgs/${car.y}&h=50"></td>
            <td>${car.c || "N/A"}</td>
            <td>${car.e || "N/A"}</td>
            <td>${car.d || "N/A"}</td>
            <td>${car.g || "N/A"}</td>
            <td>${car.j || "N/A"}</td>
            <td>${car.h || "N/A"}</td>
            <td>${car.q || "N/A"}</td>
            <td>${car.r || "N/A"}</td>
            <td>${car.v || "N/A"}</td>
            <td>${car.k || "N/A"}</td>
            <td>${car.w || "N/A"}</td>
        `;
        row.addEventListener("click", function () {
            const queryParams = new URLSearchParams({
                photos: `https://14.ajes.com/imgs/${car.x}&h=50`,
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
            window.location.href = `../insidecar/c_insidecar.html?${queryParams}`;
        });
        tableBody.appendChild(row);
    });
}



