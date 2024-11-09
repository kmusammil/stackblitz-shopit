document.addEventListener("DOMContentLoaded", function () {
    const toggleSections = document.querySelectorAll(".toggle-section");
    const formContents = document.querySelectorAll(".form-content");
    let currentStep = 1;

    // Function to show the appropriate form step
    function showForm(step) {
        formContents.forEach(content => {
            content.classList.toggle("hidden", content.closest(".form-box").getAttribute("data-step") != step);
        });
    }

    // Validate form fields
    function validateForm(step) {
        const formBox = document.querySelector(`.form-box[data-step="${step}"]`);
        const inputs = formBox.querySelectorAll("input, select, textarea");
        let isValid = true;

        // Regular expressions for validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;  // Example: 10 digits phone number (can be adjusted as needed)

        // Loop through each input and check if it's valid
        inputs.forEach(input => {
            const value = input.value.trim();
            const type = input.type;

            // Check if the field is required and empty
            if (input.required && !value) {
                isValid = false;
                input.classList.add("border-red-500");
                input.classList.remove("border-green-600");
            }
            // Email validation
            else if (type === 'email' && value && !emailRegex.test(value)) {
                isValid = false;
                input.classList.add("border-red-500");
                input.classList.remove("border-green-600");
            }
            // Phone number validation
            else if (type === 'tel' && value && !phoneRegex.test(value)) {
                isValid = false;
                input.classList.add("border-red-500");
                input.classList.remove("border-green-600");
            }
            // If the field is valid, remove error styles
            else {
                input.classList.add("border-green-600");
                input.classList.remove("border-red-500");
            }
        });

        return isValid;
    }

    // Handle click for toggle sections (step navigation)
    toggleSections.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const step = toggle.getAttribute("data-step");

            // Validate the current step before moving to the next
            if (validateForm(currentStep)) {
                showForm(step);
                currentStep = parseInt(step);
            }
        });
    });

    // Handle next button click (submit-form)
    document.querySelectorAll(".submit-form").forEach(button => {
        button.addEventListener("click", () => {
            // Validate the current step before moving forward
            if (validateForm(currentStep)) {
                if (currentStep < 3) {
                    currentStep++;
                    showForm(currentStep);
                }
            }
        });
    });
    
    // Initially show the first form step
    showForm(currentStep);

    function setStep(stepNumber) {
        // Set all steps to gray first
        const steps = document.querySelectorAll('.toggle-section');
        steps.forEach((step, index) => {
            const stepId = step.getAttribute('data-step');
            const stepElement = document.getElementById('step-' + stepId);
            if (index + 1 <= stepNumber) {
                stepElement.classList.add('bg-green-600');
                stepElement.classList.remove('bg-gray-300');
            } else {
                stepElement.classList.remove('bg-green-600');
                stepElement.classList.add('bg-gray-300');
            }
        });
    }
});
