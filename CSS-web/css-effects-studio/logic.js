const PerformanceMonitor = {
    enabled: localStorage.getItem('perfMode') === 'true',
    
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('perfMode', this.enabled);
        
        if (this.enabled) {
            document.documentElement.style.setProperty('--effect-blur', '5px');
            document.documentElement.style.setProperty('--effect-intensity', '0.7');
        } else {
            document.documentElement.style.setProperty('--effect-blur', '10px');
            document.documentElement.style.setProperty('--effect-intensity', '1');
        }
    },

    getBadge(level) {
        const badges = {
            low: `<span class="perf-badge perf-low"><span>⚡</span> <span data-i18n="perfLow">${i18nManager.t('perfLow')}</span></span>`,
            medium: `<span class="perf-badge perf-medium"><span>⚠️</span> <span data-i18n="perfMedium">${i18nManager.t('perfMedium')}</span></span>`,
            high: `<span class="perf-badge perf-high"><span>🔥</span> <span data-i18n="perfHigh">${i18nManager.t('perfHigh')}</span></span>`
        };
        return badges[level] || badges.low;
    }
};

const ExportEngine = {
    copyCode(type) {
        const effect = EffectRegistry.get(Studio.currentEffect);
        if (!effect) return;

        const code = effect.code[type];
        navigator.clipboard.writeText(code).then(() => {
            const btn = event.target.closest('.copy-btn').querySelector('[data-i18n]');
            const originalText = btn.textContent;
            btn.textContent = i18nManager.t('btnCopied');
            setTimeout(() => {
                btn.textContent = i18nManager.t('btnCopy');
            }, 2000);
        });
    },

    download() {
        const effect = EffectRegistry.get(Studio.currentEffect);
        if (!effect) return;

        const content = `/* ${i18nManager.t('name', effect)} */

HTML:
${effect.code.html}

CSS:
${effect.code.css}

JavaScript:
${effect.code.js}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${effect.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

const Studio = {
    currentEffect: null,
    currentTab: 'preview',
    i18n: i18nManager,
    performance: PerformanceMonitor,
    export: ExportEngine,

    init() {
        this.ui.renderEffects();
        const firstEffect = EffectRegistry.getAll()[0];
        if (firstEffect) {
            this.loadEffect(firstEffect.id);
        }
        this.i18n.updateUI();
    },

    loadEffect(effectId) {
        const effect = EffectRegistry.get(effectId);
        if (!effect) return;

        this.currentEffect = effectId;

        document.querySelectorAll('.effect-item').forEach(item => {
            item.classList.toggle('active', item.dataset.effectId === effectId);
        });

        const previewContainer = document.getElementById('effect-preview');
        if (previewContainer) {
            previewContainer.innerHTML = effect.previewHTML;

            if (effect.setup) {
                const element = previewContainer.querySelector('[class*="btn-"], [class*="card-"], [class*="toggle-"], [class*="checkbox-"], [class*="radio-"]');
                if (element) {
                    effect.setup(element);
                }
            }
        }

        const titleEl = document.getElementById('effectTitle');
        if (titleEl) {
            titleEl.textContent = i18nManager.t('name', effect);
        }
        
        const perfBadge = document.getElementById('perfBadge');
        if (perfBadge) {
            perfBadge.outerHTML = PerformanceMonitor.getBadge(effect.performance);
        }

        this.ui.renderControls(effect);
        this.ui.renderPresets(effect);

        const descEl = document.getElementById('effectDescription');
        if (descEl) {
            descEl.textContent = i18nManager.t('explanation', effect);
        }
        this.ui.renderKeyProperties(effect);

        const htmlCode = document.getElementById('htmlCode');
        const cssCode = document.getElementById('cssCode');
        const jsCode = document.getElementById('jsCode');
        
        if (htmlCode) htmlCode.textContent = effect.code.html;
        if (cssCode) cssCode.textContent = effect.code.css;
        if (jsCode) jsCode.textContent = effect.code.js;
    },

    ui: {
        renderEffects() {
            const container = document.getElementById('effectsList');
            if (!container) return;
            
            const categories = EffectRegistry.getAllCategories();
            
            if (categories.length === 0) {
                container.innerHTML = '<p style="padding: 20px; color: var(--text-secondary); text-align: center;">No effects available</p>';
                return;
            }
            
            container.innerHTML = categories.map(category => {
                const effects = EffectRegistry.getByCategory(category);
                const catKey = 'cat' + category.charAt(0).toUpperCase() + category.slice(1);
                return `
                    <div class="category-group">
                        <div class="category-header">
                            <span data-i18n="${catKey}">${i18nManager.t(catKey)}</span>
                            <span class="category-count">${effects.length}</span>
                        </div>
                        ${effects.map(effect => `
                            <div class="effect-item" data-effect-id="${effect.id}" onclick="Studio.loadEffect('${effect.id}')">
                                <div class="effect-item-title">${i18nManager.t('name', effect)}</div>
                                <div class="effect-item-desc">${i18nManager.t('description', effect)}</div>
                                <div class="effect-item-tags">
                                    ${effect.tags.map(tag => `<span class="effect-tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }).join('');
        },

        renderControls(effect) {
            const container = document.getElementById('controlsGrid');
            if (!container) return;
            
            if (!effect.controls || effect.controls.length === 0) {
                container.innerHTML = '<p style="color: var(--text-secondary);">No customization available</p>';
                return;
            }

            container.innerHTML = effect.controls.map(control => {
                const labelText = i18nManager.t(control.label);
                if (control.type === 'range') {
                    return `
                        <div class="control-group">
                            <label class="control-label">
                                <span>${labelText}</span>
                                <span class="control-value" id="${control.id}-value">${control.default}${control.unit || ''}</span>
                            </label>
                            <input 
                                type="range" 
                                class="control-input"
                                min="${control.min}" 
                                max="${control.max}" 
                                step="${control.step}" 
                                value="${control.default}"
                                oninput="Studio.ui.updateControl('${control.id}', this.value, '${control.unit || ''}')"
                            >
                        </div>
                    `;
                } else if (control.type === 'color') {
                    return `
                        <div class="control-group">
                            <label class="control-label">${labelText}</label>
                            <input 
                                type="color" 
                                class="control-input"
                                value="${control.default}"
                                onchange="Studio.ui.updateControl('${control.id}', this.value)"
                            >
                        </div>
                    `;
                }
                return '';
            }).join('');
        },

        updateControl(id, value, unit = '') {
            const valueStr = String(value);
            const varName = id === 'color1' ? '--effect-color-1' : 
                            id === 'color2' ? '--effect-color-2' : 
                            `--effect-${id}`;
            
            document.documentElement.style.setProperty(varName, value + (unit && !valueStr.includes('#') ? unit : ''));
            
            const valueDisplay = document.getElementById(`${id}-value`);
            if (valueDisplay) {
                valueDisplay.textContent = value + unit;
            }
        },

        renderPresets(effect) {
            const container = document.getElementById('presetButtons');
            if (!container) return;
            
            if (!effect.presets || Object.keys(effect.presets).length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = Object.keys(effect.presets).map(presetName => {
                const presetKey = 'preset' + presetName.charAt(0).toUpperCase() + presetName.slice(1);
                return `<button class="preset-btn" onclick="Studio.ui.applyPreset('${presetName}')">
                    ${i18nManager.t(presetKey)}
                </button>`;
            }).join('');
        },

        applyPreset(presetName) {
            const effect = EffectRegistry.get(Studio.currentEffect);
            if (!effect || !effect.presets || !effect.presets[presetName]) return;

            const preset = effect.presets[presetName];
            
            Object.keys(preset).forEach(key => {
                const value = preset[key];
                const unit = key === 'duration' ? 's' : key.includes('color') ? '' : '';
                this.updateControl(key, value, unit);
                
                const input = document.querySelector(`[oninput*="${key}"], [onchange*="${key}"]`);
                if (input) {
                    input.value = value;
                }
            });

            document.querySelectorAll('.preset-btn').forEach(btn => {
                btn.classList.toggle('active', btn.textContent.toLowerCase().trim() === i18nManager.t('preset' + presetName.charAt(0).toUpperCase() + presetName.slice(1)).toLowerCase());
            });
        },

        renderKeyProperties(effect) {
            const container = document.getElementById('keyProperties');
            if (!container) return;
            
            if (!effect.keyProperties || effect.keyProperties.length === 0) {
                container.innerHTML = '<p style="color: var(--text-secondary); padding: 16px;">No properties defined</p>';
                return;
            }
            
            container.innerHTML = effect.keyProperties.map(prop => `
                <div class="property-item">
                    <span class="property-name">${prop.name}</span>
                    <span>${prop.value}</span>
                </div>
            `).join('');
        },

        switchTab(tab) {
            Studio.currentTab = tab;
            
            document.querySelectorAll('.workspace-tab').forEach(t => {
                t.classList.toggle('active', t.dataset.tab === tab);
            });
            
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.toggle('active', panel.dataset.panel === tab);
            });
        },

        switchCodeTab(lang) {
            document.querySelectorAll('.code-tab').forEach(tab => {
                tab.classList.toggle('active', tab.textContent.toLowerCase() === lang);
            });
            
            document.querySelectorAll('.code-block').forEach(block => {
                block.classList.toggle('active', block.id === `code${lang.charAt(0).toUpperCase() + lang.slice(1)}`);
            });
        },

        handleSearch(query) {
            const container = document.getElementById('effectsList');
            if (!container) return;
            
            const results = query.trim() === '' ? EffectRegistry.getAll() : EffectRegistry.search(query);
            
            if (results.length === 0) {
                container.innerHTML = '<p style="padding: 20px; color: var(--text-secondary); text-align: center;">No effects found</p>';
                return;
            }
            
            container.innerHTML = results.map(effect => `
                <div class="effect-item" data-effect-id="${effect.id}" onclick="Studio.loadEffect('${effect.id}')">
                    <div class="effect-item-title">${i18nManager.t('name', effect)}</div>
                    <div class="effect-item-desc">${i18nManager.t('description', effect)}</div>
                    <div class="effect-item-tags">
                        ${effect.tags.map(tag => `<span class="effect-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        },

        filterByTag(tag) {
            const container = document.getElementById('effectsList');
            if (!container) return;
            
            document.querySelectorAll('.tag').forEach(t => {
                t.classList.toggle('active', t.dataset.tag === tag);
            });

            // FIXED: When tag === 'all', show categorized view
            if (tag === 'all') {
                this.renderEffects();
                return;
            }

            const results = EffectRegistry.filterByTag(tag);
            
            if (results.length === 0) {
                container.innerHTML = '<p style="padding: 20px; color: var(--text-secondary); text-align: center;">No effects found</p>';
                return;
            }
            
            container.innerHTML = results.map(effect => `
                <div class="effect-item" data-effect-id="${effect.id}" onclick="Studio.loadEffect('${effect.id}')">
                    <div class="effect-item-title">${i18nManager.t('name', effect)}</div>
                    <div class="effect-item-desc">${i18nManager.t('description', effect)}</div>
                    <div class="effect-item-tags">
                        ${effect.tags.map(tag => `<span class="effect-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        },

        toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            document.getElementById('themeIcon').textContent = newTheme === 'light' ? '☀️' : '🌙';
        },

        toggleLangMenu() {
            document.getElementById('langMenu').classList.toggle('active');
        },

        resetEffect() {
            const effect = EffectRegistry.get(Studio.currentEffect);
            if (!effect || !effect.controls) return;

            effect.controls.forEach(control => {
                const unit = control.unit || '';
                this.updateControl(control.id, control.default, unit);
                
                const input = document.querySelector(`[oninput*="${control.id}"], [onchange*="${control.id}"]`);
                if (input) {
                    input.value = control.default;
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Studio.init();
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown')) {
        document.getElementById('langMenu').classList.remove('active');
    }
});

function focusCard(card) {
const cards = card.parentElement.querySelectorAll('.card');

cards.forEach(c => {
    c.classList.remove('active', 'dim');
    if (c !== card) c.classList.add('dim');
});

card.classList.add('active');
}
