import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // <-- ¡Importante!
import { Head } from '@inertiajs/react';

// Asegúrate de que recibe 'auth' como prop
export default function Dashboard({ auth }) {
    return (
        // ¡Asegúrate que usa AuthenticatedLayout y le pasa el user y el header!
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">¡Has iniciado sesión!</div>
                        {/* Aquí puedes añadir contenido específico de tu dashboard más adelante */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}