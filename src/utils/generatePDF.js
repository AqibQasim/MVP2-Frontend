import jsPDF from "jspdf";

export default async function generatePDF({setIsPdfLoading, contentRef, selectedCandidate}) {
    console.log("generating pdf");
    if (contentRef.current) {
      try {
        setIsPdfLoading(true);
        const pdf = new jsPDF('landscape', 'mm', 'a4');  // Use A4 size in millimeters
        const contentWidth = 210;  // A4 Page width in mm
        const contentHeight = 297; // A4 Page height in mm
        
        // Use the actual DOM element and apply scaling
        pdf.html(contentRef.current, {
          callback: function (pdf) {
            pdf.save(selectedCandidate ? `${selectedCandidate.name}'s-report.pdf` : 'overlay.pdf');
          },
          x: 10,  // Left margin
          y: 10,  // Top margin
          html2canvas: {
            scale: 0.21  // Adjust the scale to fit the content on one Page
          },
          width: contentWidth - 20,  // Set content width to fit within the Page margins
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