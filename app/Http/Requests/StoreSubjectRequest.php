<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Necesario para reglas más complejas como unique

class StoreSubjectRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', // El nombre es obligatorio
                'string',   // Debe ser una cadena de texto
                'max:255'   // Longitud máxima de 255 caracteres
            ],
            'code' => [
                'required', // El código es obligatorio
                'string',   // Debe ser una cadena de texto
                'max:50',   // Longitud máxima de 50 caracteres (ajustar si es necesario)
                Rule::unique('subjects', 'code') // Debe ser único en la tabla 'subjects', columna 'code'
            ],
        ];
    }

    /**
     * Obtiene los mensajes de error personalizados para las reglas de validación.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la asignatura es obligatorio.',
            'name.max' => 'El nombre de la asignatura no puede exceder los 255 caracteres.',
            'code.required' => 'El código de la asignatura es obligatorio.',
            'code.max' => 'El código de la asignatura no puede exceder los 50 caracteres.',
            'code.unique' => 'Ya existe una asignatura con este código.',
        ];
    }
}