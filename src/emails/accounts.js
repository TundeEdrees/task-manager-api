const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'hedrees05@gmail.com',
//     from: 'hedrees05@gmail.com',
//     subject: 'This is my first practice',
//     text: 'Will it go through?'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hedrees05@gmail.com',
        subject: 'Happy to have you on board!',
        text: `Welcome to the app, ${name}. Let me know how you get along with this app`
    })
}

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hedrees05@gmail.com',
        subject:'Sad seeing you leave',
        text: `Goodbye ${name}. We regret seeing you leave our platform. We'd appreciate if you take
        a moment to fill the feedback survey below`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}