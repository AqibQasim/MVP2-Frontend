import jsPDF from "jspdf";

export default async function generatePDF({ setIsPdfLoading, contentRef, selectedCandidate, technicalRating, technicalSummary, softSkillRating, softSkillSummary }) {
  console.log("generating pdf");
  console.log(selectedCandidate)
  if (contentRef.current) {
    try {
      setIsPdfLoading(true);
      const pdf = new jsPDF('landscape', 'px', 'a4');  // Use A4 size in millimeters
      const contentWidth = 210;  // A4 Page width in mm
      const contentHeight = 297; // A4 Page height in mm

      // Use the actual DOM element and apply scaling
      // pdf.html(`
      //     <div class="w-full h-full">

      //     <div style={} class="w-[90%] h-auto justify-between">
      //       <h1>Technical Rating</h1>
      //       <div>${0}</div>
      //       </div>
          
      //     </div>
      //     `).save(selectedCandidate ? `${selectedCandidate?.customer?.name}'s-report.pdf` : 'overlay.pdf');
      pdf.html(contentRef.current, {          
        callback: function (pdf) {
          pdf.save(selectedCandidate ? `${selectedCandidate?.customer?.name}'s-report.pdf` : 'overlay.pdf');
        },
        x: 10,  // Left margin
        y: 10,  // Top margin
        autoPaging: true,
        margin: 10,
        html2canvas: {
          scale: 0.5, // Adjust the scale to fit the content on one Page
          // width: contentRef.current.width,
          // height: contentRef.current.height
        },
        //width: contentWidth - 20,  // Set content width to fit within the Page margins
        windowWidth: contentRef.current.scrollWidth  // Use the scroll width of the content for scaling
      });

      setIsPdfLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      showError();
      console.log(error);
      // Handle error
    } finally {
      setIsPdfLoading(false);
    }
  }
  setIsPdfLoading(false);

}