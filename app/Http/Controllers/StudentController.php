<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest; // Importa tu request
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

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

    // Otros métodos (show, edit, update, destroy) se añadirían para Niveles 2 y 3
}