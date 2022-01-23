
export class Catalogo {
    static instace;

    constructor() {

    }

    static getInstance() {
        if(!!Catalogo.instace) {
            Catalogo.instace = this;
        }
    }

}