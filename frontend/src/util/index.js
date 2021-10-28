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
  if (!member?.rol) return false;
  return member.rol.permisos.includes(permiso);
}

export function agruparRegistrosPorFecha(registros) {
  const sumaHorasPorFecha = [];
  registros.forEach((registro) => {
    let fechaIncluidaEnArray = false;
    if (!sumaHorasPorFecha.length) {
      sumaHorasPorFecha.push({
        fecha: registro.fecha,
        sumaHorasTrabajadas: registro.horas,
      });
    } else {
      for (var i = 0; i < sumaHorasPorFecha.length; i++) {
        if (sumaHorasPorFecha[i].fecha === registro.fecha) {
          fechaIncluidaEnArray = true;
          sumaHorasPorFecha[i].horas += registro.horas;
        }
      }
      if (!fechaIncluidaEnArray) {
        sumaHorasPorFecha.push({
          fecha: registro.fecha,
          sumaHorasTrabajadas: registro.horas,
        });
      }
    }
  });

  return sumaHorasPorFecha;
}
