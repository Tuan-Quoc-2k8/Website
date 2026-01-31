/**
 * ═══════════════════════════════════════════════════════════════
 * METEOR SMASH - ADVANCED SKILLS SYSTEM v2.0
 * ═══════════════════════════════════════════════════════════════
 * 
 * A complete, modular, and extensible skills system for browser-based
 * action games. Supports complex skill interactions, visual assets,
 * cooldown management, and skill restrictions.
 * 
 * ARCHITECTURE:
 * - Centralized skill registry with type-based organization
 * - Modular effect system for easy expansion
 * - Visual asset management with automatic fallbacks
 * - Skill conflict/restriction system
 * - Performance-optimized for 60fps gameplay
 * 
 * SKILL TYPES:
 * - core: Base gameplay modifiers (multishot, support fighters)
 * - bullet_enhancement: Modifies bullet behavior (pierce, ricochet, explosive)
 * - summon: Spawns additional entities (support fighters, laser fortress)
 * - passive: Continuous stat buffs (speed, damage)
 * - active: Timed/cooldown abilities (chain lightning, homing missiles)
 * 
 * © 2025 Meteor Smash - All Rights Reserved
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// SKILL TYPE CONSTANTS
// ═══════════════════════════════════════════════════════════════

const SKILL_TYPES = {
    CORE: 'core',
    BULLET_ENHANCEMENT: 'bullet_enhancement',
    SUMMON: 'summon',
    PASSIVE: 'passive',
    ACTIVE: 'active'
};

// ═══════════════════════════════════════════════════════════════
// MAIN SKILLS REGISTRY
// ═══════════════════════════════════════════════════════════════

const SKILLS_REGISTRY = {
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // EXISTING SKILLS (Preserved from original system)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    multishot: {
        id: 'multishot',
        name: 'Multi-Shot',
        type: SKILL_TYPES.CORE,
        icon: '🔱',
        image: null,
        description: 'Fire multiple bullets at once',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                streams: 2,
                description: 'Fire 2 bullets simultaneously',
                stats: { bulletStreams: 2 }
            },
            {
                tier: 2,
                streams: 3,
                description: 'Fire 3 bullets simultaneously',
                stats: { bulletStreams: 3 }
            }
        ],
        conflicts: [], // No conflicts
        notes: 'Base firing pattern enhancement'
    },
    
    rapid: {
        id: 'rapid',
        name: 'Rapid Fire',
        type: SKILL_TYPES.PASSIVE,
        icon: '⚡',
        image: null,
        description: 'Increase attack speed',
        maxTier: 3,
        levels: [
            {
                tier: 1,
                speedBonus: 2,
                description: '+2 attack speed',
                stats: { attackSpeedBonus: 2 }
            },
            {
                tier: 2,
                speedBonus: 4,
                description: '+4 attack speed',
                stats: { attackSpeedBonus: 4 }
            },
            {
                tier: 3,
                speedBonus: 6,
                description: '+6 attack speed',
                stats: { attackSpeedBonus: 6 }
            }
        ],
        conflicts: [],
        notes: 'Reduces time between shots'
    },
    
    power: {
        id: 'power',
        name: 'Power Shot',
        type: SKILL_TYPES.PASSIVE,
        icon: '💥',
        image: null,
        description: 'Increase damage',
        maxTier: 3,
        levels: [
            {
                tier: 1,
                damageBonus: 10,
                description: '+10 damage',
                stats: { damageBonus: 10 }
            },
            {
                tier: 2,
                damageBonus: 20,
                description: '+20 damage',
                stats: { damageBonus: 20 }
            },
            {
                tier: 3,
                damageBonus: 30,
                description: '+30 damage',
                stats: { damageBonus: 30 }
            }
        ],
        conflicts: [],
        notes: 'Increases base bullet damage'
    },
    
    shield: {
        id: 'shield',
        name: 'Extra Life',
        type: SKILL_TYPES.PASSIVE,
        icon: '❤️',
        image: null,
        description: 'Gain additional hearts',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                hearts: 1,
                description: '+1 heart',
                stats: { maxHearts: 1 }
            },
            {
                tier: 2,
                hearts: 1,
                description: '+1 heart',
                stats: { maxHearts: 1 }
            }
        ],
        conflicts: [],
        notes: 'Increases maximum health pool'
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // NEW SKILLS (Advanced Mechanics)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // ═══════════════════════════════════════════════════════════════
    // 1️⃣ SUPPORT FIGHTERS - Summon Type with Core Fire Modification
    // ═══════════════════════════════════════════════════════════════
    support_fighters: {
        id: 'support_fighters',
        name: 'Support Fighters',
        type: SKILL_TYPES.SUMMON,
        icon: '✈️',
        image: null, // Set to 'assets/support_fighter.png' for custom sprite
        description: 'Summon fighter ships to assist in battle',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Main ship stops firing. 2 support fighters fire instead',
                stats: {
                    fighterCount: 2,
                    mainShipFires: false,
                    fighterDamageMultiplier: 1.0,
                    fighterInheritsBulletSkills: false,
                    fighterOffsetX: 60,
                    fighterOffsetY: -20,
                    fighterFireRate: 8 // frames between shots
                },
                notes: 'Fighters positioned on left and right of main ship'
            },
            {
                tier: 2,
                description: 'Main ship resumes firing. Fighters deal 150% damage',
                stats: {
                    fighterCount: 2,
                    mainShipFires: true,
                    fighterDamageMultiplier: 1.5,
                    fighterInheritsBulletSkills: false,
                    fighterOffsetX: 60,
                    fighterOffsetY: -20,
                    fighterFireRate: 8
                },
                notes: 'Main ship + fighters all firing simultaneously'
            }
        ],
        conflicts: [],
        notes: 'Support fighters follow main ship position. Do NOT inherit bullet-enhancing skills like piercing or ricochet.',
        visual: {
            fighterColor: '#00ffff',
            fighterSize: 20,
            trailEffect: true
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 2️⃣ EXPLOSIVE BULLETS - Bullet Enhancement
    // ═══════════════════════════════════════════════════════════════
    explosive_bullets: {
        id: 'explosive_bullets',
        name: 'Explosive Rounds',
        type: SKILL_TYPES.BULLET_ENHANCEMENT,
        icon: '💣',
        image: null,
        description: 'Bullets explode on impact with area damage',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Small explosion radius with AoE damage',
                stats: {
                    explosionRadius: 50,
                    explosionDamageMultiplier: 1.0,
                    visualRadius: 60,
                    explosionDuration: 300 // milliseconds
                },
                notes: 'Affects all enemies in radius'
            },
            {
                tier: 2,
                description: 'Larger explosion radius with 200% AoE damage',
                stats: {
                    explosionRadius: 80,
                    explosionDamageMultiplier: 2.0,
                    visualRadius: 100,
                    explosionDuration: 400
                },
                notes: 'Significantly increased blast zone'
            }
        ],
        conflicts: [],
        notes: 'Explosion damage applies to ALL enemies in radius, including those not hit by bullet',
        visual: {
            explosionColor: '#ff6600',
            particleCount: 12,
            shockwaveEffect: true
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 3️⃣ CHAIN LIGHTNING - Active/Timed Damage
    // ═══════════════════════════════════════════════════════════════
    chain_lightning: {
        id: 'chain_lightning',
        name: 'Chain Lightning',
        type: SKILL_TYPES.ACTIVE,
        icon: '⚡',
        image: null,
        description: 'Periodically emit lightning that chains between enemies',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Every 8 seconds, blue lightning chains to 3 targets',
                stats: {
                    cooldown: 8000, // milliseconds
                    chainCount: 3,
                    damageMultiplier: 1.5,
                    lightningColor: '#00ffff',
                    chainRange: 200,
                    duration: 500
                },
                notes: 'Automatically seeks nearest enemies'
            },
            {
                tier: 2,
                description: 'Every 5 seconds, red lightning chains to 5 targets',
                stats: {
                    cooldown: 5000,
                    chainCount: 5,
                    damageMultiplier: 1.75,
                    lightningColor: '#ff0066',
                    chainRange: 250,
                    duration: 600
                },
                notes: 'Faster cooldown and more chains'
            }
        ],
        conflicts: [],
        notes: 'Lightning damage scales with player base damage. Cannot chain to same enemy twice in one activation.',
        visual: {
            boltWidth: 3,
            boltFlicker: true,
            glowIntensity: 20
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 4️⃣ HOMING MISSILES - Active/Projectile
    // ═══════════════════════════════════════════════════════════════
    homing_missiles: {
        id: 'homing_missiles',
        name: 'Homing Missiles',
        type: SKILL_TYPES.ACTIVE,
        icon: '🚀',
        image: null,
        description: 'Launch heat-seeking missiles at enemies',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Every 3 seconds, launch 1 homing missile (150% damage)',
                stats: {
                    cooldown: 3000,
                    missileCount: 1,
                    damageMultiplier: 1.5,
                    missileSpeed: 6,
                    turnRate: 0.1,
                    lockRange: 400
                },
                notes: 'Missile targets nearest enemy'
            },
            {
                tier: 2,
                description: 'Every 3 seconds, launch 3 homing missiles (150% damage each)',
                stats: {
                    cooldown: 3000,
                    missileCount: 3,
                    damageMultiplier: 1.5,
                    missileSpeed: 6,
                    turnRate: 0.1,
                    lockRange: 400,
                    spreadAngle: 15 // degrees between missiles
                },
                notes: 'All 3 missiles target different enemies when possible'
            }
        ],
        conflicts: [],
        notes: 'Missiles explode on contact or after 5 seconds. Each missile locks onto nearest untargeted enemy.',
        visual: {
            missileColor: '#ff9900',
            trailLength: 30,
            exhaustEffect: true,
            explosionRadius: 40
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 5️⃣ RICOCHET BULLETS - Bullet Enhancement (CONFLICTS WITH PIERCING)
    // ═══════════════════════════════════════════════════════════════
    ricochet_bullets: {
        id: 'ricochet_bullets',
        name: 'Ricochet Bullets',
        type: SKILL_TYPES.BULLET_ENHANCEMENT,
        icon: '🔄',
        image: null,
        description: 'Bullets bounce to hit additional targets',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Bullets bounce once in random direction after hitting',
                stats: {
                    bounceCount: 1,
                    bounceSpeedMultiplier: 0.8,
                    bounceDamageMultiplier: 1.0,
                    bounceAngleRange: 360 // degrees
                },
                notes: 'Bullet maintains 80% of original speed after bounce'
            },
            {
                tier: 2,
                description: 'On hit, bullet splits into 2 bullets that bounce',
                stats: {
                    bounceCount: 1,
                    splitCount: 2,
                    bounceSpeedMultiplier: 0.7,
                    bounceDamageMultiplier: 1.0,
                    bounceAngleRange: 360,
                    splitAngle: 45 // degrees between split bullets
                },
                notes: 'Creates 2 independent bouncing bullets per hit'
            }
        ],
        conflicts: ['piercing_bullets'],
        notes: 'CANNOT be combined with Piercing Bullets. Bounced bullets can hit the same enemy again.',
        visual: {
            bounceFlash: true,
            trailEffect: true,
            bounceColor: '#ffff00'
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 6️⃣ PIERCING BULLETS - Bullet Enhancement (CONFLICTS WITH RICOCHET)
    // ═══════════════════════════════════════════════════════════════
    piercing_bullets: {
        id: 'piercing_bullets',
        name: 'Piercing Bullets',
        type: SKILL_TYPES.BULLET_ENHANCEMENT,
        icon: '🎯',
        image: null,
        description: 'Bullets penetrate through multiple enemies',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: 'Bullets pierce through 2 targets',
                stats: {
                    pierceCount: 2,
                    firstTargetDamageMultiplier: 1.0,
                    subsequentDamageMultiplier: 1.0
                },
                notes: 'Same damage to all pierced enemies'
            },
            {
                tier: 2,
                description: 'Pierce 4 targets. First target takes 200% damage',
                stats: {
                    pierceCount: 4,
                    firstTargetDamageMultiplier: 2.0,
                    subsequentDamageMultiplier: 1.0
                },
                notes: 'Massive bonus damage to initial target'
            }
        ],
        conflicts: ['ricochet_bullets'],
        notes: 'CANNOT be combined with Ricochet Bullets. Bullet maintains velocity through all pierces.',
        visual: {
            bulletTrail: true,
            pierceEffect: true,
            trailColor: '#00ffff'
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 7️⃣ LASER FORTRESS - Summon/Area Control
    // ═══════════════════════════════════════════════════════════════
    laser_fortress: {
        id: 'laser_fortress',
        name: 'Laser Fortress',
        type: SKILL_TYPES.SUMMON,
        icon: '🔴',
        image: null,
        description: 'Summon support ships with continuous lasers',
        maxTier: 2,
        levels: [
            {
                tier: 1,
                description: '1 ship on left edge fires laser for 10s (15s cooldown)',
                stats: {
                    shipCount: 1,
                    shipPosition: 'left',
                    laserDuration: 10000, // milliseconds
                    cooldown: 15000,
                    damagePerTick: 5,
                    tickRate: 1000, // damage every 1 second
                    laserWidth: 15,
                    canBeBlocked: true,
                    spawnX: 30,
                    spawnY: 400
                },
                notes: 'Laser can be blocked by asteroids (line-of-sight check)'
            },
            {
                tier: 2,
                description: '2 ships on right edge. 150% damage, 10s cooldown',
                stats: {
                    shipCount: 2,
                    shipPosition: 'right',
                    laserDuration: 10000,
                    cooldown: 10000,
                    damagePerTick: 7.5, // 150% of tier 1
                    tickRate: 1000,
                    laserWidth: 15,
                    canBeBlocked: true,
                    spawnX: 690,
                    spawnYPositions: [300, 500], // Separated vertically
                    verticalSeparation: 200
                },
                notes: '2 ships share cooldown. Activate/deactivate simultaneously.'
            }
        ],
        conflicts: [],
        notes: 'Laser performs line-of-sight check. Asteroids can block damage. Ships cannot be damaged.',
        visual: {
            laserColor: '#ff0000',
            shipColor: '#666666',
            chargeEffect: true,
            pulseAnimation: true,
            shipSize: 40
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// SKILL CONFLICT MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════

/**
 * Check if two skills conflict with each other
 * @param {string} skillId1 - First skill ID
 * @param {string} skillId2 - Second skill ID
 * @returns {boolean} True if skills conflict
 */
