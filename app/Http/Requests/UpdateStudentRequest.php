<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Necesario para ignore

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Podrías usar Policies: return $this->user()->can('update', $this->student);
        return true; // Permitir por ahora
    }

    public function rules(): array
    {
        // Obtenemos el ID del estudiante desde el parámetro de la ruta
        $studentId = $this->route('student')->id; // Asume Route Model Binding

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                // La regla unique debe ignorar el estudiante actual
                Rule::unique('students', 'email')->ignore($studentId)
            ],
            // Añadir reglas para otros campos si existen
        ];
    }

     public function messages(): array // Mensajes personalizados (opcional)
     {
         return [
             'name.required' => 'El nombre es obligatorio.',
             'email.required' => 'El email es obligatorio.',
             'email.email' => 'El email no tiene un formato válido.',
             'email.unique' => 'Este email ya está registrado por otro estudiante.',
         ];
     }
}