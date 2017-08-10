// the following regular expression validates emails
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// the function takes in a string of emails
export default (emailsString) => {
  // split the string at commas,
  const invalidEmails = emailsString.split(',')
    // then map over and trim each email
    .map(email => email.trim())
    // then filter emails to only keep the once that fail the validation
    .filter(email => !re.test(email))

  if (invalidEmails.length) return `The following emails are invalid: ${invalidEmails}`;

  return;
};