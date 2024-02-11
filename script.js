// For patients (patient.html)
let medicationList = [];

document.addEventListener('DOMContentLoaded', function() {
    // Fetch medication details from the server or database
    const storedMedications = localStorage.getItem('medications');
    if (storedMedications) {
        medicationList = JSON.parse(storedMedications);
        displayMedications(medicationList);
    }
});

function addMedication() {
    const medicineName = document.getElementById('medicineName').value;
    const medicationTime = document.getElementById('medicationTime').value;

    if (!medicineName || !medicationTime) {
        alert('Please fill in all fields.');
        return;
    }

    const medication = {
        medicineName,
        medicationTime
    };

    // Add the new medication to the list
    medicationList.push(medication);

    // Save the updated medication list to local storage
    localStorage.setItem('medications', JSON.stringify(medicationList));

    // Display the updated list
    displayMedications(medicationList);

    // Clear the form fields
    document.getElementById('medicineName').value = '';
    document.getElementById('medicationTime').value = '';

    // Show the added medication on the screen
    const addedMedicationContainer = document.getElementById('addedMedication');
    addedMedicationContainer.innerHTML = `Added Medication: ${medicineName} - Time: ${medicationTime}`;
}

// ... (previous code) ...

function displayMedications(medicationList) {
    const medicationListContainer = document.getElementById('medicationList');
    medicationListContainer.innerHTML = ''; // Clear the existing list

    medicationList.forEach((medication, index) => {
        const tr = document.createElement('tr');

        // Medicine Name column
        const medicineNameTd = document.createElement('td');
        medicineNameTd.textContent = medication.medicineName;
        tr.appendChild(medicineNameTd);

        // Medication Time column
        const medicationTimeTd = document.createElement('td');
        medicationTimeTd.textContent = medication.medicationTime;
        tr.appendChild(medicationTimeTd);

        // Action column with Remove button
        const actionTd = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeMedication(index);
        };
        actionTd.appendChild(removeButton);
        tr.appendChild(actionTd);

        // Append the row to the tbody
        medicationListContainer.appendChild(tr);
    });
}

// ... (remaining code) ...

function removeMedication(index) {
    // Remove the medication at the specified index
    medicationList.splice(index, 1);

    // Save the updated medication list to local storage
    localStorage.setItem('medications', JSON.stringify(medicationList));

    // Display the updated list
    displayMedications(medicationList);
}