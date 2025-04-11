import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, subjects }) { // 'subjects' es la data paginada pasada desde SubjectController@index
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Asignaturas</h2>}
        >
            <Head title="Asignaturas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Mensaje Flash de Éxito */}
                    {flash.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Botón para ir al formulario de creación */}
                            <div className="flex justify-end mb-4">
                                <Link href={route('subjects.create')}>
                                    <PrimaryButton>Registrar Asignatura</PrimaryButton>
                                </Link>
                            </div>

                            {/* Tabla de Asignaturas */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Código
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {subjects.data.length > 0 ? (
                                            subjects.data.map((subject) => (
                                                <tr key={subject.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {subject.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {subject.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex flex-col">
                                                            <Link
                                                                href={route('subjects.edit', subject.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 text-left"
                                                            >
                                                                Editar
                                                            </Link>
                                                            {/* *** BOTÓN ELIMINAR *** */}
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm('¿Estás MUY seguro de eliminar esta asignatura? Se borrarán también todas sus matrículas y calificaciones. ¡Esta acción es irreversible!')) {
                                                                        router.delete(route('subjects.destroy', subject.id), {
                                                                            preserveScroll: true,
                                                                        });
                                                                    }
                                                                }}
                                                                className="text-red-600 hover:text-red-900 font-medium text-left"
                                                                type="button"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                    No hay asignaturas registradas.
                                                </td>
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