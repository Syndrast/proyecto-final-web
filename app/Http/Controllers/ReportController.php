<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Subject;
use App\Models\Enrollment;
use Illuminate\Http\Request; // Usaremos Request para obtener los criterios
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    // Muestra el formulario para seleccionar criterios
    public function index(): Response
    {
        // Pasa las listas para los selects del formulario
        return Inertia::render('Reports/Index', [
            'students' => Student::orderBy('name')->get(['id', 'name']),
            'subjects' => Subject::orderBy('name')->get(['id', 'name', 'code']),
            // No pasamos reportData inicialmente
        ]);
    }

    // Genera y devuelve los datos del reporte
    public function generate(Request $request): Response
    {
        // Validar la entrada (simple por ahora)
        $request->validate([
            // Validar al menos uno, o según la lógica del reporte
            'report_type' => ['required', 'string', Rule::in(['students_by_subject', 'subjects_by_student'])],
            'subject_id' => ['required_if:report_type,students_by_subject', 'nullable', 'integer', 'exists:subjects,id'],
            'student_id' => ['required_if:report_type,subjects_by_student', 'nullable', 'integer', 'exists:students,id'],
        ]);

        $reportData = null;
        $reportTitle = '';

        if ($request->input('report_type') === 'students_by_subject' && $request->input('subject_id')) {
            $subject = Subject::findOrFail($request->input('subject_id'));
            $reportTitle = "Estudiantes Matriculados en: " . $subject->name;
            // Carga estudiantes matriculados en esa asignatura y sus notas
             $reportData = Enrollment::where('subject_id', $subject->id)
                ->with(['student:id,name,email', 'grade:enrollment_id,score']) // Carga estudiante y nota
                ->join('students', 'enrollments.student_id', '=', 'students.id') // Para ordenar por nombre de estudiante
                ->orderBy('students.name')
                ->get()
                ->map(fn ($enrollment) => [ // Mapeamos para simplificar la estructura
                    'student_name' => $enrollment->student->name,
                    'student_email' => $enrollment->student->email,
                    'score' => $enrollment->grade ? $enrollment->grade->score : 'Sin calificar',
                ]);


        } elseif ($request->input('report_type') === 'subjects_by_student' && $request->input('student_id')) {
            $student = Student::findOrFail($request->input('student_id'));
            $reportTitle = "Asignaturas Matriculadas por: " . $student->name;
            // Carga asignaturas en las que está matriculado el estudiante y sus notas
             $reportData = Enrollment::where('student_id', $student->id)
                ->with(['subject:id,name,code', 'grade:enrollment_id,score']) // Carga asignatura y nota
                ->join('subjects', 'enrollments.subject_id', '=', 'subjects.id') // Para ordenar por nombre de asignatura
                ->orderBy('subjects.name')
                ->get()
                 ->map(fn ($enrollment) => [ // Mapeamos para simplificar la estructura
                    'subject_name' => $enrollment->subject->name,
                    'subject_code' => $enrollment->subject->code,
                    'academic_year' => $enrollment->academic_year,
                    'score' => $enrollment->grade ? $enrollment->grade->score : 'Sin calificar',
                ]);
        }

         // Volvemos a renderizar la misma página, pasando los datos del reporte
         // y las listas originales para el formulario.
        return Inertia::render('Reports/Index', [
            'students' => Student::orderBy('name')->get(['id', 'name']),
            'subjects' => Subject::orderBy('name')->get(['id', 'name', 'code']),
            'reportData' => $reportData, // Los datos generados (o null)
            'reportTitle' => $reportTitle, // Título para el reporte
            'filters' => $request->only(['report_type', 'subject_id', 'student_id']), // Para recordar la selección
        ]);
    }
}