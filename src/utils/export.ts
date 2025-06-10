import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import type { CaseData } from '../types';

export const exportToPDF = (data: CaseData[], filename: string = 'cases-export') => {
  const doc = new jsPDF('landscape');
  
  doc.setFontSize(18);
  doc.text('Crime Cases Report', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 35);
  doc.text(`Total Records: ${data.length}`, 120, 35);

  const tableColumns = [
    'CR No', 'Accused Name', 'Crime Type', 'Year', 'District', 
    'Police Station', 'Gender', 'Age', 'Section of Law'
  ];

  const tableRows = data.map(case_ => [
    case_.CR_NO,
    case_.Accused_Name,
    case_.Crime_type,
    case_.Year.toString(),
    case_.District,
    case_.Police_Station,
    case_.Accused_Gender,
    case_.Accused_Age.toString(),
    case_.Section_of_law
  ]);

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 45,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: CaseData[], filename: string = 'cases-export') => {
  const worksheet = XLSX.utils.json_to_sheet(data.map(case_ => ({
    'CR Number': case_.CR_NO,
    'District': case_.District,
    'Police Station': case_.Police_Station,
    'Section of Law': case_.Section_of_law,
    'Crime Type': case_.Crime_type,
    'Year': case_.Year,
    'Accused Name': case_.Accused_Name,
    'Nick Name': case_.Accused_Nick_Name,
    'Gender': case_.Accused_Gender,
    'Guardian': case_.Guardian,
    'Age': case_.Accused_Age,
    'Address': case_.Accused_Address,
    'Created Date': case_.createdAt.toLocaleDateString(),
    'Updated Date': case_.updatedAt.toLocaleDateString(),
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cases');

  // Auto-fit column widths
  const cols = [
    { wch: 12 }, // CR Number
    { wch: 12 }, // District
    { wch: 15 }, // Police Station
    { wch: 15 }, // Section of Law
    { wch: 15 }, // Crime Type
    { wch: 8 },  // Year
    { wch: 20 }, // Accused Name
    { wch: 15 }, // Nick Name
    { wch: 8 },  // Gender
    { wch: 20 }, // Guardian
    { wch: 6 },  // Age
    { wch: 30 }, // Address
    { wch: 12 }, // Created Date
    { wch: 12 }, // Updated Date
  ];
  worksheet['!cols'] = cols;

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};