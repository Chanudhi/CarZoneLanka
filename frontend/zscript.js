document.addEventListener("DOMContentLoaded", function() {
    const carData = {
        "TOYOTA": ["1 SERIES", "AQUA", "ALLION", "ALPHARD", "CAMRY", "COROLLA"],
        "NISSAN": ["AD", "ALTIMA", "CARAVAN", "CEDRIC", "CIMA", "CIVILIAN"],
        "HONDA": ["ACCORD", "ACTY TRUCK", "CIVIC", "CR-V", "FIT", "INSIGHT"],
        "MAZDA": ["AXELA", "ATENZA SEDAN", "BONGO", "CX-5", "DEMIO", "RX-8"],
        "SUBARU": ["BRZ", "IMPREZA", "FORESTER", "LEGACY", "OUTBACK", "WRX"],
        "MITSUBISHI": ["CANTER", "COLT", "LANCER", "OUTLANDER", "PAJERO", "RVR"],
        "SUZUKI": ["ALTO", "SWIFT", "WAGON R", "IGNIS", "JIMNY", "SPACIA"]
    };

    const makeDropdown = document.getElementById("make");
    const modelDropdown = document.getElementById("model");
    const searchButton = document.getElementById("search-btn");

    // Populate the Make Dropdown
    Object.keys(carData).forEach(make => {
        let option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });

    // Update Model Dropdown on Make Selection
    makeDropdown.addEventListener("change", function() {
        const selectedMake = this.value;
        modelDropdown.innerHTML = `<option value="">Model</option>`; // Reset Models
        
        if (selectedMake) {
            carData[selectedMake].forEach(model => {
                let option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelDropdown.appendChild(option);
            });
        }
    });

    // Search Button Click Event
    searchButton.addEventListener("click", function() {
        const selectedMake = makeDropdown.value;
        const selectedModel = modelDropdown.value;

        if (selectedMake && selectedModel) {
            alert(`Searching for ${selectedMake} ${selectedModel}`);
            // Redirect to auction page with selected options
            window.location.href = `./auction.html?make=${selectedMake}&model=${selectedModel}`;
        } else {
            alert("Please select both Make and Model!");
        }
    });
});
