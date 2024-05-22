import { useState } from "react";
import { Input } from "./Input.jsx";
import { Logo } from './Logo.jsx';
import { emailValidationMessage, nameValidationMessage, passConfirmValidationMessage, passwordValidationMessage, phoneValidationMessage, surnameValidationMessage, usernameValidationMessage, validateEmail, validateName, validatePassConfirm, validatePassword, validateSurname, valideteUsername } from "../shared/validators/validator.js";
import { useRegister } from "../shared/hooks/useRegister.jsx";
import { FaUser, FaLock, FaLockOpen, FaUserTie } from "react-icons/fa";


export const Register = ({ switchAuthAndler }) => {
    const { register, isLoading } = useRegister()

    const [formData, setFormData] = useState(
        {
            name: {
                value: '',
                isValid: false,
                showError: false
            },
            surname: {
                value: '',
                isValid: false,
                showError: false
            },
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            phone: {
                value: '',
                isValid: false,
                showError: false
            },
            username: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            },
            passwordConfirm: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const isSubmitButtonDisable = 
        !formData.name.isValid ||
        !formData.surname.isValid ||
        !formData.email.isValid ||
        !formData.username.isValid ||
        !formData.phone.isValid||
        !formData.password.isValid ||
        !formData.passwordConfirm.isValid

    const handleValueChange = (value, field) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateName(value)
                break
            case 'surname':
                isValid = validateSurname(value)
                break
            case 'email':
                isValid = validateEmail(value)
                break
            case 'phone':
                isValid = valideteUsername(value)
                break
            case 'username':
                isValid = valideteUsername(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'passwordConfirm':
                isValid = validatePassConfirm(formData.password.value, value)
                break
            default:
                break
        }
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        register(
            formData.name.value,
            formData.surname.value,
            formData.email.value,
            formData.phone.value,
            formData.username.value,
            formData.password.value
        )
    }
    return (
        <div className="login-container" style={styles.loginContainer}>
            <Logo text={"Register Storage"} />
            <form
                className="auth-form"
                onSubmit={handleRegister}
                style={styles.form}
            >

                <Input
                    field='name'
                    label={
                        <label style={styles.label}>
                            <FaUserTie style={styles.icon} /> Name
                        </label>
                    }
                    value={formData.name.value}
                    onChangeHandler={handleValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.name.showError}
                    validationMessage={nameValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field='surname'
                    label={
                        <label style={styles.label}>
                            <FaUserTie style={styles.icon} /> Surname
                        </label>
                    }
                    value={formData.surname.value}
                    onChangeHandler={handleValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.surname.showError}
                    validationMessage={surnameValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field="email"
                    label={
                        <label style={styles.label}>
                            <FaUser style={styles.icon} /> Email
                        </label>
                    }
                    value={formData.email.value}
                    onChangeHandler={handleValueChange}
                    type="email"
                    placeholder="Email"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.email.showError}
                    validationMessage={emailValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field='phone'
                    label={
                        <label style={styles.label}>
                            <FaUserTie style={styles.icon} /> Phone
                        </label>
                    }
                    value={formData.phone.value}
                    onChangeHandler={handleValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.phone.showError}
                    validationMessage={phoneValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field='username'
                    label={
                        <label style={styles.label}>
                            <FaUserTie style={styles.icon} /> Username
                        </label>
                    }
                    value={formData.username.value}
                    onChangeHandler={handleValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.username.showError}
                    validationMessage={usernameValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field="password"
                    label={
                        <label style={styles.label}>
                            <FaLock style={styles.icon} /> Password
                        </label>
                    }
                    value={formData.password.value}
                    onChangeHandler={handleValueChange}
                    type="password"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.password.showError}
                    validationMessage={passwordValidationMessage}
                    inputStyle={styles.input}
                />

                <Input
                    field='passwordConfirm'
                    label={
                        <label style={styles.label}>
                            <FaLockOpen style={styles.icon} /> Password Confirmation
                        </label>
                    }
                    value={formData.passwordConfirm.value}
                    onChangeHandler={handleValueChange}
                    type='password'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.passwordConfirm.showError}
                    validationMessage={passConfirmValidationMessage}
                    inputStyle={styles.input}
                />

                <button
                    className="btn btn-primary rounded-pill text-white login-button"
                    style={styles.button}
                    disabled={isSubmitButtonDisable}
                >
                    Register
                </button>
            </form>
            <span onClick={switchAuthAndler} className="auth-form-switch-label" style={styles.switchLabel}>
                ¿Ya tienes una cuenta? ¡Inicia sesión acá!
            </span>
        </div>
    )
}

const styles = {
    pageContainer: {
      minHeight: '90vh', // Altura mínima de la ventana del navegador
      display: 'flex',
      flexDirection: 'column',
    },
    loginContainer: {
      backgroundColor: '#ecf8d4',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '90%', // Cambiado de 800px a 100%
      margin: 'auto',
      marginTop: '2rem', // Cambiado de 5rem a 2rem
      marginBottom: '2rem', // Espacio al final de la página
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box', // Agregado para incluir el padding en el ancho máximo
    },
    form: {
      width: '90%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#85685a',
      textTransform: 'uppercase',
      letterSpacing: '0.1rem',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      marginBottom: '0.5rem',
    },
    icon: {
      marginRight: '0.5rem',
      color: '#cb8e5f',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '0.25rem',
      border: '1px solid #e0deab',
      fontSize: '1rem',
      width: '100%',
      boxSizing: 'border-box',
      marginBottom: '1rem',
      fontFamily: 'Arial, sans-serif',
    },
    button: {
      backgroundColor: '#cb8e5f',
      border: 'none',
      padding: '0.75rem',
      borderRadius: '50px',
      color: '#fff',
      cursor: 'pointer',
      marginTop: '1rem',
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      maxWidth: '200px',
    },
    switchLabel: {
      color: '#0d0502',
      textAlign: 'center',
      marginTop: '1rem',
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif',
    },
};






  
  

  
  
  