import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'; // Componente de Breeze/Jetstream
// Añade un componente de Paginación simple si quieres mostrar los links

export default function Index({ auth, students }) { // students viene del controlador
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estudiantes</h2>}
        >
            <Head title="Estudiantes" />

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
                                <Link href={route('students.create')}>
                                    <PrimaryButton>Registrar Estudiante</PrimaryButton>
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students.data.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                            {/* *** AÑADIR ENLACE DE EDICIÓN *** */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('students.edit', student.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Editar
                                                </Link>
                                                {/* Aquí iría el botón de eliminar en Nivel 3 */}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Ajusta el colspan si tienes una fila de No hay estudiantes */}
                                    {students.data.length === 0 && (
                                        <tr>
                                            <td colSpan="3" /* <-- Ajusta el número */ className="...">No hay estudiantes...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {/* Aquí iría la paginación si la implementas */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}