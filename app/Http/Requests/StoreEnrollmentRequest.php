<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Necesario para reglas de existencia y unique

class StoreEnrollmentRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Para el MVP, cualquier usuario autenticado puede crear una matrícula.
        // Podrías refinarlo con Policies más adelante.
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
            'student_id' => [
                'required',
                'integer',
                Rule::exists('students', 'id'),
                // Regla de unicidad combinada para la tabla 'enrollments'
                Rule::unique('enrollments')->where(function ($query) {
                    // Construye la condición WHERE para la validación unique
                    return $query->where('subject_id', $this->input('subject_id'))
                                 ->where('academic_year', $this->input('academic_year'));
                    // Laravel automáticamente añadirá ->where('student_id', $this->input('student_id'))
                    // porque estamos aplicando la regla al campo 'student_id'.
                })
            ],
            'subject_id' => [
                'required',
                'integer',
                Rule::exists('subjects', 'id')
            ],
            'academic_year' => [
                'required',
                'digits:4',
                'integer',
                'min:2000',
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
            'student_id.required' => 'Debes seleccionar un estudiante.',
            'student_id.integer' => 'El estudiante seleccionado no es válido.',
            'student_id.exists' => 'El estudiante seleccionado no existe.',
            'student_id.unique' => 'El estudiante ya está matriculado en esta asignatura para el año académico seleccionado.',
            'subject_id.required' => 'Debes seleccionar una asignatura.',
            'subject_id.integer' => 'La asignatura seleccionada no es válida.',
            'subject_id.exists' => 'La asignatura seleccionada no existe.',
            'academic_year.required' => 'El año académico es obligatorio.',
            'academic_year.digits' => 'El año académico debe tener 4 dígitos (ej. 2024).',
            'academic_year.integer' => 'El año académico debe ser un número.',
            'academic_year.min' => 'El año académico no parece ser válido.',
        ];
    }
}