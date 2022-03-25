var fields = {}

document.addEventListener("DOMContentLoaded", function() {
    fields.names = document.getElementById('names');
    fields.email = document.getElementById('email');
    fields.question = document.getElementById('question');
})


function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
}

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;
   
    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
    field.className = 'placeholderRed';
    } else {
    field.className = '';
    }
   
    return isFieldValid;
}

function isValid() {
    var valid = true;
    
    valid &= fieldValidation(fields.names, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.question, isNotEmpty);
   
    return valid;
}

class User {
    constructor(names, email, question) {
        this.names = names;
        this.email = email;
        this.question = question;
    }
}

var Email = { send: function (a) 
    { return new Promise(function (n, e) 
        { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; 
        var t = JSON.stringify(a); 
        Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, 
        function (e) { n(e) }) }) }, 
        ajaxPost: function (e, n, t) 
            { var a = Email.createCORSRequest("POST", e); 
            a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
            a.onload = function () 
                { var e = a.responseText; null != t && t(e) 
            }, a.send(n) }, 
            ajax: function (e, n) 
        { var t = Email.createCORSRequest("GET", e); 
        t.onload = function () 
        { var e = t.responseText; null != n && n(e) 
        }, t.send() 
        }, createCORSRequest: function (e, n) 
        { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t 
    } 
};


function sendContact() {

    if (isValid()) {
        let usr = new User(names.value, email.value, question.value);
        
        Email.send({
            Host : "smtp.mailtrap.io",
            Username : "2168e90357b35d",
            Password : "12b066c4ea2996",
            To : 'teo.niklus@ut.ee',
            From : email.value,
            Subject : "Kiri Fotomees OÜ veebilehelt",
            Body : question.value
        }).then(
          message => alert(message)
        );

        alert(`Tänan ${usr.names}! Me võtame ühendust.`)

    } else {
        alert(`Palun täida väljad korrektselt!`)
    }
}