export function projectStateToString(projectState) {
  switch (projectState) {
    case 0:
      return "Activo";
    case 1:
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

export function getProxDias(fecha, prox_dias) {
  console.log("fecha", fecha);
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  let dateArray = [];
  let actual = new Date(fecha);
  actual.setDate(actual.getDate() - 1);
  for (let dia = 0; dia < prox_dias + 1; dia++) {
    let newDate = actual.addDays(dia).toISOString().split("T")[0];
    dateArray.push(newDate);
  }
  return dateArray;
}
