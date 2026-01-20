/* ========================================
   Database Engine - Real Data Flow & Validation
   Tables → Relationships → Queries
   ======================================== */

'use strict';

/* ========================================
   LEARNER DATABASE - User's Own Database
   ======================================== */
const LearnerDatabase = {
    tables: {},
    relationships: [],
    
    // Create a new table
    createTable(tableName, fields) {
        if (this.tables[tableName]) {
            throw new Error(`Table "${tableName}" already exists`);
        }
        
        // Validate table structure
        const validation = this.validateTableStructure(tableName, fields);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        this.tables[tableName] = {
            name: tableName,
            fields: fields,
            records: [],
            createdAt: Date.now()
        };
        
        console.log(`✅ Table "${tableName}" created successfully`);
        return this.tables[tableName];
    },
    
    // Update existing table
    updateTable(tableName, fields) {
        if (!this.tables[tableName]) {
            throw new Error(`Table "${tableName}" does not exist`);
        }
        
        const validation = this.validateTableStructure(tableName, fields);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        this.tables[tableName].fields = fields;
        console.log(`✅ Table "${tableName}" updated`);
    },
    
    // Delete table
    deleteTable(tableName) {
        if (!this.tables[tableName]) {
            throw new Error(`Table "${tableName}" does not exist`);
        }
        
        // Check if table is used in relationships
        const usedInRelationships = this.relationships.filter(
            r => r.sourceTable === tableName || r.targetTable === tableName
        );
        
        if (usedInRelationships.length > 0) {
            throw new Error(`Cannot delete table "${tableName}" because it has relationships. Delete relationships first.`);
        }
        
        delete this.tables[tableName];
        console.log(`✅ Table "${tableName}" deleted`);
    },
    
    // Validate table structure
    validateTableStructure(tableName, fields) {
        // Check table name
        if (!tableName || tableName.trim() === '') {
            return { isValid: false, message: 'Table name cannot be empty' };
        }
        
        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(tableName)) {
            return { isValid: false, message: 'Table name must start with a letter and contain only letters, numbers, and underscores' };
        }
        
        // Check fields
        if (!fields || fields.length === 0) {
            return { isValid: false, message: 'Table must have at least one field' };
        }
        
        // Check for primary key
        const primaryKeys = fields.filter(f => f.isPrimary);
        if (primaryKeys.length === 0) {
            return { isValid: false, message: 'Table must have a primary key' };
        }
        
        if (primaryKeys.length > 1) {
            return { isValid: false, message: 'Table can only have one primary key' };
        }
        
        // Validate primary key data type
        const pk = primaryKeys[0];
        if (pk.dataType === 'Long Text' || pk.dataType === 'Yes/No') {
            return { isValid: false, message: `${pk.dataType} cannot be used as a primary key` };
        }
        
        // Check for duplicate field names
        const fieldNames = fields.map(f => f.name.toLowerCase());
        const duplicates = fieldNames.filter((name, index) => fieldNames.indexOf(name) !== index);
        if (duplicates.length > 0) {
            return { isValid: false, message: `Duplicate field name: ${duplicates[0]}` };
        }
        
        // Check field names
        for (const field of fields) {
            if (!field.name || field.name.trim() === '') {
                return { isValid: false, message: 'All fields must have names' };
            }
            
            if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(field.name)) {
                return { isValid: false, message: `Field name "${field.name}" is invalid. Use only letters, numbers, and underscores.` };
            }
        }
        
        return { isValid: true, message: 'Valid table structure' };
    },
    
    // Create relationship
    createRelationship(sourceTable, sourceField, targetTable, targetField, options = {}) {
        // Validate tables exist
        if (!this.tables[sourceTable]) {
            throw new Error(`Source table "${sourceTable}" does not exist`);
        }
        if (!this.tables[targetTable]) {
            throw new Error(`Target table "${targetTable}" does not exist`);
        }
        
        // Get fields
        const srcField = this.tables[sourceTable].fields.find(f => f.name === sourceField);
        const tgtField = this.tables[targetTable].fields.find(f => f.name === targetField);
        
        if (!srcField) {
            throw new Error(`Field "${sourceField}" not found in table "${sourceTable}"`);
        }
        if (!tgtField) {
            throw new Error(`Field "${targetField}" not found in table "${targetTable}"`);
        }
        
        // Validate relationship
        const validation = this.validateRelationship(srcField, tgtField, sourceTable, targetTable);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        // Check if relationship already exists
        const existing = this.relationships.find(
            r => r.sourceTable === sourceTable && r.sourceField === sourceField &&
                 r.targetTable === targetTable && r.targetField === targetField
        );
        
        if (existing) {
            throw new Error('This relationship already exists');
        }
        
        const relationship = {
            sourceTable,
            sourceField,
            targetTable,
            targetField,
            type: 'one-to-many',
            enforceIntegrity: options.enforceIntegrity || false,
            cascadeUpdate: options.cascadeUpdate || false,
            cascadeDelete: options.cascadeDelete || false,
            createdAt: Date.now()
        };
        
        this.relationships.push(relationship);
        console.log(`✅ Relationship created: ${sourceTable}.${sourceField} → ${targetTable}.${targetField}`);
        return relationship;
    },
    
    // Validate relationship
    validateRelationship(srcField, tgtField, sourceTable, targetTable) {
        // Source field must be primary key
        if (!srcField.isPrimary) {
            return {
                isValid: false,
                message: `Source field "${srcField.name}" must be a primary key. In Access, relationships connect a primary key to a foreign key.`,
                hint: 'The field on the "one" side of the relationship should be the primary key.'
            };
        }
        
        // Data types must match
        if (srcField.dataType !== tgtField.dataType) {
            return {
                isValid: false,
                message: `Data types must match. "${srcField.name}" is ${srcField.dataType} but "${tgtField.name}" is ${tgtField.dataType}.`,
                hint: 'Both fields in a relationship must have the same data type.'
            };
        }
        
        // Cannot create circular relationships
        if (sourceTable === targetTable) {
            return {
                isValid: false,
                message: 'Cannot create a relationship from a table to itself.',
                hint: 'Self-referencing relationships are not supported in this learning environment.'
            };
        }
        
        return { isValid: true, message: 'Valid relationship' };
    },
    
    // Delete relationship
    deleteRelationship(sourceTable, sourceField, targetTable, targetField) {
        const index = this.relationships.findIndex(
            r => r.sourceTable === sourceTable && r.sourceField === sourceField &&
                 r.targetTable === targetTable && r.targetField === targetField
        );
        
        if (index === -1) {
            throw new Error('Relationship not found');
        }
        
        this.relationships.splice(index, 1);
        console.log(`✅ Relationship deleted`);
    },
    
    // Get all tables
    getAllTables() {
        return Object.values(this.tables);
    },
    
    // Get table
    getTable(tableName) {
        return this.tables[tableName] || null;
    },
    
    // Check if query can be executed
    validateQuery(tables, joins) {
        if (tables.length === 0) {
            return { isValid: false, message: 'Query must include at least one table' };
        }
        
        // Check if all tables exist
        for (const tableName of tables) {
            if (!this.tables[tableName]) {
                return {
                    isValid: false,
                    message: `Table "${tableName}" does not exist. Create the table first in Table Design View.`
                };
            }
        }
        
        // If multiple tables, check relationships
        if (tables.length > 1) {
            const hasRelationships = this.checkTablesAreRelated(tables);
            if (!hasRelationships) {
                return {
                    isValid: false,
                    message: `Tables ${tables.join(' and ')} are not related. Create a relationship in the Relationships view first.`,
                    hint: 'In Access, you need to define relationships before querying multiple tables together.'
                };
            }
        }
        
        return { isValid: true, message: 'Query is valid' };
    },
    
    // Check if tables are related
    checkTablesAreRelated(tables) {
        if (tables.length <= 1) return true;
        
        // Build relationship graph
        const graph = {};
        this.relationships.forEach(rel => {
            if (!graph[rel.sourceTable]) graph[rel.sourceTable] = [];
            if (!graph[rel.targetTable]) graph[rel.targetTable] = [];
            graph[rel.sourceTable].push(rel.targetTable);
            graph[rel.targetTable].push(rel.sourceTable);
        });
        
        // Check if all tables are connected
        const visited = new Set();
        const dfs = (table) => {
            if (visited.has(table)) return;
            visited.add(table);
            (graph[table] || []).forEach(neighbor => dfs(neighbor));
        };
        
        dfs(tables[0]);
        
        return tables.every(table => visited.has(table));
    },
    
    // Reset database
    reset() {
        this.tables = {};
        this.relationships = [];
        console.log('🔄 Database reset');
    },
    
    // Export database state
    export() {
        return {
            tables: this.tables,
            relationships: this.relationships,
            exportedAt: Date.now()
        };
    },
    
    // Import database state
    import(data) {
        this.tables = data.tables || {};
        this.relationships = data.relationships || [];
        console.log('📥 Database imported');
    },
    
    // Save to localStorage
    save() {
        const data = this.export();
        localStorage.setItem('learnerDatabase', JSON.stringify(data));
        console.log('💾 Database saved');
    },
    
    // Load from localStorage
    load() {
        try {
            const saved = localStorage.getItem('learnerDatabase');
            if (saved) {
                const data = JSON.parse(saved);
                this.import(data);
                console.log('📂 Database loaded');
                return true;
            }
        } catch (e) {
            console.error('Failed to load database:', e);
        }
        return false;
    }
};