function hasConflict(skillId1, skillId2) {
    const skill1 = SKILLS_REGISTRY[skillId1];
    const skill2 = SKILLS_REGISTRY[skillId2];
    
    if (!skill1 || !skill2) return false;
    
    return skill1.conflicts.includes(skillId2) || skill2.conflicts.includes(skillId1);
}

/**
 * Get all conflicts for a skill
 * @param {string} skillId - Skill ID to check
 * @returns {Array<string>} Array of conflicting skill IDs
 */
function getConflicts(skillId) {
    const skill = SKILLS_REGISTRY[skillId];
    return skill ? skill.conflicts : [];
}

/**
 * Check if a skill can be selected given current player skills
 * @param {string} skillId - Skill to check
 * @param {Object} currentSkills - Player's current skills {skillId: tier}
 * @returns {boolean} True if skill can be selected
 */
function canSelectSkill(skillId, currentSkills) {
    const skill = SKILLS_REGISTRY[skillId];
    if (!skill) return false;
    
    // Check if already maxed
    const currentTier = currentSkills[skillId] || 0;
    if (currentTier >= skill.maxTier) return false;
    
    // Check for conflicts
    for (const ownedSkillId in currentSkills) {
        if (currentSkills[ownedSkillId] > 0 && hasConflict(skillId, ownedSkillId)) {
            return false;
        }
    }
    
    return true;
}

