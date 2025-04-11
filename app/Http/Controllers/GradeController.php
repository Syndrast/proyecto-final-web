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
    public function create(Enrollment $enrollment): \Inertia\Response // Route Model Binding
    {
        // Cargar datos relacionados para mostrar info útil en el form
        $enrollment->load('student:id,name', 'subject:id,name,code');

        // Usamos la relación definida en el modelo Enrollment
        $existingGrade = $enrollment->grade; // Esto devolverá el modelo Grade o null

        return Inertia::render('Grades/Create', [
            'enrollment' => $enrollment,
            'existingGrade' => $existingGrade 
        ]);
    }

    public function store(StoreGradeRequest $request): RedirectResponse
    {
        // Datos validados
        $validatedData = $request->validated();

        // Busca una Grade por 'enrollment_id'. Si existe, la actualiza con $validatedData.
        // Si no existe, crea una nueva Grade con $validatedData.
        Grade::updateOrCreate(
            ['enrollment_id' => $validatedData['enrollment_id']], // Criterio de búsqueda
            $validatedData // Datos para actualizar o crear
        );

        // Redirige a la lista de matrículas donde se verá la nota actualizada/creada
        return redirect()->route('enrollments.index')->with('success', 'Calificación guardada correctamente.');
    }

    public function destroy(Grade $grade): RedirectResponse // <-- Route Model Binding
    {
         // ** Opcional: Añadir Autorización (Policy) **
        // if (auth()->user()->cannot('delete', $grade)) {
        //     abort(403);
        // }

        // Simplemente elimina la nota
        $grade->delete();

        // Redirige a la lista de matrículas donde se veían las notas
        return redirect()->route('enrollments.index')->with('success', 'Calificación eliminada correctamente.');
    }
}