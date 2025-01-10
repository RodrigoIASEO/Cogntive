// Función para generar UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Función para extraer información del User-Agent
function parseUserAgent(userAgent = '') {
    let os = 'Unknown';
    let device = 'Other';
    
    if (userAgent) {
        if (userAgent.includes('Windows')) {
            os = 'Windows';
            device = 'Desktop';
        }
        else if (userAgent.includes('Mac OS')) {
            os = 'MacOS';
            device = 'Desktop';
        }
        else if (userAgent.includes('iPhone')) {
            os = 'iOS';
            device = 'iPhone';
        }
        else if (userAgent.includes('iPad')) {
            os = 'iOS';
            device = 'iPad';
        }
        else if (userAgent.includes('Android')) {
            os = 'Android';
            device = 'Android';
        }
        else if (userAgent.includes('Linux')) {
            os = 'Linux';
            device = 'Desktop';
        }
    }
    
    return { os, device };
}

// Obtener los datos del webhook
const inputData = items[0]?.json || {};
const headers = items[0]?.headers || {};

// Extraer IP y User-Agent de manera segura
const ipAddress = headers['x-forwarded-for']?.split(',')[0]?.trim() || '127.0.0.1';
const userAgent = headers['user-agent'] || '';
const { os, device } = parseUserAgent(userAgent);

// Procesar los datos según la estructura de Google Sheet
const processedData = {
    thread_id: inputData.conversation_id || `thread_${generateUUID().slice(0,5)}`,
    platform: 'Web',
    username: inputData.username || '',
    creado: new Date().toISOString(),
    status: 'Processing...',
    transcript: `user: ${inputData.message || ''}`,
    tema: 'Precio, Caracteristicas',
    num_mensajes_user: 1,
    is_lead: 'No',
    pais: 'Unknown',
    estado: 'Unknown',
    region: 'Unknown',
    os: os,
    device: device,
    ip: ipAddress
};

// Retornar los datos procesados
return {
    json: {
        data: processedData,
        ip: ipAddress  // IP separada para fácil acceso
    }
}; 