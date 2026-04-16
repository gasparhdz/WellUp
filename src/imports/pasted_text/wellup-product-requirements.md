WellUp
Product Requirements Document
Versión: 1.0 — MVP
Plataforma: App Móvil (iOS + Android)
Mercado: LATAM — B2B (empresas medianas y grandes)
Lo que es tuyo está bajo tu piel.

1. Problema
El estrés, el mal descanso, la falta de foco y la sobrecarga cognitiva son los principales enemigos de la productividad en las empresas. Sin embargo, las soluciones de bienestar corporativo actuales fallan por tres razones:

Contenido genérico y tono motivacional que nadie quiere escuchar.
Herramientas largas que exigen demasiado tiempo al empleado.
Falta de datos reales para que RR.HH. pueda medir el impacto del bienestar en el equipo.

WellUp resuelve esto con microintervenciones diarias de 30 segundos a 5 minutos, tono directo y humano, y un dashboard agregado y anónimo para líderes — sin espiar a nadie.


2. Usuarios
2.1 Usuario Principal — Empleado
Perfil: Persona de 25 a 45 años que trabaja en una empresa mediana o grande (50 a 1.000 empleados). Alta exposición a estrés, multitarea y sobrecarga cognitiva. No va a terapia por tiempo, costo o estigma. Usa apps de fitness y entiende el lenguaje de datos personales. Consume contenido visual y directo (Instagram, TikTok, YouTube).

Situación actual sin WellUp:
No lleva ningún control de su estado emocional.
Gestiona el estrés de forma reactiva (cuando ya desbordó).
No tiene herramientas rápidas y privadas para hacer una pausa en el trabajo.

2.2 Usuario Secundario — Líder de Equipo
Perfil: Responsable de People, RR.HH. o líder de equipo dentro de la misma empresa. Necesita medir el bienestar de su equipo de forma agregada, sin invadir la privacidad individual.

Situación actual sin WellUp:
No tiene datos objetivos sobre el estado emocional del equipo.
Detecta el burnout o el malestar tarde, cuando ya hay rotación o conflictos.
Los programas de bienestar que contrata no son medibles.


3. Flujos de Usuario
3.1 Flujo del Empleado — Onboarding
Descarga la app y abre la pantalla de Bienvenida con el Manifiesto.
Se registra con email y contraseña. Recibe email de verificación.
Confirma su cuenta desde el email y vuelve a la app.
Elige la hora a la que quiere recibir su notificación diaria.
Accede a la pantalla principal HOY.

3.2 Flujo del Empleado — Uso diario (Core Loop)
Recibe notificación disruptiva a la hora elegida. Ej: "¿Cómo llegás hoy?"
Abre la app. Realiza el check-in emocional eligiendo su estado: Genial / Bien / Regular / Mal / Estresado.
Ve su racha actualizada y el score del día.
(Opcional) Usa alguna herramienta de HOY: escribe su frase de intención, usa Soltá lo que te pesa, hace la respiración guiada o el reseteo de 60 segundos.
(Opcional) Navega a EXPLORAR y elige un concepto de la biblioteca (CAOS, MIEDO, LÍMITES, etc.).
(Opcional) Revisa su evolución semanal en la sección YO.

3.3 Flujo del Líder — Dashboard
Inicia sesión en la app con su cuenta de rol Líder.
Accede directamente a su vista de Dashboard (no ve las herramientas de empleado).
Visualiza las 4 métricas agregadas y anónimas del equipo.
Analiza tendencias semanales para tomar decisiones de gestión de personas.


4. Modelo de Datos
4.1 Users
id (uuid)
email (string, único)
password_hash (string)
email_verified (boolean)
role (enum: empleado | lider)
notification_time (time) — hora preferida de notificación
streak_count (integer) — días consecutivos activos
created_at (timestamp)

4.2 Daily Checkins
id (uuid)
user_id (foreign key → Users)
estado (enum: genial | bien | regular | mal | estresado)
score_dia (integer, 1-10)
frase_intencion (string, opcional)
created_at (timestamp, date)

4.3 Content (Biblioteca de conceptos — hardcodeado MVP)
id (uuid)
titulo (string) — ej: CAOS, MIEDO, LÍMITES
descripcion (string)
estado_emocional_afin (string)
audio_url (string)
imagen_url (string)
activo (boolean)

4.4 User Favorites
id (uuid)
user_id (foreign key → Users)
content_id (foreign key → Content)
created_at (timestamp)

4.5 Badges (Insignias)
id (uuid)
user_id (foreign key → Users)
tipo (enum: racha_7 | racha_10 | ritual_cierre_7 | pausa_3 | etc.)
obtenida_at (timestamp)

4.6 Release Events (acciones on-demand)
id (uuid)
user_id (foreign key → Users)
tipo (enum: respira | reseteo | modo_pausa | soltar)
created_at (timestamp)


5. Roles y Permisos
Rol
Puede ver
Puede hacer
Empleado
HOY, EXPLORAR, YO, su propio historial, su racha y sus favoritos
Check-in emocional, score del día, frase de intención, usar herramientas, marcar favoritos, cambiar hora de notificación
Líder
Dashboard con métricas agregadas y anónimas de todos los usuarios registrados
Visualizar métricas. No puede ver datos individuales de ningún empleado.
Admin (V2)
Panel de administración completo
Gestionar usuarios, subir contenido a la biblioteca, ver métricas globales


Principio irrenunciable de privacidad: el Líder nunca accede a datos individuales. Solo ve promedios y tendencias anónimas del equipo completo.


6. Dashboard del Líder
El Líder accede a una vista exclusiva dentro de la app móvil. Todos los datos son agregados y anónimos. Nunca se expone información individual.

