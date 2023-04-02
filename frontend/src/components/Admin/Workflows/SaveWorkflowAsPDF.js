import { AiOutlineFilePdf } from 'react-icons/ai';

import { React, useState, useEffect } from 'react';
import jsPDF from 'jspdf';

import { getVendorById } from "../../../apiCalls";
import Logo from "../../../assets/QL-Logo-Full.png";

function SaveWorkflowAsPDF(props) {

    const workflowData = props.workflow;
    const [pdfTitle, setPdfTitle] = useState("")
    const [vendorInfo, setVendorInfo] = useState("")

    useEffect(() => {
        getVendorById(workflowData.assignedVendorId)
            .then(function (response) {
                // console.log(response.data)
                setVendorInfo(response.data)
            })
        // eslint-disable-next-line
    }, [])

    const validateForm = () => {
        return !(pdfTitle.length == 0);
    }

    const handleSaveAsPDF = () => {
        const doc = new jsPDF({ unit: "cm" });

        // Define the x and y coordinates for the first question
        let x = 2.54;
        let y = 2.54;

        doc.setFont("Helvetica", "Oblique");
        doc.setFontSize(9);
        doc.text(`Assigned Vendor: ${vendorInfo.name} (${workflowData.assignedVendorId})`, 14, 2)
        doc.text(`Company: ${vendorInfo.companyName}`, 16.3, 2.5)
        y += 1

        doc.setFont("Helvetica", "BoldOblique");
        doc.setFontSize(12);

        doc.text(workflowData.workflowName, x, y);
        y += 1

        Object.values(workflowData.questionnaires).forEach((questionnaire) => {
            const qnA = questionnaire.questionsAndAnswers;
            doc.setFont("Helvetica", "Bold");
            doc.setFontSize(11);

            // doc.addImage("../../../assets/QL-Logo-Full.png", "png", 25, y)
            const imgSrc = Logo;
            doc.addImage(imgSrc, 'PNG', 25, y, 10, 5)

            doc.text(`${questionnaire.title}`, x, y);
            y += 1;

            doc.setFontSize(10);
            doc.setFont("Helvetica", "Oblique");

            Object.values(qnA).forEach((question, index) => {
                console.log("QUESTION")
                console.log(question)

                const prompt = doc.splitTextToSize(question.prompt, 24.62)
                doc.text(`${index + 1}. ${prompt}`, x, y);
                y += 0.5;

                if (question.options.length > 0) {
                    doc.setFont("Helvetica", "");
                    question.options.forEach((option) => {
                        doc.text(`- ${option.value}`, x + 1, y);
                        y += 0.5;
                    });
                }
                y += 0.5;

                doc.setFont("Helvetica", "Oblique");
                if (question.answer != undefined) {
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
                            <input onChange={e => setPdfTitle(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="pdfname" type="text" />
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