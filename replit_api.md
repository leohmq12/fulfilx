Webform API
API KEY:
web_b4281fc9a2de0d11c024bdd243ccc8af845ba5477cc136ce
Webhook URL:
https://fulfil-crm--nazstudios.replit.app/api/webhooks/website
Send a POST request to the webhook URL with the API key in the X-API-Key header.
Required: email
Optional: firstName, lastName, phone, company, position, comments, message, source
The comments and message fields will be added to the lead's notes.


Newsletter
API KEY:
nws_656be6e3243a33ab05ad56f186fef924858d8798af72b8dc
Webhook URL:
https://fulfil-crm--nazstudios.replit.app/api/webhooks/newsletter
Send a POST request to the webhook URL with the API key in the X-API-Key header.
Request body: { "email": "...", "name": "...", "source": "..." }
