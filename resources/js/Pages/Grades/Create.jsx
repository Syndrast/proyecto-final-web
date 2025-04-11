import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth, enrollment, existingGrade }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        enrollment_id: enrollment.id,
        score: existingGrade?.score ?? '', // Si existe existingGrade.score, úsalo, sino ''
        assessment_date: existingGrade?.assessment_date
                           ? new Date(existingGrade.assessment_date).toISOString().slice(0, 10) // Formatea si existe
                           : new Date().toISOString().slice(0, 10),
    });

    const submit = (e) => {
        e.preventDefault();
        // El método POST sigue funcionando bien con updateOrCreate en el backend
        post(route('grades.store'), {
        });
    };

    // Determinar si estamos editando o creando para el título (opcional)
    const pageTitle = existingGrade ? 'Editar Calificación' : 'Registrar Calificación';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{pageTitle}</h2>} // Título dinámico
        >
            <Head title={pageTitle} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                         <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <p><strong>Estudiante:</strong> {enrollment.student.name}</p>
                            <p><strong>Asignatura:</strong> {enrollment.subject.name} ({enrollment.subject.code})</p>
                            <p><strong>Año:</strong> {enrollment.academic_year}</p>
                        </div>
                        <form onSubmit={submit} className="p-6">
                             {/* Input oculto y campos de score/assessment_date como estaban antes,
                                 pero ahora 'value' se inicializa con los datos existentes si los hay */}
                             <input type="hidden" name="enrollment_id" value={data.enrollment_id} />
                             <div>
                                <InputLabel htmlFor="score" value="Nota (0 - 20)" />
                                <TextInput
                                    id="score" type="number" step="any" min="0" max="20" name="score"
                                    value={data.score}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('score', e.target.value)}
                                    required isFocused={true}
                                />
                                <InputError message={errors.score} className="mt-2" />
                            </div>
                             <div className="mt-4">
                                <InputLabel htmlFor="assessment_date" value="Fecha Evaluación" />
                                <TextInput
                                    id="assessment_date" type="date" name="assessment_date"
                                    value={data.assessment_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('assessment_date', e.target.value)}
                                />
                                <InputError message={errors.assessment_date} className="mt-2" />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Link href={route('enrollments.index')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                                    Cancelar
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Guardando...' : 'Guardar Calificación'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}