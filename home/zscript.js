document.addEventListener("DOMContentLoaded", function() {
    const carData = {
        "TOYOTA": ["1 SERIES", "AQUA", "ALLION", "ALPHARD", "CAMRY", "COROLLA"],
        "NISSAN": ["AD", "ALTIMA", "CARAVAN", "CEDRIC", "CIMA", "CIVILIAN", "LEAF"],
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
        // Get the selected values of make and model
        var make = document.getElementById("make").value;
        var model = document.getElementById("model").value;

        // Validate if both make and model are selected
        if (make !== "Make" && model !== "Model") {
            // Redirect to the filter page with make and model as query parameters
            var searchUrl = "../search_results/c_filter.html?make=" + encodeURIComponent(make) + "&model=" + encodeURIComponent(model);
            window.location.href = searchUrl;
        } else {
            alert("Please select both a make and a model before searching.");
        }
    });
});
