# Complete Upgrade System Reference

## Overview
This document lists all upgradeable values in the UPGRADE_TREE system (lines 2178-2328 in index.html).

---

## Upgrade Node Structure

Each upgrade node in `UPGRADE_TREE` has the following structure:

```javascript
node_id: {
    id: 'node_id',                    // Unique identifier
    parentIds: ['parent_node_id'],    // Array of required parent nodes
    levelMax: 3,                       // Maximum level for this upgrade
    currentLevel: 0,                   // Current upgrade level (saved in localStorage)
    icon: '🎯',                       // Emoji icon (fallback)
    iconImage: './img/icon.png',      // Custom image path (null for emoji)
    name: 'Node Name',                // Display name
    description: 'Node description',  // Description text
    cost: {                           // Cost per level
        gold: 200,                    // Gold coins cost
        xp: 0,                        // XP cost
        bossCoin: 0                   // Boss coins cost
    },
    effects: {                        // Effects applied per level
        stat_name: value              // See "Available Effects" below
    },
    x: 360,                          // X position in skill tree (0-720)
    y: 240,                          // Y position in skill tree
    state: 'locked'                  // Initial state (locked/available/purchased)
}
```

---

## Available Effects (effects object)

These are the stat modifiers you can use in the `effects` object:

### 1. **damage** (Number)
- **Description**: Increases base weapon damage
- **Application**: Added directly to `this.player.damage`
- **Example**: `effects: { damage: 3 }` adds +3 damage per level
- **Code Location**: Line 3719-3721

### 2. **crit** (Number)
- **Description**: Improves critical hit chance
- **Application**: Currently placeholder (no implementation)
- **Example**: `effects: { crit: 3 }` would add +3% crit chance per level
- **Code Location**: Line 3722-3724
- **Note**: You need to implement critical hit logic

### 3. **hp** (Number)
- **Description**: Increases maximum health (hearts)
- **Application**: Added to `this.player.hearts` and updates HUD
- **Example**: `effects: { hp: 2 }` adds +2 hearts per level
- **Code Location**: Line 3725-3728

### 4. **fireRate** (Number)
- **Description**: Increases fire rate (shots per second)
- **Application**: Added to `this.player.attackSpeed`
- **Example**: `effects: { fireRate: 0.3 }` adds +0.3 attack speed per level
- **Code Location**: Line 3729-3731

### 5. **missileDamage** (Number)
- **Description**: Increases homing missile damage
- **Application**: Currently placeholder (no implementation)
- **Example**: `effects: { missileDamage: 8 }` would add +8 missile damage per level
- **Code Location**: Line 3732-3734
- **Note**: You need to implement missile damage scaling

### 6. **allDamage** (Number - Percentage)
- **Description**: Multiplies all damage output by percentage
- **Application**: Multiplies `this.player.damage` by `(1 + value/100)`
- **Example**: `effects: { allDamage: 5 }` adds +5% total damage per level
- **Code Location**: Line 3735-3737

### 7. **cooldown** (Number - Negative)
- **Description**: Reduces skill cooldowns (in percentage)
- **Application**: Currently placeholder (no implementation)
- **Example**: `effects: { cooldown: -5 }` reduces cooldowns by 5% per level
- **Code Location**: Line 2257
- **Note**: You need to implement cooldown reduction logic

### 8. **unlockSkillUI** (Boolean)
- **Description**: Special flag to unlock the skill upgrade interface
- **Application**: Unlocks skill selection UI during level-up
- **Example**: `effects: { unlockSkillUI: true }`
- **Code Location**: Line 2192

---

## Player Base Stats

These are the stats defined in `this.player` (Line 3096-3116) that can be upgraded:

```javascript
this.player = {
    x: 360,              // X position
    y: 1100,             // Y position
    width: 40,           // Collision width
    height: 60,          // Collision height
    speed: 8,            // Movement speed (NOT currently upgradeable)
    hearts: 3,           // Current/max HP (upgradeable via 'hp' effect)
    level: 1,            // Player level
    xp: 0,               // Current XP
    xpToNext: 100,       // XP needed for next level
    damage: 20,          // Base damage (upgradeable via 'damage' or 'allDamage')
    attackSpeed: 3,      // Shots per second (upgradeable via 'fireRate')
    skills: {},          // Active skills from level-up choices
    lastShot: 0,         // Last shot timestamp
    teleport: {          // Teleport skill data
        charges: 0,
        maxCharges: 0,
        lastUsed: 0,
        cooldown: 10000  // 10 seconds (NOT currently upgradeable)
    }
}
```

---

## Current Upgrade Nodes

### Root Node (Row 0)
1. **skill_system_core** - Unlocks skill upgrade interface
   - Cost: 1 Boss Coin
   - Effect: `unlockSkillUI: true`

### Tier 1 (Row 1)
2. **mag_weapon** - Increase base weapon damage
   - Cost: 200 Gold
   - Effect: `damage: 3` (+3 damage per level)
   - Max Level: 3

3. **aim_system** - Improve critical accuracy
   - Cost: 240 Gold
   - Effect: `crit: 3` (+3% crit per level)
   - Max Level: 3

4. **shield_boost** - Increase max HP
   - Cost: 260 Gold
   - Effect: `hp: 2` (+2 hearts per level)
   - Max Level: 3

5. **energy_core** - Reduce skill cooldowns
   - Cost: 500 Gold
   - Effect: `cooldown: -5` (-5% cooldown per level)
   - Max Level: 3

