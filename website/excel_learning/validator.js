// ==================== FORMULA VALIDATOR ====================

const FormulaValidator = {
  normalize(formula) {
    if (!formula) return '';
    
    return formula
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[""]/g, '"')
      .replace(/'/g, '"')
      .replace(/０/g, '0')
      .replace(/１/g, '1')
      .replace(/２/g, '2')
      .replace(/３/g, '3')
      .replace(/４/g, '4')
      .replace(/５/g, '5')
      .replace(/６/g, '6')
      .replace(/７/g, '7')
      .replace(/８/g, '8')
      .replace(/９/g, '9');
  },
  
  validate(userFormula, task) {
    if (!userFormula || !userFormula.startsWith('=')) {
      return { 
        ok: false, 
        msg: I18n.t('feedback.noFormula') 
      };
    }
    
    const normalized = this.normalize(userFormula);
    const required = this.normalize(task.requiredFormula);
    
    // Check exact match
    if (normalized === required) {
      return { 
        ok: true, 
        msg: I18n.t('feedback.correct') 
      };
    }
    
    // Check acceptable alternatives
    if (task.acceptableFormulas && task.acceptableFormulas.length > 0) {
      for (const acceptable of task.acceptableFormulas) {
        if (normalized === this.normalize(acceptable)) {
          return { 
            ok: true, 
            msg: I18n.t('feedback.correct') 
          };
        }
      }
    }
    
    // Check for hardcoded values (numbers without cell references)
    if (!normalized.match(/[A-Z]+\$?[0-9]+/) && normalized.match(/[0-9]+/)) {
      return { 
        ok: false, 
        msg: I18n.t('feedback.hardcoded') 
      };
    }
    
    // Check for correct function
    const requiredFunc = required.match(/=([A-Z]+)\(/);
    const userFunc = normalized.match(/=([A-Z]+)\(/);
    
    if (requiredFunc && (!userFunc || requiredFunc[1] !== userFunc[1])) {
      return { 
        ok: false, 
        msg: I18n.t('feedback.wrongFunction').replace('{function}', requiredFunc[1]) 
      };
    }
    
    // Check for range usage
    if (required.includes(':') && !normalized.includes(':')) {
      return { 
        ok: false, 
        msg: I18n.t('feedback.missingRange') 
      };
    }
    
    return { 
      ok: false, 
      msg: I18n.t('feedback.incorrect') 
    };
  }
};