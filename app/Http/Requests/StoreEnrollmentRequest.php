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
                'required', // El ID del estudiante es obligatorio
                'integer',  // Debe ser un número entero
                Rule::exists('students', 'id') // Debe existir un estudiante con este ID en la tabla 'students'
            ],
            'subject_id' => [
                'required', // El ID de la asignatura es obligatorio
                'integer',  // Debe ser un número entero
                Rule::exists('subjects', 'id') // Debe existir una asignatura con este ID en la tabla 'subjects'
            ],
            'academic_year' => [
                'required', // El año académico es obligatorio
                'digits:4', // Debe ser un número de exactamente 4 dígitos (ej. 2024)
                'integer',  // Asegura que sea numérico
                'min:2000', // Año mínimo razonable (ajustar si es necesario)
                // Opcional: Añadir regla 'max' si quieres limitar el año máximo
            ],
            // Validación de Unicidad Combinada (Opcional pero Recomendado)
            // Asegura que no se pueda matricular al mismo estudiante en la misma asignatura en el mismo año dos veces.
            // La restricción UNIQUE en la base de datos ya lo previene, pero esto da feedback antes.
            // Descomentar si se desea validación explícita aquí (requiere ajustar el 'unique'):
            // '*' => [
            //    Rule::unique('enrollments')->where(function ($query) {
            //        return $query->where('student_id', $this->input('student_id'))
            //                     ->where('subject_id', $this->input('subject_id'))
            //                     ->where('academic_year', $this->input('academic_year'));
            //    }),
            //],
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
            'subject_id.required' => 'Debes seleccionar una asignatura.',
            'subject_id.integer' => 'La asignatura seleccionada no es válida.',
            'subject_id.exists' => 'La asignatura seleccionada no existe.',
            'academic_year.required' => 'El año académico es obligatorio.',
            'academic_year.digits' => 'El año académico debe tener 4 dígitos (ej. 2024).',
            'academic_year.integer' => 'El año académico debe ser un número.',
            'academic_year.min' => 'El año académico no parece ser válido.',
             // Mensaje para la regla unique combinada (si se descomenta arriba)
             // '*.unique' => 'Este estudiante ya está matriculado en esta asignatura para este año académico.',
        ];
    }
}