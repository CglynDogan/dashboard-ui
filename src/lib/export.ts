import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export type ExportFormat = 'csv' | 'excel' | 'json';

interface ExportOptions {
  filename?: string;
  sheetName?: string;
}

/**
 * Export data to various formats
 */
export class DataExporter {
  static exportToCSV<T extends Record<string, any>>(
    data: T[],
    options: ExportOptions = {}
  ) {
    const { filename = 'data.csv' } = options;
    
    if (data.length === 0) {
      throw new Error('No data to export');
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma or quote
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  }

  static exportToExcel<T extends Record<string, any>>(
    data: T[],
    options: ExportOptions = {}
  ) {
    const { filename = 'data.xlsx', sheetName = 'Sheet1' } = options;
    
    if (data.length === 0) {
      throw new Error('No data to export');
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    saveAs(blob, filename);
  }

  static exportToJSON<T extends Record<string, any>>(
    data: T[],
    options: ExportOptions = {}
  ) {
    const { filename = 'data.json' } = options;
    
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
    
    saveAs(blob, filename);
  }

  static export<T extends Record<string, any>>(
    format: ExportFormat,
    data: T[],
    options: ExportOptions = {}
  ) {
    switch (format) {
      case 'csv':
        return this.exportToCSV(data, options);
      case 'excel':
        return this.exportToExcel(data, options);
      case 'json':
        return this.exportToJSON(data, options);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}