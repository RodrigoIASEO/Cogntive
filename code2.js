// Obtener los datos previos y la respuesta de geolocalización
const prevData = items[0]?.json?.data || {};
const geoResponse = items[1]?.json || {};

// Debug de entrada
console.log('Input Data:', items[0]?.json);
console.log('Geo Response Raw:', items[1]);

// Verificar si tenemos datos de geolocalización válidos
const hasGeoData = geoResponse && Object.keys(geoResponse).length > 0;

// Procesar datos de geolocalización
const geoData = {
    pais: hasGeoData ? geoResponse.country : prevData.pais || 'Unknown',
    estado: hasGeoData ? geoResponse.regionName : prevData.estado || 'Unknown',
    region: hasGeoData ? geoResponse.city : prevData.region || 'Unknown',
    geo_lat: hasGeoData ? geoResponse.lat : null,
    geo_lon: hasGeoData ? geoResponse.lon : null,
    isp: hasGeoData ? geoResponse.isp : 'Unknown',
    timezone: hasGeoData ? geoResponse.timezone : 'Unknown'
};

// Determinar el estado basado en la respuesta
const determineStatus = () => {
    if (hasGeoData) {
        return 'active';
    } else if (prevData.status === 'fail') {
        return 'error';
    }
    return 'active'; // Por defecto, mantenemos activo
};

// Generar IDs únicos
const generateTimestampedId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const conversationId = generateUUID();
const threadId = prevData.thread_id || generateTimestampedId('thread');

// Preparar datos para la tabla conversations
const conversationData = {
    id: conversationId,
    thread_id: threadId,
    platform: 'Web',
    status: determineStatus(),
    topic: prevData.tema || 'Sin clasificar',
    is_lead: false,
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString()
};

// Preparar datos para la tabla messages
const messageData = {
    id: generateUUID(),
    conversation_id: conversationId,
    role: 'user',
    content: prevData.transcript || 'Empty message',
    sentiment: null,
    created_at: new Date().toISOString()
};

// Preparar datos para la tabla user_metadata
const metadataData = {
    id: generateUUID(),
    conversation_id: conversationId,
    ip_address: items[0]?.json?.ip || '127.0.0.1',
    country: geoData.pais,
    region: geoData.estado,
    city: geoData.region,
    os: prevData.os || 'Unknown',
    device: prevData.device || 'Other',
    metadata: JSON.stringify({
        geo: {
            latitude: geoData.geo_lat,
            longitude: geoData.geo_lon,
            isp: geoData.isp,
            timezone: geoData.timezone
        },
        processing: {
            attempts: 1,
            last_attempt: new Date().toISOString(),
            status_history: ['active']
        }
    }),
    created_at: new Date().toISOString()
};

// Para debugging detallado
console.log('Thread ID:', threadId);
console.log('Conversation ID:', conversationId);
console.log('Conversation Status:', conversationData.status);
console.log('Conversation Data:', conversationData);
console.log('Message Data:', messageData);
console.log('Metadata Data:', metadataData);

// Retornar los datos procesados para Supabase
return {
    json: {
        conversations: conversationData,
        messages: messageData,
        user_metadata: metadataData
    }
};

// Función auxiliar para generar UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
} 