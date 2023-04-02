// just for reference, trigger code is configured in mongodb atlas

exports = function() {
    // cron expression for firing
    // 0 */24 * * *
    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    function sendEmail(doc){
        sendSmtpEmail.subject = "[REMINDER]: Your questionnaire has exceeded the submission deadline";
        sendSmtpEmail.htmlContent = "<html><body><h2>Dear {{params.vendorName}},</h2><p>You are reminded to submit your questionnaire as soon as possible. Thank you!</p></body></html>";
        sendSmtpEmail.sender = {"name":"John Doe","email":"johndoe@quantumleap.com"};
        sendSmtpEmail.to = [{"email": doc.vendorDetails.email, "name": doc.vendorDetails.name}];
        sendSmtpEmail.params = {"vendorName": doc.vendorDetails.name};

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function(error) {
            console.error(error);
        });
    }

    const db = context.services.get("Cluster-test-v1").db("oop-g3t1-test");
    const questionnaires = db.collection("questionnaires");
    const currentDate = new Date();

    return questionnaires.aggregate([
        {$match : {
                submissionDate : {
                    $exists : false
                },
                submissionDeadline : {
                    $lt : currentDate
                }
            }},
        {$addFields: {
                assignedVendorObjId: {$toObjectId: "$assignedVendorId"}
            }},
        {$lookup: {
                from: "users",
                localField: "assignedVendorObjId",
                foreignField: "_id",
                as: "vendorDetails"
            }},
        {$unwind: "$vendorDetails"}
    ]).toArray().then(output => {
        for (const doc of output) {
            sendEmail(doc)
        }
    }).catch(
        err => console.error(`didn work`));

};

