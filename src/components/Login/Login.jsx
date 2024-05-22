import React from 'react';
import {
  emailValidationMessage,
  validateEmail,
  validatePassword,
  passwordValidationMessage,
  validateUser,
  userValidationMessage
} from '../../shared/validators/validator.js';
import { Input } from '../Input.jsx';
import { useState } from 'react';
import { Logo } from '../Logo.jsx';
import { useLogin } from '../../shared/hooks/useLogin.jsx';
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    user: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const isSubmitButtonDisable = !formData.user.isValid || !formData.password.isValid;

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'user':
        isValid = validateUser(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.user.value, formData.password.value);
  };

  return (
<div className="login-container" style={styles.loginContainer}>
      <Logo text="Login" />
      <form name="form1" className="auth-form" onSubmit={handleLogin} style={styles.form}>
        <Input
          field="user"
          label={
            <label style={styles.label}>
              <FaUser style={styles.icon} /> User
            </label>
          }
          value={formData.user.value}
          onChangeHandler={onValueChange}
          type="user"
          placeholder="User"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.user.showError}
          validationMessage={userValidationMessage}
          inputStyle={styles.input}
        />
        {!formData.user.value && (
          <div style={styles.placeholderText}>Please enter your credentials</div>
        )}

        <Input
          field="password"
          label={
            <label style={styles.label}>
              <FaLock style={styles.icon} /> Password
            </label>
          }
          value={formData.password.value}
          onChangeHandler={onValueChange}
          type="password"
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
          inputStyle={styles.input}
        />
        {!formData.password.value && (
          <div style={styles.placeholderText}>Please enter your password</div>
        )}

        <button
          className="btn btn-primary rounded-pill text-white login-button"
          style={styles.button}
          disabled={isSubmitButtonDisable}
        >
          LogIn
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label" style={styles.switchLabel}>
        ¿Aún no tienes una cuenta? ¡Registrate...!
      </span>
    </div>
  );
};

const styles = {
  loginContainer: {
    backgroundColor: '#ecf8d4',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: '5rem',
    fontFamily: 'Arial, sans-serif' 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: '0.5rem'
  },
  icon: {
    marginRight: '0.5rem',
    color: '#cb8e5f'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #e0deab',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    fontFamily: 'Arial, sans-serif' 
  },
  placeholderText: {
    color: 'gray',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#cb8e5f',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '50px',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '1rem',
    fontFamily: 'Arial, sans-serif' 
  },
  switchLabel: {
    color: '#0d0502',
    textAlign: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif' 
  }
};