// ═══════════════════════════════════════════════════════════════
// SKILL QUERY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all available skills
 * @returns {Object} Complete skills registry
 */
function getAllSkills() {
    return SKILLS_REGISTRY;
}

/**
 * Get skills by type
 * @param {string} type - Skill type (core, bullet_enhancement, summon, passive, active)
 * @returns {Array<Object>} Array of skills matching type
 */
function getSkillsByType(type) {
    return Object.values(SKILLS_REGISTRY).filter(skill => skill.type === type);
}

/**
 * Get a specific skill by ID
 * @param {string} skillId - The skill identifier
 * @returns {Object|null} Skill data or null if not found
 */
function getSkill(skillId) {
    return SKILLS_REGISTRY[skillId] || null;
}

/**
 * Get skills available for upgrade (not maxed, no conflicts)
 * @param {Object} currentSkills - Player's current skills {skillId: tier}
 * @returns {Array<Object>} Array of available skills
 */
function getAvailableSkills(currentSkills = {}) {
    return Object.values(SKILLS_REGISTRY).filter(skill => 
        canSelectSkill(skill.id, currentSkills)
    );
}

/**
 * Get random skill choices for level up (respects conflicts)
 * @param {Object} currentSkills - Player's current skills
 * @param {number} count - Number of choices to return (default: 3)
 * @returns {Array<Object>} Array of random skill choices
 */
