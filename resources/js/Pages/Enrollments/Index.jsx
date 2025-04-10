import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, enrollments }) {
    const { flash } = usePage().props;
     // TODO: Mostrar notas si se cargan con la matrícula

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Matrículas</h2>}
        >
            <Head title="Matrículas" />

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
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Cabecera: Estudiante, Asignatura, Año, Notas, Acción (Añadir Nota) */}
                                 <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                                        {/* Añadir columna Notas si se traen */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                     {enrollments.data.map((enrollment) => (
                                        <tr key={enrollment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{enrollment.student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.subject.name} ({enrollment.subject.code})</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.academic_year}</td>
                                            {/* Celda para Notas */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                 {/* Enlace para añadir/editar nota */}
                                                <Link href={route('grades.create', enrollment.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Añadir/Ver Nota
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {enrollments.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No hay matrículas registradas.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {/* Paginación */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}