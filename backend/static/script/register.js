// Add More Education Logic
document.getElementById('add-more-education').addEventListener('click', function() {
    // Get the education section where new education sets will be added
    let educationSection = document.getElementById('education-section');
    
    // Create a new div for the education set
    let newEducationSet = document.createElement('div');
    newEducationSet.classList.add('education-set');
    
    // Add the HTML for the new education set
    newEducationSet.innerHTML = `
        <label for="education">Education:</label>
        <select name="education" class="education-dropdown">
            <option value="btech">B.Tech</option>
            <option value="msc">M.Sc</option>
        </select>

        <label for="education-field">Education Field:</label>
        <select name="education-field" class="education-field-dropdown">
            <option value="cs">Computer Science</option>
            <option value="ee">Electrical Engineering</option>
        </select>

        <label for="graduation-year">Year of Graduation:</label>
        <input type="date" name="graduation-year" class="graduation-year-input">
    `;
    
    // Insert the new education set before the "Add More" button
    educationSection.insertBefore(newEducationSet, document.getElementById('add-more-education'));
});

// Add More Experience Logic
document.getElementById('add-more-experience').addEventListener('click', function() {
    // Get the experience section where new experience sets will be added
    let experienceSection = document.getElementById('experience-section');
    
    // Create a new div for the experience set
    let newExperienceSet = document.createElement('div');
    newExperienceSet.classList.add('experience-set');
    
    // Add the HTML for the new experience set
    newExperienceSet.innerHTML = `
        <label for="experience-job-title">Job Title:</label>
        <input type="text" name="experience-job-title" class="experience-job-title" placeholder="Data Analyst">

        <label for="experience-duration">Duration:</label>
        <input type="number" name="experience-duration" class="experience-duration" placeholder="2 years">

        <label for="year-of-resignation">Year of Resignation:</label>
        <input type="date" name="year-of-resignation" class="year-of-resignation">
    `;
    
    // Insert the new experience set before the "Add More" button
    experienceSection.insertBefore(newExperienceSet, document.getElementById('add-more-experience'));
});
