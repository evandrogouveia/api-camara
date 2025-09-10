const nodemailer = require('nodemailer');

module.exports = {
    sendEmail(req, res) {
        const email = req.email;
        const protocolo = req.protocolo

        let htmlEmail = `
        <table style="font-size: 12px;margin: auto;width: 650px;" cellspacing="0">
        <thead>
            <tr>
                <td style="text-align: center;background:rgb(226, 228, 248);"  valign="top" >
                    <img width="130" height="auto" alt="logo" style="margin-top:10px;margin-bottom: 20px;" src="https://camaracrateus.ce.gov.br/api-camara/uploads/header/1741608178813-Logo%20normal%20verde%2001.png">
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align: left;"  valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 700;font-size: 20px;margin-top: 30px;margin-bottom: 30px;display: block;color:rgb(46, 46, 46);">
                        Prezado(a) cidadão(ã),
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 30px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                        Recebemos sua manifestação enviada à Ouvidoria da Câmara Municipal de Crateús.
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 30px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                        O número do seu protocolo é <strong>${protocolo}</strong>. Guarde este número para acompanhar o andamento da sua solicitação.
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 30px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                        Nosso compromisso é analisar cuidadosamente sua demanda e responder no menor prazo possível. Caso haja necessidade de informações adicionais, entraremos em contato.
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 30px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                        Agradecemos sua participação e estamos à disposição para esclarecer dúvidas.
                    </span>
                </td>
            </tr>
             <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 10px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                        Atenciosamente,
                    </span>
                </td>
            </tr>
             <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif; font-weight: 500;margin-bottom: 40px;display: block; font-size: 18px;color: rgb(46, 46, 46);">
                       Ouvidoria da Câmara Municipal de Crateús
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: left;" valign="top">
                    <span style="font-family: 'Nunito', sans-serif;margin-bottom: 15px;display: block; font-weight: 700;font-size: 18px;color: rgb(46, 46, 46);">
                        Consulte o andamento de sua manifestação no botão abaixo
                    </span>
                </td>
            </tr>
            <tr>
                <td style="text-align: center;" valign="top">
                       <a style="font-family: 'Nunito', sans-serif;display: block; font-weight: 600;font-size: 16px;color: #ffffff; background: #305081; width: 250px;margin: 30px auto 40px;
                       padding: 15px; border-radius: 5px;text-decoration: none;color: #ffffff" 
                       href="https://camaracrateus.ce.gov.br/#/consulta-manifestacao" target="_blank">
                        Consultar Manifestação
                       </a>
                </td>
            </tr>

        </tbody>
        <tfoot style="background: #f5f5f5;">
            <tr>
                <td style="text-align: left;padding: 15px 30px 0" valign="top">
                    <span style="font-family: 'Nunito', sans-serif;display: block;font-weight: 500;font-size: 13px;color: #273d47;">
                        Atenção: Esta é uma mensagem automática, não é necessário respondê-la
                    </span>
                </td>
            </tr>
            <tr>
            <td style="text-align: left;padding: 15px 30px 0" valign="top"></td>
        </tr>
        </tfoot>
    </table>
    `;

        let sesAccessKey = process.env.MAIL_USER;
        let sesSecretKey = process.env.MAIL_PASSWORD;

        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "mail.camaracrateus.ce.gov.br",
            auth: {
                user: sesAccessKey,
                pass: sesSecretKey
            },
            secure: true,
        });

        const mailOptions = {
            to: email,
            from: `ouvidoria@camaracrateus.ce.gov.br`,
            subject: 'Ouvidoria - Camara Municipal de Crateús',
            text: htmlEmail,
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.log(err);
            }
            return res.status(200).send({ message: `EMAIL ENVIADO` });
        });
    }


}