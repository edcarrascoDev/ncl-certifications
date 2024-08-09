export const FIREBASE_ERROR_CODE: Record<string, string> = {
  "auth/invalid-custom-token":
    "El formato del token personalizado es incorrecto. Por favor, verifica la documentación.",
  "auth/invalid-dynamic-link-domain":
    "El dominio del enlace dinámico proporcionado no está configurado o autorizado para el proyecto actual.",
  "auth/invalid-email":
    "La dirección de correo electrónico está mal formateada.",
  "auth/invalid-api-key":
    "Tu clave API no es válida, por favor verifica que la hayas copiado correctamente.",
  "auth/invalid-cert-hash":
    "El hash del certificado SHA-1 proporcionado es inválido.",
  "auth/invalid-credential":
    "Las credenciales proporcionadas no son válidas. Por favor, verifica tu información e intenta nuevamente.",
  "auth/invalid-message-payload":
    "La plantilla de correo electrónico correspondiente a esta acción contiene caracteres inválidos en su mensaje. Corrígelo en la sección de plantillas de correo electrónico en la Consola de Firebase.",
  "auth/invalid-multi-factor-session":
    "La solicitud no contiene una prueba válida de inicio de sesión exitoso de primer factor.",
  "auth/invalid-oauth-provider":
    "EmailAuthProvider no es compatible con esta operación. Esta operación solo admite proveedores de OAuth.",
  "auth/invalid-oauth-client-id":
    "El ID de cliente de OAuth proporcionado es inválido o no coincide con la clave API especificada.",
  "auth/unauthorized-domain":
    "Este dominio no está autorizado para operaciones de OAuth para tu proyecto de Firebase. Edita la lista de dominios autorizados desde la consola de Firebase.",
  "auth/invalid-action-code":
    "El código de acción es inválido. Esto puede ocurrir si el código está malformado, ha expirado o ya ha sido utilizado.",
  "auth/wrong-password":
    "La contraseña es inválida o el usuario no tiene una contraseña.",
  "auth/invalid-persistence-type":
    "El tipo de persistencia especificado es inválido. Solo puede ser local, sesión o ninguno.",
  "auth/invalid-phone-number":
    "El formato del número de teléfono proporcionado es incorrecto. Introduce el número de teléfono en un formato que se pueda analizar en el formato E.164.",
  "auth/invalid-provider-id": "El ID de proveedor especificado es inválido.",
  "auth/invalid-recipient-email":
    "El correo electrónico correspondiente a esta acción no se pudo enviar porque la dirección de correo electrónico del destinatario es inválida.",
  "auth/invalid-sender":
    "La plantilla de correo electrónico correspondiente a esta acción contiene un remitente de correo electrónico o nombre inválido. Corrígelo en la sección de plantillas de correo electrónico en la Consola de Firebase.",
  "auth/invalid-verification-id":
    "El ID de verificación utilizado para crear la credencial de autenticación telefónica es inválido.",
  "auth/invalid-tenant-id":
    "El ID de inquilino de la instancia de autenticación es inválido.",
  "auth/multi-factor-info-not-found":
    "El usuario no tiene un segundo factor que coincida con el identificador proporcionado.",
  "auth/multi-factor-auth-required":
    "Se requiere una prueba de propiedad de un segundo factor para completar el inicio de sesión.",
  "auth/missing-android-pkg-name":
    "Debe proporcionarse un nombre de paquete de Android si se requiere la instalación de la aplicación de Android.",
  "auth/auth-domain-config-required":
    "Asegúrate de incluir authDomain al llamar a firebase.initializeApp() siguiendo las instrucciones en la consola de Firebase.",
  "auth/missing-app-credential":
    "La solicitud de verificación telefónica no tiene una verificación de la aplicación. Se debe proporcionar un token de respuesta de reCAPTCHA.",
  "auth/missing-verification-code":
    "La credencial de autenticación telefónica se creó con un código de verificación de SMS vacío.",
  "auth/missing-continue-uri":
    "Debe proporcionarse una URL de continuación en la solicitud.",
  "auth/missing-iframe-start": "Ha ocurrido un error interno.",
  "auth/missing-ios-bundle-id":
    "Debe proporcionarse un ID de paquete de iOS si se proporciona un ID de App Store.",
  "auth/missing-multi-factor-info":
    "No se ha proporcionado un identificador de segundo factor.",
  "auth/missing-multi-factor-session":
    "La solicitud no tiene prueba de inicio de sesión exitoso de primer factor.",
  "auth/missing-or-invalid-nonce":
    "La solicitud no contiene un nonce válido. Esto puede ocurrir si el hash SHA-256 del nonce proporcionado no coincide con el nonce hash en la carga útil del ID token.",
  "auth/missing-phone-number":
    "Para enviar códigos de verificación, proporciona un número de teléfono del destinatario.",
  "auth/missing-verification-id":
    "La credencial de autenticación telefónica se creó con un ID de verificación vacío.",
  "auth/app-deleted": "Esta instancia de FirebaseApp ha sido eliminada.",
  "auth/account-exists-with-different-credential":
    "Ya existe una cuenta con la misma dirección de correo electrónico pero diferentes credenciales de inicio de sesión. Inicia sesión con un proveedor asociado a esta dirección de correo electrónico.",
  "auth/network-request-failed":
    "Ha ocurrido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).",
  "auth/no-auth-event": "Ha ocurrido un error interno.",
  "auth/no-such-provider":
    "El usuario no estaba vinculado a una cuenta con el proveedor dado.",
  "auth/null-user":
    "Se proporcionó un objeto de usuario nulo como argumento para una operación que requiere un objeto de usuario no nulo.",
  "auth/operation-not-allowed":
    "El proveedor de inicio de sesión dado está deshabilitado para este proyecto de Firebase. Habilítalo en la consola de Firebase, en la pestaña de método de inicio de sesión de la sección de autenticación.",
  "auth/operation-not-supported-in-this-environment":
    'Esta operación no es compatible en el entorno en el que se está ejecutando esta aplicación. "location.protocol" debe ser http, https o chrome-extension y el almacenamiento web debe estar habilitado.',
  "auth/popup-blocked":
    "No se puede establecer una conexión con la ventana emergente. Puede haber sido bloqueada por el navegador.",
  "auth/popup-closed-by-user":
    "El usuario cerró la ventana emergente antes de finalizar la operación.",
  "auth/provider-already-linked":
    "El usuario solo puede estar vinculado a una identidad para el proveedor dado.",
  "auth/quota-exceeded":
    "Se ha excedido la cuota del proyecto para esta operación.",
  "auth/redirect-cancelled-by-user":
    "El usuario canceló la operación de redireccionamiento antes de finalizar.",
  "auth/redirect-operation-pending":
    "Ya hay una operación de redireccionamiento de inicio de sesión pendiente.",
  "auth/rejected-credential":
    "La solicitud contiene credenciales malformadas o que no coinciden.",
  "auth/second-factor-already-in-use":
    "El segundo factor ya está registrado en esta cuenta.",
  "auth/maximum-second-factor-count-exceeded":
    "Se ha excedido el número máximo permitido de factores secundarios en un usuario.",
  "auth/tenant-id-mismatch":
    "El ID de inquilino proporcionado no coincide con el ID de inquilino de la instancia de autenticación.",
  "auth/timeout": "La operación ha excedido el tiempo de espera.",
  "auth/user-token-expired":
    "Las credenciales del usuario ya no son válidas. El usuario debe iniciar sesión nuevamente.",
  "auth/too-many-requests":
    "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Inténtalo de nuevo más tarde.",
  "auth/unauthorized-continue-uri":
    "El dominio de la URL de continuación no está en la lista blanca. Por favor, agrega el dominio a la lista blanca en la consola de Firebase.",
  "auth/unsupported-first-factor":
    "Registrar un segundo factor o iniciar sesión con una cuenta multifactor requiere iniciar sesión con un primer factor compatible.",
  "auth/unsupported-persistence-type":
    "El entorno actual no admite el tipo de persistencia especificado.",
  "auth/unsupported-tenant-operation":
    "Esta operación no es compatible en un contexto multilinquilino.",
  "auth/unverified-email":
    "La operación requiere un correo electrónico verificado.",
  "auth/user-cancelled":
    "El usuario no otorgó a tu aplicación los permisos solicitados.",
  "auth/user-not-found":
    "No existe un registro de usuario que corresponda a este identificador. El usuario puede haber sido eliminado.",
  "auth/user-disabled":
    "La cuenta de usuario ha sido deshabilitada por un administrador.",
  "auth/user-mismatch":
    "Las credenciales proporcionadas no corresponden al usuario previamente registrado.",
  "auth/user-signed-out": "",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/web-storage-unsupported":
    "Este navegador no es compatible o las cookies y datos de terceros pueden estar deshabilitados.",
  "auth/email-already-in-use":
    "El correo electrónico proporcionado ya esta registrado.",
};
