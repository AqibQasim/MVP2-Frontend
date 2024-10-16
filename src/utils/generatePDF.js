import jsPDF from "jspdf";

export default async function generatePDF({ setIsPdfLoading, selectedCandidate, technicalRating, technicalSummary, softSkillRating, softSkillSummary, codingRating, codingSummary }) {
  console.log("generating pdf");
  console.log(selectedCandidate)


  try {
    setIsPdfLoading(true);
    const pdf = new jsPDF('landscape', 'px', 'a4');  // Use A4 size in millimeters
    const contentWidth = 210;  // A4 Page width in mm
    const contentHeight = 297; // A4 Page height in mm

    // Use the actual DOM element and apply scaling
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; width: 600px; justify-content:center; padding-left:20px;">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; width:"80%">
          ${selectedCandidate ? `${selectedCandidate.customer.name}'s Report` : 'Report'}
        </h1>

        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 20px;">
          <h2 style="font-size: 18px; font-weight: bold;">Technical Rating</h2>
          <p style="font-size: 16px;">${technicalRating}/10</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 18px;">Summary</h3>
          <p style="font-size: 16px;">${technicalSummary}</p>
        </div>

        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 20px;">
          <h2 style="font-size: 18px; font-weight: bold;">Technical Rating</h2>
          <p style="font-size: 16px;">${softSkillRating}/10</p>
        </div>

        <div>
          <h3 style="font-size: 18px;">Summary</h3>
          <p style="font-size: 16px;">${softSkillSummary}</p>
        </div>

        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 20px; margin-top: 20px">
          <h2 style="font-size: 18px; font-weight: bold;">Coding Rating</h2>
          <p style="font-size: 16px;">${codingRating}/10</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 18px;">Summary</h3>
          <p style="font-size: 16px;">${codingSummary}</p>
        </div>
      </div>
      `;

    // Generate the PDF with HTML content
    //pdf.html(htmlContent).save(selectedCandidate ? `${selectedCandidate?.customer?.name}'s-report.pdf` : 'overlay.pdf');
    pdf.html(htmlContent, {          
      callback: function (pdf) {
        pdf.save(selectedCandidate ? `${selectedCandidate?.customer?.name}'s-report.pdf` : 'overlay.pdf');
      },
      x: 10,  // Left margin
      y: 10,  // Top margin
      autoPaging: true,
      margin: 10,
      
      //width: contentWidth - 20,  // Set content width to fit within the Page margins
      //windowWidth: contentRef.current.scrollWidth  // Use the scroll width of the content for scaling
    });

    setIsPdfLoading(false);
  } catch (error) {
    console.error("Error generating PDF:", error);
    //showError();
    console.log(error);
    // Handle error
  } finally {
    setIsPdfLoading(false);
  }

  setIsPdfLoading(false);

}