<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGradeRequest;
use App\Models\Enrollment;
use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    // No necesitamos index para el MVP estricto, se ven en Enrollments/Index

    public function create(Enrollment $enrollment): \Inertia\Response // Route Model Binding
    {
       // Cargar datos relacionados para mostrar info útil en el form
       $enrollment->load('student:id,name', 'subject:id,name,code');

        return Inertia::render('Grades/Create', [
            'enrollment' => $enrollment
        ]);
    }

    public function store(StoreGradeRequest $request): RedirectResponse
    {
        Grade::create($request->validated());
        // Redirige a la lista de matrículas donde se verá la nota
        return redirect()->route('enrollments.index')->with('success', 'Calificación registrada correctamente.');
    }
}