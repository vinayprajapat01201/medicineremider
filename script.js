let medicationList = [];

document.addEventListener('DOMContentLoaded', function() {

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

    medicationList.push(medication);

    localStorage.setItem('medications', JSON.stringify(medicationList));

    displayMedications(medicationList);
    document.getElementById('medicineName').value = '';
    document.getElementById('medicationTime').value = '';
    const addedMedicationContainer = document.getElementById('addedMedication');
    addedMedicationContainer.innerHTML = `Added Medication: ${medicineName} - Time: ${medicationTime}`;
}



function displayMedications(medicationList) {
    const medicationListContainer = document.getElementById('medicationList');
    medicationListContainer.innerHTML = '';

    medicationList.forEach((medication, index) => {
        const tr = document.createElement('tr');


        const medicineNameTd = document.createElement('td');
        medicineNameTd.textContent = medication.medicineName;
        tr.appendChild(medicineNameTd);


        const medicationTimeTd = document.createElement('td');
        medicationTimeTd.textContent = medication.medicationTime;
        tr.appendChild(medicationTimeTd);

        const actionTd = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeMedication(index);
        };
        actionTd.appendChild(removeButton);
        tr.appendChild(actionTd);


        medicationListContainer.appendChild(tr);
    });
}


function removeMedication(index) {

    medicationList.splice(index, 1);
    localStorage.setItem('medications', JSON.stringify(medicationList));
    displayMedications(medicationList);
}