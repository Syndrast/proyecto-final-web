import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
    // Hook useForm de Inertia para manejar el estado del formulario, errores y envío
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Nombre de la asignatura
        code: '', // Código único de la asignatura
    });

    // Función para manejar el envío del formulario
    const submit = (e) => {
        e.preventDefault(); // Previene el envío de formulario HTML estándar
        // Envía los datos al endpoint 'subjects.store' definido en las rutas de Laravel
        post(route('subjects.store'), {
            onSuccess: () => reset(), // Limpia el formulario si el registro es exitoso
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registrar Nueva Asignatura</h2>}
        >
            <Head title="Registrar Asignatura" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6"> {/* Añadido space-y-6 para espaciado */}
                            {/* Campo Nombre */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre de la Asignatura" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="off" // Puede que no sea necesario el autocompletado aquí
                                    isFocused={true} // Pone el foco en este campo al cargar
                                    onChange={(e) => setData('name', e.target.value)} // Actualiza el estado del formulario
                                    required // Campo obligatorio HTML5
                                />
                                {/* Muestra errores de validación para este campo */}
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Campo Código */}
                            <div>
                                <InputLabel htmlFor="code" value="Código de la Asignatura" />
                                <TextInput
                                    id="code"
                                    name="code"
                                    value={data.code}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
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
                                    {processing ? 'Registrando...' : 'Registrar Asignatura'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}