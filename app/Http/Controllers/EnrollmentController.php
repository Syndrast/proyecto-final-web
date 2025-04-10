<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEnrollmentRequest;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    // Listar matrículas (para poder añadir notas después)
     public function index(): \Inertia\Response
     {
        // Carga ansiosa para evitar N+1
         $enrollments = Enrollment::with(['student:id,name', 'subject:id,name'])
                                 ->latest()
                                 ->paginate(15);

         return Inertia::render('Enrollments/Index', [
             'enrollments' => $enrollments,
         ]);
     }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Enrollments/Create', [
            'students' => Student::orderBy('name')->get(['id', 'name']), // Pasar lista para select
            'subjects' => Subject::orderBy('name')->get(['id', 'name', 'code']) // Pasar lista para select
        ]);
    }

    public function store(StoreEnrollmentRequest $request): RedirectResponse
    {
        // Podrías añadir lógica para verificar si ya existe la matrícula para ese año
        Enrollment::create($request->validated());
        return redirect()->route('enrollments.index')->with('success', 'Matrícula registrada correctamente.');
    }
}