/* ========================================
   QUERY EXECUTOR - Simulated Query Engine
   ======================================== */
const QueryExecutor = {
    execute(queryDefinition) {
        const { tables, fields, criteria, sorting } = queryDefinition;
        
        // Validate query can run
        const validation = LearnerDatabase.validateQuery(tables, []);
        if (!validation.isValid) {
            throw new Error(validation.message);
        }
        
        // Get table data
        if (tables.length === 1) {
            return this.executeSingleTableQuery(tables[0], fields, criteria, sorting);
        } else {
            return this.executeMultiTableQuery(tables, fields, criteria, sorting);
        }
    },
    
    executeSingleTableQuery(tableName, fields, criteria, sorting) {
        const table = LearnerDatabase.getTable(tableName);
        if (!table) {
            throw new Error(`Table "${tableName}" not found`);
        }
        
        // Get records (use sample data if empty)
        let records = table.records.length > 0 ? table.records : this.generateSampleData(table);
        
        // Apply criteria
        if (criteria && criteria.length > 0) {
            records = this.applyFilters(records, criteria);
        }
        
        // Apply sorting
        if (sorting && sorting.length > 0) {
            records = this.applySorting(records, sorting);
        }
        
        // Select fields
        const selectedFields = fields.length > 0 ? fields : table.fields.map(f => f.name);
        const results = records.map(record => {
            const row = {};
            selectedFields.forEach(fieldName => {
                row[fieldName] = record[fieldName];
            });
            return row;
        });
        
        return {
            fields: selectedFields,
            records: results,
            recordCount: results.length
        };
    },
    
    executeMultiTableQuery(tables, fields, criteria, sorting) {
        // Simplified multi-table query (joins based on relationships)
        const primaryTable = LearnerDatabase.getTable(tables[0]);
        let records = primaryTable.records.length > 0 ? primaryTable.records : this.generateSampleData(primaryTable);
        
        // For each additional table, join based on relationships
        for (let i = 1; i < tables.length; i++) {
            const joinTable = LearnerDatabase.getTable(tables[i]);
            const joinData = joinTable.records.length > 0 ? joinTable.records : this.generateSampleData(joinTable);
            
            // Find relationship
            const rel = LearnerDatabase.relationships.find(
                r => (r.sourceTable === tables[0] && r.targetTable === tables[i]) ||
                     (r.sourceTable === tables[i] && r.targetTable === tables[0])
            );
            
            if (rel) {
                records = this.joinTables(records, joinData, rel);
            }
        }
        
        // Select fields and return
        const selectedFields = fields.length > 0 ? fields : ['*'];
        return {
            fields: selectedFields,
            records: records.slice(0, 10), // Limit to 10 for demo
            recordCount: records.length
        };
    },
    
    joinTables(leftRecords, rightRecords, relationship) {
        // Simple join implementation
        const results = [];
        leftRecords.forEach(leftRecord => {
            rightRecords.forEach(rightRecord => {
                if (leftRecord[relationship.sourceField] === rightRecord[relationship.targetField]) {
                    results.push({ ...leftRecord, ...rightRecord });
                }
            });
        });
        return results;
    },
    
    applyFilters(records, criteria) {
        return records.filter(record => {
            return criteria.every(criterion => {
                const value = record[criterion.field];
                const filterValue = criterion.value;
                
                switch (criterion.operator) {
                    case '=': return value == filterValue;
                    case '>': return value > filterValue;
                    case '<': return value < filterValue;
                    case '>=': return value >= filterValue;
                    case '<=': return value <= filterValue;
                    case 'LIKE': return String(value).includes(filterValue);
                    default: return true;
                }
            });
        });
    },
    
    applySorting(records, sorting) {
        return records.sort((a, b) => {
            for (const sort of sorting) {
                const aVal = a[sort.field];
                const bVal = b[sort.field];
                
                if (aVal < bVal) return sort.order === 'ASC' ? -1 : 1;
                if (aVal > bVal) return sort.order === 'ASC' ? 1 : -1;
            }
            return 0;
        });
    },
    
    generateSampleData(table) {
        // Generate 5 sample records based on field types
        const records = [];
        for (let i = 1; i <= 5; i++) {
            const record = {};
            table.fields.forEach(field => {
                record[field.name] = this.generateSampleValue(field, i);
            });
            records.push(record);
        }
        return records;
    },
    
    generateSampleValue(field, index) {
        switch (field.dataType) {
            case 'AutoNumber':
                return index;
            case 'Number':
                return Math.floor(Math.random() * 100);
            case 'Short Text':
                return field.isPrimary ? `ID${index}` : `Sample ${field.name} ${index}`;
            case 'Long Text':
                return `This is sample long text for ${field.name}`;
            case 'Date/Time':
                return new Date(2024, 0, index).toISOString().split('T')[0];
            case 'Currency':
                return (Math.random() * 1000).toFixed(2);
            case 'Yes/No':
                return index % 2 === 0;
            default:
                return `Sample ${index}`;
        }
    },
    
    generateSQL(queryDefinition) {
        const { tables, fields, criteria, sorting } = queryDefinition;
        
        let sql = 'SELECT ';
        sql += fields.length > 0 ? fields.join(', ') : '*';
        sql += '\nFROM ' + tables.join(', ');
        
        if (criteria && criteria.length > 0) {
            sql += '\nWHERE ';
            sql += criteria.map(c => `${c.field} ${c.operator} '${c.value}'`).join(' AND ');
        }
        
        if (sorting && sorting.length > 0) {
            sql += '\nORDER BY ';
            sql += sorting.map(s => `${s.field} ${s.order}`).join(', ');
        }
        
        sql += ';';
        return sql;
    }
};

