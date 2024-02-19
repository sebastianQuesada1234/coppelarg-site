import React, { useState } from "react";
import style from './formulario.css'
import Axios from "axios";


function Formulario() {
    const [formData, setFormData] = useState({
        mail: "",
        nombre: "",
        apellido: "",
        dni: "",
        phone: ""
    });

    const [errors, setErrors] = useState({
        mail: " ",
        nombre: " ",
        apellido: " ",
        dni: " ",
        phone: " "
    });
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const handleInputChange = (event) => {

        const { name, value, type, checked } = event.target;
        const inputValue = type === "checkbox" ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });

        var error = null;
        
        if (event.target.name == "nombre" && formData.nombre == "")
            error = "Campo obligatorio";        
        if (event.target.name == "apellido" && formData.apellido == "")
            error = "Campo obligatorio";
        if (event.target.name == "dni" && formData.dni == "")
            error = "Campo obligatorio";
        if (event.target.name == "phone" && formData.phone == "")
            error = "Campo obligatorio";
        if (event.target.name == "mail" && !formData.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i))
            error = "Email no válido";
        if (event.target.name == "mail" && formData.mail == "")
            error = "Campo obligatorio";

        if (error == null)
            setErrors({...errors,[name]: " ",});
        else
            setErrors({...errors,[name]: error,});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (formData.nombre == "")
            newErrors.nombre = "Campo obligatorio";        
        if (formData.apellido == "")
            newErrors.apellido = "Campo obligatorio";
        if (formData.dni == "")
            newErrors.dni = "Campo obligatorio";
        if (formData.phone == "")
            newErrors.phone = "Campo obligatorio";
        if (!formData.mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i))
            newErrors.mail = "Email no válido";
        if (formData.mail == "")
            newErrors.mail = "Campo obligatorio";
        if (!formData.aceptoTerminos)
            newErrors.aceptoTerminos = "";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formData);
            setMostrarMensaje(true);

            Axios.post('/api/dataentities/CY/documents', {
                "Email": formData.mail,
                "Nombre": formData.nombre,
                "Apellido": formData.apellido,
                "Documento": formData.dni,
                "Telefono": formData.phone
            })


        }
    };

    return (
        <div className={`${style.box} ${mostrarMensaje ? style.graciasContainer : ''}`}>
            <div className={style.container}>
                {mostrarMensaje ? (
                    <div className={style.msjAgradecimiento}>
                        <h2>¡Gracias por</h2>
                        <h1>suscribirte!</h1>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className={style.textContainer}>
                            <h1>¡Suscribite para enterarte de las ofertas antes que nadie!</h1>
                          
                        </div>
                        <div className={style.formContainer}>
                            <div className={style.row} id={style.nameContainer}>
                                <div className={`${style["col-12"]} ${style["col-md-6"]} ${style["variable-container"]}`} id={style.name}>
                                    <label>Nombre*</label>
                                    <input
                                        type="text"
                                        className={style.input}
                                        placeholder="Ingresá tu nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                    />
                                    {errors.nombre && <p className={style.error}>{errors.nombre}</p>}
                                </div>
                                <div className={`${style["col-12"]} ${style["col-md-6"]} ${style["variable-container"]}`} id={style.name}>
                                    <label>Apellido*</label>
                                    <input
                                        type="text"
                                        className={style.input}
                                        placeholder="Ingresá tu apellido"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                    />
                                    {errors.apellido && <p className={style.error}>{errors.apellido}</p>}
                                </div>
                                <div className={`${style["col-12"]} ${style["col-md-6"]} ${style["variable-container"]}`} id={style.name}>
                                    <label>Telefono*</label>
                                    <input
                                        type="text"
                                        className={style.input}
                                        placeholder="Ingresá tu telefono"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                    />
                                    {errors.phone && <p className={style.error}>{errors.phone}</p>}
                                </div>
                                <div className={`${style["col-12"]} ${style["col-md-6"]} ${style["variable-container"]}`} id={style.name}>
                                    <label>DNI*</label>
                                    <input
                                        type="number"
                                        className={style.input}
                                        placeholder="Ingresá tu dni"
                                        name="dni"
                                        value={formData.dni}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                    />
                                    {errors.dni && <p className={style.error}>{errors.dni}</p>}
                                </div>
                                <div className={`${style["col-12"]} ${style["col-md-6"]} ${style["variable-container"]}`} id={style.lastName} >
                                    <label>Correo electrónico*</label>
                                    <input
                                        type="text"
                                        className={style.input}
                                        placeholder="Ingresá tu correo electrónico"
                                        name="mail"
                                        value={formData.mail}
                                        onChange={handleInputChange}
                                        onBlur={handleInputChange}
                                    />
                                    {errors.mail && <p className={style.error}>{errors.mail}</p>}
                                </div>
                            </div>
                        </div>
                        <div className={style.containerCheck}>
                            <div className={style.check}>
                                <input
                                    type="checkbox"
                                    name="aceptoTerminos"
                                    checked={formData.aceptoTerminos}
                                    onChange={handleInputChange}
                                />
                                <a href="https://www.coppel.com.ar/bases-y-condiciones-sorteos" className={style.link}>ACEPTO TÉRMINOS Y CONDICIONES</a>
                            </div>
                            {errors.aceptoTerminos && <p className={style.error}>{errors.aceptoTerminos}</p>}
                            <input type="submit" value="Suscribite" className={style.btnSubmit} />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Formulario;


/*
return (
    <div className={`${style.box} ${mostrarMensaje ? style.graciasContainer : ''}`}>
        <div className={style.container}>
            {mostrarMensaje ? (
                <div className={style.msjAgradecimiento}>
                    <h2>¡Gracias por</h2>
                    <h1>suscribirte!</h1>
                </div>
            ) : (
                <form onSubmit={onSubmit}>
                    <div className={style.textContainer}>
                        <h1>¡Suscribite y recibí ofertas!</h1>
                        <h2>del 24 de Octubre al 26 de Noviembre</h2>
                    </div>
                    <div className={style.formContainer}>
                        <div id={style.mailContainer} className={style.row}>
                            <div className={`${style["col-12"]} ${style["col-md-6"]}`} id={style.mail}>
                                <label>Mail*</label>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Escribí tu mail aquí"
                                    name="mail"
                                    value={formData.mail}
                                    onChange={handleInputChange}
                                />
                                {errors.mail && <p className={style.error}>{errors.mail}</p>}
                            </div>
                        </div>
                        <div className={style.row} id={style.nameContainer}>
                            <div className={`${style["col-12"]} ${style["col-md-6"]}`} id={style.name}>
                                <label>Nombre*</label>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Escribí tu nombre aquí"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                />
                                {errors.nombre && <p className={style.error}>{errors.nombre}</p>}
                            </div>
                            <div className={`${style["col-12"]} ${style["col-md-6"]}`} id={style.lastName} >
                                <label>Apellido*</label>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Escribí tu apellido aquí"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                />
                                {errors.apellido && <p className={style.error}>{errors.apellido}</p>}
                            </div>
                        </div>
                        <div className={style.row} id={style.dataContainer}>
                            <div className={`${style["col-12"]} ${style["col-md-6"]}`} id={style.dni}>
                                <label>DNI*</label>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Escribí tu DNI aquí"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                />
                                {errors.dni && <p className={style.error}>{errors.dni}</p>}
                            </div>
                            <div className={`${style["col-12"]} ${style["col-md-6"]}`} id={style.telefono}>
                                <label>Teléfono*</label>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Escribí tu teléfono aquí"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                />
                                {errors.telefono && <p className={style.error}>{errors.telefono}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.containerCheck}>
                        <label>También recibirás los mejores contenidos y ofertas del BlackFriday</label>
                        <div className={style.check}>
                            <input
                                type="checkbox"
                                name="aceptoTerminos"
                                checked={formData.aceptoTerminos}
                                onChange={handleInputChange}
                            />
                            <a href="https://www.coppel.com.ar/bases-y-condiciones-sorteos" className={style.link}>ACEPTO TÉRMINOS Y CONDICIONES</a>
                        </div>
                        {errors.aceptoTerminos && <p className={style.error}>{errors.aceptoTerminos}</p>}
                        <input type="submit" value="Suscribite" className={style.btnSubmit} />
                    </div>
                </form>
            )}
        </div>
    </div>
);

*/
