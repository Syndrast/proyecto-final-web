<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Permitir a cualquier usuario autenticado crear (ajustar con Policies después)
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:students,email'],
            // Añadir reglas para otros campos
        ];
    }
}
// *** Haz lo mismo para StoreSubjectRequest, StoreEnrollmentRequest, StoreGradeRequest ***
// StoreEnrollmentRequest: 'student_id' => ['required', 'exists:students,id'], 'subject_id' => ['required', 'exists:subjects,id'], 'academic_year' => ['required', 'digits:4']
// StoreGradeRequest: 'enrollment_id' => ['required', 'exists:enrollments,id'], 'score' => ['required', 'numeric', 'min:0', 'max:100'] // o el max que corresponda