function getRandomSkillChoices(currentSkills = {}, count = 3) {
    const available = getAvailableSkills(currentSkills);
    const choices = [];
    
    // Create a copy to avoid modifying original
    const pool = [...available];
    
    while (choices.length < count && pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        choices.push(pool[randomIndex]);
        pool.splice(randomIndex, 1);
    }
    
    return choices;
}

// ═══════════════════════════════════════════════════════════════
// SKILL LEVEL/TIER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get stats for a specific skill tier
 * @param {string} skillId - The skill identifier
 * @param {number} tier - The tier level (1-based)
 * @returns {Object|null} Stats object or null
 */
function getSkillStats(skillId, tier) {
    const skill = getSkill(skillId);
    if (!skill || !skill.levels || tier < 1 || tier > skill.levels.length) {
        return null;
    }
    return skill.levels[tier - 1].stats;
}

/**
 * Get description for a specific tier
 * @param {string} skillId - The skill identifier
 * @param {number} tier - The tier level (1-based)
 * @returns {string} Description or empty string
 */
function getSkillDescription(skillId, tier) {
    const skill = getSkill(skillId);
    if (!skill || !skill.levels || tier < 1 || tier > skill.levels.length) {
        return '';
    }
    return skill.levels[tier - 1].description;
}

/**
 * Get current tier of a skill
 * @param {string} skillId - The skill identifier
 * @param {Object} currentSkills - Player's current skills
 * @returns {number} Current tier (0 if not owned)
 */
