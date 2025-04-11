<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Enrollment;
use App\Models\Grade; 
use Illuminate\Http\Request;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class SubjectController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Subjects/Index', [
            'subjects' => Subject::latest()->paginate(10) // Paginación simple
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Subjects/Create');
    }

    public function store(StoreSubjectRequest $request): RedirectResponse
    {
        Subject::create($request->validated());
        return redirect()->route('subjects.index')->with('success', 'usuario registrado correctamente.');
    }

    public function edit(Subject $subject): Response // <-- Route Model Binding
    {
        // Pasa la asignatura existente a la vista de edición
        return Inertia::render('Subjects/Edit', [
            'subject' => $subject // La variable debe coincidir con la prop esperada en Edit.jsx
        ]);
    }

    public function update(UpdateSubjectRequest $request, Subject $subject): RedirectResponse // <-- Route Model Binding y FormRequest
    {
        // $request->validated() contiene los datos validados (name, code, etc.)
        $subject->update($request->validated());

        // Redirige de vuelta al índice con un mensaje flash
        return redirect()->route('subjects.index')->with('success', 'Asignatura actualizada correctamente.');
    }

    public function destroy(Subject $subject): RedirectResponse // <-- Route Model Binding
    {
        $subject->delete();

        return redirect()->route('subjects.index')->with('success', 'Asignatura y sus datos asociados eliminados correctamente.');
    }
}
