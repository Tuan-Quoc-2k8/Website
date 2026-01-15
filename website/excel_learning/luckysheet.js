// ==================== LUCKYSHEET SERVICE ====================

const LuckysheetService = {
  instance: null,
  formulaCache: {},
  autoScanInterval: null,
  taskCells: [],
  
  init(containerId, initialData, lang) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    this.formulaCache = {};
    this.taskCells = [];
    
    const celldata = initialData.map(cell => ({
      r: cell.r,
      c: cell.c,
      v: cell.v
    }));
    
    const luckysheetLang = 'en';
    
    luckysheet.create({
      container: containerId,
      title: 'Excel',
      lang: luckysheetLang,
      showinfobar: false,
      showsheetbar: false,
      showstatisticBar: false,
      sheetFormulaBar: true,
      enableAddRow: false,
      enableAddCol: false,
      userInfo: false,
      myFolderUrl: false,
      data: [{
        name: 'Sheet1',
        celldata: celldata,
        row: 30,
        column: 10,
        config: {
          merge: {},
          rowlen: {},
          columnlen: {}
        }
      }],
      hook: {
        cellEditBefore: function(range) {
          return true;
        },
        
        cellUpdateBefore: function(r, c, oldValue, newValue) {
          if (newValue && newValue.v) {
            const cellRef = LuckysheetService.indexToCell(r, c);
            
            if (newValue.f) {
              LuckysheetService.formulaCache[cellRef] = newValue.f;
            }
            else if (typeof newValue.v === 'string' && newValue.v.startsWith('=')) {
              LuckysheetService.formulaCache[cellRef] = newValue.v;
            }
          }
        },
        
        cellUpdated: function(r, c, oldValue, newValue, isRefresh) {
          const cellRef = LuckysheetService.indexToCell(r, c);
          
          if (newValue && (newValue.f || (typeof newValue.v === 'string' && newValue.v.startsWith('=')))) {
            const formula = newValue.f || newValue.v;
            LuckysheetService.formulaCache[cellRef] = formula;
          }
          
          setTimeout(() => {
            luckysheet.refresh();
          }, 50);
        },
        
        cellRenderAfter: function(cell, position, sheet, ctx) {
          if (cell && position) {
            const r = position.r;
            const c = position.c;
            const cellRef = LuckysheetService.indexToCell(r, c);
            
            if (cell.f) {
              LuckysheetService.formulaCache[cellRef] = cell.f;
            } else if (cell.v && typeof cell.v === 'string' && cell.v.startsWith('=')) {
              LuckysheetService.formulaCache[cellRef] = cell.v;
            }
          }
        }
      }
    });
    
    this.instance = luckysheet;
    
    const isDark = document.body.classList.contains('dark');
    this.updateTheme(isDark);
    
    this.startAutoScan();
  },
  
  updateTheme(isDark) {
    setTimeout(() => {
      const container = document.getElementById('luckysheet-container');
      if (!container) return;
      
      if (isDark) {
        container.classList.add('luckysheet-dark-mode');
      } else {
        container.classList.remove('luckysheet-dark-mode');
      }
    }, 100);
  },
  
  setTaskCells(cells) {
    this.taskCells = cells;
  },
  
  startAutoScan() {
    if (this.autoScanInterval) {
      clearInterval(this.autoScanInterval);
    }
    
    this.autoScanInterval = setInterval(() => {
      if (this.taskCells.length > 0) {
        this.scanTaskCells();
      }
    }, 2000);
  },
  
  stopAutoScan() {
    if (this.autoScanInterval) {
      clearInterval(this.autoScanInterval);
      this.autoScanInterval = null;
    }
  },
  
  scanTaskCells() {
    this.taskCells.forEach(cellRef => {
      if (!this.formulaCache[cellRef]) {
        const formula = this.getFormulaFromSheet(cellRef);
        if (formula) {
          this.formulaCache[cellRef] = formula;
        }
      }
    });
  },
  
  refreshFormulas() {
    let count = 0;
    
    this.taskCells.forEach(cellRef => {
      const formula = this.getFormulaFromSheet(cellRef);
      if (formula) {
        this.formulaCache[cellRef] = formula;
        count++;
      }
    });
    
    if (luckysheet && luckysheet.refresh) {
      luckysheet.refresh();
    }
    
    Toast.show(`Refreshed ${count} formula(s)`, 'Formula Detection', 'info');
    return count;
  },
  
  getFormulaFromSheet(cell) {
    const match = cell.match(/([A-Z]+)([0-9]+)/);
    if (!match) return null;
    
    const col = this.columnToIndex(match[1]);
    const row = parseInt(match[2]) - 1;
    
    try {
      if (luckysheet.flowdata && luckysheet.flowdata[row] && luckysheet.flowdata[row][col]) {
        const cellData = luckysheet.flowdata[row][col];
        if (cellData.f) return cellData.f;
        if (cellData.v && typeof cellData.v === 'string' && cellData.v.startsWith('=')) return cellData.v;
      }
      
      const cellValue = luckysheet.getCellValue(row, col);
      if (cellValue) {
        if (typeof cellValue === 'object' && cellValue.f) return cellValue.f;
        if (typeof cellValue === 'string' && cellValue.startsWith('=')) return cellValue;
      }
      
      const sheetData = luckysheet.getSheetData();
      if (sheetData && sheetData[0] && sheetData[0].celldata) {
        const cellInfo = sheetData[0].celldata.find(c => c.r === row && c.c === col);
        if (cellInfo && cellInfo.v) {
          if (cellInfo.v.f) return cellInfo.v.f;
          if (typeof cellInfo.v.v === 'string' && cellInfo.v.v.startsWith('=')) return cellInfo.v.v;
        }
      }
    } catch (e) {
      console.error(`Error getting formula from sheet for ${cell}:`, e);
    }
    
    return null;
  },
  
  insertFormula(cellRef, formula) {
    const match = cellRef.match(/([A-Z]+)([0-9]+)/);
    if (!match) {
      Toast.show('Invalid cell reference', 'Error', 'error');
      return false;
    }
    
    const col = this.columnToIndex(match[1]);
    const row = parseInt(match[2]) - 1;
    
    try {
      luckysheet.setCellValue(row, col, formula);
      
      setTimeout(() => {
        luckysheet.refresh();
      }, 100);
      
      this.formulaCache[cellRef] = formula;
      
      Toast.show(`Formula inserted into ${cellRef}`, 'Success', 'success');
      return true;
    } catch (e) {
      console.error('Error inserting formula:', e);
      Toast.show('Failed to insert formula', 'Error', 'error');
      return false;
    }
  },
  
  getFormula(cell) {
    if (this.formulaCache[cell]) {
      return this.formulaCache[cell];
    }
    
    const formula = this.getFormulaFromSheet(cell);
    if (formula) {
      this.formulaCache[cell] = formula;
      return formula;
    }
    
    return null;
  },
  
  columnToIndex(col) {
    let index = 0;
    for (let i = 0; i < col.length; i++) {
      index = index * 26 + (col.charCodeAt(i) - 64);
    }
    return index - 1;
  },
  
  indexToCell(row, col) {
    let colName = '';
    let c = col + 1;
    while (c > 0) {
      let remainder = (c - 1) % 26;
      colName = String.fromCharCode(65 + remainder) + colName;
      c = Math.floor((c - 1) / 26);
    }
    return colName + (row + 1);
  },
  
  clearCache() {
    this.formulaCache = {};
    this.taskCells = [];
  },
  
  destroy() {
    try {
      this.stopAutoScan();
      const container = document.getElementById('luckysheet-container');
      if (container) container.innerHTML = '';
      if (typeof luckysheet !== 'undefined' && luckysheet.destroy) {
        luckysheet.destroy();
      }
    } catch (e) {
      console.error('Error destroying Luckysheet:', e);
    }
    this.instance = null;
    this.clearCache();
  }
};