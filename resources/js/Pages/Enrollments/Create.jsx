import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput'; // Asume que tienes o creas este componente
import TextInput from '@/Components/TextInput';

export default function Create({ auth, students, subjects }) { // Recibe listas del controlador
    const currentYear = new Date().getFullYear();
    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: '',
        subject_id: '',
        academic_year: currentYear.toString(), // Año actual por defecto
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('enrollments.store'), {
            onSuccess: () => reset('student_id', 'subject_id'), // Limpia selects
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Matricular Estudiante</h2>}>
            <Head title="Matricular Estudiante" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="student_id" value="Estudiante" />
                                <SelectInput // Necesitas crear este componente genérico <select>
                                    id="student_id"
                                    name="student_id"
                                    className="mt-1 block w-full"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona un estudiante</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>{student.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.student_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="subject_id" value="Asignatura" />
                                <SelectInput
                                    id="subject_id"
                                    name="subject_id"
                                    className="mt-1 block w-full"
                                    value={data.subject_id}
                                    onChange={(e) => setData('subject_id', e.target.value)}
                                    required
                                >
                                     <option value="">Selecciona una asignatura</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>{subject.name} ({subject.code})</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.subject_id} className="mt-2" />
                            </div>

                            <div>
                                 <InputLabel htmlFor="academic_year" value="Año Académico" />
                                  <TextInput
                                    id="academic_year"
                                    type="number"
                                    name="academic_year"
                                    value={data.academic_year}
                                    className="mt-1 block w-full"
                                    min="2000" // Ejemplo
                                    max={currentYear + 1} // Ejemplo
                                    onChange={(e) => setData('academic_year', e.target.value)}
                                    required
                                />
                                <InputError message={errors.academic_year} className="mt-2" />
                            </div>


                            <div className="flex items-center justify-end">
                                <Link href={route('enrollments.index')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                                    Cancelar
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Matriculando...' : 'Matricular'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}