function getCurrentTier(skillId, currentSkills = {}) {
    return currentSkills[skillId] || 0;
}

/**
 * Check if skill is maxed out
 * @param {string} skillId - The skill identifier
 * @param {Object} currentSkills - Player's current skills
 * @returns {boolean} True if skill is at max tier
 */
function isMaxTier(skillId, currentSkills = {}) {
    const skill = getSkill(skillId);
    if (!skill) return false;
    
    const currentTier = getCurrentTier(skillId, currentSkills);
    return currentTier >= skill.maxTier;
}

// ═══════════════════════════════════════════════════════════════
// VISUAL SYSTEM FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Check if an image should be used for a skill
 * @param {Object} skill - The skill object
 * @returns {boolean} True if image path is available
 */
function hasImage(skill) {
    return skill.image !== null && skill.image !== undefined && skill.image !== '';
}

/**
 * Get visual representation (image or icon)
 * @param {Object} skill - The skill object
 * @returns {Object} {type: 'image'|'icon', value: string}
 */
function getVisual(skill) {
    if (hasImage(skill)) {
        return { type: 'image', value: skill.image };
    }
    return { type: 'icon', value: skill.icon };
}

/**
 * Get skill display name with tier
 * @param {string} skillId - The skill identifier
 * @param {number} tier - The tier level
 * @returns {string} Formatted name
 */
