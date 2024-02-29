import sgMail from '@sendgrid/mail'
import validator from 'validator'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const mailTo = (fromname, email, number, message, callback) => {
  //validation
  if (!fromname || !email || !number || !message) {
    return callback('Please fill in all fields', undefined)
  } else if (!validator.isEmail(email)) {
    return callback('Provide a valid email', undefined)
  } else {
    const msg = {
      to: 'support@oldamishremedies.com',
      from: {
        name: 'Old Amish Remedies Contact',
        email: 'cmartin@moderncaliber.com',
      },
      replyTo: email,
      templateId: 'd-ed97c04e3aad4729aa2725af19432232',
      dynamic_template_data: {
        firstname: fromname,
        lastname: '',
        email,
        phone: number,
        message,
      },
    }
    //ES8
    const sendSGMail = async () => {
      try {
        await sgMail.send(msg)

        callback(undefined, { sent: true })
      } catch (error) {
        console.error(error)

        if (error.response) {
          console.error(error.response.body)
        }
      }
    }
    sendSGMail()
  }
}

export default function mail(req, res) {
  const { fromname, email, number, message } = req.query
  mailTo(fromname, email, number, message, (err, data) => {
    res.send({
      fromname,
      email,
      number,
      message,
      formResponse: err,
    })
  })
}
