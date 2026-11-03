import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReceiptView } from "../receipt";
import { FONT_FAMILY } from "./fonts";

/** Keep in step with components/tools/ReceiptPaper.tsx, its on-screen twin. */

const CARBON = "#222222";
const MUTED = "#6b6b6b";
const HAIRLINE = "#e4e4e4";

const base = StyleSheet.create({
  label: { fontWeight: 500, color: MUTED },
  muted: { color: MUTED },
  name: { fontWeight: 600 },
  value: { fontWeight: 500 },
});

const standard = StyleSheet.create({
  page: { padding: 48, fontFamily: FONT_FAMILY, fontSize: 9.5, lineHeight: 1.5, color: CARBON },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: CARBON,
  },
  logo: { maxHeight: 44, maxWidth: 140, objectFit: "contain", objectPositionX: 0, marginBottom: 8 },
  title: { fontWeight: 600, fontSize: 26, lineHeight: 1.1, textAlign: "right" },
  number: { fontSize: 10, color: MUTED, textAlign: "right", marginTop: 4 },
  amount: {
    marginTop: 22,
    padding: 16,
    backgroundColor: CARBON,
    color: "#ffffff",
    borderRadius: 3,
  },
  amountValue: { fontWeight: 600, fontSize: 24, lineHeight: 1.2 },
  columns: { flexDirection: "row", marginTop: 22 },
  column: { flex: 1, paddingRight: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 0.75,
    borderBottomColor: HAIRLINE,
  },
  section: { marginTop: 18 },
});

const compact = StyleSheet.create({
  page: { padding: 14, fontFamily: FONT_FAMILY, fontSize: 8, lineHeight: 1.45, color: CARBON },
  logo: { maxHeight: 30, maxWidth: 100, objectFit: "contain", alignSelf: "center", marginBottom: 6 },
  centered: { textAlign: "center" },
  title: { fontWeight: 600, fontSize: 14, lineHeight: 1.3, textAlign: "center", marginTop: 8, marginBottom: 2 },
  amount: {
    marginVertical: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CARBON,
    textAlign: "center",
  },
  amountValue: { fontWeight: 600, fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 },
  rowValue: { maxWidth: 120, textAlign: "right" },
  section: { marginTop: 8 },
});

/** 80mm, the common thermal roll. Height follows the content. */
const COMPACT_WIDTH = 227;

function CompactReceipt({ view }: { view: ReceiptView }) {
  return (
    <Page size={{ width: COMPACT_WIDTH }} style={compact.page}>
      {view.logo && <Image src={view.logo} style={compact.logo} />}
      <Text style={[base.name, compact.centered, { fontSize: 10 }]}>{view.from.name}</Text>
      {view.from.lines.map((line, index) => (
        <Text key={index} style={[base.muted, compact.centered]}>{line}</Text>
      ))}

      <Text style={compact.title}>Receipt</Text>
      <Text style={[base.muted, compact.centered]}>{view.number}</Text>

      <View style={compact.amount}>
        <Text style={base.label}>Amount paid</Text>
        <Text style={compact.amountValue}>{view.amountPaid}</Text>
      </View>

      <View style={compact.row}>
        <Text style={base.label}>Received from</Text>
        <Text style={compact.rowValue}>{view.receivedFrom.name}</Text>
      </View>
      {view.meta.map((row) => (
        <View key={row.label} style={compact.row}>
          <Text style={base.label}>{row.label}</Text>
          <Text style={compact.rowValue}>{row.value}</Text>
        </View>
      ))}
      {view.balance && (
        <View style={compact.row}>
          <Text style={base.label}>Balance</Text>
          <Text style={[base.value, compact.rowValue]}>{view.balance}</Text>
        </View>
      )}

      <View style={compact.section}>
        <Text style={base.label}>For</Text>
        <Text>{view.description}</Text>
      </View>
      {view.notes !== "" && (
        <Text style={[base.muted, compact.centered, compact.section]}>{view.notes}</Text>
      )}
    </Page>
  );
}

function StandardReceipt({ view }: { view: ReceiptView }) {
  return (
    <Page size="A4" style={standard.page}>
      <View style={standard.header}>
        <View style={{ maxWidth: 280 }}>
          {view.logo && <Image src={view.logo} style={standard.logo} />}
          <Text style={[base.name, { fontSize: 13, lineHeight: 1.3, marginBottom: 3 }]}>{view.from.name}</Text>
          {view.from.lines.map((line, index) => (
            <Text key={index} style={base.muted}>{line}</Text>
          ))}
        </View>
        <View>
          <Text style={standard.title}>Receipt</Text>
          <Text style={standard.number}>{view.number}</Text>
        </View>
      </View>

      <View style={standard.amount}>
        <Text style={{ fontWeight: 500 }}>Amount paid</Text>
        <Text style={standard.amountValue}>{view.amountPaid}</Text>
      </View>

      <View style={standard.columns}>
        <View style={standard.column}>
          <Text style={[base.label, { fontSize: 8, marginBottom: 3 }]}>Received from</Text>
          <Text style={[base.name, { fontSize: 10.5 }]}>{view.receivedFrom.name}</Text>
          {view.receivedFrom.lines.map((line, index) => (
            <Text key={index} style={base.muted}>{line}</Text>
          ))}
          <View style={standard.section}>
            <Text style={[base.label, { fontSize: 8, marginBottom: 3 }]}>Payment for</Text>
            <Text>{view.description}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {view.meta.map((row) => (
            <View key={row.label} style={standard.row} wrap={false}>
              <Text style={base.muted}>{row.label}</Text>
              <Text style={[base.value, { maxWidth: 150, textAlign: "right" }]}>{row.value}</Text>
            </View>
          ))}
          {view.balance && (
            <View style={standard.row} wrap={false}>
              <Text style={base.muted}>Balance outstanding</Text>
              <Text style={base.value}>{view.balance}</Text>
            </View>
          )}
        </View>
      </View>

      {view.notes !== "" && (
        <View style={standard.section}>
          <Text style={[base.label, { fontSize: 8, marginBottom: 3 }]}>Notes</Text>
          <Text style={base.muted}>{view.notes}</Text>
        </View>
      )}
    </Page>
  );
}

export default function ReceiptPdf({ view }: { view: ReceiptView }) {
  return (
    <Document title={`Receipt ${view.number}`} author={view.from.name}>
      {view.layout === "compact" ? (
        <CompactReceipt view={view} />
      ) : (
        <StandardReceipt view={view} />
      )}
    </Document>
  );
}
