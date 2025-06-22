import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

// PDF Export
export function exportPayoutsToPDF(payouts: any[], title = "Payout Report") {
  const doc = new jsPDF();
  const tableColumn = ["Author", "Articles", "Rate (USD)", "Total Payout"];
  const tableRows = payouts.map(payout => [
    payout.author,
    payout.articleCount,
    `$${payout.rate.toFixed(2)}`,
    `$${payout.total.toFixed(2)}`
  ]);

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 15);

  // Table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

// CSV Export
export function exportPayoutsToCSV(payouts: any[], filename = "payout_report") {
  const csvData = payouts.map(payout => ({
    Author: payout.author,
    Articles: payout.articleCount,
    "Rate (USD)": payout.rate.toFixed(2),
    "Total Payout": payout.total.toFixed(2)
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
