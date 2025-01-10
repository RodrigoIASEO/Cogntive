// Código para el nodo Set después del Error Trigger
return {
  json: {
    success: false,
    error: true,
    response: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
    session_id: items[0]?.json?.session_id || 'unknown',
    timestamp: new Date().toISOString(),
    error_details: {
      message: error.message,
      workflow_error: error.description,
      node: error.node
    }
  }
} 