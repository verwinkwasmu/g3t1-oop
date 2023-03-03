import { useNavigate } from "react-router-dom";
import CreateWorkflow from "./CreateWorkflow"

function WorkflowDash() {

    const navigate = useNavigate();

    const toWorkflowView = () => {
        console.log("===== INSIDE toWorkflowView =====")
        navigate(`/workflows/id`);
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1 className="text-3xl font-semibold text-blue">Workflows</h1>
                        </div>
                        <div className="flex ">
                            <CreateWorkflow></CreateWorkflow>
                        </div>
                    </div>

                    {/* <h1 className="text-3xl font-semibold text-blue pb-6">Workflows</h1> */}

                    <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                        <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                            <div className="card-body m-1.5">
                                <h2 className="card-title">Business Process Re-Engineering Workflow</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView() }}>See Workflow</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default WorkflowDash;