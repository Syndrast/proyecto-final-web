import React, { forwardRef, useEffect, useRef } from 'react';

// Usamos forwardRef para poder pasar una ref al elemento <select> si es necesario
// desde el componente padre, similar a como funciona TextInput de Breeze.
const SelectInput = forwardRef(function SelectInput(
    { className = '', children, ...props }, // Acepta children para las <option>
    ref
) {
    // Si no se pasa una ref externa, usamos una interna.
    const localRef = ref || useRef();

    return (
        <select
            {...props} // Pasa todas las demás props (value, onChange, name, id, required, etc.)
            ref={localRef}
            // Aplica estilos base de Tailwind + clases personalizadas
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className // Permite añadir clases extra desde fuera
            }
        >
            {children} {/* Renderiza las opciones <option> pasadas como hijos */}
        </select>
    );
});

export default SelectInput;