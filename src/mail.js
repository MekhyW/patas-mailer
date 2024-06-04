import { SMTPClient, Message } from 'emailjs';

const client = new SMTPClient({
    user: process.env["MAIL_LOGIN"],
    password: process.env["MAIL_PASSWORD"],
    host: 'smtp-mail.outlook.com',
    tls: {
        ciphers: 'SSLv3',
    },
});

export const SendEmail = async (email, name, ticketTier, transactionId) => {

    const template = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    
    <body style="margin: 0; padding: 0; box-sizing: border-box;">
        <main
            style="background-image:url('https://patasbucket.s3.sa-east-1.amazonaws.com/img/video-background.jpg'); background-size: cover; background-repeat: no-repeat;">
            <table
                style="display: flex; flex-direction: column; align-items: center; background-color: rgba(255, 255,255,0.9);">
    
                <tr
                    style="display: flex; justify-content: center; align-items: center; color: black; width: 100%; padding: 1rem 1rem; border-radius: 3%;">
                    <td style="font-family: 'Verdana'; font-size: 1.5rem; margin-left: 1rem;">Seja bem-vindo ao <strong
                            style="color: #F7C94F; text-shadow: 1px 1px 1px black;">PATAS</strong></h2>
                </tr>
    
                <tr style="display: grid; grid-template-columns: 1fr 1fr;">
                    <td>
                        <img style="max-width: 640px; max-height: 480px;" src="https://patasbucket.s3.sa-east-1.amazonaws.com/img/banana01-daieny.png">
                    </td>
                </tr>
                
                        <tr style="display: flex; justify-content: center; align-items: flex-start; flex-direction: column; font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">
                            <td><h3 style="font-family: 'Verdana'; font-size: 1.5rem;">A sua inscrição está confirmada!</h3></td>
                        </tr>
                        
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">Nome completo: ${name} </h4></tr></td>
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">Tipo do Ingresso: ${ticketTier} </h4></tr></td>
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">E-mail: ${email} </h4></tr></td>
                            <tr><td><p style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">Agora para receber a sua badge personalizada e sua camiseta personalizada (apenas Prata e Ouro) clique no link abaixo.</p></td></tr>
                            <tr><td><br/><a style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;padding: 1rem; text-decoration: none; color: black; background-color:#F7C94F; font-weight: bold;"
                                href="https://patas.site/badge/${transactionId}">Solicitar a minha badge</a></td></tr>   
            </table>
        </main>
    </body>
    
    </html>`

    const templateMercadinho = `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    
    <body style="margin: 0; padding: 0; box-sizing: border-box;">
        <main
            style="background-image:url('https://patasbucket.s3.sa-east-1.amazonaws.com/img/video-background.jpg'); background-size: cover; background-repeat: no-repeat;">
            <table
                style="display: flex; flex-direction: column; align-items: center; background-color: rgba(255, 255,255,0.9);">
    
                <tr
                    style="display: flex; justify-content: center; align-items: center; color: black; width: 100%; padding: 1rem 1rem; border-radius: 3%;">
                    <td style="font-family: 'Verdana'; font-size: 1.5rem; margin-left: 1rem;">Seja bem-vindo ao <strong
                            style="color: #F7C94F; text-shadow: 1px 1px 1px black;">MERCADINHO FURRY</strong></h2>
                </tr>
    
                <tr style="display: grid; grid-template-columns: 1fr 1fr;">
                    <td>
                        <img style="max-width: 640px; max-height: 480px;" src="https://patasbucket.s3.sa-east-1.amazonaws.com/img/banana07-daieny.png">
                    </td>
                </tr>
                
                        <tr style="display: flex; justify-content: center; align-items: flex-start; flex-direction: column; font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">
                            <td><h3 style="font-family: 'Verdana'; font-size: 1.5rem;">A sua reserva no mercadinho furry está confirmada!</h3></td>
                        </tr>
                        
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">Nome completo: ${name} </h4></tr></td>
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">E-mail: ${email} </h4></tr></td>
                            <tr><td><h4 style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;">Agora para passar detalhes da sua mesa e garantir a sua participação no mercadinho, preencha o formulário abaixo:</h4></td></tr>
                            <tr><td><br/><a style="font-family: 'Verdana'; font-size: 1rem; color: black; text-shadow: 1px 1px 1px white;padding: 1rem; text-decoration: none; color: black; background-color:#F7C94F; font-weight: bold;"
                                href="https://forms.gle/3nseXcmRkW8pu5tn8">Garantir a minha mesa no mercadinho</a></td></tr>   
            </table>
        </main>
    </body>
    
    </html>`

    const messageTicket = new Message({
        attachment: [
            { data: template, alternative: true },
        ],
        from: 'Ingresso Patas 2024 <ingresso-patas@outlook.com>',
        to: `${name} <${email}>`,
        subject: 'Seja bem-vindo ao PATAS 2024',
    });

    const messageMercadinho = new Message({
        attachment: [
            { data: templateMercadinho, alternative: true },
        ],
        from: 'Ingresso Patas 2024 <ingresso-patas@outlook.com>',
        to: `${name} <${email}>`,
        subject: 'Sua reserva ao mercadinho do PATAS 2024 foi efetuada com sucesso',
    });

    // send the message and get a callback with an error or details of the message that was sent

    if (ticketTier != "Mercadinho") {
        client.send(messageTicket, (err, message) => {
            console.log(err || message);
        });
    }

    else {
        client.send(messageMercadinho, (err, message) => {
            console.log(err || message);
        });
    }
}
