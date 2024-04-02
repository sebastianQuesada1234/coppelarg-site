import styles from "./ModularTemplate.css";
import { secureJsonParse, checkTimeRange, gridClass } from './Helpers.js';
import formSchema from './schemas/Form.js';
import React, { useState } from 'react';

const Form = ({ fields = [], checks = [], button = "", succesMessage = "", entity = "", showSuccesMessage = false, logic }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const handleChange = (e, field) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    };

    const validateText = (text) => {
        const re = /^[A-Za-z\s]+$/;
        return re.test(String(text));
    };

    const validateNumber = (number) => {
        const re = /^[0-9]+$/;
        return re.test(String(number));
    };

    const validateDNI = (dni) => {
        const re = /^[0-9]{7,8}$/;
        return re.test(String(dni));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        const newErrors = {};

        fields.forEach((field) => {
            const value = formData[field.mdLabel];
            if (!value) {
                newErrors[field.mdLabel] = `${field.__editorItemTitle} es requerido`;
                hasError = true;
            } else {
                if (field.type === 'Correo' && !validateEmail(value)) {
                    newErrors[field.mdLabel] = 'Por favor, introduzca una dirección de correo electrónico válida.';
                    hasError = true;
                } else if (field.type === 'Texto' && !validateText(value)) {
                    newErrors[field.mdLabel] = 'El campo solo puede contener letras y espacios.';
                    hasError = true;
                } else if (field.type === 'Nro' && !validateNumber(value)) {
                    newErrors[field.mdLabel] = 'El campo solo puede contener números.';
                    hasError = true;
                } else if (field.type === 'DNI' && (!validateNumber(value) || !validateDNI(value))) {
                    newErrors[field.mdLabel] = 'El campo debe contener entre 7 y 8 números.';
                    hasError = true;
                }
            }
        });

        checks.forEach((check) => {
            if (!formData[check.__editorItemTitle]) {
                newErrors[check.__editorItemTitle] = `Es requerido`;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const formDataToSend = { ...formData };
            // Eliminar checkboxes del formDataToSend
            checks.forEach((check) => delete formDataToSend[check.__editorItemTitle]);

            const response = await fetch(`/api/dataentities/${entity}/documents`, {
                method: 'POST',
                body: JSON.stringify(formDataToSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setSuccess(true);
            } else {
                console.error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    if (success || showSuccesMessage) {
        return <div dangerouslySetInnerHTML={{ __html: succesMessage }} />;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formFieldsContainer}>
            {fields.length > 0 && fields.map((field, index) => (
                <div key={index} className={`${styles.formField} ${gridClass(field.gridAttr)}`}>
                    <label className={styles.formLabel} htmlFor={field.mdLabel}>{field.__editorItemTitle}</label>
                    <input 
                         className={styles.formInput+" "+(errors[field.mdLabel] ? styles.formInputError : '')}
                        type={field.type === 'Correo' ? 'email' : 'text'}
                        id={field.mdLabel}
                        name={field.mdLabel}
                        value={formData[field.mdLabel] || ''}
                        onChange={(e) => handleChange(e, field.mdLabel)}
                    />
                    {errors[field.mdLabel] && <span className={styles.formError}>{errors[field.mdLabel]}</span>}
                </div>
            ))}
            </div>
            <div className={styles.formChecksContainer}>
            {checks.length > 0 && checks.map((check, index) => (
                <div key={index}>
                    <label className={styles.checkboxLine}>
                        <input
                            type="checkbox"
                            name={check.__editorItemTitle}
                            checked={formData[check.__editorItemTitle] || false}
                            onChange={handleCheckboxChange}
                        />
                        <span dangerouslySetInnerHTML={{ __html: check.htmlLabel }} />
                    </label>
                    {errors[check.__editorItemTitle] && <span className={styles.formError}>{errors[check.__editorItemTitle]}</span>}
                </div>
            ))}
            </div>
            {button && <button type="submit">{button}</button>}
        </form>)
};

Form.schema = formSchema;

export default Form;