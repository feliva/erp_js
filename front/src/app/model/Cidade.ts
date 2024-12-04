
export class Cidade {
    idCidade?: number;
    nome?: string;
    estado!: Estado;
}

export class Estado {
    idEstado?: number;
    nome?:string;
}