Métrica
Descripción
Frecuencia
% empleados activos
Porcentaje de usuarios que abrieron la app al menos una vez en la semana
Semanal
Tendencia emocional del equipo
Promedio de scores diarios del equipo, visualizado como curva semanal
Semanal
Funcionalidades más usadas
Ranking de herramientas más utilizadas (check-in, respiración, biblioteca, etc.)
Semanal
Racha promedio del equipo
Promedio de días consecutivos activos entre todos los usuarios
Semanal



7. MVP — Alcance v1.0
7.1 Incluye en MVP
#
Funcionalidad
Área
1
Pantalla de Bienvenida con Manifiesto
Onboarding
2
Registro con email + verificación por correo
Onboarding
3
Selección de hora de notificación en onboarding
Onboarding
4
Check-in emocional diario (5 estados)
HOY
5
Score del día (slider 1-10)
HOY
6
Frase de intención / Mi ancla de hoy
HOY
7
Soltá lo que te pesa (texto efímero, no se guarda)
HOY
8
Respiración guiada (ciclo 4-2-6)
HOY
9
Reseteo de 60 segundos (reloj + sonido)
HOY
10
Modo pausa (sonidos ambientes: lluvia, bosque, ondas)
HOY
11
Ritual de cierre nocturno (3 preguntas)
HOY
12
Biblioteca de 20 conceptos (audio + imagen fija, hardcodeada)
EXPLORAR
13
Reproductor inmersivo por concepto
EXPLORAR
14
Favoritos (guardar conceptos)
EXPLORAR
15
Historial de scores semanal (gráfico de curva)
YO
16
Racha activa (streaks diarios)
YO
17
Insignias por comportamiento
YO
18
Notificaciones push disruptivas (hora elegida por usuario)
Sistema
19
Dashboard del Líder con 4 métricas agregadas
Líder


7.2 No incluye en MVP (V2+)
Funcionalidad
Motivo del diferimiento
Perfil Admin con panel de gestión
Requiere base de usuarios probada y backend robusto
Carga dinámica de contenido a la biblioteca
MVP va hardcodeado; se agrega CMS en V2
Equipos y asignación Líder → Empleados
MVP: Líder ve todos los usuarios. Segmentación en V2.
Coach IA (flujos conversacionales)
Requiere datos acumulados y ajuste fino del modelo
Carta al futuro
Feature de retención a largo plazo, no de adquisición
Soundtrack del día (playlists por emoción)
Requiere integración con servicio de música
Funcionalidades Tier 2 y Tier 3 del documento original
Se construyen sobre retención probada del Tier 1



8. Pantallas Principales
8.1 Bienvenida
Imagen cruda y minimalista. Texto del Manifiesto: "Lo que es tuyo está bajo tu piel." Botón único: Entrar.

8.2 Registro / Acceso
Diseño simple. Copy de privacidad explícito: "Tu empresa mide el pulso del equipo, pero nunca tu diario personal." Campos: email y contraseña. Verificación por email antes de acceder.

8.3 Onboarding — Hora de notificación
Pantalla única post-verificación. El usuario elige la hora a la que quiere recibir su notificación diaria. Sin más pasos.

8.4 HOY (Home del Empleado)
Pantalla principal. Contiene: Check-in emocional (5 estados), Score del día (slider 1-10), Frase de intención, accesos rápidos a Soltá lo que te pesa, Respiración guiada, Reseteo de 60s, Modo pausa y Ritual de cierre. Navbar inferior: HOY | EXPLORAR | YO.

8.5 EXPLORAR — Biblioteca de conceptos
Grid estilo Netflix con cards de una palabra en mayúsculas (CAOS, MIEDO, LÍMITES, etc.). Al tocar una card → Reproductor inmersivo.

8.6 Reproductor
Imagen cinematográfica fija. Play/Pause del audio (2-4 min). Sin distracciones. Botón de favorito.

8.7 YO (El Espejo)
Gráfico de curva del score semanal. Racha activa (días consecutivos). Insignias obtenidas. Conceptos favoritos guardados.

8.8 Dashboard del Líder
Vista exclusiva para rol Líder. Muestra las 4 métricas agregadas y anónimas del equipo. Accesible desde el login con credenciales de Líder.


9. Branding
Nombre
WellUp

Tono
Directo. Humano. Disruptivo. Sin endulzar. Confronta, provoca, transforma. Nunca genérico, nunca corporativo. Suena como una persona real, no como una marca de wellness.

Ejemplos de voz
WellUp suena así ✓
WellUp nunca suena así ✗
"Tu cerebro también necesita entrenamiento."
"Bienvenido a tu espacio de mindfulness."
"Lo que te pesa hoy no tiene que seguir mañana."
"Tomá un respiro y conectá con vos mismo."
"Pará un segundo. En serio."
"Hoy es un día para ser agradecido."
"Ocupado no es lo mismo que productivo."
"Recordá practicar el autocuidado."


Principios de Diseño Visual
Velocidad ante todo: ninguna acción principal tarda más de 30 segundos.
Sin fricción innecesaria: la app no pide cuentas, no juzga, no obliga.
El usuario manda: la app nunca decide por él qué ver o hacer.
Privacidad como base: lo del usuario es del usuario.
Minimalista, oscuro, cinematográfico. Imágenes crudas, tipografía bold.


10. Privacidad by Design
Este principio es irrenunciable y debe estar explicado explícitamente en el onboarding del empleado. La confianza es la condición de uso real del producto.

La empresa (Líder) ve el termómetro del equipo, nunca el diario de nadie.
Los datos del check-in emocional individual son privados y no accesibles para ningún rol externo al empleado.
El dashboard del Líder solo muestra promedios y tendencias anónimas.
"Soltá lo que te pesa" no se guarda en ninguna base de datos.
No hay sistema de vigilancia ni ranking individual de empleados.


