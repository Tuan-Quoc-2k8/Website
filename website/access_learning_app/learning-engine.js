/* ========================================
   Intelligent Learning Engine
   Action-Aware, Adaptive Learning System
   ======================================== */

'use strict';

/* ========================================
   LEARNING ENGINE - Core Observer System
   ======================================== */
const LearningEngine = {
    actionLog: [],
    currentLesson: null,
    isGuidedMode: false,
    
    // Observe and track user actions
    observe(action, payload) {
        const actionRecord = {
            type: action,
            payload: payload,
            timestamp: Date.now(),
            lessonContext: this.currentLesson,
            sessionId: this.getSessionId()
        };
        
        this.actionLog.push(actionRecord);
        
        // Trigger validation and feedback
        this.processAction(actionRecord);
        
        // Update learner model
        LearnerModel.updateFromAction(actionRecord);
        
        // Check lesson completion
        this.checkLessonCompletion();
        
        console.log('📊 Action observed:', action, payload);
    },
    
    processAction(actionRecord) {
        // Validate the action
        const validation = ValidationEngine.validate(actionRecord);
        
        if (!validation.isValid) {
            // Show intelligent feedback
            FeedbackEngine.showFeedback(validation);
        } else {
            // Show positive reinforcement
            FeedbackEngine.showSuccess(actionRecord);
        }
        
        // Show SQL equivalent if applicable
        SQLTranslator.showEquivalent(actionRecord);
    },
    
    checkLessonCompletion() {
        if (!this.currentLesson) return;
        
        const lesson = LessonContent.find(l => l.id === this.currentLesson);
        if (!lesson || !lesson.completionRule) return;
        
        const isComplete = ValidationEngine.checkCompletion(lesson.completionRule);
        
        if (isComplete) {
            this.completeLesson();
        }
    },
    
    completeLesson() {
        const assessment = AssessmentEngine.evaluate(this.currentLesson);
        FeedbackEngine.showLessonComplete(assessment);
        
        // Update app state
        if (typeof AppState !== 'undefined') {
            AppState.completeLesson(this.currentLesson);
        }
    },
    
    setLesson(lessonId) {
        this.currentLesson = lessonId;
        this.actionLog = this.actionLog.filter(a => a.lessonContext !== lessonId);
    },
    
    getSessionId() {
        if (!this._sessionId) {
            this._sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        return this._sessionId;
    },
    
    enableGuidedMode() {
        this.isGuidedMode = true;
        GuidanceController.start();
    },
    
    disableGuidedMode() {
        this.isGuidedMode = false;
        GuidanceController.stop();
    }
};

/* ========================================
   VALIDATION ENGINE
   ======================================== */
const ValidationEngine = {
    validate(actionRecord) {
        const lesson = LessonContent.find(l => l.id === LearningEngine.currentLesson);
        if (!lesson || !lesson.completionRule) {
            return { isValid: true, message: '' };
        }
        
        const rule = lesson.completionRule;
        
        switch (actionRecord.type) {
            case 'table-created':
                return this.validateTableCreation(actionRecord.payload, rule);
            case 'primary-key-set':
                return this.validatePrimaryKey(actionRecord.payload, rule);
            case 'relationship-created':
                return this.validateRelationship(actionRecord.payload, rule);
            case 'query-executed':
                return this.validateQuery(actionRecord.payload, rule);
            case 'field-added':
                return this.validateField(actionRecord.payload, rule);
            default:
                return { isValid: true, message: '' };
        }
    },
    
    validateTableCreation(payload, rule) {
        if (rule.type !== 'table-design') {
            return { isValid: true };
        }
        
        const errors = [];
        
        // Check table name
        if (rule.tableName && payload.tableName !== rule.tableName) {
            errors.push({
                field: 'tableName',
                message: `Table name should be "${rule.tableName}", not "${payload.tableName}".`,
                hint: `In Access, table names should be descriptive and follow naming conventions. Try using "${rule.tableName}".`,
                severity: 'error'
            });
        }
        
        // Check required fields
        if (rule.requiredFields) {
            const fieldNames = payload.fields.map(f => f.name);
            const missing = rule.requiredFields.filter(rf => !fieldNames.includes(rf));
            
            if (missing.length > 0) {
                errors.push({
                    field: 'fields',
                    message: `Missing required fields: ${missing.join(', ')}.`,
                    hint: `This table needs these fields to store essential information. Think about what data a ${rule.tableName} table should contain.`,
                    severity: 'error'
                });
            }
        }
        
        // Check primary key
        if (rule.primaryKey) {
            const primaryField = payload.fields.find(f => f.isPrimary);
            if (!primaryField) {
                errors.push({
                    field: 'primaryKey',
                    message: 'No primary key defined.',
                    hint: `Every table needs a primary key to uniquely identify each record. Try setting "${rule.primaryKey}" as the primary key by clicking the 🔑 icon.`,
                    severity: 'error'
                });
            } else if (primaryField.name !== rule.primaryKey) {
                errors.push({
                    field: 'primaryKey',
                    message: `Primary key should be "${rule.primaryKey}", not "${primaryField.name}".`,
                    hint: `The field "${rule.primaryKey}" is better suited as a primary key for this table.`,
                    severity: 'warning'
                });
            }
        }
        
        // Check for duplicate-prone primary keys
        const primaryField = payload.fields.find(f => f.isPrimary);
        if (primaryField && (primaryField.dataType === 'Long Text' || primaryField.dataType === 'Yes/No')) {
            errors.push({
                field: 'primaryKey',
                message: `${primaryField.dataType} cannot be used as a primary key.`,
                hint: `Primary keys must contain unique values. ${primaryField.dataType} fields can have duplicates. Use AutoNumber or a unique Short Text field instead.`,
                severity: 'error'
            });
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            message: errors.length > 0 ? errors[0].message : 'Table design looks good!',
            hint: errors.length > 0 ? errors[0].hint : null
        };
    },
    
    validatePrimaryKey(payload, rule) {
        const errors = [];
        
        // Check if field allows duplicates
        if (payload.dataType === 'Long Text') {
            errors.push({
                message: 'Long Text fields can contain duplicate values and cannot be primary keys.',
                hint: 'Use AutoNumber for automatically unique values, or Short Text with unique data.',
                severity: 'error'
            });
        }
        
        if (payload.dataType === 'Yes/No') {
            errors.push({
                message: 'Yes/No fields only have two possible values and cannot uniquely identify records.',
                hint: 'Primary keys must be unique for every record. Use AutoNumber instead.',
                severity: 'error'
            });
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            message: errors.length > 0 ? errors[0].message : 'Primary key set correctly!',
            hint: errors.length > 0 ? errors[0].hint : null
        };
    },
    
    validateRelationship(payload, rule) {
        if (rule.type !== 'relationship') {
            return { isValid: true };
        }
        
        const errors = [];
        
        // Check if source field is a primary key
        const sourceTable = SampleDatabase.tables[payload.sourceTable];
        const sourceField = sourceTable?.fields.find(f => f.name === payload.sourceField);
        
        if (sourceField && !sourceField.isPrimary) {
            errors.push({
                message: 'The source field must be a primary key.',
                hint: 'Relationships in Access connect a primary key from one table to a foreign key in another. Make sure you\'re dragging from a primary key field (marked with 🔑).',
                severity: 'error'
            });
        }
        
        // Check if data types match
        const targetTable = SampleDatabase.tables[payload.targetTable];
        const targetField = targetTable?.fields.find(f => f.name === payload.targetField);
        
        if (sourceField && targetField && sourceField.dataType !== targetField.dataType) {
            errors.push({
                message: 'Field data types must match to create a relationship.',
                hint: `The source field is ${sourceField.dataType} but the target field is ${targetField.dataType}. Both must be the same type.`,
                severity: 'error'
            });
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            message: errors.length > 0 ? errors[0].message : 'Relationship created successfully!',
            hint: errors.length > 0 ? errors[0].hint : null
        };
    },
    
    validateQuery(payload, rule) {
        if (rule.type !== 'query') {
            return { isValid: true };
        }
        
        const errors = [];
        
        // Validate required tables
        if (rule.requiredTables) {
            const missing = rule.requiredTables.filter(t => !payload.tables.includes(t));
            if (missing.length > 0) {
                errors.push({
                    message: `Query should include tables: ${missing.join(', ')}.`,
                    hint: `This query needs data from the ${missing.join(' and ')} table(s). Add them to your query design.`,
                    severity: 'error'
                });
            }
        }
        
        // Validate required fields
        if (rule.requiredFields) {
            const fieldNames = payload.fields.map(f => f.name);
            const missing = rule.requiredFields.filter(rf => !fieldNames.includes(rf));
            
            if (missing.length > 0) {
                errors.push({
                    message: `Query should select fields: ${missing.join(', ')}.`,
                    hint: `Click on the ${missing.join(' and ')} field(s) in the table boxes above to add them to your query.`,
                    severity: 'error'
                });
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            message: errors.length > 0 ? errors[0].message : 'Query is correct!',
            hint: errors.length > 0 ? errors[0].hint : null
        };
    },
    
    validateField(payload, rule) {
        // Additional field-level validation can be added here
        return { isValid: true };
    },
    
    checkCompletion(rule) {
        // Get current state from app
        const currentState = this.getCurrentState();
        
        switch (rule.type) {
            case 'table-design':
                return this.validateTableCreation(currentState.table, rule).isValid;
            case 'relationship':
                return currentState.relationships.some(rel => 
                    rel.sourceTable === rule.sourceTable && 
                    rel.targetTable === rule.targetTable
                );
            case 'query':
                return this.validateQuery(currentState.query, rule).isValid;
            default:
                return false;
        }
    },
    
    getCurrentState() {
        // Get current state from AppState
        return {
            table: AppState?.currentTable || { name: '', fields: [] },
            relationships: AppState?.relationships || [],
            query: AppState?.currentQuery || { tables: [], fields: [] }
        };
    }
};

/* ========================================
   FEEDBACK ENGINE - Intelligent Feedback
   ======================================== */
const FeedbackEngine = {
    showFeedback(validation) {
        if (!validation.errors || validation.errors.length === 0) return;
        
        const feedback = {
            type: validation.errors[0].severity,
            message: validation.message,
            hint: validation.hint,
            errors: validation.errors
        };
        
        this.displayFeedback(feedback);
        
        // Track mistake for learning
        MistakeTracker.record(validation.errors[0]);
    },
    
    showSuccess(actionRecord) {
        const messages = {
            'table-created': '✅ Great! You created a table. Now make sure it has a primary key.',
            'primary-key-set': '🔑 Perfect! Primary key set. This ensures each record is unique.',
            'field-added': '➕ Good! Field added. Choose the right data type for your data.',
            'relationship-created': '🔗 Excellent! Relationship created. This connects your tables.',
            'query-executed': '▶ Nice! Query executed successfully.'
        };
        
        const message = messages[actionRecord.type];
        if (message) {
            this.displayToast(message, 'success');
        }
    },
    
    displayFeedback(feedback) {
        // Create feedback panel
        const panel = document.createElement('div');
        panel.className = `feedback-panel ${feedback.type}`;
        panel.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${this.getIcon(feedback.type)}</span>
                <span class="feedback-title">${this.getTitle(feedback.type)}</span>
                <button class="feedback-close">×</button>
            </div>
            <div class="feedback-body">
                <p class="feedback-message">${feedback.message}</p>
                ${feedback.hint ? `
                    <div class="feedback-hint">
                        <strong>💡 Hint:</strong> ${feedback.hint}
                    </div>
                ` : ''}
            </div>
        `;
        
        // Remove existing feedback
        document.querySelectorAll('.feedback-panel').forEach(p => p.remove());
        
        // Add to workspace
        const workspace = document.querySelector('.workspace');
        if (workspace) {
            workspace.appendChild(panel);
        }
        
        // Close button
        panel.querySelector('.feedback-close').addEventListener('click', () => {
            panel.remove();
        });
        
        // Auto-hide after 10 seconds for warnings
        if (feedback.type === 'warning') {
            setTimeout(() => panel.remove(), 10000);
        }
    },
    
    displayToast(message, type = 'info') {
        if (typeof UI !== 'undefined' && UI.showToast) {
            UI.showToast(message, type);
        }
    },
    
    getIcon(type) {
        const icons = {
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            success: '✅'
        };
        return icons[type] || 'ℹ️';
    },
    
    getTitle(type) {
        const titles = {
            error: 'Let\'s fix this',
            warning: 'Careful here',
            info: 'Good to know',
            success: 'Well done!'
        };
        return titles[type] || 'Feedback';
    },
    
    showLessonComplete(assessment) {
        const panel = document.createElement('div');
        panel.className = 'lesson-complete-panel';
        panel.innerHTML = `
            <div class="celebration">🎉</div>
            <h2>Lesson Complete!</h2>
            <div class="assessment-summary">
                <p>${assessment.feedback}</p>
                <div class="skill-progress">
                    ${this.renderSkillBars(assessment.skills)}
                </div>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.remove()">Continue</button>
        `;
        
        document.body.appendChild(panel);
    },
    
    renderSkillBars(skills) {
        let html = '';
        for (const [skill, level] of Object.entries(skills)) {
            const percentage = Math.round(level * 100);
            html += `
                <div class="skill-bar">
                    <div class="skill-label">${this.formatSkillName(skill)}</div>
                    <div class="skill-progress-bar">
                        <div class="skill-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="skill-percentage">${percentage}%</div>
                </div>
            `;
        }
        return html;
    },
    
    formatSkillName(skill) {
        return skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
};

/* ========================================
   HINT ENGINE - Progressive Hints
   ======================================== */
const HintEngine = {
    hintLevel: 1,
    attemptsCount: 0,
    
    getHint(lessonId, level = null) {
        const lesson = LessonContent.find(l => l.id === lessonId);
        if (!lesson || !lesson.hints) return null;
        
        const currentLevel = level || this.hintLevel;
        const hint = lesson.hints[currentLevel - 1];
        
        if (!hint) return null;
        
        return {
            level: currentLevel,
            message: hint.message,
            type: hint.type || 'conceptual'
        };
    },
    
    incrementHintLevel() {
        this.attemptsCount++;
        
        // Unlock next hint level after 2 failed attempts
        if (this.attemptsCount % 2 === 0 && this.hintLevel < 3) {
            this.hintLevel++;
        }
    },
    
    reset() {
        this.hintLevel = 1;
        this.attemptsCount = 0;
    },
    
    showHint(lessonId) {
        const hint = this.getHint(lessonId);
        if (!hint) return;
        
        const hintPanel = document.createElement('div');
        hintPanel.className = 'hint-panel';
        hintPanel.innerHTML = `
            <div class="hint-header">
                <span>💡 Hint (Level ${hint.level})</span>
                <button class="hint-close">×</button>
            </div>
            <div class="hint-body">
                ${hint.message}
            </div>
            ${this.hintLevel < 3 ? `
                <div class="hint-footer">
                    <small>Still stuck? Keep trying and you'll unlock more detailed hints.</small>
                </div>
            ` : ''}
        `;
        
        document.querySelectorAll('.hint-panel').forEach(p => p.remove());
        document.querySelector('.workspace')?.appendChild(hintPanel);
        
        hintPanel.querySelector('.hint-close').addEventListener('click', () => {
            hintPanel.remove();
        });
    }
};

/* ========================================
   SQL TRANSLATOR - Access to SQL Server
   ======================================== */
const SQLTranslator = {
    showEquivalent(actionRecord) {
        const sql = this.translateToSQL(actionRecord);
        if (!sql) return;
        
        const panel = document.createElement('div');
        panel.className = 'sql-equivalent-panel';
        panel.innerHTML = `
            <div class="sql-eq-header">
                <span>🔄 SQL Server Equivalent</span>
                <button class="sql-eq-close">×</button>
            </div>
            <div class="sql-eq-body">
                <p class="sql-eq-explanation">${sql.explanation}</p>
                <pre class="sql-code"><code>${sql.code}</code></pre>
            </div>
        `;
        
        // Position in bottom right
        panel.style.position = 'fixed';
        panel.style.bottom = '20px';
        panel.style.right = '20px';
        panel.style.maxWidth = '400px';
        
        document.body.appendChild(panel);
        
        panel.querySelector('.sql-eq-close').addEventListener('click', () => {
            panel.remove();
        });
        
        // Auto-hide after 8 seconds
        setTimeout(() => panel.remove(), 8000);
    },
    
    translateToSQL(actionRecord) {
        switch (actionRecord.type) {
            case 'table-created':
                return this.tableToSQL(actionRecord.payload);
            case 'relationship-created':
                return this.relationshipToSQL(actionRecord.payload);
            case 'query-executed':
                return this.queryToSQL(actionRecord.payload);
            default:
                return null;
        }
    },
    
    tableToSQL(payload) {
        const fields = payload.fields.map(f => {
            const type = this.mapDataType(f.dataType);
            const pk = f.isPrimary ? ' PRIMARY KEY' : '';
            const req = f.properties?.required ? ' NOT NULL' : '';
            return `  ${f.name} ${type}${pk}${req}`;
        }).join(',\n');
        
        return {
            explanation: 'In SQL Server, tables are created using CREATE TABLE:',
            code: `CREATE TABLE ${payload.tableName} (\n${fields}\n);`
        };
    },
    
    relationshipToSQL(payload) {
        return {
            explanation: 'In SQL Server, relationships are enforced with FOREIGN KEY constraints:',
            code: `ALTER TABLE ${payload.targetTable}\nADD CONSTRAINT FK_${payload.targetTable}_${payload.sourceTable}\nFOREIGN KEY (${payload.targetField})\nREFERENCES ${payload.sourceTable}(${payload.sourceField});`
        };
    },
    
    queryToSQL(payload) {
        const fields = payload.fields.map(f => f.name).join(', ');
        const tables = payload.tables.join(', ');
        
        return {
            explanation: 'This Access query translates to this SQL:',
            code: `SELECT ${fields}\nFROM ${tables};`
        };
    },
    
    mapDataType(accessType) {
        const typeMap = {
            'Short Text': 'VARCHAR(255)',
            'Long Text': 'TEXT',
            'Number': 'INT',
            'Date/Time': 'DATETIME',
            'Currency': 'DECIMAL(19,4)',
            'AutoNumber': 'INT IDENTITY(1,1)',
            'Yes/No': 'BIT',
            'Hyperlink': 'VARCHAR(255)'
        };
        return typeMap[accessType] || 'VARCHAR(255)';
    }
};

/* ========================================
   LEARNER MODEL - Skill Tracking
   ======================================== */
const LearnerModel = {
    profile: {
        tableDesign: 0.0,
        relationships: 0.0,
        queries: 0.0,
        sqlThinking: 0.0,
        dataTypes: 0.0,
        errorRecovery: 0.0
    },
    
    updateFromAction(actionRecord) {
        const skillMap = {
            'table-created': 'tableDesign',
            'primary-key-set': 'tableDesign',
            'field-added': 'dataTypes',
            'relationship-created': 'relationships',
            'query-executed': 'queries'
        };
        
        const skill = skillMap[actionRecord.type];
        if (skill) {
            // Increase skill slightly with each successful action
            this.profile[skill] = Math.min(1.0, this.profile[skill] + 0.05);
            this.save();
        }
    },
    
    updateFromValidation(validation, recovered) {
        if (!validation.isValid && recovered) {
            // Increase error recovery skill
            this.profile.errorRecovery = Math.min(1.0, this.profile.errorRecovery + 0.1);
            this.save();
        }
    },
    
    getProfile() {
        return { ...this.profile };
    },
    
    save() {
        localStorage.setItem('learnerProfile', JSON.stringify(this.profile));
    },
    
    load() {
        const saved = localStorage.getItem('learnerProfile');
        if (saved) {
            this.profile = { ...this.profile, ...JSON.parse(saved) };
        }
    }
};

/* ========================================
   MISTAKE TRACKER - Common Mistakes
   ======================================== */
const MistakeTracker = {
    mistakes: [],
    
    record(error) {
        this.mistakes.push({
            type: error.field || 'general',
            message: error.message,
            timestamp: Date.now()
        });
        
        // Show common mistake explanation after 2nd occurrence
        const count = this.mistakes.filter(m => m.type === error.field).length;
        if (count === 2) {
            this.explainCommonMistake(error.field);
        }
    },
    
    explainCommonMistake(type) {
        const explanations = {
            primaryKey: 'Primary keys are crucial for database integrity. Every table should have one field that uniquely identifies each record. Think of it like a student ID number - no two students should have the same ID.',
            fields: 'Table fields define what information you store. Consider what data you really need. For a Students table, you might need ID, Name, Email, but probably not their favorite color unless that\'s important for your database purpose.',
            tableName: 'Table names should be clear and descriptive. Use singular nouns (Student, not Students) and avoid spaces or special characters.'
        };
        
        const explanation = explanations[type];
        if (explanation) {
            FeedbackEngine.displayFeedback({
                type: 'info',
                message: '📚 Common Mistake Alert',
                hint: explanation
            });
        }
    }
};

/* ========================================
   GUIDANCE CONTROLLER - Guided Practice
   ======================================== */
const GuidanceController = {
    currentStep: 0,
    steps: [],
    isActive: false,
    
    start() {
        this.isActive = true;
        const lesson = LessonContent.find(l => l.id === LearningEngine.currentLesson);
        if (!lesson || !lesson.guidedSteps) return;
        
        this.steps = lesson.guidedSteps;
        this.currentStep = 0;
        this.showStep();
    },
    
    showStep() {
        if (this.currentStep >= this.steps.length) {
            this.stop();
            return;
        }
        
        const step = this.steps[this.currentStep];
        
        // Highlight target element
        this.highlightElement(step.target);
        
        // Show instruction
        this.showInstruction(step);
        
        // Lock other UI elements
        this.lockOtherElements(step.target);
    },
    
    highlightElement(selector) {
        // Remove existing highlights
        document.querySelectorAll('.guided-highlight').forEach(el => {
            el.classList.remove('guided-highlight');
        });
        
        // Add highlight to target
        const target = document.querySelector(selector);
        if (target) {
            target.classList.add('guided-highlight');
        }
    },
    
    showInstruction(step) {
        const panel = document.createElement('div');
        panel.className = 'guidance-panel';
        panel.innerHTML = `
            <div class="guidance-header">
                Step ${this.currentStep + 1} of ${this.steps.length}
            </div>
            <div class="guidance-body">
                ${step.instruction}
            </div>
            <div class="guidance-footer">
                <button class="btn btn-secondary" onclick="GuidanceController.skip()">Skip Guide</button>
            </div>
        `;
        
        document.querySelectorAll('.guidance-panel').forEach(p => p.remove());
        document.body.appendChild(panel);
    },
    
    lockOtherElements(allowedSelector) {
        // Add overlay to lock UI
        let overlay = document.querySelector('.guidance-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'guidance-overlay';
            document.body.appendChild(overlay);
        }
    },
    
    nextStep() {
        this.currentStep++;
        this.showStep();
    },
    
    skip() {
        this.stop();
    },
    
    stop() {
        this.isActive = false;
        this.currentStep = 0;
        document.querySelectorAll('.guided-highlight').forEach(el => {
            el.classList.remove('guided-highlight');
        });
        document.querySelectorAll('.guidance-panel, .guidance-overlay').forEach(el => {
            el.remove();
        });
    }
};

/* ========================================
   ASSESSMENT ENGINE - Quality Evaluation
   ======================================== */
const AssessmentEngine = {
    evaluate(lessonId) {
        const actions = LearningEngine.actionLog.filter(a => a.lessonContext === lessonId);
        const errors = MistakeTracker.mistakes.filter(m => 
            actions.some(a => Math.abs(a.timestamp - m.timestamp) < 5000)
        );
        
        const retries = errors.length;
        const timeSpent = this.calculateTimeSpent(actions);
        const accuracy = actions.length > 0 ? Math.max(0, 1 - (errors.length / actions.length)) : 0;
        
        // Generate feedback
        const feedback = this.generateFeedback(accuracy, retries, timeSpent);
        
        // Update skills
        const skills = LearnerModel.getProfile();
        
        return {
            accuracy,
            retries,
            timeSpent,
            feedback,
            skills
        };
    },
    
    calculateTimeSpent(actions) {
        if (actions.length < 2) return 0;
        const first = actions[0].timestamp;
        const last = actions[actions.length - 1].timestamp;
        return Math.round((last - first) / 1000); // seconds
    },
    
    generateFeedback(accuracy, retries, timeSpent) {
        if (accuracy >= 0.9 && retries === 0) {
            return 'Excellent work! You completed this lesson perfectly on your first try. You have a strong understanding of these concepts.';
        } else if (accuracy >= 0.7 && retries <= 2) {
            return 'Great job! You made a few small mistakes but recovered quickly. This shows good problem-solving skills.';
        } else if (retries > 5) {
            return 'You struggled with this lesson, but persistence is key! Review the concepts and try the practice exercises again. You\'re building important skills.';
        } else {
            return 'Good effort! You completed the lesson with some trial and error. This is a normal part of learning. Keep practicing!';
        }
    }
};

/* ========================================
   INITIALIZE ON LOAD
   ======================================== */
if (typeof window !== 'undefined') {
    window.LearningEngine = LearningEngine;
    window.ValidationEngine = ValidationEngine;
    window.FeedbackEngine = FeedbackEngine;
    window.HintEngine = HintEngine;
    window.SQLTranslator = SQLTranslator;
    window.LearnerModel = LearnerModel;
    window.GuidanceController = GuidanceController;
    
    // Load learner profile on startup
    document.addEventListener('DOMContentLoaded', () => {
        LearnerModel.load();
        console.log('🎓 Intelligent Learning Engine initialized');
    });
}