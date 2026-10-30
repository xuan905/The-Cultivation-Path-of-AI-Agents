// ==UserScript==
// @name         Whisper Isle Integrated Combat Test
// @namespace    https://whisperisle.app/
// @version      2.11.0
// @description  Monster grid selection, expandable distance data and extreme ranged combat settings.
// @match        https://whisperisle.app/play*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '2.11.0';
  const ITEM_LABELS = {
    potion_hp: '初級治癒藥水',
    potion_mp: '初級魔力藥水',
    arrow_training: '木箭',
    light_torch: '火把',
    pouch_burial: '埋葬袋',
    scroll_return: '歸途卷軸'
  };
  const MONSTER_CATALOG = {"cape_hound":{"nameZh":"岬角野犬","nameEn":"cape_hound","level":1,"maxHp":22,"attack":4,"attackCooldown":"1.40 秒","category":"群聚"},"shapeshifter_captive_wolf":{"nameZh":"被鐵鏈拴著的狼人","nameEn":"shapeshifter_captive_wolf","level":1,"maxHp":42,"attack":5,"attackCooldown":"1.80 秒","category":"主動"},"shapeshifter_bandit":{"nameZh":"藏身處強盜","nameEn":"shapeshifter_bandit","level":1,"maxHp":76,"attack":3,"attackCooldown":"1.70 秒","category":"主動"},"wolf":{"nameZh":"野狼","nameEn":"wolf","level":2,"maxHp":30,"attack":6,"attackCooldown":"1.40 秒","category":"群聚"},"moon_rabbit":{"nameZh":"月兔","nameEn":"moon_rabbit","level":2,"maxHp":40,"attack":4,"attackCooldown":"1.60 秒","category":"被動"},"halloween_pumpkin":{"nameZh":"迷路的南瓜","nameEn":"halloween_pumpkin","level":3,"maxHp":65,"attack":4,"attackCooldown":"1.80 秒","category":"被動"},"wreck_scavenger":{"nameZh":"擱淺拾荒者","nameEn":"wreck_scavenger","level":4,"maxHp":56,"attack":8,"attackCooldown":"1.50 秒","category":"主動"},"wild_bull":{"nameZh":"野牛","nameEn":"wild_bull","level":5,"maxHp":84,"attack":14,"attackCooldown":"1.50 秒","category":"主動"},"skeleton_caster":{"nameZh":"枯骨咒師","nameEn":"skeleton_caster","level":7,"maxHp":120,"attack":22,"attackCooldown":"2.40 秒","category":"主動"},"wolf_alpha":{"nameZh":"頭狼","nameEn":"wolf_alpha","level":8,"maxHp":90,"attack":10,"attackCooldown":"1.30 秒","category":"精英"},"island_raider":{"nameZh":"島嶼掠奪者","nameEn":"island_raider","level":8,"maxHp":180,"attack":18,"attackCooldown":"1.40 秒","category":"主動"},"blackhound":{"nameZh":"沉錨幫黑犬","nameEn":"blackhound","level":9,"maxHp":150,"attack":20,"attackCooldown":"1 秒","category":"群聚"},"cape_falcon":{"nameZh":"岬角隼","nameEn":"cape_falcon","level":10,"maxHp":170,"attack":26,"attackCooldown":"2 秒","category":"主動"},"axethrower":{"nameZh":"沉錨幫擲斧手","nameEn":"axethrower","level":11,"maxHp":200,"attack":30,"attackCooldown":"2.20 秒","category":"主動"},"bone_hierophant":{"nameZh":"白骨祭司","nameEn":"bone_hierophant","level":12,"maxHp":300,"attack":30,"attackCooldown":"2.20 秒","category":"精英"},"ruffian":{"nameZh":"沉錨幫混混","nameEn":"ruffian","level":12,"maxHp":260,"attack":26,"attackCooldown":"1.40 秒","category":"主動"},"elite_frostmane":{"nameZh":"霜鬃狼王","nameEn":"elite_frostmane","level":12,"maxHp":680,"attack":34,"attackCooldown":"1.10 秒","category":"精英"},"bruiser":{"nameZh":"沉錨幫打手","nameEn":"bruiser","level":14,"maxHp":420,"attack":34,"attackCooldown":"1.80 秒","category":"主動"},"elite_whitecape":{"nameZh":"白岬隼","nameEn":"elite_whitecape","level":14,"maxHp":760,"attack":40,"attackCooldown":"1.80 秒","category":"精英"},"lanternguard":{"nameZh":"燈哨頭馬洛","nameEn":"lanternguard","level":16,"maxHp":900,"attack":42,"attackCooldown":"1.50 秒","category":"精英"},"overseer":{"nameZh":"贓物監工「鞭子」寇特","nameEn":"overseer","level":17,"maxHp":800,"attack":40,"attackCooldown":"1.30 秒","category":"精英"},"anchorboss":{"nameZh":"「沉錨」霍爾格","nameEn":"anchorboss","level":18,"maxHp":6800,"attack":72,"attackCooldown":"1.40 秒","category":"精英"},"ash_jackal":{"nameZh":"燼原豺","nameEn":"ash_jackal","level":25,"maxHp":560,"attack":52,"attackCooldown":"1.20 秒","category":"群聚"},"basalt_crawler":{"nameZh":"玄岩鱗蜥","nameEn":"basalt_crawler","level":27,"maxHp":640,"attack":60,"attackCooldown":"1.90 秒","category":"主動"},"cinder_kite":{"nameZh":"燼羽鳶","nameEn":"cinder_kite","level":29,"maxHp":700,"attack":66,"attackCooldown":"2 秒","category":"主動"},"elite_moltenspine":{"nameZh":"熔脊鱗蜥","nameEn":"elite_moltenspine","level":30,"maxHp":2880,"attack":85,"attackCooldown":"1.80 秒","category":"精英"},"sulphur_burner":{"nameZh":"硫窯匠","nameEn":"sulphur_burner","level":31,"maxHp":780,"attack":66,"attackCooldown":"2.40 秒","category":"主動"},"wreck_gull":{"nameZh":"沉船海鷗","nameEn":"wreck_gull","level":31,"maxHp":760,"attack":66,"attackCooldown":"1.50 秒","category":"群聚"},"reef_crab":{"nameZh":"藤壺礁蟹","nameEn":"reef_crab","level":31,"maxHp":1150,"attack":64,"attackCooldown":"1.70 秒","category":"主動"},"longreef_wolf":{"nameZh":"長礁野狼","nameEn":"longreef_wolf","level":32,"maxHp":900,"attack":70,"attackCooldown":"1.40 秒","category":"群聚"},"tomb_delver":{"nameZh":"墓道掘工","nameEn":"tomb_delver","level":33,"maxHp":860,"attack":80,"attackCooldown":"1.70 秒","category":"主動"},"dune_adder":{"nameZh":"沙丘蝮蛇","nameEn":"dune_adder","level":33,"maxHp":880,"attack":78,"attackCooldown":"1.40 秒","category":"主動"},"raider_captain":{"nameZh":"掠奪者隊長","nameEn":"raider_captain","level":34,"maxHp":2400,"attack":96,"attackCooldown":"1.50 秒","category":"精英"},"beacon_scavenger":{"nameZh":"長礁拾荒者","nameEn":"beacon_scavenger","level":34,"maxHp":1350,"attack":90,"attackCooldown":"1.40 秒","category":"主動"},"tomb_foreman":{"nameZh":"掘工頭「石鑿」瓦德","nameEn":"tomb_foreman","level":35,"maxHp":2600,"attack":98,"attackCooldown":"1.60 秒","category":"精英"},"zombie_shambler":{"nameZh":"蹣跚行屍","nameEn":"zombie_shambler","level":35,"maxHp":1650,"attack":96,"attackCooldown":"1.80 秒","category":"主動"},"grey_lynx":{"nameZh":"灰猞猁","nameEn":"grey_lynx","level":35,"maxHp":1100,"attack":88,"attackCooldown":"1.20 秒","category":"主動"},"bone_acolyte":{"nameZh":"骸骨侍祭","nameEn":"bone_acolyte","level":36,"maxHp":1400,"attack":88,"attackCooldown":"1.50 秒","category":"主動"},"skeleton_warrior":{"nameZh":"骸骨劍衛","nameEn":"skeleton_warrior","level":36,"maxHp":1500,"attack":92,"attackCooldown":"1.40 秒","category":"主動"},"zombie_runner":{"nameZh":"疾行屍","nameEn":"zombie_runner","level":36,"maxHp":1050,"attack":80,"attackCooldown":"1.20 秒","category":"主動"},"beacon_axethrower":{"nameZh":"石堤擲斧手","nameEn":"beacon_axethrower","level":36,"maxHp":1150,"attack":98,"attackCooldown":"2.20 秒","category":"主動"},"elite_stormtalon":{"nameZh":"暴爪隼","nameEn":"elite_stormtalon","level":36,"maxHp":3150,"attack":92,"attackCooldown":"1.80 秒","category":"精英"},"field_cricket":{"nameZh":"田野蟋蟀","nameEn":"field_cricket","level":36,"maxHp":1400,"attack":92,"attackCooldown":"1.80 秒","category":"群聚"},"zombie_bloated":{"nameZh":"腫脹行屍","nameEn":"zombie_bloated","level":37,"maxHp":2300,"attack":108,"attackCooldown":"2 秒","category":"主動"},"timber_beetle":{"nameZh":"鏽木鍬形蟲","nameEn":"timber_beetle","level":37,"maxHp":1700,"attack":96,"attackCooldown":"1.80 秒","category":"主動"},"red_deer":{"nameZh":"赤鹿","nameEn":"red_deer","level":37,"maxHp":2000,"attack":102,"attackCooldown":"1.80 秒","category":"主動"},"crypt_warden":{"nameZh":"墓室守衛","nameEn":"crypt_warden","level":38,"maxHp":9000,"attack":130,"attackCooldown":"1.60 秒","category":"精英"},"elite_mistpelt":{"nameZh":"霧紋猞猁","nameEn":"elite_mistpelt","level":38,"maxHp":4950,"attack":112,"attackCooldown":"1.10 秒","category":"精英"},"beacon_guard":{"nameZh":"舊要塞守衛","nameEn":"beacon_guard","level":39,"maxHp":1800,"attack":94,"attackCooldown":"2.10 秒","category":"主動"},"barley_badger":{"nameZh":"大麥獾","nameEn":"barley_badger","level":39,"maxHp":1967,"attack":101,"attackCooldown":"1.80 秒","category":"主動"},"oren_revenant":{"nameZh":"奧倫亡魂","nameEn":"oren_revenant","level":40,"maxHp":12000,"attack":120,"attackCooldown":"1.60 秒","category":"精英"},"crypt_sovereign":{"nameZh":"墓室主宰","nameEn":"crypt_sovereign","level":40,"maxHp":12000,"attack":135,"attackCooldown":"1.50 秒","category":"精英"},"slag_ogre":{"nameZh":"「渣縛」葛倫霍德","nameEn":"slag_ogre","level":40,"maxHp":55000,"attack":150,"attackCooldown":"1.60 秒","category":"精英"},"undercroft_guard":{"nameZh":"地下層守衛","nameEn":"undercroft_guard","level":40,"maxHp":2100,"attack":104,"attackCooldown":"2.10 秒","category":"主動"},"pasture_ram":{"nameZh":"牧場公羊","nameEn":"pasture_ram","level":40,"maxHp":2100,"attack":104,"attackCooldown":"2.10 秒","category":"主動"},"borrower_pumpkin":{"nameZh":"引火南瓜","nameEn":"borrower_pumpkin","level":40,"maxHp":3200,"attack":90,"attackCooldown":"1.40 秒","category":"主動"},"undercroft_axethrower":{"nameZh":"地下層擲斧手","nameEn":"undercroft_axethrower","level":41,"maxHp":1700,"attack":98,"attackCooldown":"2.20 秒","category":"主動"},"cell_crab":{"nameZh":"牢蟹","nameEn":"cell_crab","level":41,"maxHp":2300,"attack":108,"attackCooldown":"1.70 秒","category":"主動"},"banner_quartermaster":{"nameZh":"破旗軍需官","nameEn":"banner_quartermaster","level":42,"maxHp":9000,"attack":150,"attackCooldown":"1.60 秒","category":"精英"},"banner_captain":{"nameZh":"破旗旗手隊長","nameEn":"banner_captain","level":42,"maxHp":22000,"attack":135,"attackCooldown":"1.60 秒","category":"精英"},"undercroft_scavenger":{"nameZh":"地下層拾荒者","nameEn":"undercroft_scavenger","level":42,"maxHp":2000,"attack":110,"attackCooldown":"1.40 秒","category":"主動"},"chest_mimic_young":{"nameZh":"幼年寶箱怪","nameEn":"chest_mimic_young","level":42,"maxHp":3500,"attack":125,"attackCooldown":"1.50 秒","category":"主動"},"lantern_borrower":{"nameZh":"借聲者","nameEn":"lantern_borrower","level":42,"maxHp":72000,"attack":165,"attackCooldown":"1.50 秒","category":"精英"},"beacon_veteran":{"nameZh":"破旗老兵","nameEn":"beacon_veteran","level":43,"maxHp":3200,"attack":130,"attackCooldown":"1.60 秒","category":"精英"},"cell_jailer":{"nameZh":"水牢獄卒","nameEn":"cell_jailer","level":43,"maxHp":10000,"attack":165,"attackCooldown":"2.10 秒","category":"精英"},"drowned_warden":{"nameZh":"溺牢典獄蟹","nameEn":"drowned_warden","level":43,"maxHp":26000,"attack":140,"attackCooldown":"1.70 秒","category":"精英"},"mine_beetle":{"nameZh":"礦道甲蟲","nameEn":"mine_beetle","level":43,"maxHp":2600,"attack":122,"attackCooldown":"1.80 秒","category":"主動"},"tunnel_adder":{"nameZh":"坑道蝮蛇","nameEn":"tunnel_adder","level":44,"maxHp":2100,"attack":118,"attackCooldown":"1.40 秒","category":"主動"},"chest_mimic":{"nameZh":"寶箱怪","nameEn":"chest_mimic","level":44,"maxHp":5000,"attack":150,"attackCooldown":"1.50 秒","category":"精英"},"carrion_raven":{"nameZh":"食腐渡鴉","nameEn":"carrion_raven","level":45,"maxHp":2200,"attack":128,"attackCooldown":"1.30 秒","category":"主動"},"beetle_matriarch":{"nameZh":"甲蟲母后","nameEn":"beetle_matriarch","level":45,"maxHp":15000,"attack":190,"attackCooldown":"1.80 秒","category":"精英"},"pit_serpent":{"nameZh":"坑底巨蛇","nameEn":"pit_serpent","level":45,"maxHp":60000,"attack":175,"attackCooldown":"1.40 秒","category":"精英"},"banner_guard":{"nameZh":"破旗衛兵","nameEn":"banner_guard","level":45,"maxHp":3400,"attack":135,"attackCooldown":"1.60 秒","category":"主動"},"banner_bodyguard":{"nameZh":"拉斯克親衛","nameEn":"banner_bodyguard","level":45,"maxHp":16000,"attack":210,"attackCooldown":"2.10 秒","category":"精英"},"rask_broken_banner":{"nameZh":"「破旗」拉斯克","nameEn":"rask_broken_banner","level":45,"maxHp":80000,"attack":185,"attackCooldown":"1.60 秒","category":"精英"},"lurelight":{"nameZh":"誘光者","nameEn":"lurelight","level":45,"maxHp":90000,"attack":180,"attackCooldown":"1.50 秒","category":"精英"},"chest_mimic_ancient":{"nameZh":"古老寶箱怪","nameEn":"chest_mimic_ancient","level":45,"maxHp":9600,"attack":185,"attackCooldown":"1.40 秒","category":"精英"},"cellar_boar":{"nameZh":"酒窖野豬","nameEn":"cellar_boar","level":45,"maxHp":2200,"attack":128,"attackCooldown":"2.20 秒","category":"主動"},"cellar_spider":{"nameZh":"酒窖蜘蛛","nameEn":"cellar_spider","level":48,"maxHp":2600,"attack":140,"attackCooldown":"1.80 秒","category":"主動"}};
  const CONFIG = {
    intervalMs: 1500,
    hpThreshold: 50,
    mpThreshold: 30,
    hpPotionItemKey: 'potion_hp',
    mpPotionItemKey: 'potion_mp',
    potionConditions: [],
    autoBuyEnabled: false,
    buyMessageType: 'buy',
    shopKey: '',
    engageRange: 260,
    extremeRanged: false,
    lootRange: 160,
    allowedMonsterTypes: [],
    allowedMonsterIds: [],
    allowedItemKeys: [],
    itemPolicies: {},
    combatMode: 'basic_then_skill',
    basicAttackFirst: true,
    skillConditions: [],
    ammoKey: 'arrow_training',
    ammoMinStock: 20,
    ammoBuyAmount: 100,
    autoAmmoBuyEnabled: false,
    autoStart: false
  };

  let attachedRoom = null;
  let economyRoom = null;
  let lastEconomyResult = null;
  let currentTargetId = null;
  let basicAttackDoneTargetId = null;
  let inventoryFull = false;
  let running = false;
  let timer = null;
  let lastHpPotionAt = 0;
  let lastMpPotionAt = 0;
  let lastEconomyLog = '';
  const lastBuyAt = {};
  const lastSkillAt = {};
  const logs = [];

  const finite = (value) => Number.isFinite(Number(value)) ? Number(value) : null;
  const nowText = () => new Date().toLocaleTimeString('zh-TW', { hour12: false });

  function log(message) {
    const line = `${nowText()} ${message}`;
    logs.push({ time: new Date().toISOString(), message });
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    console.info(`[WhisperIsle Integrated] ${message}`);
    renderLog();
  }

  function readCollection(collection, mapper) {
    if (!collection) return [];
    if (typeof collection.forEach === 'function') {
      const result = [];
      collection.forEach((value, id) => result.push(mapper(value, id)));
      return result.filter(Boolean);
    }
    if (Array.isArray(collection)) return collection.map((value, index) => mapper(value, value?.id ?? index)).filter(Boolean);
    if (typeof collection === 'object') return Object.entries(collection).map(([id, value]) => mapper(value, id)).filter(Boolean);
    return [];
  }

  function firstNumber(object, keys) {
    for (const key of keys) {
      const value = finite(object?.[key]);
      if (value !== null) return value;
    }
    return null;
  }

  function serializeMonster(value, id) {
    if (!value) return null;
    const typeKey = value.typeKey ?? value.monsterKey ?? value.key ?? value.kind ?? value.name ?? null;
    const catalog = MONSTER_CATALOG[typeKey] || {};
    return {
      id,
      x: finite(value.x),
      y: finite(value.y),
      mapId: value.mapId ?? null,
      hp: finite(value.hp),
      maxHp: finite(value.maxHp) ?? catalog.maxHp ?? null,
      typeKey,
      nameZh: value.nameZh ?? value.zhName ?? value.displayNameZh ?? value.name ?? catalog.nameZh ?? typeKey,
      nameEn: value.nameEn ?? value.enName ?? value.displayNameEn ?? catalog.nameEn ?? typeKey,
      level: firstNumber(value, ['level', 'lvl', 'monsterLevel']) ?? catalog.level ?? null,
      attack: firstNumber(value, ['attack', 'damage']) ?? catalog.attack ?? null,
      attackCooldown: value.attackCooldown ?? catalog.attackCooldown ?? null,
      category: value.category ?? catalog.category ?? null,
      alive: value.hp === undefined ? null : Number(value.hp) > 0
    };
  }

  function serializePlayer(value, id) {
    if (!value) return null;
    const inventoryItems = {};
    const itemMap = value.inventory?.items;
    if (itemMap && typeof itemMap.forEach === 'function') {
      itemMap.forEach((count, key) => { inventoryItems[key] = Number(count) || 0; });
    }
    return {
      id,
      x: finite(value.x),
      y: finite(value.y),
      mapId: value.mapId ?? null,
      hp: firstNumber(value, ['hp', 'health', 'currentHp', 'currentHealth']),
      maxHp: firstNumber(value, ['maxHp', 'maxHealth', 'healthMax']),
      mp: firstNumber(value.stats, ['mp', 'mana', 'currentMp', 'currentMana', 'energy', 'resource']) ?? firstNumber(value, ['mp', 'mana']),
      maxMp: firstNumber(value.stats, ['maxMp', 'maxMana', 'manaMax', 'maxEnergy', 'maxResource']) ?? firstNumber(value, ['maxMp', 'maxMana']),
      statsKeys: value.stats ? Object.keys(value.stats) : [],
      inventoryKeys: value.inventory ? Object.keys(value.inventory) : [],
      inventoryItems,
      inventoryItemTotal: Object.values(inventoryItems).reduce((sum, count) => sum + count, 0),
      inventoryCapacity: finite(value.inventory?.capacity),
      carry: value.carry ? { ...value.carry } : null
    };
  }

  function getRoomState(room = attachedRoom) {
    if (!room?.state) return null;
    const sessionId = room.sessionId ?? room.session?.id ?? null;
    const players = room.state.players;
    const rawPlayer = sessionId && typeof players?.get === 'function'
      ? players.get(sessionId)
      : Array.isArray(players) ? players[0] : null;
    const player = serializePlayer(rawPlayer, sessionId);
    const monsters = readCollection(room.state.monsters, serializeMonster);
    const items = readCollection(room.state.items ?? room.state.loot, (value, id) => ({
      id,
      x: finite(value?.x),
      y: finite(value?.y),
      mapId: value?.mapId ?? null,
      itemKey: value?.itemKey ?? null,
      nameZh: value?.nameZh ?? value?.zhName ?? value?.displayNameZh ?? value?.name ?? value?.itemKey ?? null,
      nameEn: value?.nameEn ?? value?.enName ?? value?.displayNameEn ?? value?.itemKey ?? value?.name ?? null,
      quantity: finite(value?.quantity)
    }));
    const candidates = player
      ? monsters
        .filter((monster) => monster.alive !== false && monster.mapId === player.mapId && monster.x !== null && monster.y !== null && Number(monster.hp) > 0)
        .filter((monster) => (CONFIG.allowedMonsterIds.length === 0 && CONFIG.allowedMonsterTypes.length === 0) || CONFIG.allowedMonsterIds.includes(String(monster.id)) || CONFIG.allowedMonsterTypes.includes(monster.typeKey))
        .map((monster) => ({ ...monster, distance: Math.hypot(monster.x - player.x, monster.y - player.y) }))
        .sort((a, b) => a.distance - b.distance)
      : [];
    return {
      observedAt: new Date().toISOString(),
      sessionId,
      player,
      playerKeys: rawPlayer ? Object.keys(rawPlayer) : [],
      monsters,
      target: candidates[0] ?? null,
      items,
      economyResult: lastEconomyResult,
      roomOpen: room.connection?.isOpen ?? room.connection?.readyState === 1
    };
  }

  function attach(room) {
    if (!room?.state) throw new Error('attach 需要含有 state 的 room');
    attachedRoom = room;
    if (economyRoom !== room && typeof room.onMessage === 'function') {
      economyRoom = room;
      room.onMessage('economyResult', (result) => {
        lastEconomyResult = result ?? null;
        const code = String(result?.code || result?.reason || result?.error || '').toLowerCase();
        if (code && code !== lastEconomyLog) {
          lastEconomyLog = code;
          log(`EconomyResult：${JSON.stringify(result)}`);
        }
      });
    }
    log('room 已掛接');
    renderPotionConditions();
    updateStatus();
    return getRoomState();
  }

  function send(type, payload) {
    if (!attachedRoom || typeof attachedRoom.send !== 'function') throw new Error('尚未 attach room');
    attachedRoom.send(type, payload);
    return true;
  }

  function attackMonster(monsterId, single = false) {
    return send('attack', { monsterId, single: Boolean(single) });
  }

  function castSkill(skillKey, target) {
    const targetPoint = { x: Number(target?.x), y: Number(target?.y) };
    send('castSkill', { skillKey, targetId: target?.id, targetPoint, aim: targetPoint });
    log(`CastSkill ${skillKey} → ${target?.id || '?'}`);
  }

  function moveTo(x, y) {
    return send('moveTo', { x: Number(x), y: Number(y) });
  }

  function pickUp(itemId) {
    return send('pickUp', { itemId });
  }

  function useConsumable(itemKey) {
    return send('useConsumable', { itemKey });
  }

  function buyItem(itemKey, amount = 1) {
    const payload = { itemKey, amount: Math.max(1, Number(amount) || 1) };
    if (CONFIG.shopKey) payload.shopKey = CONFIG.shopKey;
    send(CONFIG.buyMessageType || 'buy', payload);
    log(`購買封包：${CONFIG.buyMessageType || 'buy'} ${JSON.stringify(payload)}`);
  }

  function pressGameKey(key) {
    const value = String(key || '').trim();
    if (!value) return;
    const code = value.length === 1 ? `Key${value.toUpperCase()}` : value;
    const options = { key: value, code, bubbles: true, cancelable: true, composed: true };
    window.dispatchEvent(new KeyboardEvent('keydown', options));
    document.dispatchEvent(new KeyboardEvent('keydown', options));
    window.dispatchEvent(new KeyboardEvent('keyup', options));
    document.dispatchEvent(new KeyboardEvent('keyup', options));
  }

  function consumableOptions(resource, selectedKey) {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    const known = resource === 'hp'
      ? [{ key: 'potion_hp', label: '初級治癒藥水' }]
      : [{ key: 'potion_mp', label: '初級魔力藥水' }];
    const pattern = resource === 'hp' ? /(hp|health|heal|治癒|生命)/i : /(mp|mana|magic|魔力|法力)/i;
    Object.keys(inventory).filter((key) => pattern.test(key) && !known.some((item) => item.key === key)).forEach((key) => known.push({ key, label: key }));
    if (selectedKey && !known.some((item) => item.key === selectedKey)) known.push({ key: selectedKey, label: selectedKey });
    return known.map((item) => `<option value="${escapeHtml(item.key)}" ${item.key === selectedKey ? 'selected' : ''}>${escapeHtml(`${item.label} / ${item.key}${inventory[item.key] != null ? `（持有 ${inventory[item.key]}）` : ''}`)}</option>`).join('');
  }

  function ammoOptions(selectedKey) {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    const keys = Object.keys(inventory).filter((key) => /(arrow|ammo|bolt|矢)/i.test(key));
    if (!keys.includes('arrow_training')) keys.unshift('arrow_training');
    if (selectedKey && !keys.includes(selectedKey)) keys.unshift(selectedKey);
    return keys.map((key) => `<option value="${escapeHtml(key)}" ${key === selectedKey ? 'selected' : ''}>${escapeHtml(`${ITEM_LABELS[key] || key} / ${key}（持有 ${inventory[key] ?? 0}）`)}</option>`).join('');
  }

  function nearestItem(state) {
    const player = state?.player;
    if (!player) return null;
    return state.items
      .filter((item) => item.mapId === player.mapId && item.x !== null && item.y !== null)
      .filter((item) => CONFIG.allowedItemKeys.length === 0 || CONFIG.allowedItemKeys.includes(item.itemKey))
      .map((item) => ({ ...item, distance: Math.hypot(item.x - player.x, item.y - player.y) }))
      .sort((a, b) => a.distance - b.distance)[0] ?? null;
  }

  function economyIsFull(state) {
    const result = state?.economyResult || {};
    const code = String(result.code || result.reason || result.error || '').toLowerCase();
    return /overweight|capacity|inventory.?full|full/.test(code);
  }

  function consumeVitals(state) {
    const player = state?.player;
    if (!player) return;
    const now = Date.now();
    const hpPct = player.hp !== null && player.maxHp > 0 ? player.hp / player.maxHp * 100 : null;
    const mpPct = player.mp !== null && player.maxMp > 0 ? player.mp / player.maxMp * 100 : null;
    const conditions = CONFIG.potionConditions.length ? CONFIG.potionConditions : [
      { resource: 'hp', threshold: CONFIG.hpThreshold, itemKey: CONFIG.hpPotionItemKey, key: '', action: 'packet' },
      { resource: 'mp', threshold: CONFIG.mpThreshold, itemKey: CONFIG.mpPotionItemKey, key: '', action: 'packet' }
    ];
    conditions.forEach((condition) => {
      const owned = Number(state.player.inventoryItems?.[condition.itemKey] || 0);
      if (CONFIG.autoBuyEnabled && Number(condition.minStock) > 0 && owned < Number(condition.minStock)) {
        const buyKey = condition.itemKey;
        if (Date.now() - (lastBuyAt[buyKey] || 0) > 5000) {
          lastBuyAt[buyKey] = Date.now();
          buyItem(buyKey, condition.buyAmount || 1);
        }
      }
      const percentage = condition.resource === 'mp' ? mpPct : hpPct;
      if (percentage === null || percentage > Number(condition.threshold)) return;
      const lastAt = condition.resource === 'mp' ? lastMpPotionAt : lastHpPotionAt;
      if (now - lastAt <= 3000) return;
      if (condition.resource === 'mp') lastMpPotionAt = now; else lastHpPotionAt = now;
      useConsumable(condition.itemKey);
      log(`${condition.resource.toUpperCase()} ${percentage.toFixed(1)}%：UseConsumable ${condition.itemKey}`);
    });
  }

  function chooseSkill(state) {
    const mpPct = state.player?.mp !== null && state.player?.maxMp > 0 ? state.player.mp / state.player.maxMp * 100 : null;
    return CONFIG.skillConditions.find((condition) => {
      if (!condition.skillKey) return false;
      if (mpPct !== null && mpPct <= Number(condition.minMpPct || 0)) return false;
      const cooldownMs = Math.max(250, Number(condition.cooldownMs) || 1000);
      return Date.now() - (lastSkillAt[condition.skillKey] || 0) > cooldownMs;
    }) || null;
  }

  function battleTick() {
    if (!running) return;
    try {
      const state = getRoomState();
      if (!state?.player) {
        log('尚未取得 player；請在 breakpoint 執行 __whisperIsleIntegrated.attach(e.room)');
        return;
      }
      consumeVitals(state);
      const ammoOwned = Number(state.player.inventoryItems?.[CONFIG.ammoKey] || 0);
      if (CONFIG.autoAmmoBuyEnabled && CONFIG.ammoKey && ammoOwned < Number(CONFIG.ammoMinStock || 0)) {
        if (Date.now() - (lastBuyAt[CONFIG.ammoKey] || 0) > 5000) {
          lastBuyAt[CONFIG.ammoKey] = Date.now();
          buyItem(CONFIG.ammoKey, CONFIG.ammoBuyAmount || 1);
        }
      }
      if (economyIsFull(state)) {
        if (!inventoryFull) log('拾取失敗：背包超重或容量已滿，後續略過 PickUp');
        inventoryFull = true;
      }

      const current = currentTargetId ? state.monsters.find((monster) => monster.id === currentTargetId) : null;
      if (currentTargetId && (!current || Number(current.hp) <= 0)) {
        log(`目標 ${currentTargetId} 已死亡`);
        if (!inventoryFull) {
          const item = nearestItem(state);
          if (item) {
            if (item.distance > CONFIG.lootRange) {
              moveTo(item.x, item.y);
              log(`MoveTo 掉落物 ${item.id}，距離 ${item.distance.toFixed(0)}`);
            } else {
              pickUp(item.id);
              log(`PickUp 掉落物 ${item.id}`);
            }
            return;
          }
        } else {
          log('背包已滿，略過掉落物');
        }
        currentTargetId = null;
        basicAttackDoneTargetId = null;
      }

      if (!currentTargetId) {
        const target = state.target;
        if (!target) {
          log('沒有可攻擊的同地圖怪物');
          return;
        }
        currentTargetId = target.id;
        log(`選定目標 ${target.id}，HP ${target.hp}/${target.maxHp}，距離 ${Math.round(target.distance ?? 0)}`);
      }

      const target = state.monsters.find((monster) => monster.id === currentTargetId);
      if (!target || Number(target.hp) <= 0) return;
      const distance = Math.hypot(target.x - state.player.x, target.y - state.player.y);
      if (distance > CONFIG.engageRange && !CONFIG.extremeRanged) {
        moveTo(target.x, target.y);
        log(`MoveTo 目標 ${target.id}，距離 ${Math.round(distance)}`);
      } else {
        if (CONFIG.extremeRanged && distance > CONFIG.engageRange) log(`極限遠攻：不靠近 ${target.id}，距離 ${Math.round(distance)}`);
        if (CONFIG.combatMode === 'basic_then_skill' && CONFIG.basicAttackFirst && basicAttackDoneTargetId !== target.id) {
          attackMonster(target.id, false);
          basicAttackDoneTargetId = target.id;
          log(`先普攻 ${target.id}，HP ${target.hp}/${target.maxHp}`);
        } else {
          const skill = chooseSkill(state);
          if (skill) {
            lastSkillAt[skill.skillKey] = Date.now();
            castSkill(skill.skillKey, target);
          } else if (CONFIG.combatMode === 'basic_then_skill') {
            attackMonster(target.id, false);
            log(`Attack ${target.id}，HP ${target.hp}/${target.maxHp}`);
          } else {
            log(`只使用技能：目前沒有符合 MP > ${CONFIG.skillConditions.map((item) => item.minMpPct).join('／') || '?'}% 的技能`);
          }
        }
      }
      updateStatus(state);
    } catch (error) {
      log(`封包錯誤：${error.message}`);
    }
  }

  function start() {
    if (running) return;
    if (!attachedRoom) {
      log('無法開始：尚未 attach room');
      return;
    }
    running = true;
    log('戰鬥已開始：直接封包 Attack／MoveTo／PickUp／UseConsumable');
    battleTick();
    timer = window.setInterval(battleTick, CONFIG.intervalMs);
    updateStatus();
  }

  function stop() {
    running = false;
    if (timer) window.clearInterval(timer);
    timer = null;
    currentTargetId = null;
    basicAttackDoneTargetId = null;
    log('戰鬥已停止');
    updateStatus();
  }

  function clearLogs() {
    logs.length = 0;
    renderLog();
  }

  function exportLogs() {
    const text = [
      'Whisper Isle Integrated Combat Log',
      `Exported: ${new Date().toISOString()}`,
      `Count: ${logs.length}`,
      '',
      ...logs.map((entry, index) => `[${index + 1}] ${entry.time} ${entry.message}`)
    ].join('\n') + '\n';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whisperisle-combat-${new Date().toISOString().replace(/[.:]/g, '-')}.txt`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function updateStatus(state = getRoomState()) {
    const status = document.querySelector('#wi-integrated-status');
    if (!status) return;
    if (!attachedRoom || !state?.player) status.textContent = '未掛接 room；請先執行 attach(e.room)';
    else status.textContent = `${running ? '戰鬥中' : '已停止'}｜HP ${state.player.hp ?? '?'}／${state.player.maxHp ?? '?'}｜MP ${state.player.mp ?? '?'}／${state.player.maxMp ?? '?'}｜目標 ${currentTargetId || '無'}${inventoryFull ? '｜背包滿' : ''}`;
    if (document.querySelector('#wi-potion-conditions') && !running) renderPotionConditions();
  }

  function refreshRoomInfo() {
    const output = document.querySelector('#wi-room-info');
    const publicRoom = [globalThis.__whisperIsleRoom, globalThis.__room, globalThis.room, globalThis.gameRoom]
      .find((room) => room?.state?.monsters);
    if (!attachedRoom && publicRoom) {
      try { attach(publicRoom); } catch (error) { log(`Room 連接失敗：${error.message}`); }
    }
    const result = globalThis.__whisperIsleIntegrated.getState();
    if (output) output.textContent = JSON.stringify(result, null, 2);
    if (!result.ok) log('尚未取得 room；請在 breakpoint 執行 __whisperIsleIntegrated.attach(e.room)');
    else log(`Room 資訊已更新：怪物 ${result.state?.monsters?.length || 0} 隻，背包 ${result.state?.player?.inventoryItemTotal || 0} 件`);
    updateStatus(result.state);
    return result;
  }

  function renderLog() {
    const output = document.querySelector('#wi-integrated-log');
    if (output) {
      output.textContent = logs.slice(-80).map((entry) => `${new Date(entry.time).toLocaleTimeString('zh-TW', { hour12: false })} ${entry.message}`).join('\n') || '尚未運作';
      output.scrollTop = output.scrollHeight;
    }
  }

  function selectedValues(selector) {
    return [...document.querySelectorAll(`${selector}:checked`)].map((input) => input.value);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function renderFilterList(kind) {
    const state = getRoomState();
    const raw = kind === 'monster' ? (state?.monsters || []) : (state?.items || []);
    if (kind === 'monster') {
      const container = document.querySelector('#wi-monster-list');
      if (!container) return;
      const selected = CONFIG.allowedMonsterIds;
      const search = (document.querySelector('#wi-monster-search')?.value || '').toLowerCase();
      const rows = raw.filter((monster) => `${monster.id} ${monster.typeKey} ${monster.nameZh || ''} ${monster.nameEn || ''} ${monster.category || ''}`.toLowerCase().includes(search));
      rows.sort((a, b) => Number(selected.includes(String(b.id))) - Number(selected.includes(String(a.id))) || String(a.nameZh || a.typeKey).localeCompare(String(b.nameZh || b.typeKey)));
      container.innerHTML = `<div class="wi-grid wi-monster-grid"><div class="wi-grid-head"><span>指定</span><span>怪物</span><span>Lv</span><span>HP</span><span>距離</span><span>展開</span></div>${rows.map((monster) => {
        const id = String(monster.id);
        const checked = selected.length === 0 || selected.includes(id);
        const distance = state?.player && monster.x !== null && monster.y !== null ? Math.hypot(monster.x - state.player.x, monster.y - state.player.y).toFixed(0) : '?';
        const detail = `位置 (${monster.x ?? '?'}, ${monster.y ?? '?'})｜類型 ${monster.category || '?'}｜攻擊 ${monster.attack ?? '?'}｜攻擊冷卻 ${monster.attackCooldown || '?'}`;
        return `<div class="wi-grid-row ${checked ? 'selected' : ''}" data-monster-id="${escapeHtml(id)}"><input class="wi-monster-pick" type="checkbox" value="${escapeHtml(id)}" ${checked ? 'checked' : ''}><span>${escapeHtml(`${monster.nameZh || monster.typeKey} / ${monster.nameEn || monster.typeKey}`)}</span><span>${monster.level ?? '?'}</span><span>${monster.hp ?? '?'}/${monster.maxHp ?? '?'}</span><span>${distance}</span><button class="wi-expand" type="button">＋</button><div class="wi-grid-detail" hidden>${escapeHtml(detail)}</div></div>`;
      }).join('') || '<span class="wi-empty">目前尚未觀測到怪物，請先連接 Room 並刷新</span>'}</div>`;
      container.querySelectorAll('.wi-monster-pick').forEach((input) => input.addEventListener('change', () => {
        const id = String(input.value);
        const ids = new Set(CONFIG.allowedMonsterIds.map(String));
        if (input.checked) ids.add(id); else ids.delete(id);
        const all = [...container.querySelectorAll('.wi-monster-pick')].map((box) => String(box.value));
        CONFIG.allowedMonsterIds = ids.size === all.length ? [] : [...ids];
        input.closest('.wi-grid-row')?.classList.toggle('selected', input.checked);
        localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      }));
      container.querySelectorAll('.wi-expand').forEach((button) => button.addEventListener('click', () => {
        const detail = button.closest('.wi-grid-row')?.querySelector('.wi-grid-detail');
        if (detail) { detail.hidden = !detail.hidden; button.textContent = detail.hidden ? '＋' : '－'; }
      }));
      return;
    }
    const byKey = new Map();
    raw.forEach((entry) => {
      const key = kind === 'monster' ? entry.typeKey : entry.itemKey;
      if (key && !byKey.has(key)) byKey.set(key, entry);
    });
    const values = [...byKey.entries()].map(([key, entry]) => ({ key, entry }));
    const selected = kind === 'monster' ? CONFIG.allowedMonsterTypes : CONFIG.allowedItemKeys;
    const search = (document.querySelector(`#wi-${kind}-search`)?.value || '').toLowerCase();
    const container = document.querySelector(`#wi-${kind}-list`);
    if (!container) return;
    values.sort((a, b) => Number(selected.includes(b.key)) - Number(selected.includes(a.key)) || a.key.localeCompare(b.key));
    container.innerHTML = values.filter(({ key, entry }) => {
      const text = `${key} ${entry.nameZh || ''} ${entry.nameEn || ''}`.toLowerCase();
      return text.includes(search);
    }).map(({ key, entry }) => {
      const checked = selected.length === 0 || selected.includes(key);
      const title = kind === 'monster'
        ? `${entry.nameZh || key} / ${entry.nameEn || key}`
        : `${entry.nameZh || ITEM_LABELS[key] || key} / ${entry.nameEn || key}`;
      const detail = kind === 'monster'
        ? `Lv ${entry.level ?? '?'}｜HP ${entry.hp ?? '?'}/${entry.maxHp ?? '?'}｜${entry.category || '?'}｜攻擊 ${entry.attack ?? '?'}`
        : `itemKey: ${key}${entry.quantity != null ? `｜數量 ${entry.quantity}` : ''}`;
      const policy = kind === 'item' ? (CONFIG.itemPolicies[key] || 'keep') : '';
      const policySelect = kind === 'item' ? `<select class="wi-item-policy" data-item-key="${escapeHtml(key)}"><option value="keep" ${policy === 'keep' ? 'selected' : ''}>保留</option><option value="sell" ${policy === 'sell' ? 'selected' : ''}>賣出</option><option value="deposit" ${policy === 'deposit' ? 'selected' : ''}>存倉</option></select>` : '';
      return `<label class="wi-check ${checked ? 'selected' : ''}"><input type="checkbox" data-filter-kind="${kind}" value="${escapeHtml(key)}" ${checked ? 'checked' : ''}> <span>${escapeHtml(title)}</span><small>${escapeHtml(detail)}</small>${policySelect}</label>`;
    }).join('') || '<span class="wi-empty">目前尚未觀測到資料，請先掛接 room 並刷新</span>';
    container.querySelectorAll('input').forEach((input) => input.addEventListener('change', () => {
      input.closest('.wi-check')?.classList.toggle('selected', input.checked);
      const valuesNow = [...container.querySelectorAll('input:checked')].map((checkbox) => checkbox.value);
      const all = [...container.querySelectorAll('input')].map((checkbox) => checkbox.value);
      if (kind === 'monster') CONFIG.allowedMonsterTypes = valuesNow.length === all.length ? [] : valuesNow;
      else CONFIG.allowedItemKeys = valuesNow.length === all.length ? [] : valuesNow;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      renderFilterList(kind);
    }));
    container.querySelectorAll('.wi-item-policy').forEach((select) => select.addEventListener('change', (event) => {
      event.stopPropagation();
      CONFIG.itemPolicies[select.dataset.itemKey] = select.value;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    }));
  }

  function renderFilters() {
    const targetSelect = document.querySelector('#wi-target-select');
    const state = getRoomState();
    if (targetSelect) {
      const selected = CONFIG.allowedMonsterIds;
      const monsters = [...new Map((state?.monsters || []).map((monster) => [monster.id, monster])).values()]
        .filter((monster) => !selected.length || selected.includes(String(monster.id)))
        .sort((a, b) => Number(selected.includes(b.typeKey)) - Number(selected.includes(a.typeKey)) || String(a.nameZh || a.typeKey).localeCompare(String(b.nameZh || b.typeKey)));
      targetSelect.innerHTML = monsters.map((monster) => `<option>${escapeHtml(`${monster.nameZh || monster.typeKey} / ${monster.nameEn || monster.typeKey}｜Lv ${monster.level ?? '?'}｜HP ${monster.hp ?? '?'}/${monster.maxHp ?? '?'}｜距離 ${state?.player ? Math.hypot(monster.x - state.player.x, monster.y - state.player.y).toFixed(0) : '?'}｜${monster.category || '?'}`)}</option>`).join('') || '<option>尚未偵測到怪物</option>';
    }
    renderFilterList('monster');
    renderFilterList('item');
  }

  function renderPotionConditions() {
    const container = document.querySelector('#wi-potion-conditions');
    if (!container) return;
    container.innerHTML = CONFIG.potionConditions.map((condition, index) => `
      <div class="wi-condition" data-condition-index="${index}">
        <select class="wi-condition-resource"><option value="hp" ${condition.resource === 'hp' ? 'selected' : ''}>HP</option><option value="mp" ${condition.resource === 'mp' ? 'selected' : ''}>MP</option></select>
        <span>低於</span><input class="wi-condition-threshold" type="number" min="1" max="100" value="${Number(condition.threshold) || 50}"><span>%</span>
        <select class="wi-condition-item" aria-label="消耗品 itemKey">${consumableOptions(condition.resource, condition.itemKey)}</select>
        <input class="wi-condition-min" type="number" min="0" title="最低庫存" placeholder="最低" value="${Number(condition.minStock) || 0}">
        <input class="wi-condition-buy" type="number" min="1" title="每次購買數量" placeholder="購買數" value="${Number(condition.buyAmount) || 1}">
        <button class="wi-btn wi-condition-remove" type="button">刪</button>
      </div>
    `).join('') || '<div class="wi-empty">尚未新增條件</div>';
    container.querySelectorAll('.wi-condition-remove').forEach((button) => button.onclick = () => {
      const index = Number(button.closest('.wi-condition').dataset.conditionIndex);
      CONFIG.potionConditions.splice(index, 1);
      renderPotionConditions();
    });
  }

  function readPotionConditions() {
    const rows = [...document.querySelectorAll('.wi-condition')];
    CONFIG.potionConditions = rows.map((row) => ({
      resource: row.querySelector('.wi-condition-resource').value,
      threshold: Math.max(1, Math.min(100, Number(row.querySelector('.wi-condition-threshold').value) || 50)),
      itemKey: row.querySelector('.wi-condition-item').value,
      minStock: Math.max(0, Number(row.querySelector('.wi-condition-min').value) || 0),
      buyAmount: Math.max(1, Number(row.querySelector('.wi-condition-buy').value) || 1),
      key: '',
      action: 'packet'
    })).filter((condition) => condition.itemKey);
  }

  function renderSkillConditions() {
    const container = document.querySelector('#wi-skill-conditions');
    if (!container) return;
    container.innerHTML = CONFIG.skillConditions.map((condition, index) => `
      <div class="wi-condition" data-skill-index="${index}">
        <input class="wi-skill-key" placeholder="skillKey" value="${escapeHtml(condition.skillKey || '')}">
        <span>MP &gt;</span><input class="wi-skill-mp" type="number" min="0" max="100" value="${Number(condition.minMpPct) || 0}"><span>%</span><span>冷卻ms</span><input class="wi-skill-cooldown" type="number" min="250" value="${Number(condition.cooldownMs) || 1000}">
        <button class="wi-btn wi-skill-remove" type="button">刪</button>
      </div>
    `).join('') || '<div class="wi-empty">尚未新增技能條件</div>';
    container.querySelectorAll('.wi-skill-remove').forEach((button) => button.onclick = () => {
      CONFIG.skillConditions.splice(Number(button.closest('.wi-condition').dataset.skillIndex), 1);
      renderSkillConditions();
    });
  }

  function readSkillConditions() {
    CONFIG.skillConditions = [...document.querySelectorAll('#wi-skill-conditions .wi-condition')].map((row) => ({
      skillKey: row.querySelector('.wi-skill-key').value.trim(),
      minMpPct: Math.max(0, Math.min(100, Number(row.querySelector('.wi-skill-mp').value) || 0)),
      cooldownMs: Math.max(250, Number(row.querySelector('.wi-skill-cooldown').value) || 1000)
    })).filter((condition) => condition.skillKey);
  }

  function addUI() {
    if (document.querySelector('#wi-integrated-panel')) return;
    const style = document.createElement('style');
    style.textContent = `
      #wi-integrated-panel{position:fixed;right:16px;bottom:16px;z-index:2147483647;width:50px;height:50px;color:#e5e7eb;background:#111827;border:1px solid #64748b;border-radius:10px;box-shadow:0 8px 24px #0008;font:13px/1.4 system-ui,sans-serif;overflow:hidden;transition:width .15s,height .15s}
      #wi-integrated-panel.wi-open{width:430px;height:560px;border-radius:12px;overflow:hidden}
      #wi-integrated-panel *{box-sizing:border-box}.wi-icon{width:50px;height:50px;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;font-size:22px;background:#1e293b}.wi-icon:active{cursor:grabbing}.wi-open .wi-icon{display:none}
      #wi-integrated-head{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:#1e293b;font-weight:700}#wi-integrated-body{padding:10px;height:508px;overflow:auto}
      #wi-integrated-status{margin-bottom:8px;color:#93c5fd;font-size:12px}.wi-tabs{display:flex;gap:4px;margin-bottom:8px}.wi-tab-select{width:100%;padding:7px;color:#fff;background:#0f172a;border:1px solid #64748b;border-radius:6px}.wi-page[hidden]{display:none}.wi-row{display:flex;gap:6px;align-items:center;margin:6px 0}.wi-row label{flex:1}.wi-row input{width:78px;padding:4px;color:#e5e7eb;background:#0f172a;border:1px solid #475569;border-radius:5px}.wi-row input.wide{width:125px}.wi-btn{padding:6px 9px;color:#fff;background:#334155;border:1px solid #64748b;border-radius:6px;cursor:pointer}.wi-btn:hover{background:#475569}.wi-btn.green{background:#166534}.wi-btn.red{background:#991b1b}.wi-actions{display:flex;gap:6px;margin:8px 0}.wi-actions .wi-btn{flex:1}.wi-title{margin:8px 0 4px;color:#fbbf24;font-weight:700}.wi-note{color:#94a3b8;font-size:11px}.wi-log{height:190px;margin:6px 0 0;padding:7px;overflow:auto;white-space:pre-wrap;background:#020617;border:1px solid #334155;border-radius:6px;font:11px/1.35 ui-monospace,monospace}.wi-search{width:100%!important;margin:4px 0}.wi-list{height:170px;overflow:auto;padding:5px;background:#020617;border:1px solid #334155;border-radius:6px}.wi-check{display:flex;gap:5px;align-items:center;padding:4px;border-bottom:1px solid #1e293b;cursor:pointer}.wi-check input{width:auto}.wi-check.selected{order:-1;background:#172554}.wi-check small{color:#94a3b8;margin-left:auto}.wi-empty{color:#94a3b8;font-size:11px}.wi-condition{display:flex;gap:4px;align-items:center;flex-wrap:wrap;padding:6px;margin:5px 0;background:#020617;border:1px solid #334155;border-radius:6px}.wi-condition select,.wi-condition input{min-width:0;padding:4px;color:#e5e7eb;background:#0f172a;border:1px solid #475569;border-radius:4px}.wi-condition-threshold{width:48px}.wi-condition-item{width:105px}.wi-condition-key{width:55px}.wi-condition-action{width:70px}.wi-condition-remove{padding:4px 6px}.wi-grid{display:grid;grid-template-columns:32px minmax(130px,1fr) 35px 75px 55px 30px;gap:3px;align-items:center;font-size:11px}.wi-grid-head{display:contents;color:#fbbf24;font-weight:700}.wi-grid-head>*{padding:4px;background:#1e293b}.wi-grid-row{display:contents}.wi-grid-row>*{padding:4px;border-bottom:1px solid #1e293b;background:#020617}.wi-grid-row.selected>*{background:#172554}.wi-grid-detail{grid-column:1/-1!important;color:#94a3b8;font-size:10px!important;padding:5px 8px!important}.wi-expand{padding:1px 4px;color:#fff;background:#334155;border:1px solid #64748b;border-radius:3px}
    `;
    document.head.appendChild(style);
    const panel = document.createElement('section');
    panel.id = 'wi-integrated-panel';
    panel.innerHTML = `
      <div class="wi-icon" title="開啟 Whisper Isle 戰鬥控制">⚔</div>
      <div id="wi-integrated-head"><span>Whisper Isle 戰鬥 v${VERSION}</span><button id="wi-hide" class="wi-btn">×</button></div>
      <div id="wi-integrated-body">
        <div id="wi-integrated-status">讀取中…</div>
        <div class="wi-tabs"><select id="wi-page-select" class="wi-tab-select" aria-label="功能分頁"><option value="afk">開始掛機</option><option value="combat">戰鬥設定</option><option value="filters">怪物設定</option></select></div>
        <div id="wi-page-afk" class="wi-page">
          <div class="wi-actions"><button id="wi-start" class="wi-btn green">開始戰鬥</button><button id="wi-stop" class="wi-btn red">停止</button></div>
          <div class="wi-actions"><button id="wi-room-connect" class="wi-btn">連接 Room／讀取資訊</button></div>
          <pre id="wi-room-info" class="wi-log" style="height:150px">尚未讀取 Room 資訊</pre>
          <div class="wi-note">開始掛機後會依照「戰鬥設定」、「喝水設定」及「怪物設定」自動執行。</div>
          <pre id="wi-integrated-log" class="wi-log">尚未運作</pre>
        </div>
        <div id="wi-page-combat" class="wi-page" hidden>
          <div class="wi-title">戰鬥設定</div>
          <div class="wi-row"><label>攻擊距離 <input id="wi-engage-range" type="number" min="1"></label><label>拾取距離 <input id="wi-loot-range" type="number" min="1"></label></div>
          <div class="wi-title">箭矢設定</div>
          <div class="wi-row"><label>箭矢 <select id="wi-ammo-key">${ammoOptions(CONFIG.ammoKey)}</select></label><label><input id="wi-auto-ammo" type="checkbox"> 自動補箭</label></div>
          <div class="wi-row"><label>少於 <input id="wi-ammo-min" type="number" min="0"></label><label>自動買 <input id="wi-ammo-buy" type="number" min="1"></label></div>
          <div class="wi-row"><label>戰鬥模式 <select id="wi-combat-mode"><option value="basic_then_skill">普攻／技能</option><option value="skills_only">只使用技能</option></select></label><label><input id="wi-basic-first" type="checkbox"> 先普攻</label></div>
          <div class="wi-row"><label><input id="wi-extreme-ranged" type="checkbox"> 極限遠攻（不靠近怪物）</label></div>
          <div class="wi-title">技能條件（依序判斷）</div>
          <div class="wi-note">只有 MP 高於設定百分比且技能不在冷卻中才會送出 CastSkill；技能冷卻以每個條件的毫秒數限制，伺服器仍會做最終驗證。</div>
          <div id="wi-skill-conditions"></div>
          <div class="wi-actions"><button id="wi-add-skill" class="wi-btn">＋新增技能條件</button></div>
          <div class="wi-title">喝水設定（HP／MP 分開）</div>
          <div class="wi-note">每筆條件會依 HP／MP 門檻，直接送出 UseConsumable 封包；道具從背包可辨識的 HP／MP 藥水中選擇。</div>
          <div id="wi-potion-conditions"></div>
          <div class="wi-actions"><button id="wi-add-condition" class="wi-btn">＋新增條件</button></div>
          <div class="wi-title">自動買水／補貨</div>
          <div class="wi-row"><label><input id="wi-auto-buy" type="checkbox"> 啟用自動補貨</label></div>
          <div class="wi-row"><label>購買訊息 <input id="wi-buy-type" class="wide" type="text" value="buy"></label><label>商店 Key <input id="wi-shop-key" class="wide" type="text" placeholder="可留空"></label></div>
          <div class="wi-note">當條件的持有數量低於「最低庫存」時，發送 { itemKey, amount }。需先進入商店；購買訊息名稱目前預設為 buy，若伺服器回傳錯誤請先停用自動補貨。</div>
          <div class="wi-actions"><button id="wi-save-combat" class="wi-btn">儲存戰鬥設定</button><button id="wi-clear" class="wi-btn">清除 Log</button><button id="wi-export" class="wi-btn">匯出 TXT</button></div>
          <div class="wi-note">喝水固定使用封包：UseConsumable。首次使用若 room 在 closure，請在 breakpoint 執行 __whisperIsleIntegrated.attach(e.room)。</div>
        </div>
        <div id="wi-page-filters" class="wi-page" hidden>
          <div class="wi-title">只攻擊勾選的怪物</div>
          <div class="wi-note">未勾選任何怪物＝攻擊全部；勾選後可單獨指定目前怪物 ID。點擊「＋」可展開距離、座標、分類與攻擊冷卻。</div>
          <select id="wi-target-select" class="wi-search" size="3" aria-label="目前怪物資訊"><option>尚未偵測到怪物</option></select>
          <input id="wi-monster-search" class="wi-search" placeholder="搜尋怪物中文／English／類型">
          <div class="wi-actions"><button id="wi-monster-all" class="wi-btn">全選</button><button id="wi-monster-none" class="wi-btn">取消全選</button><button id="wi-refresh-filters" class="wi-btn">刷新</button></div>
          <div id="wi-monster-list" class="wi-list" style="height:260px"></div>
          <div class="wi-title">只拾取勾選的物品</div>
          <div class="wi-note">未勾選任何物品＝拾取全部。勾選項目會置頂；每件物品可設定保留、賣出或存倉。</div>
          <input id="wi-item-search" class="wi-search" placeholder="搜尋物品中文／English／itemKey">
          <div class="wi-actions"><button id="wi-item-all" class="wi-btn">全選</button><button id="wi-item-none" class="wi-btn">取消全選</button></div>
          <div id="wi-item-list" class="wi-list"></div>
        </div>
      </div>`;
    document.body.appendChild(panel);
    const saved = JSON.parse(localStorage.getItem('wi-integrated-config') || 'null');
    if (saved) Object.assign(CONFIG, saved);
    if (!Array.isArray(CONFIG.allowedMonsterIds)) CONFIG.allowedMonsterIds = [];
    if (!Array.isArray(CONFIG.potionConditions)) CONFIG.potionConditions = [
      { resource: 'hp', threshold: CONFIG.hpThreshold, itemKey: CONFIG.hpPotionItemKey, key: '', action: 'packet' },
      { resource: 'mp', threshold: CONFIG.mpThreshold, itemKey: CONFIG.mpPotionItemKey, key: '', action: 'packet' }
    ];
    if (!Array.isArray(CONFIG.skillConditions)) CONFIG.skillConditions = [];
    const setValue = (id, value) => { document.querySelector(id).value = value; };
    setValue('#wi-engage-range', CONFIG.engageRange); setValue('#wi-loot-range', CONFIG.lootRange);
    document.querySelector('#wi-ammo-key').value = CONFIG.ammoKey || 'arrow_training';
    document.querySelector('#wi-auto-ammo').checked = Boolean(CONFIG.autoAmmoBuyEnabled);
    document.querySelector('#wi-ammo-min').value = Number(CONFIG.ammoMinStock) || 20;
    document.querySelector('#wi-ammo-buy').value = Number(CONFIG.ammoBuyAmount) || 100;
    document.querySelector('#wi-combat-mode').value = CONFIG.combatMode || 'basic_then_skill';
    document.querySelector('#wi-basic-first').checked = CONFIG.basicAttackFirst !== false;
    document.querySelector('#wi-extreme-ranged').checked = Boolean(CONFIG.extremeRanged);
    document.querySelector('#wi-auto-buy').checked = Boolean(CONFIG.autoBuyEnabled);
    document.querySelector('#wi-buy-type').value = CONFIG.buyMessageType || 'buy';
    document.querySelector('#wi-shop-key').value = CONFIG.shopKey || '';
    const dragHandle = panel.querySelector('.wi-icon');
    let dragging = false;
    let moved = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    dragHandle.onclick = () => { if (moved) { moved = false; return; } panel.classList.add('wi-open'); };
    dragHandle.onpointerdown = (event) => {
      const rect = panel.getBoundingClientRect();
      dragging = true;
      moved = false;
      dragOffsetX = event.clientX - rect.left;
      dragOffsetY = event.clientY - rect.top;
      panel.style.left = `${rect.left}px`;
      panel.style.top = `${rect.top}px`;
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      dragHandle.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };
    dragHandle.onpointermove = (event) => {
      if (!dragging) return;
      const nextLeft = Math.max(0, Math.min(window.innerWidth - 50, event.clientX - dragOffsetX));
      const nextTop = Math.max(0, Math.min(window.innerHeight - 50, event.clientY - dragOffsetY));
      if (Math.abs(nextLeft - parseFloat(panel.style.left)) > 2 || Math.abs(nextTop - parseFloat(panel.style.top)) > 2) moved = true;
      panel.style.left = `${nextLeft}px`;
      panel.style.top = `${nextTop}px`;
    };
    dragHandle.onpointerup = (event) => {
      dragging = false;
      dragHandle.releasePointerCapture?.(event.pointerId);
    };
    const dragBar = panel.querySelector('#wi-integrated-head');
    dragBar.style.cursor = 'move';
    dragBar.style.userSelect = 'none';
    dragBar.onpointerdown = (event) => {
      if (event.target.closest('button')) return;
      const rect = panel.getBoundingClientRect();
      dragging = true;
      moved = false;
      dragOffsetX = event.clientX - rect.left;
      dragOffsetY = event.clientY - rect.top;
      panel.style.left = `${rect.left}px`;
      panel.style.top = `${rect.top}px`;
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      dragBar.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };
    dragBar.onpointermove = (event) => {
      if (!dragging) return;
      const width = panel.getBoundingClientRect().width;
      const height = panel.getBoundingClientRect().height;
      const nextLeft = Math.max(0, Math.min(window.innerWidth - width, event.clientX - dragOffsetX));
      const nextTop = Math.max(0, Math.min(window.innerHeight - height, event.clientY - dragOffsetY));
      if (Math.abs(nextLeft - parseFloat(panel.style.left)) > 2 || Math.abs(nextTop - parseFloat(panel.style.top)) > 2) moved = true;
      panel.style.left = `${nextLeft}px`;
      panel.style.top = `${nextTop}px`;
    };
    dragBar.onpointerup = (event) => {
      dragging = false;
      dragBar.releasePointerCapture?.(event.pointerId);
    };
    document.querySelector('#wi-hide').onclick = () => { panel.classList.remove('wi-open'); };
    document.querySelector('#wi-start').onclick = start; document.querySelector('#wi-stop').onclick = stop;
    document.querySelector('#wi-room-connect').onclick = refreshRoomInfo;
    document.querySelector('#wi-clear').onclick = clearLogs; document.querySelector('#wi-export').onclick = exportLogs;
    const saveSettings = () => {
      readSkillConditions();
      readPotionConditions();
      const hpCondition = CONFIG.potionConditions.find((condition) => condition.resource === 'hp');
      const mpCondition = CONFIG.potionConditions.find((condition) => condition.resource === 'mp');
      if (hpCondition) { CONFIG.hpThreshold = hpCondition.threshold; CONFIG.hpPotionItemKey = hpCondition.itemKey; }
      if (mpCondition) { CONFIG.mpThreshold = mpCondition.threshold; CONFIG.mpPotionItemKey = mpCondition.itemKey; }
      CONFIG.engageRange = Math.max(1, Number(document.querySelector('#wi-engage-range').value) || 260); CONFIG.lootRange = Math.max(1, Number(document.querySelector('#wi-loot-range').value) || 160);
      CONFIG.ammoKey = document.querySelector('#wi-ammo-key').value;
      CONFIG.autoAmmoBuyEnabled = document.querySelector('#wi-auto-ammo').checked;
      CONFIG.ammoMinStock = Math.max(0, Number(document.querySelector('#wi-ammo-min').value) || 0);
      CONFIG.ammoBuyAmount = Math.max(1, Number(document.querySelector('#wi-ammo-buy').value) || 1);
      CONFIG.combatMode = document.querySelector('#wi-combat-mode').value;
      CONFIG.basicAttackFirst = document.querySelector('#wi-basic-first').checked;
      CONFIG.extremeRanged = document.querySelector('#wi-extreme-ranged').checked;
      CONFIG.autoBuyEnabled = document.querySelector('#wi-auto-buy').checked;
      CONFIG.buyMessageType = document.querySelector('#wi-buy-type').value.trim() || 'buy';
      CONFIG.shopKey = document.querySelector('#wi-shop-key').value.trim();
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); log('設定已儲存');
    };
    document.querySelector('#wi-add-condition').onclick = () => {
      CONFIG.potionConditions.push({ resource: 'hp', threshold: 50, itemKey: '', key: '', action: 'packet' });
      renderPotionConditions();
    };
    document.querySelector('#wi-add-skill').onclick = () => {
      CONFIG.skillConditions.push({ skillKey: '', minMpPct: 0 });
      renderSkillConditions();
    };
    document.querySelector('#wi-save-combat').onclick = saveSettings;
    document.querySelector('#wi-page-select').onchange = (event) => {
      const pageName = event.target.value;
      document.querySelectorAll('.wi-page').forEach((page) => { page.hidden = page.id !== `wi-page-${pageName}`; });
      if (pageName === 'filters') renderFilters();
    };
    document.querySelector('#wi-monster-search').oninput = () => renderFilterList('monster'); document.querySelector('#wi-item-search').oninput = () => renderFilterList('item');
    document.querySelector('#wi-refresh-filters').onclick = renderFilters;
    document.querySelector('#wi-monster-all').onclick = () => { CONFIG.allowedMonsterIds = []; CONFIG.allowedMonsterTypes = []; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('monster'); };
    document.querySelector('#wi-monster-none').onclick = () => { CONFIG.allowedMonsterIds = ['__NONE__']; CONFIG.allowedMonsterTypes = ['__NONE__']; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('monster'); };
    document.querySelector('#wi-item-all').onclick = () => { CONFIG.allowedItemKeys = []; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('item'); };
    document.querySelector('#wi-item-none').onclick = () => { CONFIG.allowedItemKeys = ['__NONE__']; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('item'); };
    renderSkillConditions(); renderPotionConditions(); renderLog(); updateStatus(); renderFilters();
  }
  globalThis.__whisperIsleIntegrated = {
    version: VERSION,
    attach,
    getRoom: () => attachedRoom,
    getState: () => {
      if (!attachedRoom) return { ok: false, error: 'room 尚未掛接', state: null };
      return { ok: true, state: getRoomState() };
    },
    attackMonster,
    castSkill,
    moveTo,
    pickUp,
    useConsumable,
    start,
    stop,
    buyItem,
    status: () => ({ running, currentTargetId, inventoryFull, state: getRoomState(), config: { ...CONFIG } }),
    getLastEconomyResult: () => lastEconomyResult,
    logs
  };
  // 相容舊版指令，避免既有 breakpoint 指令失效。
  globalThis.__whisperIsleBot = globalThis.__whisperIsleIntegrated;

  const autoAttachTimer = window.setInterval(() => {
    if (!attachedRoom) {
      const candidate = [globalThis.__whisperIsleRoom, globalThis.__room, globalThis.room, globalThis.gameRoom]
        .find((room) => room?.state?.monsters);
      if (candidate) { try { attach(candidate); } catch (_) {} }
    }
  }, 1000);
  window.addEventListener('pagehide', () => window.clearInterval(autoAttachTimer), { once: true });
  window.addEventListener('DOMContentLoaded', addUI, { once: true });
  if (document.readyState !== 'loading') addUI();
})();
