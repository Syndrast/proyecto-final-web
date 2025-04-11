<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest; // Importa tu request
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Enrollment;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Students/Index', [
            'students' => Student::latest()->paginate(10) // Paginación simple
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Students/Create');
    }

    public function store(StoreStudentRequest $request): RedirectResponse
    {
        Student::create($request->validated());
        return redirect()->route('students.index')->with('success', 'Estudiante registrado correctamente.');
    }

    // Método para mostrar el formulario de edición
    public function edit(Student $student): Response // <-- Route Model Binding
    {
        // Pasa el estudiante existente a la vista de edición
        return Inertia::render('Students/Edit', [
            'student' => $student
        ]);
    }

    // Método para procesar la actualización
    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse // <-- Route Model Binding y FormRequest
    {
        // $request->validated() ya contiene los datos validados
        $student->update($request->validated());

        // Redirigir de vuelta al índice con un mensaje
        return redirect()->route('students.index')->with('success', 'Estudiante actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student): RedirectResponse // <-- Route Model Binding
    {
        $student->delete();

        // Redirigir de vuelta al índice con un mensaje
        return redirect()->route('students.index')->with('success', 'Estudiante y sus datos asociados eliminados correctamente.');
    }
}