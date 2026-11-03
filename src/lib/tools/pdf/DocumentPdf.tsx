import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { DocumentView, Row } from "../document";
import { FONT_FAMILY } from "./fonts";

/** Keep in step with components/tools/DocumentPaper.tsx, its on-screen twin. */

const CARBON = "#222222";
const MUTED = "#6b6b6b";
const HAIRLINE = "#e4e4e4";

/** Past this length a row may split across pages rather than leave a gap. */
const UNBREAKABLE_ROW_LIMIT = 600;

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingHorizontal: 48,
    paddingBottom: 64,
    fontFamily: FONT_FAMILY,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: CARBON,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: CARBON,
  },
  headerLeft: { maxWidth: 280 },
  logo: { maxHeight: 44, maxWidth: 140, objectFit: "contain", objectPositionX: 0, marginBottom: 8 },
  businessName: { fontWeight: 600, fontSize: 13, lineHeight: 1.3, marginBottom: 3 },
  title: { fontWeight: 600, fontSize: 26, lineHeight: 1.1, textAlign: "right" },
  number: { fontSize: 10, color: MUTED, textAlign: "right", marginTop: 4 },
  parties: { flexDirection: "row", marginTop: 20, marginBottom: 24 },
  party: { flex: 1, paddingRight: 16 },
  label: { fontSize: 8, fontWeight: 500, color: MUTED, marginBottom: 3 },
  partyName: { fontWeight: 600, fontSize: 10.5 },
  muted: { color: MUTED },
  metaRow: { marginBottom: 8 },
  metaValue: { fontWeight: 500, fontSize: 10 },
  project: { marginBottom: 24 },
  projectTitle: { fontWeight: 600, fontSize: 14, marginBottom: 3 },
  tableHead: {
    flexDirection: "row",
    paddingBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: CARBON,
    fontSize: 8,
    fontWeight: 500,
    color: MUTED,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: HAIRLINE,
  },
  colDescription: { flex: 1, paddingRight: 12 },
  colQty: { width: 44, textAlign: "right", paddingRight: 8 },
  colPrice: { textAlign: "right", paddingRight: 8 },
  colTotal: { textAlign: "right" },
  totals: { marginTop: 14, marginLeft: "auto", width: 236 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: CARBON,
    color: "#ffffff",
    borderRadius: 3,
  },
  grandLabel: { fontWeight: 500, fontSize: 9.5 },
  grandValue: { fontWeight: 600, fontSize: 13 },
  block: { marginTop: 18 },
  blockHeading: { fontWeight: 600, fontSize: 10, marginBottom: 2 },
  footnote: { marginTop: 22, fontSize: 8.5, color: MUTED },
  pageFooter: {
    position: "absolute",
    left: 48,
    right: 48,
    bottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: MUTED,
  },
});

function MoneyRow({ row }: { row: Row }) {
  return (
    <View style={styles.totalRow}>
      <Text style={styles.muted}>{row.label}</Text>
      <Text>{row.value}</Text>
    </View>
  );
}

/** Wide enough for the longest figure, which can't wrap: 5.8pt a character. */
function moneyColumnWidth(view: DocumentView) {
  const longest = view.lines.reduce(
    (most, line) => Math.max(most, line.unitPrice.length, line.total.length),
    0,
  );
  return Math.max(92, Math.ceil(longest * 5.8) + 10);
}

export default function DocumentPdf({ view }: { view: DocumentView }) {
  const heading = `${view.title} ${view.number}`;
  const moneyWidth = { width: moneyColumnWidth(view) };

  return (
    <Document title={heading} author={view.from.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {view.logo && <Image src={view.logo} style={styles.logo} />}
            <Text style={styles.businessName}>{view.from.name}</Text>
            {view.from.lines.map((line, index) => (
              <Text key={index} style={styles.muted}>{line}</Text>
            ))}
          </View>
          <View>
            <Text style={styles.title}>{view.title}</Text>
            <Text style={styles.number}>{view.number}</Text>
          </View>
        </View>

        <View style={styles.parties}>
          <View style={styles.party}>
            <Text style={styles.label}>{view.to.label}</Text>
            <Text style={styles.partyName}>{view.to.name}</Text>
            {view.to.lines.map((line, index) => (
              <Text key={index} style={styles.muted}>{line}</Text>
            ))}
          </View>
          <View style={{ width: 110 }}>
            {view.meta.map((row) => (
              <View key={row.label} style={styles.metaRow}>
                <Text style={styles.label}>{row.label}</Text>
                <Text style={styles.metaValue}>{row.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {view.project && (
          <View style={styles.project}>
            {view.project.title !== "" && (
              <Text style={styles.projectTitle}>{view.project.title}</Text>
            )}
            {view.project.description !== "" && (
              <Text style={styles.muted}>{view.project.description}</Text>
            )}
          </View>
        )}

        <View style={styles.tableHead} minPresenceAhead={40}>
          <Text style={styles.colDescription}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={[styles.colPrice, moneyWidth]}>Unit price</Text>
          <Text style={[styles.colTotal, moneyWidth]}>Amount</Text>
        </View>

        {view.lines.map((line) => (
          <View
            key={line.id}
            style={styles.row}
            wrap={line.description.length > UNBREAKABLE_ROW_LIMIT}
          >
            <Text style={styles.colDescription}>{line.description}</Text>
            <Text style={styles.colQty}>{line.quantity}</Text>
            <Text style={[styles.colPrice, moneyWidth]}>{line.unitPrice}</Text>
            <Text style={[styles.colTotal, moneyWidth]}>{line.total}</Text>
          </View>
        ))}

        <View style={styles.totals} wrap={false}>
          {view.totals.map((row) => (
            <MoneyRow key={row.label} row={row} />
          ))}
          <View style={styles.grand}>
            <Text style={styles.grandLabel}>{view.grandTotal.label}</Text>
            <Text style={styles.grandValue}>{view.grandTotal.value}</Text>
          </View>
        </View>

        {view.blocks.map((block) => (
          <View key={block.heading} style={styles.block}>
            <Text style={styles.blockHeading} minPresenceAhead={24}>{block.heading}</Text>
            <Text style={styles.muted}>{block.body}</Text>
          </View>
        ))}

        {view.footnote && <Text style={styles.footnote}>{view.footnote}</Text>}

        <View style={styles.pageFooter} fixed>
          <Text>{heading}</Text>
          <Text
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