function getDisplayName(skillId, tier) {
    const skill = getSkill(skillId);
    if (!skill) return 'Unknown Skill';
    
    if (tier > 1) {
        return `${skill.name} ${tier}`;
    }
    return skill.name;
}

// ═══════════════════════════════════════════════════════════════
// UPGRADE CARD GENERATION
// ═══════════════════════════════════════════════════════════════

/**
 * Generate upgrade card data for UI rendering
 * @param {Object} skill - The skill object
 * @param {number} nextTier - The tier being offered
 * @returns {Object} Complete upgrade card data
 */
function generateUpgradeCard(skill, nextTier) {
    const visual = getVisual(skill);
    const description = getSkillDescription(skill.id, nextTier);
    const stats = getSkillStats(skill.id, nextTier);
    
    return {
        skillId: skill.id,
        name: getDisplayName(skill.id, nextTier),
        tier: nextTier,
        type: skill.type,
        visualType: visual.type,
        visualValue: visual.value,
        description: description,
        stats: stats,
        isUpgrade: nextTier > 1,
        maxTier: skill.maxTier,
        conflicts: skill.conflicts
    };
}

/**
 * Generate multiple upgrade cards for level-up screen
 * @param {Object} currentSkills - Player's current skills
 * @param {number} count - Number of cards (default: 3)
 * @returns {Array<Object>} Array of upgrade card data
 */
function generateUpgradeCards(currentSkills = {}, count = 3) {
    const choices = getRandomSkillChoices(currentSkills, count);
    
    return choices.map(skill => {
        const nextTier = getCurrentTier(skill.id, currentSkills) + 1;
        return generateUpgradeCard(skill, nextTier);
    });
}

// ═══════════════════════════════════════════════════════════════
// SKILL APPLICATION HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Apply a skill upgrade to player stats
 * @param {string} skillId - The skill identifier
 * @param {number} tier - The tier being applied
 * @param {Object} playerStats - Player stats object to modify
 * @returns {Object} Modified player stats
 */
function applySkillToStats(skillId, tier, playerStats) {
    const stats = getSkillStats(skillId, tier);
    if (!stats) return playerStats;
    
    // Deep copy to avoid mutation
    const newStats = JSON.parse(JSON.stringify(playerStats));
    
    // Apply stat modifications based on skill type
    for (const [key, value] of Object.entries(stats)) {
        if (key.endsWith('Bonus') || key.endsWith('Multiplier')) {
            // Additive bonuses
            if (newStats[key]) {
                newStats[key] += value;
            } else {
                newStats[key] = value;
            }
        } else {
            // Direct set (like maxHearts, bulletStreams)
            newStats[key] = value;
        }
    }
    
    return newStats;
}

/**
 * Calculate final damage after all multipliers
 * @param {number} baseDamage - Base bullet damage
 * @param {Object} currentSkills - Player's current skills
 * @param {string} damageSource - Type of damage (bullet, explosion, etc)
 * @returns {number} Final damage value
 */
function calculateDamage(baseDamage, currentSkills = {}, damageSource = 'bullet') {
    let finalDamage = baseDamage;
    
    // Apply power shot bonus
    if (currentSkills.power) {
        const powerTier = currentSkills.power;
        const stats = getSkillStats('power', powerTier);
        if (stats && stats.damageBonus) {
            finalDamage += stats.damageBonus;
        }
    }
    
    // Add other damage modifiers here as needed
    
    return finalDamage;
}

// ═══════════════════════════════════════════════════════════════
// COOLDOWN MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════

/**
 * Cooldown tracker for active skills
 */
class CooldownManager {
    constructor() {
        this.cooldowns = {}; // {skillId: lastActivationTime}
    }
    
    /**
     * Check if skill is ready to use
     * @param {string} skillId - Skill identifier
     * @param {number} tier - Current tier
     * @returns {boolean} True if off cooldown
     */
    isReady(skillId, tier) {
        const skill = getSkill(skillId);
        if (!skill) return false;
        
        const stats = getSkillStats(skillId, tier);
        if (!stats || !stats.cooldown) return true;
        
        const lastActivation = this.cooldowns[skillId] || 0;
        const now = Date.now();
        
        return (now - lastActivation) >= stats.cooldown;
    }
    
