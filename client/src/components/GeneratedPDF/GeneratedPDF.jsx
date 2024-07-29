import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const GeneratePDF = ({ candidateData }) => {
  
  const generatePDF = async () => {
    const { academic_degree, average_grade, languages, experience, about_you, id_candidate } = candidateData;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize();

    page.drawText(`Curriculum Vitae`, {
      x: 50,
      y: height - 50,
      size: 25,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Candidate ID: ${id_candidate}`, {
      x: 50,
      y: height - 80,
      size: 15,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Academic Degree: ${academic_degree}`, {
      x: 50,
      y: height - 100,
      size: 15,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Average Grade: ${average_grade}`, {
      x: 50,
      y: height - 120,
      size: 15,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Languages: ${languages}`, {
      x: 50,
      y: height - 140,
      size: 15,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Experience: ${experience}`, {
      x: 50,
      y: height - 160,
      size: 15,
      color: rgb(0, 0, 0),
    });

    page.drawText(`About You: ${about_you}`, {
      x: 50,
      y: height - 180,
      size: 15,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
  };

  return (
    <button onClick={generatePDF}>Generate PDF</button>
  );
};

export default GeneratePDF;