<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Esta tabla representa la matrícula de un estudiante en una asignatura
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->year('academic_year')->nullable(); // Ejemplo de campo extra
            $table->timestamps();

            // Evitar duplicados para el mismo año (opcional)
            $table->unique(['student_id', 'subject_id', 'academic_year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};