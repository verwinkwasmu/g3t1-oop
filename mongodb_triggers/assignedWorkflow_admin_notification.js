// just for reference, trigger code is configured in mongodb atlas
exports = function(changeEvent) {
    const updateDescription = changeEvent.updateDescription;
    const fullDocument = changeEvent.fullDocument;
    const users = context.services.get("Cluster-test-v1").db("oop-g3t1-test").collection("users");

    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // See which fields were changed (if any):
    if (updateDescription) {
        const updatedFields = updateDescription.updatedFields; // A document containing updated fields

        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: ['$_id', {$toObjectId : fullDocument.assignedAdminId}]
                    }
                }
            }
        ];

        const admin = users.aggregate(pipeline).next().then(admin => {
            sendSmtpEmail.subject = "[NOTICE]: Your workflow status has been updated";
            sendSmtpEmail.htmlContent = "<html><body><h2>Dear {{params.adminName}},</h2><p>Your assigned workflow status has been updated to {{params.workflowStatus}}.</p></body></html>";
            sendSmtpEmail.sender = {"name":"John from QuantumLeap","email":"johndoe@quantumleap.com"};
            sendSmtpEmail.to = [{"email": admin.email, "name": admin.name}];
            sendSmtpEmail.params = {"adminName": admin.name, "workflowStatus": updatedFields.approverReviewStatus};

            apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
                console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            }, function(error) {
                console.error(error);
            });
        });

    }
};