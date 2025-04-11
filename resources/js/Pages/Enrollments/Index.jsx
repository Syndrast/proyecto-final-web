import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, enrollments }) {
    const { flash } = usePage().props;

    // Helper para formatear la nota (opcional)
    const formatScore = (score) => {
        // Puedes añadir lógica de formato aquí si quieres (ej. toFixed(2))
        // Por ahora, solo devuelve el score tal cual.
        return score;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Matrículas y Calificaciones</h2>}
        >
            <Head title="Matrículas y Calificaciones" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                     {flash.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-end mb-4">
                                <Link href={route('enrollments.create')}>
                                    <PrimaryButton>Nueva Matrícula</PrimaryButton>
                                </Link>
                            </div>
                             <div className="overflow-x-auto"> {/* Envuelve la tabla para scroll horizontal si es necesario */}
                                <table className="min-w-full divide-y divide-gray-200">
                                     <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nota (0-20)</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                         {enrollments.data.map((enrollment) => (
                                            <tr key={enrollment.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enrollment.student.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.subject.name} ({enrollment.subject.code})</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.academic_year}</td>
                                                {/* *** CELDA PARA LA NOTA *** */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    {/* Comprueba si existe enrollment.grade y muestra la nota o un texto alternativo */}
                                                    {enrollment.grade ? formatScore(enrollment.grade.score) : 'Sin calificar'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-col"> {/* Contenedor para apilar las acciones */}
                                                        <Link href={route('grades.create', enrollment.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            {enrollment.grade ? 'Editar Nota' : 'Registrar Nota'}
                                                        </Link>

                                                        {enrollment.grade && (
                                                            <button
                                                                onClick={() => {
                                                                    console.log('Intentando eliminar Grade ID:', enrollment.grade?.id);
                                                                    const gradeId = enrollment.grade?.id;
                                                                    if (!gradeId) {
                                                                        console.error('Error: No se pudo obtener el ID de la nota para eliminar.');
                                                                        alert('Error: No se pudo obtener el ID de la nota.');
                                                                        return;
                                                                    }
                                                                    if (window.confirm('¿Estás seguro de eliminar esta calificación?')) {
                                                                        router.delete(route('grades.destroy', { grade: enrollment.grade.id }), {
                                                                            preserveScroll: true,
                                                                        });
                                                                    }
                                                                }}
                                                                className="text-red-600 hover:text-red-900 font-medium text-left"
                                                                type="button"
                                                            >
                                                                Eliminar Nota
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => {
                                                                if (window.confirm('¿Estás seguro de que deseas eliminar esta matrícula? Esta acción no se puede deshacer.')) {
                                                                    router.delete(route('enrollments.destroy', enrollment.id), {
                                                                        preserveScroll: true,
                                                                    });
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900 text-left"
                                                        >
                                                            Desmatricular
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {enrollments.data.length === 0 && (
                                            <tr>
                                                {/* *** Colspan aumentado *** */}
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No hay matrículas registradas.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}