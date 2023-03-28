import React, {useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import update from 'immutability-helper';
import { jsPDF } from 'jspdf';
// import '../index.css'; //tailwind

const ITEM_TYPE = 'question';

const inputTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'radio', label: 'Radio Button' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'select', label: 'Dropdown' },
  { value: 'file', label: 'File Upload' }
];


function CreateForm(){
  // const FormQuestion = ({ question, index, moveQuestion }) => {
  //   const ref = React.useRef(null);
  //   const [, drop] = useDrop({
  //     accept: ITEM_TYPE,
  //     hover(item, monitor) {
  //       if (!ref.current) {
  //         return;
  //       }
  //       const dragIndex = item.index;
  //       const hoverIndex = index;
  //       if (dragIndex === hoverIndex) {
  //         return;
  //       }
  //       const hoverBoundingRect = ref.current.getBoundingClientRect();
  //       const hoverMiddleY =
  //         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //       const clientOffset = monitor.getClientOffset();
  //       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //         return;
  //       }
  //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //         return;
  //       }
  //       moveQuestion(dragIndex, hoverIndex);
  //       item.index = hoverIndex;
  //     }
  //   });
  //   const [{ isDragging }, drag] = useDrag({
  //     item: { type: ITEM_TYPE, id: question.id, index },
  //     collect: monitor => ({
  //       isDragging: monitor.isDragging()
  //     })
  //   });
  //   const opacity = isDragging ? 0 : 1;
  //   drag(drop(ref));
  //   return (
  //     <div ref={ref} style={{ opacity }}>
  //       <Form.Group>
  //         <Form.Label>Question {index + 1}</Form.Label>
  //         <Form.Control type="text" defaultValue={question.label} />
  //       </Form.Group>
  //       <Form.Group>
  //         <Form.Label>Type</Form.Label>
  //         <Form.Control
  //           as="select"
  //           defaultValue={question.type}
  //           onChange={e =>
  //             moveQuestion(
  //               index,
  //               index,
  //               e.target.value,
  //               question.options
  //             )
  //           }
  //         >
  //           {inputTypes.map(inputType => (
  //             <option key={inputType.value} value={inputType.value}>
  //               {inputType.label}
  //             </option>
  //           ))}
  //         </Form.Control>
  //       </Form.Group>
  //       {question.type === 'select' ||
  //       question.type === 'radio' ||
  //       question.type === 'checkbox' ? (
  //         <Form.Group>
  //           <Form.Label>Options (comma-separated)</Form.Label>
  //           <Form.Control
  //             type="text"
  //             defaultValue={question.options.join(',')}
  //             onChange={e =>
  //               moveQuestion(
  //                 index,
  //                 index,
  //                 question.type,
  //                 e.target.value.split(',')
  //               )
  //             }
  //           />
  //         </Form.Group>
  //       ) : null}
  //     </div>
  //   );
  // };

    const [questions, setQuestions] = useState([
      {
        id: uuid(),
        label: '',
        type: 'text',
        options: []
      }
    ]);
  
    const addQuestion = () =>
      setQuestions([
        ...questions,
        {
          id: uuid(),
          label: '',
          type: 'text',
          options: []
        }
      ]);
  
    const moveQuestion = (dragIndex, hoverIndex, type, options) => {
      const dragQuestion = questions[dragIndex];
      setQuestions(
        update(questions, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragQuestion]
          ],
          [hoverIndex]: {
            type: { $set: type },
            options: { $set: options }
          }
        })
      );
    };
  
    const updateQuestionLabel = (index, label) => {
      setQuestions(
        update(questions, {
          [index]: { label: { $set: label } }
        })
      );
    };
  
    const removeQuestion = index => {
      setQuestions(
        update(questions, {
          $splice: [[index, 1]]
        })
      );
    };
  
    const onSubmit = e => {
      e.preventDefault();
      const pdf = new jsPDF();
      questions.forEach((question, index) => {
        pdf.text(`Question ${index + 1}: ${question.label}`, 10, 10 + 20 * index);
        if (
          question.type === 'select' ||
          question.type === 'radio' ||
          question.type === 'checkbox'
        ) {
          pdf.text(
            `Options: ${question.options.join(', ')}`,
            10,
            15 + 20 * index
          );
        }
        pdf.addPage();
      });
      pdf.save('form.pdf');
    };


  return (
    <div>
      <h1>Form Editor</h1>
      <Form onSubmit={() => onSubmit()}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter form title" />
        </Form.Group>
        {/* {questions.map((question, index) => (
          <FormQuestion
            key={question.id}
            question={question}
            index={index}
            moveQuestion={moveQuestion}
            updateQuestionLabel={updateQuestionLabel}
            removeQuestion={removeQuestion}
          />
        ))} */}
        <Button variant="primary" type="button" onClick={addQuestion}>
          Add Question
        </Button>
        <Button variant="primary" type="submit">
          Generate PDF
        </Button>
      </Form>
    </div>
  );
  
}
export default CreateForm;

       
