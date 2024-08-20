import { UserData } from "@ncl/app/shared/models";
import { Icon } from "@mui/material";
import { USER_ROLES } from "@ncl/app/shared";

export default function UserProfile({ user }: { user: UserData }) {
  return (
    <div className="w-full rounded bg-gray-50 p-4 md:px-8 border">
      <div className="rounded-full w-24 h-24 bg-gray-900 flex items-center justify-center">
        <Icon sx={{ color: "white", fontSize: 60 }}>person</Icon>
      </div>
      <h3 className="text-xl font-semibold my-2">
        {user.name} {user.lastName}
      </h3>
      <h6 className="text-gray-800 text-medium mb-4">
        {USER_ROLES.find((item) => item.role === user.role)?.name}
      </h6>

      <div className="text-sm mb-3">
        <span className="text-gray-600">Empresa</span>
        <span className="block">{user.companyName} </span>
      </div>

      <div className="text-sm mb-3">
        <span className="text-gray-600">Correo Electrónico</span>
        <span className="block">{user.email} </span>
      </div>

      <div className="text-sm mb-3">
        <span className="text-gray-600">Teléfono</span>
        <span className="block">{user.phone}</span>
      </div>
    </div>
  );
}
