<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Necesario para reglas de existencia

class StoreGradeRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Para el MVP, cualquier usuario autenticado puede registrar una nota.
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
        // Definimos los límites de la calificación
        $minScore = 0.00;
        $maxScore = 20.00; 

        return [
            'enrollment_id' => [
                'required', // El ID de la matrícula es obligatorio
                'integer',  // Debe ser un número entero
                Rule::exists('enrollments', 'id') // Debe existir una matrícula con este ID
            ],
            'score' => [
                'required',  // La nota es obligatoria
                'numeric',   // Debe ser un valor numérico (permite decimales)
                'min:' . $minScore, // Valor mínimo permitido
                'max:' . $maxScore, // Valor máximo permitido
                // Opcional: especificar número de decimales si es estricto
                // 'decimal:0,2' // Permite entre 0 y 2 decimales
            ],
            'assessment_date' => [
                'nullable', // La fecha puede ser opcional
                'date',     // Debe ser una fecha válida (ej. YYYY-MM-DD)
                'before_or_equal:today' // La fecha no puede ser futura (opcional pero lógico)
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
            'enrollment_id.required' => 'La matrícula asociada es requerida.',
            'enrollment_id.integer' => 'La matrícula asociada no es válida.',
            'enrollment_id.exists' => 'La matrícula asociada no existe.',
            'score.required' => 'La calificación (nota) es obligatoria.',
            'score.numeric' => 'La calificación debe ser un valor numérico.',
            'score.min' => 'La calificación mínima permitida es :min.',
            'score.max' => 'La calificación máxima permitida es :max.',
            //'score.decimal' => 'La calificación puede tener hasta :decimal decimales.',
            'assessment_date.date' => 'La fecha de evaluación no tiene un formato válido.',
            'assessment_date.before_or_equal' => 'La fecha de evaluación no puede ser una fecha futura.',
         ];
    }
}