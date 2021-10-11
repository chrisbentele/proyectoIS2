export function projectStateToString(projectState) {
  switch (projectState) {
    case 0:
      return "Pendiente";
    case 1:
      return "Activo";
    case 2:
      return "Terminado";
    default:
      return "codigo de estado de proyecto erroneo";
  }
}

export function tienePermiso(member, permiso) {
  if(!member?.rol)
    return false
  return member.rol.permisos.includes(permiso)
}
