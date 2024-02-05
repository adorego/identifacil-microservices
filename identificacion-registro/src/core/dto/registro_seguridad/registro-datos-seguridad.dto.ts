

export class RegistroDatosSeguridadDTO{
  numeroDeIdentificacion:string | null;
  riesgoParaPersonal: boolean;
  riesgoParaPersonal_modificado:boolean;
  riesgoParaPersonalRespuesta: string;
  riesgoParaPersonalRespuesta_modificado:boolean;
  riesgoParaReclusos: boolean;
  riesgoParaReclusos_modificado:boolean;
  riesgoParaReclusosRespuesta: string;
  riesgoParaReclusosRespuesta_modificado:boolean;
  riesgoDeSufrirLesionPorOtrosReclusos: boolean;
  riesgoDeSufrirLesionPorOtrosReclusos_modificado:boolean;
  riesgoDeSufrirLesionPorOtrosReclusosRespuesta: string;
  riesgoDeDanharLaPropiedad: boolean;
  riesgoDeDanharLaPropiedad_modificado:boolean
  riesgoDeDanharLaPropiedadRespuesta: string;
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad: boolean;
  miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado:boolean
  miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: string;
  tieneEntrenamientoMilitarPrevio: boolean;
  tieneEntrenamientoMilitarPrevio_modificado:boolean;
  tieneEntrenamientoMilitarPrevioRespuesta: string;
  eraFuncionarioPublico: boolean;
  eraFuncionarioPublico_modificado:boolean;
  eraFuncionarioPublicoRespuesta: string;
}