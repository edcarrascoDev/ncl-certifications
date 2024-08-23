import { PrepareDocument } from "@ncl/app/shared/models";
import moment from "moment";

export default function MainInfo({ document }: { document: PrepareDocument }) {
  return (
    <div className="document-grid">
      <div className="col-span-4 document-item">
        Placa del vehículo: <span>{document.licensePlate}</span>
      </div>
      <div className="col-span-4 document-item">
        Número interno: <span>{document.internalNumber}</span>
      </div>
      <div className="col-span-4 document-item">
        Ciudad:{" "}
        <span>
          {document.companyCity} {document.companyDepartment}
        </span>
      </div>
      <div className="col-span-8 document-item">
        Empresa: <span>{document.companyName}</span>
      </div>
      <div className="col-span-4 document-item">
        Fecha:{" "}
        <span>
          {moment(document.createdAt).format("DD/MM/YYYY") || "No disponible"}
        </span>
      </div>
      <div className="col-span-6 document-item">
        Nombre de quien realiza el alistamiento:{" "}
        <span>{document.preparerName}</span>
      </div>
      <div className="col-span-6 document-item">
        Nombre del conductor: <span>{document.driverName}</span>
      </div>
    </div>
  );
}
