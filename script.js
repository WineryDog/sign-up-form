const fields = [
    { id: 'fname', errorId: 'fname-error', message: 'First name is required', pattern: /.+/ },
    { id: 'lname', errorId: 'lname-error', message: 'Last name is required', pattern: /.+/ },
    { id: 'email', errorId: 'email-error', message: 'Valid email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: 'phone', errorId: 'phone-error', message: 'Please enter a 10 digit phone number', pattern: /^\d{10}$/ },
    { id: 'password', errorId: 'password-error', message: 'Invalid password', pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9\W]).{8,}$/ },
    { id: 'c-password', errorId: 'c-password-error', message: 'Passwords do not match', pattern: null }
];

function validateField(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    
    if (field.id === 'password') {
        validatePassword();
        return;
    }
    
    if (field.id === 'c-password') {
        if (input.value !== document.getElementById('password').value) {
            error.textContent = field.message;
            error.style.display = 'block';
            input.classList.add('invalid');
        } else {
            error.textContent = '';
            error.style.display = 'none';
            input.classList.remove('invalid');
        }
    } else {
        if (!field.pattern.test(input.value)) {
            error.textContent = field.message;
            error.style.display = 'block';
            input.classList.add('invalid');
        } else {
            error.textContent = '';
            error.style.display = 'none';
            input.classList.remove('invalid');
        }
    }
}

function validatePassword() {
    const input = document.getElementById('password');
    const error = document.getElementById('password-error');
    const currentValue = input.value;
    const regExpCap = /[A-Z]/g;
    const regExpDigOrSpecial = /[0-9\W]/g;
    let result = '';

    if (!regExpCap.test(currentValue)) {
        result += 'Missing at least 1 capital letter<br>';
    }
    if (!regExpDigOrSpecial.test(currentValue)) {
        result += 'Missing at least 1 number or Symbol<br>';
    }
    if (currentValue.length < 8) {
        result += 'Password must be at least 8 characters<br>';
    }

    error.innerHTML = result;

    if (result === '') {
        error.style.display = 'none';
        input.classList.remove('invalid');
    } else {
        error.style.display = 'block';
        input.classList.add('invalid');
    }
}

function handleBlur(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    input.addEventListener('blur', () => {
        if (input.value === '' || input.validity.patternMismatch) {
            error.style.display = 'none';
            input.classList.remove('invalid');
        }
    });
}

fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener('focus', () => validateField(field));
    input.addEventListener('input', () => validateField(field));
    handleBlur(field);
});

const form = document.getElementById('sign-up');
form.addEventListener('submit', function(event) {
    let isValid = true;
    fields.forEach(field => {
        validateField(field);
        if (document.getElementById(field.errorId).style.display === 'block') {
            isValid = false;
        }
    });
    if (!isValid) {
        event.preventDefault();
    } else {
        alert("Thanks for subscribing!");
    }
});