export interface PreguntasModel {
    codigoretorno: string;
    idchallenge:   string;
    preguntas:     Pregunta[];
}

export interface Pregunta {
    codigopregunta: string;
    pregunta:       string;
    alternativas:   Alternativa[];
}

export interface Alternativa {
    codigorespuesta: string;
    respuesta:       string;
}
