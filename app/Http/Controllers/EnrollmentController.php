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
        $enrollments = Enrollment::with([
                'student:id,name', 
                'subject:id,name,code',
                'grade:enrollment_id,score,id'
            ])
            ->latest('created_at') // Ordenar por fecha de creación
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
        Enrollment::create($request->validated());
        return redirect()->route('enrollments.index')->with('success', 'Matrícula registrada correctamente.');
    }

    public function destroy(Enrollment $enrollment): RedirectResponse // <-- Route Model Binding
    {
        // Eliminar la nota asociada PRIMERO (si existe)
        // Si tienes onDelete('cascade') en la migración de grades, esto no es estrictamente necesario,
        // pero hacerlo explícito puede ser más claro o útil si no usas cascade.
        $enrollment->grade()->delete(); // Esto elimina la nota si existe (no falla si no existe)

        // Eliminar la matrícula
        $enrollment->delete();

        return redirect()->route('enrollments.index')->with('success', 'Matrícula eliminada correctamente.');
    }
}