<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\GradeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas de Breeze (Login, Register, Dashboard...)
Route::get('/', function () {
    if (Auth::check()) {
        // Si el usuario está autenticado, redirige al dashboard
        // Opcionalmente, podrías renderizar directamente la página de dashboard aquí
        // return Inertia::render('Dashboard');
         return redirect()->route('dashboard');
    }
    // Si no está autenticado, muestra la página Welcome de Breeze/Inertia
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas protegidas por autenticación
Route::middleware('auth')->group(function () {
    // Perfil (de Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // MVP Nivel 1: Gestión Académica
    Route::resource('students', StudentController::class)->only(['index', 'create', 'store']); // Consultar (index), Registrar (create, store)
    Route::resource('subjects', SubjectController::class)->only(['index', 'create', 'store']); // Consultar (index), Registrar (create, store)

    // Matricular Estudiante
    Route::get('/enrollments/create', [EnrollmentController::class, 'create'])->name('enrollments.create');
    Route::post('/enrollments', [EnrollmentController::class, 'store'])->name('enrollments.store');
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index'); // Para listar matriculas y poder añadir nota

    // Registrar y Consultar Calificación (simple)
    Route::get('/grades/create/{enrollment}', [GradeController::class, 'create'])->name('grades.create'); // Pasar la matrícula
    Route::post('/grades', [GradeController::class, 'store'])->name('grades.store');
     // Podríamos añadir un index a GradeController o mostrar las notas en enrollments.index
    // Route::get('/grades', [GradeController::class, 'index'])->name('grades.index'); // Opcional para MVP

    Route::resource('students', StudentController::class)->only(['index', 'create', 'store']);
    Route::resource('subjects', SubjectController::class)->only(['index', 'create', 'store']);
});

require __DIR__.'/auth.php'; // Rutas de autenticación de Breeze