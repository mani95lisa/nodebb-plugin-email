var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};

Emailer.init = function(data, callback) {

    function renderAdminPage(req, res, next) {

        res.render('admin/email/services', {services:[
			{name:'1und1'},
			{name:'AOL'},
			{name:'DebugMail.io'},
			{name:'DynectEmail'},
			{name:'FastMail'},
			{name:'GandiMail'},
			{name:'Gmail'},
			{name:'Godaddy'},
			{name:'GodaddyAsia'},
			{name:'GodaddyEurope'},
			{name:'hot.ee'},
			{name:'Hotmail'},
			{name:'iCloud'},
			{name:'mail.ee'},
			{name:'Mail.ru'},
			{name:'Mailgun'},
			{name:'Mailjet'},
			{name:'Mandrill'},
			{name:'Naver'},
			{name:'Postmark'},
			{name:'QQ'},
			{name:'QQex'},
			{name:'SendCloud'},
			{name:'SendGrid'},
			{name:'SES'},
			{name:'Yahoo'},
			{name:'Yandex'},
			{name:'Zoho'}
		]});

    }

    data.router.get('/admin/email/services', data.middleware.admin.buildHeader, renderAdminPage);
    data.router.get('/api/admin/email/services', renderAdminPage);

    callback();
};

Emailer.send = function (data) {
	Meta.settings.get('email-service', function (err, options) {
		var transport = nodemailer.createTransport({
			service: options['email_service'],
			auth: {
				user: options['email:service:username'],
				pass: options['email:service:password']
			}
		});
		console.log(options);
		transport.sendMail({
			from: data.from,
			to: data.to,
			html: data.html,
			text: data.plaintext,
			subject: data.subject
		}, function (err, response) {
			console.log(err);
			if (!err) {
				winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
			} else {
				winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
				// winston.error('[emailer.smtp] ' + response.message);
			}
		});
	});

};

Emailer.admin = {
    menu: function(custom_header, callback) {
        custom_header.plugins.push({
            "route": '/email/services',
            "icon": 'fa-envelope-o',
            "name": 'Email Services'
        });

        callback(null, custom_header);
    }
};

module.exports = Emailer;
