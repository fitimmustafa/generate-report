import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

type PDFDocumentProps = {
  name: string;
  email: string;
  message: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica", // Clean and professional font
    backgroundColor: "#f4f4f9", // Light background for better readability
  },
  logo: {
    width: 100, // Adjust width as needed
    height: "auto", // Maintain aspect ratio
    marginBottom: 20, // Space below the logo
    alignSelf: "center", // Center the logo
  },
  section: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #ddd", // Light border to separate sections
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Dark color for the title
    textAlign: "center", // Centered title
  },
  content: {
    fontSize: 14,
    lineHeight: 1.6, // Better line spacing for readability
    marginBottom: 8, // Space between content lines
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555", // Lighter color for labels (Name, Email, etc.)
    marginBottom: 4,
  },
  messageSection: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0", // Subtle background for message section
    border: "1px solid #ccc",
  },
});

const PDFDocument: React.FC<PDFDocumentProps> = ({ name, email, message }) => (
  <Document>
    <Page style={styles.page}>
      {/* Logo Section */}
      <Image style={styles.logo} src="/public/nura-loog-black.png" />

      <View style={styles.section}>
        <Text style={styles.title}>OFERTË</Text>

        <Text style={styles.label}>Klienti:</Text>
        <Text style={styles.content}>{name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.content}>{email}</Text>

        <Text style={styles.label}>Message:</Text>
        <View style={styles.messageSection}>
          <Text style={styles.content}>{message}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
