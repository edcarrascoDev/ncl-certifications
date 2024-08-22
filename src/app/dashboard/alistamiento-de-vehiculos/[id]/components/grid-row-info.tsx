import { ImageData } from "@ncl/app/shared/types";
import Image from "next/image";

interface ItemsInfo {
  label: string;
  description: string;
  isValid: boolean | string;
  observation?: string;
  image?: ImageData;
}
interface RowInfo {
  groupName: string;
  items: ItemsInfo[];
}
export default function GridRowInfo(data: RowInfo) {
  return (
    <div className="bg-gray-50 rounded border mb-2">
      <div className="document-grid bg-gray-100">
        <div className="col-span-3 document-head-item">
          Elementos de inspección
        </div>
        <div className="col-span-3 document-head-item">Criterio</div>
        <div className="col-span-2 document-head-item">Resultado</div>
        <div className="col-span-4 document-head-item">Observaciones</div>
      </div>
      <div className="document-grid">
        <div className="col-span-3 font-semibold text-xs uppercase px-2 py-1">
          {data.groupName}
        </div>
      </div>
      {data.items.map((item, index) => (
        <div
          key={index}
          className={`document-grid !mb-0 ${index % 2 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="col-span-3 document-col-item">
            <div>{item.label}</div>
          </div>
          <div className="col-span-3 document-col-item">
            <div>{item.description}</div>
          </div>
          <div className="col-span-2 document-col-item">
            <div>{item.isValid ? "Cumple" : "No Cumple"}</div>
          </div>
          <div className="col-span-4 document-col-item">
            {!item.observation && !item.image && (
              <i>
                <small>Sin observaciones</small>
              </i>
            )}
            {item.observation && <div className="mb-2">{item.observation}</div>}
            {item.image && (
              <div className="w-full">
                <Image
                  src={item.image.url}
                  alt={`Imagen de observación para ${item.label}`}
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
