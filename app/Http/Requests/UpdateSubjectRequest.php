<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Necesario para ignore

class UpdateSubjectRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Permitir por ahora
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Obtener el ID de la asignatura del parámetro de ruta
        // Asume Route Model Binding para {subject} en la ruta
        $subjectId = $this->route('subject')->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255'
            ],
            'code' => [
                'required',
                'string',
                'max:50',
                // La regla unique debe ignorar la asignatura actual al verificar el código
                Rule::unique('subjects', 'code')->ignore($subjectId)
            ],
        ];
    }

     /**
     * Obtiene los mensajes de error personalizados (opcional).
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la asignatura es obligatorio.',
            'code.required' => 'El código de la asignatura es obligatorio.',
            'code.unique' => 'Este código ya está asignado a otra asignatura.',
        ];
    }
}