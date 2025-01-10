import React from 'react'

const GradientTest: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Prueba de Gradiente</h2>
        <p>Si puedes ver este texto sobre un fondo con gradiente, el gradiente está funcionando correctamente.</p>
      </div>
    </div>
  )
}

export default GradientTest