import { AiOutlineUser } from "react-icons/ai";

import { React, useState, useEffect, Component } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select'
import { createWorkflowAssigned, createQuestionnaire, getVendors } from '../../../apiCalls'
import useToken from '../../../useToken';
import axios from 'axios'

function AssignNewUser(props) {
    console.log("ASSIGN NEW USER")

    const navigate = useNavigate();

    const workflowData = props.workflow
    const workflowName = workflowData.workflowName
    const workflowDescription = workflowData.workflowDescription
    const questionnaireList = workflowData.questionnaireList
    const questionnaires = workflowData.questionnaires
    var questionnairesInput = []
    const token = useToken().token

    for (var index in questionnaires) {
        delete questionnaires[index].id
        delete questionnaires[index].createdAt
        questionnairesInput.push(questionnaires[index])
    }

    const [vendors, setVendors] = useState([]);
    const [vendorOptions, setVendorOptions] = useState();
    const [selectedVendors, setSelectedVendors] = useState("");
    const [questionnaireTitles, setQuestionnaireTitles] = useState([]);
    const [questionnaireDeadlines, setQuestionnaireDeadlines] = useState([]);
    const [values, setValues] = useState([]);

    const [duplicatedQuestionnaire, setDuplicatedQuestionnaire] = useState([])

    const user = useToken().token;

    useEffect(() => {
        getVendors()
            .then(function (response) {
                setVendors(response.data)

                const selectOptions = [];
                for (const element of response.data) {
                    selectOptions.push(
                        {
                            value: element.id,
                            label: element.name
                        }
                    )
                }
                setVendorOptions(selectOptions)
            })
        // eslint-disable-next-line

        const temp = [];
        for (const index in questionnaires) {
            temp.push([questionnaires[index].id, questionnaires[index].title]);
        }
        setQuestionnaireTitles(temp);
        console.log("questionnaireTitles")
        console.log(questionnaireTitles)
    }, [])

    const validateForm = () => {
        return selectedVendors.length != 0;
    }

    const handleSelect = (data) => {
        setSelectedVendors(data);
    }

    const handleQuestionnaires = async () => {
        console.log("HANDLE QUESTIONNAIRE")

        let isConditionSettled = false;
        const output = []
        console.log(questionnairesInput)

        for (const questionnaire of questionnairesInput) {
            createQuestionnaire(questionnaire)
                .then(function (response) {
                    output.push(response.data.id)

                })
                .catch(function (error) {
                    console.log("ERROR CREATING QUESTIONNAIRE")
                })
        }

        setTimeout(() => {
            isConditionSettled = true;
        }, 1500);

        while (!isConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log(output)
        return output
    };

    const updateQuestionnaireUserInfo = async () => {
        console.log("I AM ADDING I AM DYING")
      
        let isCreatingConditionSettled = false;
        let isResolvingConditionSettled = false;
        let promises = handleQuestionnaires()
        let questionnaireIds = []

        setTimeout(() => {
            isCreatingConditionSettled = true;
        }, 3000);

        while (!isCreatingConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // promises.then(result => {
        //     console.log(result);
        //     questionnaireIds.push(result[0]);
        // });

        const result = await promises
        questionnaireIds = result

        console.log("QUESTIONNAIRE IDS")
        console.log(questionnaireIds)

        setTimeout(() => {
            isResolvingConditionSettled = true;
        }, 3000);

        while (!isResolvingConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
      
        const output = []
        let isConditionSettled = false;

        for (let id of questionnaireIds) {
          let updateQuestionnaire;
      
          try {
            const response = await axios.get(`http://localhost:8080/api/v1/questionnaire/${id}`);
            const duplicatedQuestionnaire = response.data
            console.log(duplicatedQuestionnaire)
      
            updateQuestionnaire = {
              ...duplicatedQuestionnaire,
              assignedAdminId: user[0],
              assignedVendorId: selectedVendors.value
            };
          } catch (error) {
            console.log(error)

          }
          console.log(updateQuestionnaire)
      
          // update the questionnaire object
          try {
            const response = await axios.put(`http://localhost:8080/api/v1/questionnaire/update`, updateQuestionnaire);
            output.push(response.data.id)
          } catch (error) {
            console.log(error)
          }
        }
        setTimeout(() => {
            isConditionSettled = true;
        }, 3000);

        while (!isConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    
        return output
      }

    const handleCreate = async () => {
        console.log("INSIDE HANDLE CREATE");

        let isCreatingConditionSettled = false;
        let isResolvingConditionSettled = false;
        let promises = updateQuestionnaireUserInfo()
        let questionnaireIds = []

        setTimeout(() => {
            isCreatingConditionSettled = true;
        }, 6000);

        while (!isCreatingConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // console.log("PROMISES ")
        // console.log(promises)
        // promises.then(result => {
        //     console.log(result);
        //     questionnaireIds.push(result[0]);
        // });

        questionnaireIds = await promises
        console.log("questionnaire ids: ")
        console.log(questionnaireIds)


        const updatedWorkflow = {
            ...workflowData,
            questionnaireList: questionnaireIds,
            assignedVendorId: selectedVendors.value
        };

        console.log("updated workflow: ")
        console.log(updatedWorkflow)

        createWorkflowAssigned(updatedWorkflow)
            .then(function(response){
                console.log(response.data)
                navigate(`/workflow-assigned/${response.data.id}`, { state: { workflowId: response.data.id } });

            })

        // console.log("?????!!!!!!?!?!?!?!!!?!?")
        // console.log(questionnaireIds)

        // setTimeout(() => {
        //     isResolvingConditionSettled = true;
        // }, 3000);

        // while (!isResolvingConditionSettled) {
        //     await new Promise(resolve => setTimeout(resolve, 100));
        // }

        // createWorkflowAssigned({
        //     workflowName: workflowName,
        //     workflowDescription: workflowDescription,
        //     questionnaireList: questionnaireIds,
        //     assignedAdminId: token[0],
        //     assignedVendorId: selectedVendors.value,
        //     approvalRequestDate: null,
        //     approverReviewStatus: "INITIAL_DRAFT",
        //     approvedAt: null
        // })
        //     .then(function (response) {
        //         console.log(response.data)
        //         navigate(`/workflow-assigned/${response.data.id}`, { state: { workflowId: response.data.id } });
        //     })
        //     .catch(function (error) {
        //         console.log("ERROR CREATING WORKFLOW")
        //     })
    }

    const handleDeadlines = (event, index) => {
        const { value } = event.target;
        setValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
        console.log(values)
    };

    const handleAddUserClick =() => {
        updateQuestionnaireUserInfo();
        handleCreate();
    }

    return (
        <>
            <label htmlFor="AssignNewUser" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <AiOutlineUser size={20} className="mr-3"></AiOutlineUser>
                Assign New User
            </label>

            <input type="checkbox" id="AssignNewUser" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="AssignNewUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Assign New User</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="userid">
                                Vendor
                            </label>
                            <Select
                                options={vendorOptions}
                                placeholder={"Choose Vendor"}
                                value={selectedVendors}
                                onChange={handleSelect}
                                isSearchable={true}
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            {console.log(questionnaireTitles)}
                            {(questionnaireTitles).map((questionnaireInfo) =>
                                <div className="mb-4">
                                    {console.log('HELLOHELLOHELLO')}
                                    {console.log(questionnaireInfo)}
                                    <label className="block text-gray-700 text-md font-thin" htmlFor="deadline" key={questionnaireInfo[0]}>
                                        {questionnaireInfo[1]}
                                    </label>
                                    <label className="block text-gray-700 text-xs font-thin mb-2" htmlFor="deadline" key={questionnaireInfo[0]}>
                                        Please input deadline in DD/MM/YYYY format.
                                    </label>
                                    <input 
                                        key={questionnaireInfo[0]}
                                        onChange={(e) => handleDeadlines(e, questionnaireInfo[0])}
                                        id="questionnairedeadline" 
                                        type="text"
                                        className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    />
                                </div>
                            )}

                        </div>

                        
                        <div className="flex justify-center">
                            <label onClick={() => handleAddUserClick()} htmlFor="AssignNewUser" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button" disabled={!validateForm()}>
                                Assign New User
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default AssignNewUser;