    /**
     * Activate skill and start cooldown
     * @param {string} skillId - Skill identifier
     */
    activate(skillId) {
        this.cooldowns[skillId] = Date.now();
    }
    
    /**
     * Get remaining cooldown time in milliseconds
     * @param {string} skillId - Skill identifier
     * @param {number} tier - Current tier
     * @returns {number} Milliseconds until ready (0 if ready)
     */
    getRemainingCooldown(skillId, tier) {
        const skill = getSkill(skillId);
        if (!skill) return 0;
        
        const stats = getSkillStats(skillId, tier);
        if (!stats || !stats.cooldown) return 0;
        
        const lastActivation = this.cooldowns[skillId] || 0;
        const now = Date.now();
        const elapsed = now - lastActivation;
        
        return Math.max(0, stats.cooldown - elapsed);
    }
    
    /**
     * Reset all cooldowns (use for new game, debug)
     */
    reset() {
        this.cooldowns = {};
    }
}

// ═══════════════════════════════════════════════════════════════
// EXPORT SYSTEM
// ═══════════════════════════════════════════════════════════════

// Browser environment - attach to window
if (typeof window !== 'undefined') {
    window.SkillsSystem = {
        // Core data
        SKILLS_REGISTRY,
        SKILL_TYPES,
        
        // Query functions
        getAllSkills,
        getSkillsByType,
        getSkill,
        getAvailableSkills,
        getRandomSkillChoices,
        
        // Tier/Level functions
        getSkillStats,
        getSkillDescription,
        getCurrentTier,
        isMaxTier,
        
        // Visual functions
        hasImage,
        getVisual,
        getDisplayName,
        
        // Conflict management
        hasConflict,
        getConflicts,
        canSelectSkill,
        
        // Upgrade cards
        generateUpgradeCard,
        generateUpgradeCards,
        
        // Stat application
        applySkillToStats,
        calculateDamage,
        
        // Cooldown manager
        CooldownManager
    };
    
    console.log('✅ Skills System v2.0 loaded successfully');
    console.log(`📊 Total skills: ${Object.keys(SKILLS_REGISTRY).length}`);
    console.log(`🔫 Bullet enhancements: ${getSkillsByType(SKILL_TYPES.BULLET_ENHANCEMENT).length}`);
    console.log(`⚡ Active skills: ${getSkillsByType(SKILL_TYPES.ACTIVE).length}`);
    console.log(`✈️ Summon skills: ${getSkillsByType(SKILL_TYPES.SUMMON).length}`);
}

// Node.js/module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SKILLS_REGISTRY,
        SKILL_TYPES,
        getAllSkills,
        getSkillsByType,
        getSkill,
        getAvailableSkills,
        getRandomSkillChoices,
        getSkillStats,
        getSkillDescription,
        getCurrentTier,
        isMaxTier,
        hasImage,
        getVisual,
        getDisplayName,
        hasConflict,
        getConflicts,
        canSelectSkill,
        generateUpgradeCard,
        generateUpgradeCards,
        applySkillToStats,
        calculateDamage,
        CooldownManager
    };
}

// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES (Comment out in production)
// ═══════════════════════════════════════════════════════════════

/*
// Example 1: Generate level-up choices
const currentSkills = { multishot: 1, power: 2 };
const upgradeCards = generateUpgradeCards(currentSkills, 3);
console.log('Available upgrades:', upgradeCards);

// Example 2: Check skill conflicts
const canPickRicochet = canSelectSkill('ricochet_bullets', { piercing_bullets: 1 });
console.log('Can pick ricochet with piercing?', canPickRicochet); // false

// Example 3: Calculate damage
const baseDamage = 10;
const finalDamage = calculateDamage(baseDamage, { power: 3 });
console.log('Final damage:', finalDamage); // 40

// Example 4: Cooldown management
const cooldownMgr = new CooldownManager();
if (cooldownMgr.isReady('chain_lightning', 1)) {
    // Activate chain lightning
    cooldownMgr.activate('chain_lightning');
}
*/