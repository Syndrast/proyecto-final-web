<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSubjectRequest; // Importa tu request
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

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
}
