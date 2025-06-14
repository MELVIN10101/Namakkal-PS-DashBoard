import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import type { CaseData } from '../types';

// Helper function to safely format dates
function formatDate(dateValue: Date | string | undefined): string {
  if (!dateValue) return '';
  
  try {
    // If it's already a Date object
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString();
    }
    
    // If it's a string, try to convert it to a Date
    return new Date(dateValue).toLocaleDateString();
  } catch (error) {
    // If there's any error, return the original value as string or empty string
    return String(dateValue) || '';
  }
}

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
  try {
    // Transform data safely, handling any potential undefined values
    const excelData = data.map(case_ => ({
      'CR Number': case_?.CR_NO || '',
      'District': case_?.district || case_?.District || '',
      'Police Station': case_?.Police_Station || '',
      'Section of Law': case_?.Section_of_law || '',
      'Crime Type': case_?.Crime_type || '',
      'Year': case_?.Year || '',
      'Accused Name': case_?.Accused_Name || '',
      'Nick Name': case_?.Accused_Nick_Name || '',
      'Gender': case_?.Accused_Gender || '',
      'Guardian': case_?.Guardian || '',
      'Age': case_?.Accused_Age || '',
      'Address': case_?.Accused_Address || '',
      'Created Date': formatDate(case_?.createdAt),
      'Updated Date': formatDate(case_?.updatedAt),
    }));

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(excelData);
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

    // Write the Excel file
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    
    console.log('Excel export successful');
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};