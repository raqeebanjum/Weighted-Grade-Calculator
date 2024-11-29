const gradesBody = document.getElementById('gradesBody');
const addRowBtn = document.getElementById('addRowBtn');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const averageResult = document.getElementById('averageResult');

function createRow(isFirstRow = false) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="text" placeholder="${isFirstRow ? 'Assignment Name' : ''}" class="input input-bordered w-full assignment-input text-lg" ${isFirstRow ? '' : 'style="background-color: transparent;"'}>
        </td>
        <td>
            <input type="number" placeholder="${isFirstRow ? 'Grade %' : ''}" class="input input-bordered w-full grade-input text-lg" step="1" min="0" ${isFirstRow ? '' : 'style="background-color: transparent;"'}>
        </td>
        <td>
            <input type="number" placeholder="${isFirstRow ? 'Weight' : ''}" class="input input-bordered w-full weight-input text-lg" step="1" min="0" ${isFirstRow ? '' : 'style="background-color: transparent;"'}>
        </td>
        <td>
            <button class="btn btn-xs btn-ghost remove-row text-lg">✕</button>
        </td>
    `;

    // Remove row functionality
    row.querySelector('.remove-row').addEventListener('click', () => {
        row.remove();
    });

    gradesBody.appendChild(row);
}

// Initialize with 4 rows (first row with assignment name input)
for (let i = 0; i < 4; i++) {
    createRow(i === 0);
}

// Add Row Button
addRowBtn.addEventListener('click', () => createRow());

// Calculate Weighted Average
calculateBtn.addEventListener('click', () => {
    let totalWeightedGrades = 0;
    let totalWeight = 0;

    gradesBody.querySelectorAll('tr').forEach(row => {
        const gradeInput = row.querySelector('.grade-input');
        const weightInput = row.querySelector('.weight-input');

        // Only calculate if all fields are filled
        if (gradeInput.value && weightInput.value) {
            const grade = parseFloat(gradeInput.value);
            const weight = parseFloat(weightInput.value);
            
            totalWeightedGrades += grade * weight;
            totalWeight += weight;
        }
    });

    const weightedAverage = totalWeight > 0 ? (totalWeightedGrades / totalWeight).toFixed(2) : '-';
    averageResult.textContent = weightedAverage;
});

// Reset Button
resetBtn.addEventListener('click', () => {
    gradesBody.innerHTML = '';
    averageResult.textContent = '-';
    for (let i = 0; i < 4; i++) {
        createRow(i === 0);
    }
});