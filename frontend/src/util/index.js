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
