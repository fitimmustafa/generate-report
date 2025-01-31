/* eslint-disable @typescript-eslint/no-explicit-any */
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
  oferta: string;
  date: string;
  img: any;
  profili: string;
  ngjyraProfilit: string;
  xhami: string;
  mekanizmat: string;
  dorzat: string;
  roletet: string;
  ngjyraeRoleteve: string;
  fletezateRoleteve: string;
  sasia: number;
};

const styles = StyleSheet.create({
  page: {
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#ffff",
    border: "1px",
    borderColor: "#ffff",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: "50%",
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontSize: 40,
    fontWeight: "black",
    marginBottom: 50,
    marginTop: 20,
    color: "#333",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    width: "30%",
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "65%",
  },
  messageSection: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
  },
  contactSection: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
  },
  contactColumnLeft: {
    flex: 1,
  },
  contactColumnRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  contactText: {
    fontSize: 12,
    color: "#008000",
    marginBottom: 4,
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#555",
    borderTop: "1px solid #ddd",
    paddingTop: 10,
  },
  imageWithTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    padding: 10,
    marginTop: 20,
    gap: 15,
  },
  profiliText: {
    fontSize: 12,
    color: "#333",
    textAlign: "left",
    marginBottom: 5,
  },
  profiliImage: {
    width: "50%",
    height: 250,
  },
  textGroup: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
});

const PDFDocument: React.FC<PDFDocumentProps> = ({
  name,
  email,
  oferta,
  date,
  img,
  profili,
  ngjyraProfilit,
  dorzat,
  fletezateRoleteve,
  mekanizmat,
  ngjyraeRoleteve,
  roletet,
  sasia,
  xhami,
}) => (
  <Document>
    <Page style={styles.page}>
      {/* Logo */}
      <Image style={styles.logo} src="/nura-logo.jpg" />

      {/* Company Contacts */}
      <View style={styles.contactSection}>
        <View style={styles.contactColumnLeft}>
          <Text style={styles.contactText}>www.nura.rs</Text>
          <Text style={styles.contactText}>office@nura.rs</Text>
          <Text style={styles.contactText}>Preshevë</Text>
        </View>
        <View style={styles.contactColumnRight}>
          <Text style={styles.contactText}>Tel & Fax: 017/868 460</Text>
          <Text style={styles.contactText}>Mob: 062 / 289 911</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.section}>
        <Text style={styles.title}>OFERTË</Text>

        <View style={styles.flexRow}>
          <Text style={styles.label}>Klienti:</Text>
          <View style={styles.underline}>
            <Text style={styles.content}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.underline}>
            <Text style={styles.content}>{email}</Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.label}>Oferta Nr:</Text>
          <View style={styles.underline}>
            <Text style={styles.content}>{oferta}</Text>
          </View>
        </View>

        <View style={[styles.flexRow, styles.justifyBetween]}>
          <Text style={styles.label}>Oferta vlen për 20 ditë</Text>
          <Text style={styles.content}>Preshevë: {date}</Text>
        </View>
      </View>

      {/* Message Section */}
      <View style={styles.messageSection}>
        <Text style={styles.content}>
          Ne jemi të lumtur që mund të ofrojmë këtë ofertë dhe presim të
          bashkëpunojmë së shpejti. Nëse keni ndonjë pyetje ose kërkesë, ju
          lutem na kontaktoni.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.contactText}>
          Nura - Zhvillim dhe Shërbime Profesionale
        </Text>
        <Text style={styles.contactText}>
          © 2024 Nura. Të drejtat e rezervuara.
        </Text>
      </View>
    </Page>
    <Page style={styles.page}>
      <View style={styles.imageWithTextContainer}>
        <Image style={styles.profiliImage} src={img} />
        <View style={styles.textGroup}>
          <Text style={styles.profiliText}>Profili: {profili}</Text>
          <Text style={styles.profiliText}>
            Ngjyra e profilit: {ngjyraProfilit}
          </Text>
          <Text style={styles.profiliText}>Xhami: {xhami}</Text>
          <Text style={styles.profiliText}>Mekanizmat: {mekanizmat}</Text>
          <Text style={styles.profiliText}>Dorzat: {dorzat}</Text>
          <Text style={styles.profiliText}>Roletët: {roletet}</Text>
          <Text style={styles.profiliText}>
            Ngjyra e roletëve: {ngjyraeRoleteve}
          </Text>
          <Text style={styles.profiliText}>
            Fletëzat e roletëve: {fletezateRoleteve}
          </Text>
          <Text style={styles.profiliText}>Sasia: {sasia}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
