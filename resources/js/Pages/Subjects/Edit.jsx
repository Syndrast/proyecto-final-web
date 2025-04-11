import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// Recibe la asignatura existente como prop 'subject'
export default function Edit({ auth, subject }) {
    // Inicializa useForm con los datos de la asignatura existente
    const { data, setData, patch, processing, errors } = useForm({
        name: subject.name, // Valor inicial del nombre
        code: subject.code, // Valor inicial del código
        // otros campos si existen...
    });

    // Manejador para el envío del formulario
    const submit = (e) => {
        e.preventDefault();
        // Usa 'patch' para la actualización (o 'put')
        // La ruta 'subjects.update' requiere el ID de la asignatura
        patch(route('subjects.update', subject.id), {
            preserveScroll: true, // Opcional: mantiene la posición de scroll
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Asignatura</h2>}
        >
            <Head title="Editar Asignatura" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {/* Campo Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre de la Asignatura" />
                                <TextInput
                                    id="name" name="name" value={data.name} // Usa el estado del formulario
                                    className="mt-1 block w-full" autoComplete="off" isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)} required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Campo Código */}
                            <div>
                                <InputLabel htmlFor="code" value="Código de la Asignatura" />
                                <TextInput
                                    id="code" name="code" value={data.code} // Usa el estado del formulario
                                    className="mt-1 block w-full" autoComplete="off"
                                    onChange={(e) => setData('code', e.target.value)} required
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('subjects.index')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                >
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