# Upgrade System Quick Reference

## Available Effect Types

| Effect Name | Type | Applied To | Current Use | Implementation Status |
|------------|------|------------|-------------|---------------------|
| `damage` | Number | `player.damage` | Base weapon damage | ✅ Fully Working |
| `crit` | Number | - | Critical hit chance % | ⚠️ Placeholder Only |
| `hp` | Number | `player.hearts` | Max health (hearts) | ✅ Fully Working |
| `fireRate` | Number | `player.attackSpeed` | Shots per second | ✅ Fully Working |
| `missileDamage` | Number | - | Homing missile damage | ⚠️ Placeholder Only |
| `allDamage` | Number (%) | `player.damage` | Multiplier for all damage | ✅ Fully Working |
| `cooldown` | Number (negative) | - | Skill cooldown reduction % | ⚠️ Placeholder Only |
| `unlockSkillUI` | Boolean | - | Enables skill selection UI | ✅ Special Function |

**Legend**: ✅ = Working | ⚠️ = Needs Implementation

---

## Player Stats Available for Upgrades

```javascript
// Currently Upgradeable
player.damage = 20           // Base damage (damage, allDamage effects)
player.attackSpeed = 3       // Fire rate (fireRate effect)
player.hearts = 3            // Health (hp effect)

// Defined but NOT Upgradeable
player.speed = 8             // Movement speed
player.teleport.cooldown = 10000  // Teleport cooldown (ms)
player.teleport.maxCharges = 0    // Teleport charges
```

---

## Quick Add New Upgrade

### 1. Add to UPGRADE_TREE (line ~2328)
```javascript
my_new_upgrade: {
    id: 'my_new_upgrade',
    parentIds: ['parent_id'],
    levelMax: 3,
    currentLevel: 0,
    icon: '⚡',
    iconImage: './img/myicon.png',
    name: 'My Upgrade',
    description: 'What it does',
    cost: { gold: 300, xp: 0, bossCoin: 0 },
    effects: { damage: 5 },  // Choose from table above
    x: 360,  // 0-720
    y: 320,  // Increment by ~160 per tier
    state: 'locked'
}
```

### 2. Apply Effect (line ~3738)
```javascript
// Only if adding NEW effect type (not in table)
if (node.effects.myNewEffect) {
    this.player.myNewStat += node.effects.myNewEffect;
}
```

### 3. Initialize Stat (line ~3096)
```javascript
// Only if adding NEW stat
this.player = {
    // ... existing ...
    myNewStat: 0,
}
```

---

## Current Upgrade Tree Structure

```
                    [skill_system_core]
                           |
          +----------------+----------------+----------------+
          |                |                |                |
    [mag_weapon]     [aim_system]    [shield_boost]   [energy_core]
      damage=3         crit=3           hp=2          cooldown=-5
          |                |                |                |
          +--------+-------+        +-------+--------+       |
                   |                        |                |
             [missile_pod]            [dual_cannons]  [power_amplifier]
            missileDmg=8               fireRate=0.3     allDamage=5
                   |                        |                |
                   +------------+-----------+----------------+
                                |
                      [ultimate_overdrive]
                         allDamage=35
```

---

## Cost Guidelines

| Tier | Position | Gold Cost | Boss Coins | Example |
|------|----------|-----------|------------|---------|
| 0 (Root) | y: 80 | 0 | 1 | skill_system_core |
| 1 (Basic) | y: 240 | 200-500 | 0 | mag_weapon, energy_core |
| 2 (Advanced) | y: 400 | 400-600 | 0 | missile_pod, dual_cannons |
| 3 (Ultimate) | y: 560 | 800+ | 1+ | ultimate_overdrive |

---

## Common Patterns

### Single Parent Upgrade
```javascript
parentIds: ['parent_id']
```

### Multi-Parent (Synergy Node)
```javascript
parentIds: ['parent_1', 'parent_2']
```

### Multiple Effects
```javascript
effects: { 
    damage: 5,
    fireRate: 0.2,
    hp: 1
}
```

### Percentage Multiplier
```javascript
effects: { allDamage: 10 }  // +10% per level
// Applied as: damage *= (1 + 10/100)
```

---

## Stats That COULD Be Added

### Combat
- ❌ `bulletSpeed` - Not tracked
- ❌ `bulletSize` - Not tracked
- ❌ `piercing` - Not tracked
- ❌ `critChance` - Not implemented
- ❌ `critDamage` - Not implemented

### Movement
- ✅ `player.speed` - Exists (value: 8)
- ✅ `player.teleport.cooldown` - Exists (10000ms)
- ✅ `player.teleport.maxCharges` - Exists (0-3)

### Skills
- ❌ Individual skill power multipliers
- ❌ Skill cooldown multipliers
- ❌ Skill duration modifiers

### Meta
- ❌ XP multiplier
- ❌ Coin drop rate
- ❌ Boss coin drop chance

---

## Code Locations Cheat Sheet

| What | Line | Note |
|------|------|------|
| UPGRADE_TREE definition | 2178 | Add new nodes here |
| Player stats init | 3096 | Add new stats here |
| Apply effects | 3717-3743 | Add new effect handlers |
| Purchase function | 3682-3715 | Handles buying |
| Save upgrades | 2724-2727 | Auto-saves to localStorage |
| Load upgrades | 2740-2742 | Auto-loads from localStorage |

---

## localStorage Keys

- `gameUpgrades` - Upgrade levels (JSON: {nodeId: level})
- `gameCoins` - Persistent gold
- `gameBossCoins` - Persistent boss coins

---

## Testing Tips

1. **Quick Gold**: Add to console:
   ```javascript
   game.persistentCurrency.coins = 10000;
   game.saveCurrency();
   ```

2. **Quick Boss Coins**: 
   ```javascript
   game.persistentCurrency.bossCoins = 10;
   game.saveCurrency();
   ```

3. **Reset Upgrades**:
   ```javascript
   localStorage.removeItem('gameUpgrades');
   location.reload();
   ```

4. **Check Current Upgrades**:
   ```javascript
   console.log(UPGRADE_TREE);
   ```

