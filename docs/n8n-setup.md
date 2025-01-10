# Configuración del Agente N8N para el Chat Widget

## Requisitos Previos
1. Instancia de N8N funcionando
2. Acceso a OpenAI API o similar para el procesamiento de lenguaje natural
3. Variables de entorno configuradas en el frontend

## Paso 1: Configuración del Webhook en N8N

1. Crear un nuevo workflow en N8N
2. Agregar un nodo "Webhook"
3. Configurar el webhook:
   - Método: POST
   - Path: /chat
   - Autenticación: Header (X-API-KEY)
   - Response Mode: Last Node

## Paso 2: Procesamiento del Mensaje

1. Agregar nodo "Function" para procesar el mensaje entrante:
```javascript
const inputData = items[0].json;
return {
  json: {
    message: inputData.message,
    session_id: inputData.session_id,
    context: {
      timestamp: inputData.timestamp,
      platform: inputData.platform,
      url: inputData.url
    }
  }
}
```

2. Agregar nodo "OpenAI" para procesar el mensaje:
   - Model: gpt-4 o similar
   - Temperature: 0.7
   - System Message: "Eres un asistente virtual experto en desarrollo Full Stack..."

3. Agregar nodo "Function" para formatear la respuesta:
```javascript
const aiResponse = items[0].json;
return {
  json: {
    response: aiResponse.choices[0].message.content,
    session_id: items[0].json.session_id
  }
}
```

## Paso 3: Manejo de Errores

1. Agregar nodos "Error Trigger" para manejar excepciones
2. Configurar respuestas de error apropiadas

## Paso 4: Variables de Entorno Frontend

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/chat
NEXT_PUBLIC_N8N_API_KEY=tu_api_key
```

## Paso 5: Pruebas

1. Probar el webhook con Postman o similar:
```bash
curl -X POST https://tu-instancia-n8n.com/webhook/chat \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: tu_api_key" \
  -d '{
    "message": "Hola, ¿cómo estás?",
    "session_id": "123",
    "timestamp": "2024-01-20T12:00:00Z",
    "platform": "web",
    "url": "https://tu-sitio.com"
  }'
```

## Paso 6: Monitoreo y Logs

1. Configurar nodo "Write File" para guardar logs
2. Estructura sugerida para logs:
```javascript
{
  timestamp: new Date().toISOString(),
  session_id: items[0].json.session_id,
  message: items[0].json.message,
  response: items[0].json.response,
  processing_time: Date.now() - startTime
}
```

## Paso 7: Optimización

1. Configurar caché para respuestas comunes
2. Implementar rate limiting
3. Configurar timeouts apropiados

## Notas Importantes

- Asegurarse de que la API key sea segura y única
- Implementar CORS si es necesario
- Considerar límites de tokens en la API de OpenAI
- Mantener un registro de las conversaciones para mejora continua 