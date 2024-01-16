export interface Produit

{
    id? : number, 
    libelle? : string, 
    codeProduit ? : string,
    coefficient ? :number,
    produitserviceassociations?: any[]
    produitprocessuss?: any[]
}
