import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

// Recibe las listas y opcionalmente los datos del reporte y filtros previos
export default function Index({ auth, students, subjects, reportData = null, reportTitle = '', filters = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        report_type: filters.report_type || 'students_by_subject', // Valor inicial o el del filtro previo
        subject_id: filters.subject_id || '',
        student_id: filters.student_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reports.generate'));
    };

    // Determinar qué select mostrar basado en report_type
    const showSubjectSelect = data.report_type === 'students_by_subject';
    const showStudentSelect = data.report_type === 'subjects_by_student';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Generar Reportes</h2>}
        >
            <Head title="Reportes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Formulario de Selección de Criterios */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Seleccionar Criterios</h2>
                                <p className="mt-1 text-sm text-gray-600">Elige el tipo de reporte y el criterio.</p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                {/* Selección Tipo de Reporte */}
                                <div>
                                    <InputLabel htmlFor="report_type" value="Tipo de Reporte" />
                                    <SelectInput
                                        id="report_type"
                                        name="report_type"
                                        className="mt-1 block w-full"
                                        value={data.report_type}
                                        onChange={(e) => setData('report_type', e.target.value)}
                                        required
                                    >
                                        <option value="students_by_subject">Estudiantes por Asignatura</option>
                                        <option value="subjects_by_student">Asignaturas por Estudiante</option>
                                    </SelectInput>
                                    <InputError message={errors.report_type} className="mt-2" />
                                </div>

                                {/* Selección de Asignatura (Condicional) */}
                                {showSubjectSelect && (
                                    <div>
                                        <InputLabel htmlFor="subject_id" value="Selecciona Asignatura" />
                                        <SelectInput
                                            id="subject_id" name="subject_id" className="mt-1 block w-full"
                                            value={data.subject_id}
                                            onChange={(e) => setData('subject_id', e.target.value)} required
                                        >
                                            <option value="">-- Elige una asignatura --</option>
                                            {subjects.map(subject => (
                                                <option key={subject.id} value={subject.id}>
                                                    {subject.name} ({subject.code})
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.subject_id} className="mt-2" />
                                    </div>
                                )}

                                {/* Selección de Estudiante (Condicional) */}
                                {showStudentSelect && (
                                     <div>
                                        <InputLabel htmlFor="student_id" value="Selecciona Estudiante" />
                                        <SelectInput
                                            id="student_id" name="student_id" className="mt-1 block w-full"
                                            value={data.student_id}
                                            onChange={(e) => setData('student_id', e.target.value)} required
                                        >
                                            <option value="">-- Elige un estudiante --</option>
                                             {students.map(student => (
                                                <option key={student.id} value={student.id}>
                                                    {student.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.student_id} className="mt-2" />
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Generar Reporte</PrimaryButton>
                                    {/* Puedes añadir un mensaje 'Reciente' aquí si es necesario */}
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Sección de Resultados (Condicional) */}
                    {reportData && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{reportTitle}</h3>
                            {reportData.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            {/* Cabeceras dinámicas según el tipo de reporte */}
                                            {showSubjectSelect && ( // Reporte Estudiantes por Asignatura
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                                                </tr>
                                            )}
                                            {showStudentSelect && ( // Reporte Asignaturas por Estudiante
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
                                                </tr>
                                            )}
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {reportData.map((item, index) => (
                                                <tr key={index}> {/* Usar un índice o ID más robusto si es posible */}
                                                    {showSubjectSelect && (<>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.student_name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.student_email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.score}</td>
                                                    </>)}
                                                     {showStudentSelect && (<>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subject_name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subject_code}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.academic_year}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.score}</td>
                                                    </>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="mt-1 text-sm text-gray-600">No se encontraron resultados para los criterios seleccionados.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}