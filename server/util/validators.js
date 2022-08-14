module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.email = 'E-mail must not be empty'
    } else {
        const validationRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!email.match(validationRegex)) {
            errors.email = 'E-mail must be valid'
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    } else {
        if (password !== confirmPassword) {
            errors.password = 'Passwords must match'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (
    username,
    password,
) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}