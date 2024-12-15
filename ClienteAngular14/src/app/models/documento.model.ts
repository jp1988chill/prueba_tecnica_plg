export interface ClienteModel {
    httpCode:       string;
    httpMessage:    string;
    moreInformation:string;
    clienteFriendlyError:  string;
    clientesNuevoTokenAsignado:   Cliente[];
}

export interface Cliente {
    token: string;
    name:  string;
    password: string;
    country:  string;
    phone:         string;
    tokenleasetime:         string;
}