/* ========================================
   FIELD REORDER MANAGER
   ======================================== */
const FieldReorderManager = {
    draggingIndex: null,
    
    enableReorder(container) {
        const rows = container.querySelectorAll('.field-row:not(.header)');
        rows.forEach((row, index) => {
            row.draggable = true;
            row.dataset.index = index;
            
            row.addEventListener('dragstart', (e) => this.handleDragStart(e, index));
            row.addEventListener('dragover', (e) => this.handleDragOver(e));
            row.addEventListener('drop', (e) => this.handleDrop(e, index));
            row.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });
    },
    
    handleDragStart(e, index) {
        this.draggingIndex = index;
        e.target.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    },
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    },
    
    handleDrop(e, targetIndex) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.draggingIndex !== null && this.draggingIndex !== targetIndex) {
            // Reorder fields in AppState
            if (typeof AppState !== 'undefined' && AppState.currentTable) {
                const fields = AppState.currentTable.fields;
                const [movedField] = fields.splice(this.draggingIndex, 1);
                fields.splice(targetIndex, 0, movedField);
                
                // Re-render table designer
                if (typeof TableDesigner !== 'undefined') {
                    TableDesigner.renderFields();
                }
            }
        }
        
        return false;
    },
    
    handleDragEnd(e) {
        e.target.style.opacity = '1';
        this.draggingIndex = null;
    }
};

/* ========================================
   EXPORT FOR USE
   ======================================== */
if (typeof window !== 'undefined') {
    window.LearnerDatabase = LearnerDatabase;
    window.QueryExecutor = QueryExecutor;
    window.FieldReorderManager = FieldReorderManager;
    
    // Auto-load database on startup
    document.addEventListener('DOMContentLoaded', () => {
        LearnerDatabase.load();
        console.log('🗄️ Database Engine initialized');
    });
}