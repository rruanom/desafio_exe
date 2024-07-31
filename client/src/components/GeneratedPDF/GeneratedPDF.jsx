import { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const GeneratePDF = ({ Email }) => {
  const [candidateData, setCandidateData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/form/candidate-form/${Email}`);
      const data = await response.json();
      setCandidateData(data);
    };

    fetchData();
  }, [Email]);

  const splitTextIntoLines = (text, font, size, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = font.widthOfTextAtSize(currentLine + " " + word, size);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const logoUrl = './logo_exe.png';
    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);

    page.drawRectangle({
      x: 10,
      y: 10,
      width: width - 20,
      height: height - 20,
      borderColor: rgb(0.211, 0.169, 0.314),
      borderWidth: 2,
    });

    const logoDims = logoImage.scale(0.3);
    page.drawImage(logoImage, {
      x: width - logoDims.width - 30,
      y: height - logoDims.height - 30,
      width: logoDims.width,
      height: logoDims.height,
    });

    page.drawText('Curriculum Vitae', {
      x: 45,
      y: height - 60,
      size: 30,
      font: timesRomanBoldFont,
      color: rgb(0.211, 0.169, 0.314),
    });

    const drawWrappedText = (text, x, y, font, size, maxWidth, lineHeight) => {
      const lines = splitTextIntoLines(text, font, size, maxWidth);
      lines.forEach((line, index) => {
        page.drawText(line, {
          x,
          y: y - index * lineHeight,
          size,
          font,
          color: rgb(0, 0, 0),
        });
      });
    };

    const maxWidth = width - 100;
    const lineHeight = 18;

    drawWrappedText(`ID: ${candidateData.id_candidate}`, 50, height - 110, timesRomanFont, 16, maxWidth, lineHeight);
    drawWrappedText(`Nombre: ${candidateData.first_name}`, 50, height - 140, timesRomanFont, 16, maxWidth, lineHeight);
    drawWrappedText(`Apellido: ${candidateData.last_name}`, 50, height - 170, timesRomanFont, 16, maxWidth, lineHeight);
    drawWrappedText(`Email: ${candidateData.email}`, 50, height - 200, timesRomanFont, 16, maxWidth, lineHeight);

    page.drawLine({
      start: { x: 50, y: height - 230 },
      end: { x: width - 50, y: height - 230 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    drawWrappedText('Academic Information', 50, height - 270, timesRomanBoldFont, 20, maxWidth, lineHeight);
    drawWrappedText(`Academic Degree: ${candidateData.academic_degree}`, 50, height - 300, timesRomanFont, 15, maxWidth, lineHeight);
    drawWrappedText(`Average Grade: ${candidateData.average_grade}`, 50, height - 330, timesRomanFont, 15, maxWidth, lineHeight);
    drawWrappedText(`Languages: ${candidateData.languages}`, 50, height - 360, timesRomanFont, 15, maxWidth, lineHeight);

    page.drawLine({
      start: { x: 50, y: height - 390 },
      end: { x: width - 50, y: height - 390 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    drawWrappedText('Experience and About You', 50, height - 430, timesRomanBoldFont, 20, maxWidth, lineHeight);
    drawWrappedText(`Experience: ${candidateData.experience}`, 50, height - 460, timesRomanFont, 15, maxWidth, lineHeight);
    drawWrappedText(`About You: ${candidateData.about_you}`, 50, height - 600, timesRomanFont, 15, maxWidth, lineHeight);

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <button className="btnDatabase" onClick={generatePDF}>
      <img className="iconCV" src="/cv.png" alt="cv" />
    </button>
  );
};

export default GeneratePDF;
