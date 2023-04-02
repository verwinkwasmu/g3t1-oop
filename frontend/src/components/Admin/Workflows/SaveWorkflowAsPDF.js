import { AiOutlineFilePdf } from 'react-icons/ai';

import { React, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import jsPDF from 'jspdf';

import { createWorkflowTemplate, getQuestionnaires } from '../../../apiCalls';


function SaveWorkflowAsPDF(props) {

    const workflowData = props.workflow;
    console.log("WORKFLOW")
    console.log(workflowData)
    const [pdfTitle, setPdfTitle] = useState("")

    
    const validateForm = () => {
        return !(pdfTitle.length == 0);
    }

    const handleSaveAsPDF = () => {
        const doc = new jsPDF({ unit: "cm" });
        console.log(doc.getFontList())
        doc.addFont("../../../assets/Calibri-Regular.ttf", "CalibriNormal");
        doc.addFont("../../../assets/Calibri-Bold.TTF", "CalibriBold");
        doc.setFont("Helvetica");
        // doc.setFontStyle("bold");
        doc.setFontSize(12);

        // Define the x and y coordinates for the first question
        let x = 2.54;
        let y = 2.54;

        doc.text(workflowData.workflowName, x, y);
        doc.setFontSize(11);
        y = 3.54;

        Object.values(workflowData.questionnaires).forEach((questionnaire) => {
            const qnA = questionnaire.questionsAndAnswers;
            doc.text(`${questionnaire.title}`, x, y);
            y += 1;

            Object.values(qnA).forEach((question, index) => {
                console.log("QUESTION")
                console.log(question)

                const prompt = doc.splitTextToSize(question.prompt, 24.62)
                doc.text(`${index + 1}. ${prompt}`, x, y);
                y += 0.5;

                if (question.options.length > 0) {
                    question.options.forEach((option) => {
                        doc.text(`- ${option.value}`, x + 1, y);
                        y += 0.5;
                    });
                }
                y += 0.5;

                if (question.answer!=undefined) {
                    doc.text(`Answer: ${question.answer}`, x + 0.45, y)
                }
                else {
                    doc.text(`Answer: `, x + 0.45, y)
                }

                y += 1;
            });

            y += 0.5;
        });

        doc.save(`${pdfTitle}.pdf`);
    };

    return (
        <>
            <label htmlFor="CreateWorkflow" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <AiOutlineFilePdf size={20} className="mr-3"></AiOutlineFilePdf>
                Save as PDF
            </label>

            <input type="checkbox" id="CreateWorkflow" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="CreateWorkflow" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Save Workflow as PDF</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowname">
                                PDF Title
                            </label>
                            <input onChange={e => setPdfTitle(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pdfname" type="text" />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="saveworkflowaspdf" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" onClick={() => handleSaveAsPDF()} type="button" disabled={!validateForm()}>
                                Save Workflow as PDF
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default SaveWorkflowAsPDF;