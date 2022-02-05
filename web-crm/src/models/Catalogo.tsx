
export class Catalogo {
    static instace: Catalogo;

    constructor() {

    }

    static getInstance() {
        if(!!Catalogo.instace) {
            Catalogo.instace = this;
        }
    }

}