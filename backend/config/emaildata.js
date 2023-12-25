import nodemailer from 'nodemailer'

const emaildata = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'giulio.pizzinato@gmail.com',
        pass: 'cqjl dyeg vzlo rxgc'
    },
});

export default emaildata
