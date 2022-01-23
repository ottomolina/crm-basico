const jwt = require('jsonwebtoken');

export const generaJwT = ( usuarioid: number ): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { usuarioid };

        jwt.sign( payload, process.env.SECRETKEY,
            // { expiresIn: '5s' },
            /* { expiresIn: '4h' } */
            (err:any, token: string) => {
                if(err) {
                    reject( 'Ocurrió un error al generar el token.' );
                } else {
                    resolve( token );
                }
            }
        )
    });
}
