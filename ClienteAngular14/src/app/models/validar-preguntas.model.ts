export interface ValidarPregunta {
    idchallenge: string;
    rut: string;
    respuestas: RepuestaDesafio[];
}

export interface RepuestaDesafio {
    codigopregunta: string;
    codigorespuesta: string;
}