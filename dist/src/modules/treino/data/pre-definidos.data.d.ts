export declare const TREINOS_PARA_GANHAR_MASSA: {
    nome: string;
    grupoMuscular: string;
    series: string;
    objetivo: string;
    dia: string;
}[];
export declare const TREINOS_PARA_PERDER_GORDURA: ({
    nome: string;
    series: string;
    objetivo: string;
    dia: string;
    duracaoMinutos?: undefined;
    grupoMuscular?: undefined;
} | {
    nome: string;
    duracaoMinutos: number;
    objetivo: string;
    dia: string;
    series?: undefined;
    grupoMuscular?: undefined;
} | {
    nome: string;
    grupoMuscular: string;
    series: string;
    objetivo: string;
    dia: string;
    duracaoMinutos?: undefined;
})[];
