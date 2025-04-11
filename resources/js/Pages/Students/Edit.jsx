import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// Recibe el estudiante existente como prop
export default function Edit({ auth, student }) {
    // Inicializa useForm con los datos del estudiante existente
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: student.name, // Valor inicial
        email: student.email, // Valor inicial
        // otros campos...
    });

    const submit = (e) => {
        e.preventDefault();
        // Usa 'patch' o 'put' para la actualización.
        // La ruta 'students.update' necesita el ID del estudiante.
        patch(route('students.update', student.id), {
            // onSuccess: () => reset(), // No es usual resetear en edit, quizás redirigir
            preserveScroll: true, // Opcional: mantener scroll position
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Estudiante</h2>}
        >
            <Head title="Editar Estudiante" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name" name="name" value={data.name} // Usa valor del estado
                                    className="mt-1 block w-full" autoComplete="name" isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)} required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email" type="email" name="email" value={data.email} // Usa valor del estado
                                    className="mt-1 block w-full" autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)} required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Añadir más campos aquí si es necesario */}

                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('students.index')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                                    Cancelar
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Guardando...' : 'Guardar Cambios'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}