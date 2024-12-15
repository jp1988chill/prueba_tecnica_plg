export interface Alternativa {
    codigorespuesta: string;
    respuesta: string;
}

export interface Pregunta {
    codigopregunta: string;
    pregunta: string;
    alternativas: Alternativa[];
}

export interface Preguntas {
    codigoretorno: string;
    idchallenge: string;
    preguntas: Pregunta[];
}