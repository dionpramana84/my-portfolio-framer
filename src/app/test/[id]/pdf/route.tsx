import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { unknown } from "zod";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    padding: 50,
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 12,
  },
  header: {
    marginBottom: 40,
    height: 40,
    textAlign: "center",
  },
  section: {
    flexGrow: 1,
    marginBottom: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  footer: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  productList: {
    marginBottom: 20,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Text>Company XYZ</Text>
        <Text>123 Business Rd, City, Country</Text>
      </View>
      <View style={styles.section}>
        <Text>Work Order #12345</Text>
        <Text>2025-02-12</Text>
        <Text>
          Dear Customer,
          {"\n\n"}
          We are pleased to inform you that your work order has been processed.
          Below is the summary of the products and services included in this
          order.
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product 1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Description of product 1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>$50</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product 2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Description of product 2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>$100</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Text>© 2025 Company XYZ. All Rights Reserved. </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Text>Product List</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.productList}>
          <View style={styles.productImage} />
          <Text>Product 1</Text>
          <Text>Description of product 1</Text>
        </View>
        <View style={styles.productList}>
          <View style={styles.productImage} />
          <Text>Product 2</Text>
          <Text>Description of product 2</Text>
        </View>
      </View>
      <View style={styles.footer} fixed>
        <Text>© 2025 Company XYZ. All Rights Reserved. </Text>
      </View>
    </Page>
  </Document>
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const invoiceId = parseInt(params.id);

  const stream = await renderToStream(<MyDocument />);

  return new NextResponse(stream as unknown as ReadableStream);
}
