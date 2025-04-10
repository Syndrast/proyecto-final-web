<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
// Asegúrate de tener Ziggy instalado y configurado si usas route() en JS
// Normalmente Breeze lo instala: composer require tightenco/ziggy
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app'; // Normalmente 'app' para Inertia

    /**
     * Determine the current asset version.
     *
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        // Permite la invalidación de caché de assets si cambian
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * Estas props estarán disponibles en TODOS tus componentes de página React.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Usamos array_merge para combinar las props compartidas por defecto de Inertia
        // con las nuestras personalizadas.
        return array_merge(parent::share($request), [

            // Información de Autenticación (Más detallada que la tuya)
            // Esto envía solo los datos necesarios del usuario, no el modelo completo.
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    // Puedes añadir otros campos aquí si los necesitas globalmente
                    // 'initials' => ...
                ] : null, // Devuelve null si el usuario no está autenticado
            ],

            // Información de la sesión (Mensajes flash)
            'flash' => function () use ($request) {
                return [
                    // Obtiene el mensaje 'success' de la sesión. Si no existe, devuelve null.
                    'success' => $request->session()->get('success'),
                    // Obtiene el mensaje 'error' de la sesión. Si no existe, devuelve null.
                    'error' => $request->session()->get('error'),
                    // Puedes añadir otros tipos de mensajes flash que uses (warning, info)
                    // 'warning' => $request->session()->get('warning'),
                    // 'info' => $request->session()->get('info'),
                ];
            }, 

            // Configuración de Ziggy (Si usas route() en JavaScript - Muy común con Breeze/Jetstream)
            // Permite usar las rutas nombradas de Laravel en tus componentes React.
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(), // Exporta las rutas
                // Incluye la URL actual para ayudar a determinar la ruta activa
                'location' => $request->route()->uri(),
            ],

        ]); // Fin de array_merge
    } // Fin del método share
}