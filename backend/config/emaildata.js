import nodemailer from 'nodemailer'

export const emaildata = nodemailer.createTransport({
    host: 'mail.esagra.it',
    port: '465',
    auth: {
        user: 'info@esagra.it',
        pass: 'Giulio2008.E'
    },
});

export const mailOptions = {
    from: 'Ordini@esagra.it',
    to: '',
    subject: "Il tuo codice dell' Ordine web",
    html: '',
};