### Tier 2 (Row 2) - Synergy Nodes
6. **missile_pod** - Unlock missile burst damage
   - Parents: mag_weapon, aim_system
   - Cost: 480 Gold
   - Effect: `missileDamage: 8` (+8 missile damage per level)
   - Max Level: 3

7. **dual_cannons** - Increase fire rate
   - Parents: aim_system, shield_boost
   - Cost: 520 Gold
   - Effect: `fireRate: 0.3` (+0.3 attack speed per level)
   - Max Level: 3

8. **power_amplifier** - Boost all damage output
   - Parents: shield_boost, energy_core
   - Cost: 550 Gold
   - Effect: `allDamage: 5` (+5% total damage per level)
   - Max Level: 3

### Tier 3 (Row 3) - Ultimate
9. **ultimate_overdrive** - Massive temporary power boost
   - Parents: missile_pod, dual_cannons, power_amplifier
   - Cost: 800 Gold + 1 Boss Coin
   - Effect: `allDamage: 35` (+35% total damage per level)
   - Max Level: 3

---

## How to Add New Upgradeable Stats

### Step 1: Add a new effect type
In the `effects` object of your upgrade node:
```javascript
effects: { newStat: 10 }
```

### Step 2: Apply the effect in applyUpgradeEffects()
Add the handler around line 3738:
```javascript
if (node.effects.newStat) {
    // Apply your new stat modification
    this.player.newStatValue += node.effects.newStat;
}
```

### Step 3: Initialize the stat in player object
Add it to `this.player` initialization (line 3096):
```javascript
this.player = {
    // ... existing stats ...
    newStatValue: 0,  // Add your new stat
}
```

---

## Adding New Upgrade Nodes

To add a new upgrade node to the tree:

```javascript
const UPGRADE_TREE = {
    // ... existing nodes ...
    
    new_upgrade: {
        id: 'new_upgrade',
        parentIds: ['parent_node_id'],  // Required parent(s)
        levelMax: 3,                    // Max level
        currentLevel: 0,
        icon: '⚡',
        iconImage: null,                // or './img/icon.png'
        name: 'New Upgrade',
        description: 'What this upgrade does',
        cost: { 
            gold: 300, 
            xp: 0, 
            bossCoin: 0 
        },
        effects: { 
            damage: 5,        // Can have multiple effects
            fireRate: 0.2 
        },
        x: 360,  // Position in tree (0-720)
        y: 320,  // Position in tree
        state: 'locked'
    }
}
```

---

## Currency System

Three currencies are used for upgrades:

1. **gold** (💰) - Regular coins, earned from killing enemies
2. **xp** (⭐) - Experience points, currently not used for upgrades
3. **bossCoin** (👑) - Boss coins, earned from defeating bosses

Currency is stored in:
- `this.persistentCurrency.coins` (gold)
- `this.persistentCurrency.bossCoins` (boss coins)
- Saved in localStorage as `gameCoins` and `gameBossCoins`

---

## Potential Stats to Add

Here are stats that exist in the game but aren't currently upgradeable:

### Movement & Control
- `player.speed` - Movement speed
- `player.teleport.cooldown` - Teleport cooldown time
- `player.teleport.maxCharges` - Max teleport charges

### Combat Stats
- Bullet speed (not a player stat, needs to be tracked)
- Bullet size/penetration
- Explosion radius (for explosive_bullets skill)
- Chain lightning range/jumps
- Missile tracking speed/accuracy
- Ricochet count
- Laser fortress damage

### Defensive Stats
- Invincibility duration after taking damage
- Shield regeneration
- Damage reduction

### Skills & Abilities
- Skill effectiveness multipliers for:
  - support_fighters (count, damage, fire rate)
  - explosive_bullets (explosion radius)
  - chain_lightning (jumps, range, damage)
  - homing_missiles (count, speed, damage)
  - ricochet_bullets (bounces, damage retention)
  - laser_fortress (damage, duration, cooldown)

### Meta Stats
- XP gain multiplier
- Coin drop rate
- Boss coin chance

---

## Tips for Extending the System

1. **Keep effects simple**: Each effect should modify one stat clearly
2. **Use percentages for scaling**: For multiplicative effects (like allDamage), use percentages
3. **Add visual feedback**: Update HUD when stats change
4. **Balance carefully**: Test the impact of each upgrade level
5. **Consider synergies**: Create nodes that require multiple parents for interesting choices
6. **Use appropriate costs**: 
   - Basic tier 1: 200-300 gold
   - Advanced tier 2: 400-600 gold
   - Ultimate tier 3: 800+ gold + boss coins
7. **Position strategically**: Use x, y coordinates to create a meaningful tree layout
   - X range: 0-720 (game width)
   - Y spacing: ~160px per tier

---

## Save System

Upgrades are automatically saved to localStorage:
- Key: `gameUpgrades`
- Format: JSON object with node IDs as keys, current levels as values
- Loaded on game init (line 2740-2742)
- Saved when upgrade purchased (line 2724-2727)

---

## Related Code Sections

- **UPGRADE_TREE Definition**: Lines 2178-2328
- **Player Stats**: Lines 3096-3116
- **Apply Effects**: Lines 3717-3743
- **Purchase Upgrade**: Lines 3682-3715
- **Skill Tree Rendering**: Lines 3454-3644
- **Save/Load System**: Lines 2724-2742

