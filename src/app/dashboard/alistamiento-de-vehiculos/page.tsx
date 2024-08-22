"use client";
import Button from "@ncl/app/components/shared/button";

export default function CarPrepare() {
  return (
    <div>
      <div>
        <div className="w-full text-xl font-semibold mb-6 p-2 bg-primary text-white rounded">
          Datos generales
        </div>
        <div className="w-full text-xs font-bold text-gray-900 bg-gray-200 uppercase">
          <div className="grid grid-cols-12 gap-x-4 p-2">
            <div className="col-span-3">Documento</div>
            <div className="col-span-3">Criterio</div>
            <div className="col-span-2">Resultado</div>
            <div className="col-span-4">Observaciones</div>
          </div>
        </div>
        <div className="w-full text-sm font-bold text-gray-700 bg-gray-50">
          <div className="grid grid-cols-12 gap-x-4 p-2  border-b">
            <div className="col-span-3">Licencia de tránsito</div>
            <div className="col-span-3">Validación de licencia</div>
            <div className="col-span-2">Cumple</div>
            <div className="col-span-4">
              <span className="mb-2">
                Esta es la lista de observaciones, para que se pueda generar
                algo
              </span>
              <img
                className="block w-full h-auto"
                src="https://picsum.photos/id/1/200/300"
                alt=""
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 p-2  border-b">
            <div className="col-span-3">SOAT</div>
            <div className="col-span-3">Validación de SOAT</div>
            <div className="col-span-2">Cumple</div>
            <div className="col-span-4">
              <span className="mb-2">
                Esta es la lista de observaciones, para que se pueda generar
                algo
              </span>
              <img
                className="block w-full h-auto"
                src="https://picsum.photos/id/1/200/300"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
