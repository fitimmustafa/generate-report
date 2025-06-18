import { jsPDF } from "jspdf";
import { OfferData, PRODUCT_CATEGORIES } from "@/types/offer";

export const generateOfferPDF = async (offerData: OfferData): Promise<void> => {
  const doc = new jsPDF("portrait", "mm", "a4");
  let currentY = 10;
  const pageHeight = 297;
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // Function to add a new page if needed
  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > pageHeight - 30) {
      doc.addPage();
      currentY = 15;
      return true;
    }
    return false;
  };

  // Function to load and add logo
  const addLogo = async () => {
    try {
      const logoBase64 = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg", 0.8));
          } else {
            reject(new Error("Canvas context not available"));
          }
        };
        img.onerror = () => reject(new Error("Logo could not be loaded"));
        img.src = "/nura-logo.jpg";
      });

      // Add logo to PDF - larger size to match reference
      doc.addImage(logoBase64, "JPEG", margin, currentY, 80, 40);
    } catch (error) {
      console.warn("Logo could not be loaded, continuing without it:", error);
      // Add text logo as fallback with green background
      doc.setFillColor(70, 150, 70);
      doc.rect(margin, currentY, 80, 40, "F");
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("NURA", margin + 25, currentY + 25);
      doc.setTextColor(0, 0, 0);
    }
  };

  // Add company header with logo
  await addLogo();

  // Header information box - larger to match reference
  doc.setFillColor(250, 250, 250);
  doc.rect(margin + 85, currentY, contentWidth - 85, 40, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin + 85, currentY, contentWidth - 85, 40, "S");

  // Company contact information (right side of header)
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const contactInfo = ["www.nura.rs", "office@nura.rs", "Preshevë"];
  contactInfo.forEach((line, index) => {
    doc.text(line, margin + 90, currentY + 10 + index * 5);
  });

  const phoneInfo = ["tel & fax: 017/868 360", "mob: 062 / 289 911"];
  phoneInfo.forEach((line, index) => {
    const textWidth = doc.getTextWidth(line);
    doc.text(
      line,
      pageWidth - margin - textWidth - 5,
      currentY + 10 + index * 5
    );
  });

  currentY += 50;

  // Large centered title "OFERTË" - bigger spacing
  currentY += 20;
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  const titleText = "O F E R T Ë";
  const titleWidth = doc.getTextWidth(titleText);
  doc.text(titleText, (pageWidth - titleWidth) / 2, currentY);
  currentY += 30;

  // Client Information Box - larger and better formatted
  doc.setFillColor(248, 248, 248);
  doc.rect(margin, currentY, contentWidth, 50, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, currentY, contentWidth, 50, "S");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);

  const clientFields = [
    { label: "KLIENTI", value: offerData.clientName.toUpperCase() },
    { label: "TEL", value: "" },
    { label: "EMAIL", value: offerData.clientEmail },
    { label: "OFERTA NR.", value: offerData.offerNumber },
  ];

  clientFields.forEach((field, index) => {
    const yPos = currentY + 12 + index * 10;
    doc.setFont("helvetica", "bold");
    doc.text(field.label, margin + 10, yPos);

    // Draw longer underline for value
    const valueX = margin + 70;
    const lineLength = 100;
    doc.setLineWidth(0.3);
    doc.line(valueX, yPos + 1, valueX + lineLength, yPos + 1);

    // Add value
    if (field.value) {
      doc.setFont("helvetica", "normal");
      doc.text(field.value, valueX + 5, yPos);
    }
  });

  currentY += 60;

  // Add footer information for first page
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Oferta vlen për 20 ditë`, margin, currentY);
  doc.text(
    `Preshevë ${new Date(offerData.date).toLocaleDateString("sq-AL")}`,
    pageWidth - margin - 60,
    currentY
  );

  currentY += 20;

  // Products section - each product starts on a new page, first product starts on page 2
  for (let i = 0; i < offerData.products.length; i++) {
    const product = offerData.products[i];

    // Always start new page for each product (including the first one)
    doc.addPage();
    currentY = 20;

    // Product header - improved formatting like reference
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}`, margin, currentY);

    // Product category and details in header box
    const categoryText =
      PRODUCT_CATEGORIES[product.category] || product.category;

    // Draw header box with better styling
    doc.setFillColor(235, 235, 235);
    doc.rect(margin, currentY + 5, contentWidth, 18, "F");
    doc.setLineWidth(0.5);
    doc.rect(margin, currentY + 5, contentWidth, 18, "S");

    // Category name in header
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text(categoryText, margin + 8, currentY + 16);

    // Product type on same line if available
    if (product.productType) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const categoryWidth = doc.getTextWidth(categoryText);
      doc.text(
        ` - ${product.productType}`,
        margin + 8 + categoryWidth + 5,
        currentY + 16
      );
    }

    doc.setTextColor(0, 0, 0); // Reset color
    currentY += 28;

    // Main content area - image left, specifications right (like reference PDF)
    const imageWidth = 90;
    const imageHeight = 120;
    const imageX = margin;
    const specX = margin + imageWidth + 10;
    const specWidth = contentWidth - imageWidth - 10;

    // Add product image on the LEFT (like reference)
    if (product.images && product.images.length > 0) {
      try {
        const imageData = product.images[0];
        if (imageData.startsWith("data:image/")) {
          // Draw image border
          doc.setLineWidth(0.5);
          doc.rect(imageX, currentY, imageWidth, imageHeight, "S");
          // Add image with some padding
          doc.addImage(
            imageData,
            "JPEG",
            imageX + 2,
            currentY + 2,
            imageWidth - 4,
            imageHeight - 4
          );
        }
      } catch (error) {
        console.warn("Could not add product image:", error);
        // Add placeholder box for image
        doc.setFillColor(245, 245, 245);
        doc.rect(imageX, currentY, imageWidth, imageHeight, "F");
        doc.setLineWidth(0.5);
        doc.rect(imageX, currentY, imageWidth, imageHeight, "S");

        doc.setFontSize(10);
        doc.setTextColor(120, 120, 120);
        doc.text("Imazh i produktit", imageX + 20, currentY + imageHeight / 2);
        doc.setTextColor(0, 0, 0);
      }
    } else {
      // Add placeholder box for image
      doc.setFillColor(245, 245, 245);
      doc.rect(imageX, currentY, imageWidth, imageHeight, "F");
      doc.setLineWidth(0.5);
      doc.rect(imageX, currentY, imageWidth, imageHeight, "S");

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text("Imazh i produktit", imageX + 20, currentY + imageHeight / 2);
      doc.setTextColor(0, 0, 0);
    }

    // Product specifications on the RIGHT (like reference)
    doc.setFillColor(252, 252, 252);
    doc.rect(specX, currentY, specWidth, imageHeight, "F");
    doc.setLineWidth(0.3);
    doc.rect(specX, currentY, specWidth, imageHeight, "S");

    // Create detailed specifications table with better formatting
    const specs = [
      { label: "Profili:", value: product.profili },
      { label: "Ngjyra e profilit:", value: product.ngjyraProfilit },
      { label: "Mbushja:", value: product.mbushja },
      { label: "Hapja roletneteve:", value: product.hapjaRoletneteve },
      { label: "Ngjyra roletneteve:", value: product.ngjyraRoletneteve },
      { label: "Fletëzate roletneteve:", value: product.fletezateRoletneteve },
      { label: "Mekanizmat:", value: product.mekanizmat },
      { label: "Dorzat:", value: product.dorzat },
      { label: "Llavjet e braves:", value: product.llavjetBraves },
      { label: "Mekanizmat e braves:", value: product.mekanizmatBraves },
      { label: "Qelsat:", value: product.qelsat },
      { label: "Bagjlamat:", value: product.bagjlamat },
    ];

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    let specY = currentY + 6;
    const lineHeight = 6;
    const labelWidth = 45;

    specs.forEach((spec) => {
      if (spec.value && spec.value.trim()) {
        // Check if we have enough space
        if (specY + lineHeight > currentY + imageHeight - 35) {
          return; // Skip if not enough space
        }

        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 40, 40);
        doc.text(spec.label, specX + 3, specY);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);

        // Better text wrapping and positioning
        const maxWidth = specWidth - labelWidth - 8;
        const valueX = specX + labelWidth;
        const lines = doc.splitTextToSize(spec.value, maxWidth);

        lines.forEach((line: string, lineIndex: number) => {
          if (specY + lineIndex * 4 <= currentY + imageHeight - 35) {
            doc.text(line, valueX, specY + lineIndex * 4);
          }
        });

        specY += Math.max(lineHeight, lines.length * 4);
      }
    });

    // Add pricing information at bottom of spec area with better styling
    const pricingY = currentY + imageHeight - 30;
    doc.setFillColor(240, 248, 255);
    doc.rect(specX + 2, pricingY, specWidth - 4, 25, "F");
    doc.setLineWidth(0.3);
    doc.rect(specX + 2, pricingY, specWidth - 4, 25, "S");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 80, 140);

    // Better spacing for pricing info
    doc.text(`Sasia:`, specX + 6, pricingY + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${product.quantity}`, specX + 25, pricingY + 8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 50, 50);
    doc.text(`Qmimi:`, specX + 6, pricingY + 15);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`€${(product.qmimi || 0).toFixed(2)}`, specX + 30, pricingY + 15);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 120, 0);
    doc.text(`Totali:`, specX + 6, pricingY + 22);
    doc.text(
      `€${(product.totalPrice || 0).toFixed(2)}`,
      specX + 30,
      pricingY + 22
    );

    currentY += imageHeight + 15;

    // Add page number at bottom
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`${i + 2}`, pageWidth - margin - 20, pageHeight - 10);
    doc.setTextColor(0, 0, 0);
  }

  // Final summary page
  doc.addPage();
  currentY = 30;

  // Title for summary
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Përmbledhje e Ofertës", margin, currentY);
  currentY += 20;

  // Summary table
  if (offerData.products.length > 1) {
    // Table header
    doc.setFillColor(230, 230, 230);
    doc.rect(margin, currentY, contentWidth, 12, "F");
    doc.setLineWidth(0.5);
    doc.rect(margin, currentY, contentWidth, 12, "S");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Nr.", margin + 5, currentY + 8);
    doc.text("Produkti", margin + 20, currentY + 8);
    doc.text("Sasia", margin + 100, currentY + 8);
    doc.text("Qmimi/njësi", margin + 125, currentY + 8);
    doc.text("Totali", margin + 155, currentY + 8);

    currentY += 12;

    // Product rows
    offerData.products.forEach((product, index) => {
      const rowHeight = 10;
      doc.setFillColor(index % 2 === 0 ? 248 : 255, 248, 248);
      doc.rect(margin, currentY, contentWidth, rowHeight, "F");
      doc.setLineWidth(0.2);
      doc.rect(margin, currentY, contentWidth, rowHeight, "S");

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      const productName =
        PRODUCT_CATEGORIES[product.category] || product.category;
      doc.text(`${index + 1}`, margin + 5, currentY + 7);
      doc.text(productName, margin + 20, currentY + 7);
      doc.text(product.quantity.toString(), margin + 105, currentY + 7);
      doc.text(
        `€${(product.qmimi || 0).toFixed(2)}`,
        margin + 130,
        currentY + 7
      );

      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 120, 0);
      doc.text(
        `€${(product.totalPrice || 0).toFixed(2)}`,
        margin + 160,
        currentY + 7
      );
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");

      currentY += rowHeight;
    });

    currentY += 10;
  }

  // Grand total section
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, currentY, contentWidth, 25, "F");
  doc.setLineWidth(0.5);
  doc.rect(margin, currentY, contentWidth, 25, "S");

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Cmimi total:", margin + 15, currentY + 16);

  doc.setFontSize(18);
  doc.setTextColor(0, 120, 0);
  doc.text(
    `${offerData.totalAmount.toFixed(2)} €`,
    pageWidth - margin - 50,
    currentY + 16
  );
  doc.setTextColor(0, 0, 0);

  currentY += 35;

  // Terms and conditions
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Kushtet e garancisë:", margin, currentY);
  currentY += 8;

  const terms = [
    "• Dritaret garancion 10 vite",
    "• Mekanizmat garancion 10 vite",
    "• Roletët garancion 5 vite",
    "• Xhami garancion 5 vite",
    "• Elektromotori garancion 2 vite",
  ];

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  terms.forEach((term, index) => {
    doc.text(term, margin + 5, currentY + index * 6);
  });

  currentY += 40;

  // Signature lines - each signature gets its own dedicated space
  currentY += 10; // Extra space before signatures

  const signatureLineWidth = 70;
  const leftSignatureX = margin + 15;
  const rightSignatureX = pageWidth - margin - signatureLineWidth - 15;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setLineWidth(0.5);

  // Left signature (Blerësi) - on the left side
  const bleresiText = "Blerësi";
  const bleresiWidth = doc.getTextWidth(bleresiText);
  doc.text(
    bleresiText,
    leftSignatureX + (signatureLineWidth - bleresiWidth) / 2,
    currentY
  );
  // Draw line under Blerësi
  doc.line(
    leftSignatureX,
    currentY + 5,
    leftSignatureX + signatureLineWidth,
    currentY + 5
  );

  // Right signature (NURA DOO) - on the right side
  const nuraText = "NURA DOO";
  const nuraWidth = doc.getTextWidth(nuraText);
  doc.text(
    nuraText,
    rightSignatureX + (signatureLineWidth - nuraWidth) / 2,
    currentY
  );
  // Draw line under NURA DOO
  doc.line(
    rightSignatureX,
    currentY + 5,
    rightSignatureX + signatureLineWidth,
    currentY + 5
  );

  currentY += 20; // Move down after signatures

  // Notes section if available
  if (offerData.notes && offerData.notes.trim()) {
    currentY += 25;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Shënime:", margin, currentY);
    currentY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const noteLines = doc.splitTextToSize(offerData.notes, contentWidth - 10);
    noteLines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, margin + 5, currentY);
      currentY += 6;
    });
  }

  // Save the PDF
  doc.save(`oferta-${offerData.offerNumber}.pdf`);
};

export default generateOfferPDF;
