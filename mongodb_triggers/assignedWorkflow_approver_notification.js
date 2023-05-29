// just for reference, trigger code is configured in mongodb atlas

exports = function(changeEvent) {
    const updateDescription = changeEvent.updateDescription;
    const fullDocument = changeEvent.fullDocument;
    const users = context.services.get("Cluster-test-v1").db("oop-g3t1-test").collection("users");

    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '';
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // See which fields were changed (if any):
    if (updateDescription) {
        const updatedFields = updateDescription.updatedFields; // A document containing updated fields

        const pipeline = [
            {
                $match: {
                    userType : "APPROVER"
                }
            }
        ];

        const admin = users.aggregate(pipeline).toArray().then(output => {
            for (const user of output){
                sendSmtpEmail.subject = "[NOTICE]: An assignedWorkflow has been flagged for review";
                sendSmtpEmail.htmlContent = "<html><body><h2>Dear {{params.userName}},</h2><p>Workflow with ID {{params.workflowId}} has been flagged for review.</p></body></html>";
                sendSmtpEmail.sender = {"name":"John from QuantumLeap","email":"johndoe@quantumleap.com"};
                sendSmtpEmail.to = [{"email": user.email, "name": user.name}];
                sendSmtpEmail.params = {"userName": user.name, "workflowId": fullDocument._id};

                apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
                    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                }, function(error) {
                    console.error(error);
                });
            }
        });

    }
};
