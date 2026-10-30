// ==UserScript==
// @name         Whisper Isle Integrated Combat Test
// @namespace    https://whisperisle.app/
// @version      2.11.31
// @description  Monster grid selection, expandable distance data and extreme ranged combat settings.
// @match        https://whisperisle.app/play*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const VERSION = '2.11.31';
  const ITEM_LABELS = {
    potion_hp: '初級治癒藥水',
    potion_mp: '初級魔力藥水',
    potion_hp_medium: '中級治療藥水',
    potion_mp_medium: '中級魔力藥水',
    potion_mana_regen: '魔力回復藥水',
    potion_mana_regen_medium: '中級魔力回復藥水',
    arrow_training: '訓練箭（木箭）',
    arrow_iron: '鐵箭',
    arrow_bodkin: 'Bodkin 箭（穿甲）',
    arrow_broadhead: 'Broadhead 箭（寬刃）',
    arrow_pitch: 'Pitch 箭（瀝青）',
    arrow_silver: '銀箭',
    light_torch: '火把',
    pouch_burial: '埋葬袋',
    scroll_return: '歸途卷軸'
  };
  const AMMO_CATALOG = [
    { key: 'arrow_training', label: '訓練箭（木箭）' },
    { key: 'arrow_iron', label: '鐵箭' },
    { key: 'arrow_bodkin', label: 'Bodkin 箭（穿甲）' },
    { key: 'arrow_broadhead', label: 'Broadhead 箭（寬刃）' },
    { key: 'arrow_pitch', label: 'Pitch 箭（瀝青）' },
    { key: 'arrow_silver', label: '銀箭' }
  ];
  const MONSTER_CATALOG = {"cape_hound":{"nameZh":"岬角野犬","nameEn":"cape_hound","level":1,"maxHp":22,"attack":4,"attackCooldown":"1.40 秒","category":"群聚"},"shapeshifter_captive_wolf":{"nameZh":"被鐵鏈拴著的狼人","nameEn":"shapeshifter_captive_wolf","level":1,"maxHp":42,"attack":5,"attackCooldown":"1.80 秒","category":"主動"},"shapeshifter_bandit":{"nameZh":"藏身處強盜","nameEn":"shapeshifter_bandit","level":1,"maxHp":76,"attack":3,"attackCooldown":"1.70 秒","category":"主動"},"wolf":{"nameZh":"野狼","nameEn":"wolf","level":2,"maxHp":30,"attack":6,"attackCooldown":"1.40 秒","category":"群聚"},"moon_rabbit":{"nameZh":"月兔","nameEn":"moon_rabbit","level":2,"maxHp":40,"attack":4,"attackCooldown":"1.60 秒","category":"被動"},"halloween_pumpkin":{"nameZh":"迷路的南瓜","nameEn":"halloween_pumpkin","level":3,"maxHp":65,"attack":4,"attackCooldown":"1.80 秒","category":"被動"},"wreck_scavenger":{"nameZh":"擱淺拾荒者","nameEn":"wreck_scavenger","level":4,"maxHp":56,"attack":8,"attackCooldown":"1.50 秒","category":"主動"},"wild_bull":{"nameZh":"野牛","nameEn":"wild_bull","level":5,"maxHp":84,"attack":14,"attackCooldown":"1.50 秒","category":"主動"},"skeleton_caster":{"nameZh":"枯骨咒師","nameEn":"skeleton_caster","level":7,"maxHp":120,"attack":22,"attackCooldown":"2.40 秒","category":"主動"},"wolf_alpha":{"nameZh":"頭狼","nameEn":"wolf_alpha","level":8,"maxHp":90,"attack":10,"attackCooldown":"1.30 秒","category":"精英"},"island_raider":{"nameZh":"島嶼掠奪者","nameEn":"island_raider","level":8,"maxHp":180,"attack":18,"attackCooldown":"1.40 秒","category":"主動"},"blackhound":{"nameZh":"沉錨幫黑犬","nameEn":"blackhound","level":9,"maxHp":150,"attack":20,"attackCooldown":"1 秒","category":"群聚"},"cape_falcon":{"nameZh":"岬角隼","nameEn":"cape_falcon","level":10,"maxHp":170,"attack":26,"attackCooldown":"2 秒","category":"主動"},"axethrower":{"nameZh":"沉錨幫擲斧手","nameEn":"axethrower","level":11,"maxHp":200,"attack":30,"attackCooldown":"2.20 秒","category":"主動"},"bone_hierophant":{"nameZh":"白骨祭司","nameEn":"bone_hierophant","level":12,"maxHp":300,"attack":30,"attackCooldown":"2.20 秒","category":"精英"},"ruffian":{"nameZh":"沉錨幫混混","nameEn":"ruffian","level":12,"maxHp":260,"attack":26,"attackCooldown":"1.40 秒","category":"主動"},"elite_frostmane":{"nameZh":"霜鬃狼王","nameEn":"elite_frostmane","level":12,"maxHp":680,"attack":34,"attackCooldown":"1.10 秒","category":"精英"},"bruiser":{"nameZh":"沉錨幫打手","nameEn":"bruiser","level":14,"maxHp":420,"attack":34,"attackCooldown":"1.80 秒","category":"主動"},"elite_whitecape":{"nameZh":"白岬隼","nameEn":"elite_whitecape","level":14,"maxHp":760,"attack":40,"attackCooldown":"1.80 秒","category":"精英"},"lanternguard":{"nameZh":"燈哨頭馬洛","nameEn":"lanternguard","level":16,"maxHp":900,"attack":42,"attackCooldown":"1.50 秒","category":"精英"},"overseer":{"nameZh":"贓物監工「鞭子」寇特","nameEn":"overseer","level":17,"maxHp":800,"attack":40,"attackCooldown":"1.30 秒","category":"精英"},"anchorboss":{"nameZh":"「沉錨」霍爾格","nameEn":"anchorboss","level":18,"maxHp":6800,"attack":72,"attackCooldown":"1.40 秒","category":"精英"},"ash_jackal":{"nameZh":"燼原豺","nameEn":"ash_jackal","level":25,"maxHp":560,"attack":52,"attackCooldown":"1.20 秒","category":"群聚"},"basalt_crawler":{"nameZh":"玄岩鱗蜥","nameEn":"basalt_crawler","level":27,"maxHp":640,"attack":60,"attackCooldown":"1.90 秒","category":"主動"},"cinder_kite":{"nameZh":"燼羽鳶","nameEn":"cinder_kite","level":29,"maxHp":700,"attack":66,"attackCooldown":"2 秒","category":"主動"},"elite_moltenspine":{"nameZh":"熔脊鱗蜥","nameEn":"elite_moltenspine","level":30,"maxHp":2880,"attack":85,"attackCooldown":"1.80 秒","category":"精英"},"sulphur_burner":{"nameZh":"硫窯匠","nameEn":"sulphur_burner","level":31,"maxHp":780,"attack":66,"attackCooldown":"2.40 秒","category":"主動"},"wreck_gull":{"nameZh":"沉船海鷗","nameEn":"wreck_gull","level":31,"maxHp":760,"attack":66,"attackCooldown":"1.50 秒","category":"群聚"},"reef_crab":{"nameZh":"藤壺礁蟹","nameEn":"reef_crab","level":31,"maxHp":1150,"attack":64,"attackCooldown":"1.70 秒","category":"主動"},"longreef_wolf":{"nameZh":"長礁野狼","nameEn":"longreef_wolf","level":32,"maxHp":900,"attack":70,"attackCooldown":"1.40 秒","category":"群聚"},"tomb_delver":{"nameZh":"墓道掘工","nameEn":"tomb_delver","level":33,"maxHp":860,"attack":80,"attackCooldown":"1.70 秒","category":"主動"},"dune_adder":{"nameZh":"沙丘蝮蛇","nameEn":"dune_adder","level":33,"maxHp":880,"attack":78,"attackCooldown":"1.40 秒","category":"主動"},"raider_captain":{"nameZh":"掠奪者隊長","nameEn":"raider_captain","level":34,"maxHp":2400,"attack":96,"attackCooldown":"1.50 秒","category":"精英"},"beacon_scavenger":{"nameZh":"長礁拾荒者","nameEn":"beacon_scavenger","level":34,"maxHp":1350,"attack":90,"attackCooldown":"1.40 秒","category":"主動"},"tomb_foreman":{"nameZh":"掘工頭「石鑿」瓦德","nameEn":"tomb_foreman","level":35,"maxHp":2600,"attack":98,"attackCooldown":"1.60 秒","category":"精英"},"zombie_shambler":{"nameZh":"蹣跚行屍","nameEn":"zombie_shambler","level":35,"maxHp":1650,"attack":96,"attackCooldown":"1.80 秒","category":"主動"},"grey_lynx":{"nameZh":"灰猞猁","nameEn":"grey_lynx","level":35,"maxHp":1100,"attack":88,"attackCooldown":"1.20 秒","category":"主動"},"bone_acolyte":{"nameZh":"骸骨侍祭","nameEn":"bone_acolyte","level":36,"maxHp":1400,"attack":88,"attackCooldown":"1.50 秒","category":"主動"},"skeleton_warrior":{"nameZh":"骸骨劍衛","nameEn":"skeleton_warrior","level":36,"maxHp":1500,"attack":92,"attackCooldown":"1.40 秒","category":"主動"},"zombie_runner":{"nameZh":"疾行屍","nameEn":"zombie_runner","level":36,"maxHp":1050,"attack":80,"attackCooldown":"1.20 秒","category":"主動"},"beacon_axethrower":{"nameZh":"石堤擲斧手","nameEn":"beacon_axethrower","level":36,"maxHp":1150,"attack":98,"attackCooldown":"2.20 秒","category":"主動"},"elite_stormtalon":{"nameZh":"暴爪隼","nameEn":"elite_stormtalon","level":36,"maxHp":3150,"attack":92,"attackCooldown":"1.80 秒","category":"精英"},"field_cricket":{"nameZh":"田野蟋蟀","nameEn":"field_cricket","level":36,"maxHp":1400,"attack":92,"attackCooldown":"1.80 秒","category":"群聚"},"zombie_bloated":{"nameZh":"腫脹行屍","nameEn":"zombie_bloated","level":37,"maxHp":2300,"attack":108,"attackCooldown":"2 秒","category":"主動"},"timber_beetle":{"nameZh":"鏽木鍬形蟲","nameEn":"timber_beetle","level":37,"maxHp":1700,"attack":96,"attackCooldown":"1.80 秒","category":"主動"},"red_deer":{"nameZh":"赤鹿","nameEn":"red_deer","level":37,"maxHp":2000,"attack":102,"attackCooldown":"1.80 秒","category":"主動"},"crypt_warden":{"nameZh":"墓室守衛","nameEn":"crypt_warden","level":38,"maxHp":9000,"attack":130,"attackCooldown":"1.60 秒","category":"精英"},"elite_mistpelt":{"nameZh":"霧紋猞猁","nameEn":"elite_mistpelt","level":38,"maxHp":4950,"attack":112,"attackCooldown":"1.10 秒","category":"精英"},"beacon_guard":{"nameZh":"舊要塞守衛","nameEn":"beacon_guard","level":39,"maxHp":1800,"attack":94,"attackCooldown":"2.10 秒","category":"主動"},"barley_badger":{"nameZh":"大麥獾","nameEn":"barley_badger","level":39,"maxHp":1967,"attack":101,"attackCooldown":"1.80 秒","category":"主動"},"oren_revenant":{"nameZh":"奧倫亡魂","nameEn":"oren_revenant","level":40,"maxHp":12000,"attack":120,"attackCooldown":"1.60 秒","category":"精英"},"crypt_sovereign":{"nameZh":"墓室主宰","nameEn":"crypt_sovereign","level":40,"maxHp":12000,"attack":135,"attackCooldown":"1.50 秒","category":"精英"},"slag_ogre":{"nameZh":"「渣縛」葛倫霍德","nameEn":"slag_ogre","level":40,"maxHp":55000,"attack":150,"attackCooldown":"1.60 秒","category":"精英"},"undercroft_guard":{"nameZh":"地下層守衛","nameEn":"undercroft_guard","level":40,"maxHp":2100,"attack":104,"attackCooldown":"2.10 秒","category":"主動"},"pasture_ram":{"nameZh":"牧場公羊","nameEn":"pasture_ram","level":40,"maxHp":2100,"attack":104,"attackCooldown":"2.10 秒","category":"主動"},"borrower_pumpkin":{"nameZh":"引火南瓜","nameEn":"borrower_pumpkin","level":40,"maxHp":3200,"attack":90,"attackCooldown":"1.40 秒","category":"主動"},"undercroft_axethrower":{"nameZh":"地下層擲斧手","nameEn":"undercroft_axethrower","level":41,"maxHp":1700,"attack":98,"attackCooldown":"2.20 秒","category":"主動"},"cell_crab":{"nameZh":"牢蟹","nameEn":"cell_crab","level":41,"maxHp":2300,"attack":108,"attackCooldown":"1.70 秒","category":"主動"},"banner_quartermaster":{"nameZh":"破旗軍需官","nameEn":"banner_quartermaster","level":42,"maxHp":9000,"attack":150,"attackCooldown":"1.60 秒","category":"精英"},"banner_captain":{"nameZh":"破旗旗手隊長","nameEn":"banner_captain","level":42,"maxHp":22000,"attack":135,"attackCooldown":"1.60 秒","category":"精英"},"undercroft_scavenger":{"nameZh":"地下層拾荒者","nameEn":"undercroft_scavenger","level":42,"maxHp":2000,"attack":110,"attackCooldown":"1.40 秒","category":"主動"},"chest_mimic_young":{"nameZh":"幼年寶箱怪","nameEn":"chest_mimic_young","level":42,"maxHp":3500,"attack":125,"attackCooldown":"1.50 秒","category":"主動"},"lantern_borrower":{"nameZh":"借聲者","nameEn":"lantern_borrower","level":42,"maxHp":72000,"attack":165,"attackCooldown":"1.50 秒","category":"精英"},"beacon_veteran":{"nameZh":"破旗老兵","nameEn":"beacon_veteran","level":43,"maxHp":3200,"attack":130,"attackCooldown":"1.60 秒","category":"精英"},"cell_jailer":{"nameZh":"水牢獄卒","nameEn":"cell_jailer","level":43,"maxHp":10000,"attack":165,"attackCooldown":"2.10 秒","category":"精英"},"drowned_warden":{"nameZh":"溺牢典獄蟹","nameEn":"drowned_warden","level":43,"maxHp":26000,"attack":140,"attackCooldown":"1.70 秒","category":"精英"},"mine_beetle":{"nameZh":"礦道甲蟲","nameEn":"mine_beetle","level":43,"maxHp":2600,"attack":122,"attackCooldown":"1.80 秒","category":"主動"},"tunnel_adder":{"nameZh":"坑道蝮蛇","nameEn":"tunnel_adder","level":44,"maxHp":2100,"attack":118,"attackCooldown":"1.40 秒","category":"主動"},"chest_mimic":{"nameZh":"寶箱怪","nameEn":"chest_mimic","level":44,"maxHp":5000,"attack":150,"attackCooldown":"1.50 秒","category":"精英"},"carrion_raven":{"nameZh":"食腐渡鴉","nameEn":"carrion_raven","level":45,"maxHp":2200,"attack":128,"attackCooldown":"1.30 秒","category":"主動"},"beetle_matriarch":{"nameZh":"甲蟲母后","nameEn":"beetle_matriarch","level":45,"maxHp":15000,"attack":190,"attackCooldown":"1.80 秒","category":"精英"},"pit_serpent":{"nameZh":"坑底巨蛇","nameEn":"pit_serpent","level":45,"maxHp":60000,"attack":175,"attackCooldown":"1.40 秒","category":"精英"},"banner_guard":{"nameZh":"破旗衛兵","nameEn":"banner_guard","level":45,"maxHp":3400,"attack":135,"attackCooldown":"1.60 秒","category":"主動"},"banner_bodyguard":{"nameZh":"拉斯克親衛","nameEn":"banner_bodyguard","level":45,"maxHp":16000,"attack":210,"attackCooldown":"2.10 秒","category":"精英"},"rask_broken_banner":{"nameZh":"「破旗」拉斯克","nameEn":"rask_broken_banner","level":45,"maxHp":80000,"attack":185,"attackCooldown":"1.60 秒","category":"精英"},"lurelight":{"nameZh":"誘光者","nameEn":"lurelight","level":45,"maxHp":90000,"attack":180,"attackCooldown":"1.50 秒","category":"精英"},"chest_mimic_ancient":{"nameZh":"古老寶箱怪","nameEn":"chest_mimic_ancient","level":45,"maxHp":9600,"attack":185,"attackCooldown":"1.40 秒","category":"精英"},"cellar_boar":{"nameZh":"酒窖野豬","nameEn":"cellar_boar","level":45,"maxHp":2200,"attack":128,"attackCooldown":"2.20 秒","category":"主動"},"cellar_spider":{"nameZh":"酒窖蜘蛛","nameEn":"cellar_spider","level":48,"maxHp":2600,"attack":140,"attackCooldown":"1.80 秒","category":"主動"}};
  const CONFIG = {
    intervalMs: 1500,
    hpThreshold: 50,
    mpThreshold: 30,
    hpPotionItemKey: 'potion_hp',
    mpPotionItemKey: 'potion_mp',
    potionConditions: [],
    stopOnDeath: true,
    potionConditionsCustom: false,
    autoBuyEnabled: false,
    potionShopRoute: 'walk',
    potionShopEntranceX: 4591,
    potionShopEntranceY: 2490,
    buyMessageType: 'buy',
    shopKey: '',
    engageRange: 260,
    fixedSpotEnabled: false,
    fixedSpotX: null,
    fixedSpotY: null,
    fixedSpotLocations: [],
    fixedSpotSelected: '',
    kiteEnabled: false,
    kiteTriggerDistance: 50,
    kiteMaxDistance: 200,
    kiteAttackDelayMs: 1000,
    extremeRanged: false,
    chaseMonsters: true,
    lootRange: 160,
    allowedMonsterTypes: [],
    allowedMonsterIds: [],
    monsterSort: 'level_asc',
    monsterSortUserSet: false,
    allowedItemKeys: [],
    itemPolicies: {},
    combatMode: 'basic_then_skill',
    basicAttackFirst: true,
    skillConditions: [],
    ammoKey: 'arrow_training',
    ammoMinStock: 20,
    ammoBuyAmount: 100,
    autoAmmoBuyEnabled: false,
    returnOnOverweight: false,
    ammoReturnEnabled: false,
    ammoReturnThreshold: 10,
    ammoReturnRules: [],
    autoStart: false,
    packetLogEnabled: false,
    panelScale: 1
  };

  let attachedRoom = null;
  let economyRoom = null;
  let lastEconomyResult = null;
  const economyWaiters = new Set();
  const TEST_STORE_PORTAL_KEY = 'reconstruction-general-store-door';
  const TEST_STORE_NPC_KEY = 'mela';
  let currentTargetId = null;
  let basicAttackDoneTargetId = null;
  let inventoryFull = false;
  let lastInventoryFullAt = 0;
  let lastInventoryFullNoticeAt = 0;
  let lastInventoryClearNoticeAt = 0;
  let inventoryMonitorTimer = null;
  let running = false;
  let timer = null;
  let potionResupplyPromise = null;
  let lastHpPotionAt = 0;
  let lastMpPotionAt = 0;
  const lastPotionWarningAt = { hp: 0, mp: 0 };
  let lastRangeNoticeAt = 0;
  let lastRangeNoticeTargetId = null;
  let chasingTargetId = null;
  let returningToFixedSpot = false;
  let kiteTargetId = null;
  let kiteMovedTargetId = null;
  let kiteResumeAttackAt = 0;
  let lastAttackTargetId = null;
  let pendingPickup = null;
  let lastDeadTargetLoggedId = null;
  const pickupFailureCounts = new Map();
  const skippedLootItemIds = new Set();
  const lastBuyAt = {};
  const lastSkillAt = {};
  const logs = [];
  const packetLogs = [];

  const finite = (value) => Number.isFinite(Number(value)) ? Number(value) : null;
  const nowText = () => new Date().toLocaleTimeString('zh-TW', { hour12: false });

  function log(message) {
    const line = `${nowText()} ${message}`;
    logs.push({ time: new Date().toISOString(), message });
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    console.info(`[WhisperIsle Integrated] ${message}`);
    renderLog();
  }

  function packetLog(direction, type, payload) {
    if (!CONFIG.packetLogEnabled) return;
    const message = `${direction} ${type}${payload === undefined ? '' : ` ${JSON.stringify(payload)}`}`;
    packetLogs.push({ time: new Date().toISOString(), message });
    if (packetLogs.length > 500) packetLogs.splice(0, packetLogs.length - 500);
    renderPacketLog();
  }

  function renderPacketLog() {
    const output = document.querySelector('#wi-packet-log');
    if (!output) return;
    output.textContent = packetLogs.map((entry) => `${new Date(entry.time).toLocaleTimeString('zh-TW', { hour12: false })} ${entry.message}`).join('\n') || '封包 Log 已啟動，尚無封包';
    output.scrollTop = output.scrollHeight;
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

  function normalizeInventoryItems(source) {
    const output = {};
    const put = (key, value) => {
      if (key == null || value == null) return;
      const itemKey = typeof key === 'string' ? key : String(key);
      const count = typeof value === 'object'
        ? (value.quantity ?? value.count ?? value.amount ?? value.stack ?? value.qty)
        : value;
      if (Number.isFinite(Number(count))) output[itemKey] = Number(count);
    };
    if (!source) return output;
    if (source instanceof Map || (typeof source.forEach === 'function' && !Array.isArray(source))) {
      source.forEach((value, key) => put(key, value));
      return output;
    }
    if (Array.isArray(source)) {
      source.forEach((entry) => {
        if (entry && typeof entry === 'object') put(entry.itemKey ?? entry.key ?? entry.id, entry);
      });
      return output;
    }
    if (typeof source === 'object') {
      const nested = source.itemsByKey ?? source.itemCounts ?? source.items;
      if (nested && nested !== source) return normalizeInventoryItems(nested);
      Object.entries(source).forEach(([key, value]) => {
        if (!['capacity', 'weight', 'maxWeight', 'slots', 'maxSlots'].includes(key)) put(key, value);
      });
    }
    return output;
  }

  function serializePlayer(value, id) {
    if (!value) return null;
    const inventorySource = value.inventoryItems ?? value.inventory?.items ?? value.inventory?.itemsByKey ?? value.inventory?.itemCounts ?? value.inventory;
    const inventoryItems = normalizeInventoryItems(inventorySource);
    const hp = firstNumber(value, ['hp', 'health', 'currentHp', 'currentHealth']);
    const carryData = value.carry && typeof value.carry === 'object' ? value.carry : {};
    const carryWeight = firstNumber(value, ['carryWeight', 'currentCarryWeight', 'currentWeight', 'weight', 'loadWeight', 'currentLoad', 'load'])
      ?? (finite(value.carry) !== null ? finite(value.carry) : firstNumber(carryData, ['currentWeight', 'weight', 'current', 'load', 'weightUsed', 'carriedWeight']))
      ?? firstNumber(value.stats, ['carryWeight', 'currentWeight', 'weight', 'loadWeight']);
    const carryMaxWeight = firstNumber(value, ['maxCarryWeight', 'carryWeightMax', 'weightCapacity', 'maxWeight', 'maxLoadWeight', 'maxLoad', 'carryCapacity'])
      ?? firstNumber(carryData, ['maxWeight', 'capacity', 'max', 'limit', 'weightLimit', 'maxLoad'])
      ?? firstNumber(value.stats, ['maxCarryWeight', 'weightCapacity', 'maxWeight', 'maxLoad']);
    const overweight = value.overweight === true || value.isOverweight === true || value.overloaded === true
      || carryData.overweight === true || carryData.isOverweight === true || carryData.overloaded === true
      || (carryWeight !== null && carryMaxWeight !== null && carryMaxWeight > 0 && carryWeight >= carryMaxWeight);
    return {
      id,
      x: finite(value.x),
      y: finite(value.y),
      mapId: value.mapId ?? null,
      hp,
      dead: value.dead === true || value.isDead === true || value.alive === false || (hp !== null && hp <= 0),
      maxHp: firstNumber(value, ['maxHp', 'maxHealth', 'healthMax']),
      mp: firstNumber(value.stats, ['mp', 'mana', 'currentMp', 'currentMP', 'currentMana', 'manaCurrent', 'mpCurrent', 'energy', 'resource']) ?? firstNumber(value, ['mp', 'mana', 'currentMp', 'currentMP', 'currentMana', 'manaCurrent', 'mpCurrent']),
      maxMp: firstNumber(value.stats, ['maxMp', 'maxMP', 'maxMana', 'manaMax', 'maxEnergy', 'maxResource']) ?? firstNumber(value, ['maxMp', 'maxMP', 'maxMana', 'manaMax']),
      statsKeys: value.stats ? Object.keys(value.stats) : [],
      inventoryKeys: value.inventory ? Object.keys(value.inventory) : [],
      inventoryItems,
      inventoryItemTotal: Object.values(inventoryItems).reduce((sum, count) => sum + count, 0),
      inventoryCapacity: finite(value.inventory?.capacity),
      carryWeight,
      carryMaxWeight,
      overweight,
      carry: value.carry && typeof value.carry === 'object' ? { ...value.carry } : (value.carry ?? null)
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
        if (economyResultIndicatesFull(lastEconomyResult)) {
          lastInventoryFullAt = Date.now();
          recordPickupFailure(lastEconomyResult);
        }
        for (const waiter of [...economyWaiters]) {
          try { if (waiter.predicate(lastEconomyResult)) waiter.resolve(lastEconomyResult); } catch (_) {}
        }
        packetLog('[RECV]', 'EconomyResult', result);
      });
    }
    log('room 已掛接');
    renderPotionConditions();
    refreshAmmoReturnCatalog();
    updateStatus();
    return getRoomState();
  }

  function send(type, payload) {
    if (!attachedRoom || typeof attachedRoom.send !== 'function') throw new Error('尚未 attach room');
    const messageType = String(type || '').toLowerCase();
    const configuredBuyType = String(CONFIG.buyMessageType || 'buy').toLowerCase();
    if (messageType === 'buy' || messageType === configuredBuyType) {
      log(`已取消購買封包：${type}；目前版本暫停所有購買`);
      throw new Error('購買功能已暫停：未送出購買封包');
    }
    packetLog('[SEND]', type, payload);
    attachedRoom.send(type, payload);
    return true;
  }

  function attackMonster(monsterId, single = false) {
    return send('attack', { monsterId, single: Boolean(single) });
  }

  function castSkill(skillKey, target, targetDistance = null) {
    const targetPoint = { x: Number(target?.x), y: Number(target?.y) };
    send('castSkill', { skillKey, targetId: target?.id, targetPoint, aim: targetPoint });
    const distanceText = targetDistance !== null && Number.isFinite(Number(targetDistance)) ? Math.round(Number(targetDistance)) : '?';
    log(`CastSkill ${skillKey} → ${target?.id || '?'}，距離 ${distanceText}`);
  }

  function moveTo(x, y) {
    return send('moveTo', { x: Number(x), y: Number(y) });
  }

  function pickUp(itemId) {
    pendingPickup = { id: String(itemId), at: Date.now() };
    try { return send('pickUp', { itemId }); }
    catch (error) { pendingPickup = null; throw error; }
  }

  function useConsumable(itemKey) {
    return send('useConsumable', { itemKey });
  }

  function buyItem(itemKey, amount = 1) {
    const payload = { itemKey, amount: Math.max(1, Number(amount) || 1) };
    if (CONFIG.shopKey) payload.shopKey = CONFIG.shopKey;
    send(CONFIG.buyMessageType || 'buy', payload);
  }

  function sendAndWaitForEconomy(type, payload, predicate, timeoutMs = 8000) {
    return new Promise((resolve, reject) => {
      const waiter = {
        predicate,
        resolve: (result) => { clearTimeout(waiter.timer); economyWaiters.delete(waiter); resolve(result); },
        timer: window.setTimeout(() => { economyWaiters.delete(waiter); reject(new Error(`等待 ${type} 回應逾時`)); }, timeoutMs)
      };
      economyWaiters.add(waiter);
      try { send(type, payload); }
      catch (error) { clearTimeout(waiter.timer); economyWaiters.delete(waiter); reject(error); }
    });
  }

  function waitMs(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function walkToPotionShopEntrance() {
    const x = Number(CONFIG.potionShopEntranceX);
    const y = Number(CONFIG.potionShopEntranceY);
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error('商店入口座標無效');
    const initial = getRoomState()?.player;
    if (!initial || initial.x === null || initial.y === null) throw new Error('無法讀取玩家座標，不能步行到商店入口');
    if (Math.hypot(initial.x - x, initial.y - y) <= 80) return;
    if (statusText('wi-potion-resupply-status')) statusText('wi-potion-resupply-status').textContent = `步行至商店入口（${x}, ${y}）…`;
    log(`步行至商店入口座標 (${x}, ${y})`);
    moveTo(x, y);
    const started = Date.now();
    while (Date.now() - started < 60000) {
      await waitMs(500);
      const player = getRoomState()?.player;
      if (player && player.x !== null && player.y !== null && Math.hypot(player.x - x, player.y - y) <= 80) return;
    }
    throw new Error('步行至商店入口逾時；請檢查座標是否位於目前地圖');
  }

  function statusText(id) { return document.getElementById(id); }

  async function replenishItemsAtShop(conditions = []) {
    const status = document.querySelector('#wi-potion-resupply-status');
    try {
      const purchases = new Map();
      (Array.isArray(conditions) ? conditions : []).forEach((condition) => {
        if (!condition?.itemKey) return;
        const amount = Math.max(1, Math.floor(Number(condition.buyAmount) || 1));
        purchases.set(condition.itemKey, Math.max(purchases.get(condition.itemKey) || 0, amount));
      });
      log(purchases.size ? '開始回村補貨流程' : '開始回村：僅前往入口，不進商店、不購買');
      if (CONFIG.potionShopRoute === 'scroll_return') {
        const scrollCount = Number(getRoomState()?.player?.inventoryItems?.scroll_return || 0);
        if (scrollCount < 1) throw new Error('背包沒有回城卷軸 scroll_return');
        if (status) status.textContent = `使用 1 個回城卷軸（目前持有 ${scrollCount}），等待 5 秒…`;
        log(`使用回城卷軸 scroll_return（持有 ${scrollCount}），等待 5 秒`);
        useConsumable('scroll_return');
        await waitMs(5000);
      } else if (CONFIG.potionShopRoute !== 'walk' && CONFIG.potionShopRoute !== 'mela_store') {
        throw new Error('目前沒有可用的商店路線');
      }
      await walkToPotionShopEntrance();
      if (!purchases.size) {
        if (status) status.textContent = '已到回村入口；沒有啟用補貨條件，因此不進商店、不購買。掛機維持停止。';
        log('已到回村入口；補貨未勾選或沒有符合補貨項目，僅移動、不進店、不購買');
        return;
      }
      if (status) status.textContent = '已到回村入口；購買功能目前暫停，不進商店、不送購買封包。掛機維持停止。';
      log(`已到回村入口；目前暫停購買，略過 ${purchases.size} 種物品，不進店、不發購買封包`);
      return;
      if (status) status.textContent = '已到商店入口，正在進入玫拉雜貨鋪…';
      const portalResult = await sendAndWaitForEconomy('interact', { portalKey: TEST_STORE_PORTAL_KEY },
        (result) => result?.action === 'interact' && (result?.params?.portalKey === TEST_STORE_PORTAL_KEY || result?.code === 'portalEntered' || result?.ok === false));
      if (portalResult?.ok !== true) throw new Error(portalResult?.message || '進入商店失敗');

      if (status) status.textContent = '已進入商店，正在開啟雜貨商玫拉…';
      const npcResult = await sendAndWaitForEconomy('interact', { npcKey: TEST_STORE_NPC_KEY },
        (result) => result?.action === 'interact' && (result?.params?.npcKey === TEST_STORE_NPC_KEY || result?.code === 'npcOpened' || result?.ok === false));
      if (npcResult?.ok !== true) throw new Error(npcResult?.message || '開啟雜貨商失敗');

      for (const [itemKey, amount] of purchases) {
        if (status) status.textContent = `正在購買 ${ITEM_LABELS[itemKey] || itemKey} ×${amount}…`;
        const payload = { itemKey, amount };
        if (CONFIG.shopKey) payload.shopKey = CONFIG.shopKey;
        const result = await sendAndWaitForEconomy(CONFIG.buyMessageType || 'buy', payload,
          (response) => response?.action === 'buy' && (response?.params?.itemKey === itemKey || response?.params?.itemKey == null));
        if (result?.ok !== true) throw new Error(result?.message || `購買 ${itemKey} 失敗`);
        log(`補貨成功：${result.message || `${itemKey} ×${amount}`}`);
      }
      if (status) status.textContent = '回村流程完成。掛機已停止，請手動整理背包或返回練功地點後重新開始。';
      log('回村流程完成；停留在商店，掛機維持停止');
    } catch (error) {
      const message = error?.message || String(error);
      if (status) status.textContent = `回村流程失敗：${message}。掛機維持停止。`;
      log(`回村流程失敗：${message}`);
    } finally {
      potionResupplyPromise = null;
    }
  }

  async function testBuyWoodArrows() {
    const status = document.querySelector('#wi-test-buy-status');
    if (status) status.textContent = '測試購買已暫停；不會進入商店或送出購買封包。';
    log('測試購買已暫停；未送出任何購買封包');
  }

  function hotkeyLabel(hotkey) {
    if (!hotkey?.code) return '點擊後按鍵盤熱鍵';
    const parts = [];
    if (hotkey.ctrlKey) parts.push('Ctrl');
    if (hotkey.altKey) parts.push('Alt');
    if (hotkey.shiftKey) parts.push('Shift');
    if (hotkey.metaKey) parts.push('Meta');
    let keyLabel = hotkey.key || hotkey.code;
    if (/^Digit[0-9]$/.test(hotkey.code)) keyLabel = `${hotkey.code.slice(5)}（上排）`;
    else if (/^Numpad[0-9]$/.test(hotkey.code)) keyLabel = `${hotkey.code.slice(6)}（數字鍵盤）`;
    else if (/^Key[A-Z]$/.test(hotkey.code)) keyLabel = hotkey.code.slice(3);
    parts.push(keyLabel);
    return parts.join('+');
  }

  function skillMode(condition) {
    if (condition.mode === 'keyboard' || condition.mode === 'packet') return condition.mode;
    if (condition.hotkey?.code || /^[0-9]$/.test(String(condition.skillKey || ''))) return 'keyboard';
    return 'packet';
  }

  function skillCooldownKey(condition) {
    return skillMode(condition) === 'keyboard'
      ? `hotkey:${condition.hotkey?.code || condition.skillKey || ''}:${condition.hotkey?.ctrlKey ? 1 : 0}${condition.hotkey?.altKey ? 1 : 0}${condition.hotkey?.shiftKey ? 1 : 0}${condition.hotkey?.metaKey ? 1 : 0}`
      : `packet:${condition.skillKey || ''}`;
  }

  function keyCodeFor(hotkey) {
    if (Number(hotkey?.keyCode) > 0) return Number(hotkey.keyCode);
    const code = String(hotkey?.code || '');
    if (/^Digit[0-9]$/.test(code)) return 48 + Number(code.slice(5));
    if (/^Numpad[0-9]$/.test(code)) return 96 + Number(code.slice(6));
    if (/^Key[A-Z]$/.test(code)) return code.charCodeAt(3);
    const common = { Space: 32, Enter: 13, Escape: 27, Tab: 9, ArrowUp: 38, ArrowDown: 40, ArrowLeft: 37, ArrowRight: 39 };
    return common[code] || 0;
  }

  function pressGameKey(hotkey) {
    const key = typeof hotkey === 'string' ? { key: hotkey, code: /^[0-9]$/.test(hotkey) ? `Digit${hotkey}` : `Key${hotkey.toUpperCase()}` } : hotkey;
    if (!key?.code) return;
    const keyCode = keyCodeFor(key);
    const options = {
      key: key.key || key.code, code: key.code, keyCode, which: keyCode, bubbles: true, cancelable: true, composed: true,
      ctrlKey: Boolean(key.ctrlKey), altKey: Boolean(key.altKey), shiftKey: Boolean(key.shiftKey), metaKey: Boolean(key.metaKey)
    };
    const target = document.querySelector('canvas') || document;
    target.dispatchEvent(new KeyboardEvent('keydown', options));
    target.dispatchEvent(new KeyboardEvent('keyup', options));
  }

  function consumableOptions(resource, selectedKey) {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    const pattern = resource === 'hp' ? /(hp|health|heal|治療|治癒|生命)/i : /(mp|mana|magic|魔力|法力)/i;
    const keys = Object.keys(inventory)
      .filter((key) => pattern.test(key) && /(potion|elixir|tonic|draught|藥水|藥劑)/i.test(key) && Number(inventory[key]) > 0)
      .sort((a, b) => a.localeCompare(b));
    if (selectedKey && !keys.includes(selectedKey)) keys.push(selectedKey);
    if (!keys.length) return '<option value="" disabled selected>背包中尚未偵測到此類藥水</option>';
    return keys.map((key) => {
      const count = Number(inventory[key]) || 0;
      const label = ITEM_LABELS[key] || key;
      return `<option value="${escapeHtml(key)}" ${key === selectedKey ? 'selected' : ''}>${escapeHtml(`${label} / ${key}（持有 ${count}）`)}</option>`;
    }).join('');
  }

  function normalizeFixedSpotLocations(sourceConfig = {}) {
    const hasStoredList = Array.isArray(sourceConfig.fixedSpotLocations);
    let locations = hasStoredList ? sourceConfig.fixedSpotLocations : [];
    locations = locations.map((location) => {
      const name = String(location?.name || '').trim();
      const x = Number(location?.x);
      const y = Number(location?.y);
      return { name, x, y };
    }).filter((location) => location.name && Number.isFinite(location.x) && Number.isFinite(location.y));

    if (!hasStoredList) {
      const x = sourceConfig.fixedSpotX;
      const y = sourceConfig.fixedSpotY;
      if (x !== null && x !== undefined && x !== '' && y !== null && y !== undefined && y !== ''
        && Number.isFinite(Number(x)) && Number.isFinite(Number(y))) {
        locations.push({ name: '舊定點', x: Number(x), y: Number(y) });
      }
    }

    const unique = new Map();
    locations.forEach((location) => unique.set(location.name, location));
    CONFIG.fixedSpotLocations = [...unique.values()];
    const wanted = String(sourceConfig.fixedSpotSelected || '').trim();
    const selected = CONFIG.fixedSpotLocations.find((location) => location.name === wanted)
      || (!hasStoredList && CONFIG.fixedSpotLocations.length ? CONFIG.fixedSpotLocations[0] : null);
    CONFIG.fixedSpotSelected = selected?.name || '';
    if (selected) {
      CONFIG.fixedSpotX = selected.x;
      CONFIG.fixedSpotY = selected.y;
    }
  }

  function renderFixedSpotLocations() {
    const select = document.querySelector('#wi-fixed-spot-select');
    if (!select) return;
    const current = CONFIG.fixedSpotSelected || '';
    select.innerHTML = '<option value="">選擇地點…</option>' + CONFIG.fixedSpotLocations.map((location) =>
      `<option value="${escapeHtml(location.name)}">${escapeHtml(location.name)}（${location.x}, ${location.y}）</option>`
    ).join('');
    select.value = current;
    const selected = CONFIG.fixedSpotLocations.find((location) => location.name === current);
    const nameInput = document.querySelector('#wi-fixed-spot-name');
    if (nameInput) nameInput.value = selected?.name || '';
  }

  function syncFixedSpotFromInputs() {
    const xInput = document.querySelector('#wi-fixed-spot-x');
    const yInput = document.querySelector('#wi-fixed-spot-y');
    if (!xInput || !yInput) return;
    const x = xInput.value === '' ? null : Number(xInput.value);
    const y = yInput.value === '' ? null : Number(yInput.value);
    CONFIG.fixedSpotX = Number.isFinite(x) ? x : null;
    CONFIG.fixedSpotY = Number.isFinite(y) ? y : null;
    const selected = CONFIG.fixedSpotLocations.find((location) => location.name === CONFIG.fixedSpotSelected);
    if (selected && (selected.x !== CONFIG.fixedSpotX || selected.y !== CONFIG.fixedSpotY)) {
      CONFIG.fixedSpotSelected = '';
      const select = document.querySelector('#wi-fixed-spot-select');
      if (select) select.value = '';
    }
  }

  function selectFixedSpotLocation(name) {
    const selected = CONFIG.fixedSpotLocations.find((location) => location.name === name);
    CONFIG.fixedSpotSelected = selected?.name || '';
    if (selected) {
      CONFIG.fixedSpotX = selected.x;
      CONFIG.fixedSpotY = selected.y;
      document.querySelector('#wi-fixed-spot-x').value = String(selected.x);
      document.querySelector('#wi-fixed-spot-y').value = String(selected.y);
      document.querySelector('#wi-fixed-spot-name').value = selected.name;
    }
    localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    log(selected ? `已選定定點「${selected.name}」：X ${selected.x}，Y ${selected.y}` : '已清除定點位置選擇');
  }

  function addOrUpdateFixedSpotLocation() {
    const name = document.querySelector('#wi-fixed-spot-name').value.trim();
    const x = Number(document.querySelector('#wi-fixed-spot-x').value);
    const y = Number(document.querySelector('#wi-fixed-spot-y').value);
    if (!name) { log('請先輸入定點名稱'); return; }
    if (!Number.isFinite(x) || !Number.isFinite(y)) { log('請先輸入有效的定點 X/Y 座標'); return; }
    const existing = CONFIG.fixedSpotLocations.find((location) => location.name === name);
    if (existing) { existing.x = x; existing.y = y; }
    else CONFIG.fixedSpotLocations.push({ name, x, y });
    CONFIG.fixedSpotSelected = name;
    CONFIG.fixedSpotX = x;
    CONFIG.fixedSpotY = y;
    renderFixedSpotLocations();
    document.querySelector('#wi-fixed-spot-select').value = name;
    document.querySelector('#wi-fixed-spot-name').value = name;
    localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    log(`${existing ? '已更新' : '已加入'}定點「${name}」：X ${x}，Y ${y}`);
  }

  function inventoryArrowKeys() {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    return Object.keys(inventory).filter((key) => /^arrow_[a-z0-9_]+$/i.test(key));
  }

  function normalizeAmmoReturnRules(sourceConfig = {}) {
    const rawRules = Array.isArray(sourceConfig.ammoReturnRules)
      ? sourceConfig.ammoReturnRules
      : (sourceConfig.ammoReturnEnabled && sourceConfig.ammoKey
        ? [{ itemKey: sourceConfig.ammoKey, enabled: true, threshold: sourceConfig.ammoReturnThreshold ?? 10 }]
        : []);
    const byKey = new Map();
    rawRules.forEach((rule) => {
      const itemKey = String(rule?.itemKey || '');
      if (!/^[a-z0-9_:-]+$/i.test(itemKey)) return;
      const parsed = Number(rule?.threshold);
      byKey.set(itemKey, {
        itemKey,
        enabled: Boolean(rule?.enabled),
        threshold: Number.isFinite(parsed) ? Math.max(0, parsed) : 10
      });
    });
    const keys = new Set([
      ...AMMO_CATALOG.map((item) => item.key),
      ...inventoryArrowKeys(),
      ...byKey.keys()
    ]);
    CONFIG.ammoReturnRules = [...keys].map((itemKey) => byKey.get(itemKey) || { itemKey, enabled: false, threshold: 10 });
    CONFIG.ammoReturnEnabled = CONFIG.ammoReturnRules.some((rule) => rule.enabled);
    const firstEnabled = CONFIG.ammoReturnRules.find((rule) => rule.enabled);
    if (firstEnabled) CONFIG.ammoReturnThreshold = firstEnabled.threshold;
  }

  function renderAmmoReturnRules() {
    const container = document.querySelector('#wi-ammo-return-rules');
    if (!container) return;
    normalizeAmmoReturnRules(CONFIG);
    const inventory = getRoomState()?.player?.inventoryItems || {};
    container.innerHTML = CONFIG.ammoReturnRules.map((rule) => {
      const key = String(rule.itemKey);
      const label = ITEM_LABELS[key] || '箭矢';
      const amount = Number(inventory[key]);
      const count = Number.isFinite(amount) ? Math.max(0, amount) : 0;
      return `<div class="wi-ammo-return-rule" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 2px;border-bottom:1px solid #ffffff18;flex-wrap:wrap"><label><input type="checkbox" data-ammo-return-check="${escapeHtml(key)}" ${rule.enabled ? 'checked' : ''}> ${escapeHtml(label)} <code>${escapeHtml(key)}</code></label><label>持有 <strong data-ammo-count="${escapeHtml(key)}">${count}</strong>；少於 <input type="number" min="0" step="1" data-ammo-return-threshold="${escapeHtml(key)}" value="${Math.max(0, Number(rule.threshold) || 0)}" style="width:64px"> 時回村</label></div>`;
    }).join('');
  }

  function readAmmoReturnRulesFromUI() {
    const container = document.querySelector('#wi-ammo-return-rules');
    if (!container) return;
    const checks = [...container.querySelectorAll('[data-ammo-return-check]')];
    CONFIG.ammoReturnRules = checks.map((checkbox) => {
      const itemKey = checkbox.dataset.ammoReturnCheck;
      const thresholdInput = [...container.querySelectorAll('[data-ammo-return-threshold]')]
        .find((input) => input.dataset.ammoReturnThreshold === itemKey);
      const parsed = Number(thresholdInput?.value);
      return {
        itemKey,
        enabled: checkbox.checked,
        threshold: thresholdInput?.value === '' || !Number.isFinite(parsed) ? 10 : Math.max(0, parsed)
      };
    });
    CONFIG.ammoReturnEnabled = CONFIG.ammoReturnRules.some((rule) => rule.enabled);
    const firstEnabled = CONFIG.ammoReturnRules.find((rule) => rule.enabled);
    if (firstEnabled) CONFIG.ammoReturnThreshold = firstEnabled.threshold;
  }

  function refreshAmmoReturnCounts() {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    document.querySelectorAll('[data-ammo-count]').forEach((element) => {
      const count = Number(inventory[element.dataset.ammoCount]);
      element.textContent = Number.isFinite(count) ? String(Math.max(0, count)) : '0';
    });
  }

  function refreshAmmoReturnCatalog() {
    normalizeAmmoReturnRules(CONFIG);
    const select = document.querySelector('#wi-ammo-key');
    if (select) {
      const selected = CONFIG.ammoKey || 'arrow_training';
      select.innerHTML = ammoOptions(selected);
    }
    renderAmmoReturnRules();
  }

  function ammoOptions(selectedKey) {
    const inventory = getRoomState()?.player?.inventoryItems || {};
    const keys = new Set([
      ...AMMO_CATALOG.map((item) => item.key),
      ...Object.keys(inventory).filter((key) => /(arrow|ammo|bolt|矢)/i.test(key))
    ]);
    if (selectedKey) keys.add(selectedKey);
    return [...keys].map((key) => `<option value="${escapeHtml(key)}" ${key === selectedKey ? 'selected' : ''}>${escapeHtml(`${ITEM_LABELS[key] || key} / ${key}（持有 ${inventory[key] ?? 0}）`)}</option>`).join('');
  }

  function nearestItem(state) {
    const player = state?.player;
    if (!player) return null;
    return state.items
      .filter((item) => !skippedLootItemIds.has(String(item.id)))
      .filter((item) => item.mapId === player.mapId && item.x !== null && item.y !== null)
      .filter((item) => CONFIG.allowedItemKeys.length === 0 || CONFIG.allowedItemKeys.includes(item.itemKey))
      .map((item) => ({ ...item, distance: Math.hypot(item.x - player.x, item.y - player.y) }))
      .sort((a, b) => a.distance - b.distance)[0] ?? null;
  }

  function economyResultIndicatesFull(result) {
    const text = [result?.code, result?.reason, result?.error, result?.message].filter(Boolean).join(' ').toLowerCase();
    return /overweight|capacity|inventory.?full|full|背包.{0,4}滿|容量|超重/.test(text);
  }

  function recordPickupFailure(result) {
    const params = result?.params || {};
    const explicitId = params.itemId ?? params.dropId ?? params.lootId ?? params.pickupId;
    const pendingIsRecent = pendingPickup && Date.now() - pendingPickup.at <= 10000;
    const itemId = explicitId != null ? String(explicitId) : (pendingIsRecent ? pendingPickup.id : null);
    if (itemId == null) return;
    const failures = (pickupFailureCounts.get(itemId) || 0) + 1;
    pickupFailureCounts.set(itemId, failures);
    if (pendingPickup?.id === itemId) pendingPickup = null;
    if (failures >= 2) {
      skippedLootItemIds.add(itemId);
      log(`掉落物 ${itemId} 拾取失敗 ${failures} 次，已略過；繼續找下一隻怪`);
    } else {
      log(`掉落物 ${itemId} 第 ${failures}/2 次拾取失敗，背包狀態恢復後重試`);
    }
  }

  function pruneLootTracking(state) {
    const liveIds = new Set((state?.items || []).map((item) => String(item.id)));
    for (const id of pickupFailureCounts.keys()) if (!liveIds.has(id)) pickupFailureCounts.delete(id);
    for (const id of skippedLootItemIds) if (!liveIds.has(id)) skippedLootItemIds.delete(id);
    if (pendingPickup && !liveIds.has(pendingPickup.id)) pendingPickup = null;
  }

  function economyIsFull() {
    // EconomyResult describes a recent failed pickup, not a permanent player state.
    // Expire the signal so later ticks retry pickup after the player frees space.
    return lastInventoryFullAt > 0 && Date.now() - lastInventoryFullAt < 1000;
  }

  function updateInventoryFullState(state = getRoomState()) {
    const nextFull = economyIsFull();
    if (nextFull === inventoryFull) return;
    inventoryFull = nextFull;
    const now = Date.now();
    if (inventoryFull && now - lastInventoryFullNoticeAt > 10000) {
      log('拾取失敗：背包超重或容量已滿；狀態每秒刷新並重試');
      lastInventoryFullNoticeAt = now;
    } else if (!inventoryFull && now - lastInventoryClearNoticeAt > 10000) {
      log('背包狀態已刷新：滿載暫停解除，恢復檢查掉落物');
      lastInventoryClearNoticeAt = now;
    }
    updateStatus(state);
  }

  function consumeVitals(state) {
    const player = state?.player;
    if (!player) return false;
    const now = Date.now();
    const hpPct = player.hp !== null && player.maxHp > 0 ? player.hp / player.maxHp * 100 : null;
    const mpPct = player.mp !== null && player.maxMp > 0 ? player.mp / player.maxMp * 100 : null;
    const conditions = CONFIG.potionConditions.filter((condition) => condition.enabled !== false);
    const lowStock = CONFIG.autoBuyEnabled ? conditions.filter((condition) => {
      const owned = Number(player.inventoryItems?.[condition.itemKey] || 0);
      return condition.itemKey && Number(condition.minStock) > 0 && owned < Number(condition.minStock);
    }) : [];

    if (lowStock.length) {
      // If a potion is urgently needed, use an available dose before beginning the trip.
      lowStock.forEach((condition) => {
        const resource = condition.resource === 'mp' ? 'mp' : 'hp';
        const percentage = resource === 'mp' ? mpPct : hpPct;
        const owned = Number(player.inventoryItems?.[condition.itemKey] || 0);
        const threshold = Number(condition.threshold);
        const lastAt = resource === 'mp' ? lastMpPotionAt : lastHpPotionAt;
        if (owned > 0 && percentage !== null && Number.isFinite(threshold) && percentage <= threshold && now - lastAt > 3000) {
          if (resource === 'mp') lastMpPotionAt = now; else lastHpPotionAt = now;
          useConsumable(condition.itemKey);
          log(`${resource.toUpperCase()} ${percentage.toFixed(1)}%：回村前先使用 ${condition.itemKey}`);
        }
      });
      if (!potionResupplyPromise) {
        stop('藥水低於最低庫存，停止掛機並前往商店補貨');
        potionResupplyPromise = replenishItemsAtShop(lowStock);
      }
      return true;
    }

    conditions.forEach((condition) => {
      const owned = Number(player.inventoryItems?.[condition.itemKey] || 0);
      const resource = condition.resource === 'mp' ? 'mp' : 'hp';
      const percentage = resource === 'mp' ? mpPct : hpPct;
      const threshold = Number(condition.threshold);
      if (percentage === null || !Number.isFinite(threshold) || percentage > threshold) return;
      if (!condition.itemKey) {
        if (now - lastPotionWarningAt[resource] > 10000) {
          log(`${resource.toUpperCase()} 已低於 ${threshold}%；未選擇藥水 itemKey，略過使用`);
          lastPotionWarningAt[resource] = now;
        }
        return;
      }
      if (owned <= 0) {
        if (now - lastPotionWarningAt[resource] > 10000) {
          log(`${resource.toUpperCase()} 已低於 ${threshold}%；背包中沒有 ${condition.itemKey}，略過使用`);
          lastPotionWarningAt[resource] = now;
        }
        return;
      }
      const lastAt = resource === 'mp' ? lastMpPotionAt : lastHpPotionAt;
      if (now - lastAt <= 3000) return;
      if (resource === 'mp') lastMpPotionAt = now; else lastHpPotionAt = now;
      useConsumable(condition.itemKey);
      log(`${resource.toUpperCase()} ${percentage.toFixed(1)}%：UseConsumable ${condition.itemKey}（持有 ${owned}）`);
    });
    return false;
  }

  function chooseSkill(state, target) {
    const mpPct = state.player?.mp !== null && state.player?.maxMp > 0 ? state.player.mp / state.player.maxMp * 100 : null;
    const hasCoordinates = target && target.x !== null && target.y !== null && state.player?.x !== null && state.player?.y !== null
      && Number.isFinite(Number(target.x)) && Number.isFinite(Number(target.y)) && Number.isFinite(Number(state.player.x)) && Number.isFinite(Number(state.player.y));
    const targetDistance = hasCoordinates
      ? Math.hypot(Number(target.x) - Number(state.player.x), Number(target.y) - Number(state.player.y)) : null;
    return CONFIG.skillConditions.find((condition) => {
      if (condition.enabled === false) return false;
      const active = skillMode(condition) === 'keyboard' ? Boolean(condition.hotkey?.code || /^[0-9]$/.test(String(condition.skillKey || ''))) : Boolean(condition.skillKey);
      if (!active) return false;
      if (mpPct !== null && mpPct <= Number(condition.minMpPct || 0)) return false;
      const maxDistance = Math.max(0, Number(condition.maxDistance) || 0);
      if (maxDistance > 0 && (targetDistance === null || targetDistance >= maxDistance)) return false;
      const cooldownMs = Math.max(250, Number(condition.cooldownMs) || 1000);
      return Date.now() - (lastSkillAt[skillCooldownKey(condition)] || 0) > cooldownMs;
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
      pruneLootTracking(state);
      if (CONFIG.stopOnDeath && (state.player.dead === true || (state.player.hp !== null && state.player.hp <= 0))) {
        stop('偵測到角色死亡，已停止掛機');
        return;
      }
      if (consumeVitals(state)) return;
      const weightAtLimit = state.player.overweight === true
        || (state.player.carryWeight !== null && state.player.carryMaxWeight !== null && state.player.carryMaxWeight > 0 && state.player.carryWeight >= state.player.carryMaxWeight);
      if (CONFIG.returnOnOverweight && weightAtLimit) {
        const weightText = state.player.carryWeight !== null && state.player.carryMaxWeight !== null
          ? `（${state.player.carryWeight}/${state.player.carryMaxWeight}）` : '';
        stop(`負重達上限${weightText}，停止掛機並回村`);
        potionResupplyPromise = replenishItemsAtShop([]);
        return;
      }
      const ammoOwned = Number(state.player.inventoryItems?.[CONFIG.ammoKey] || 0);
      const lowAmmoRules = (Array.isArray(CONFIG.ammoReturnRules) ? CONFIG.ammoReturnRules : [])
        .filter((rule) => rule?.enabled && rule.itemKey)
        .map((rule) => {
          const threshold = Math.max(0, Number.isFinite(Number(rule.threshold)) ? Number(rule.threshold) : 10);
          const owned = Number(state.player.inventoryItems?.[rule.itemKey] || 0);
          return { ...rule, threshold, owned };
        })
        .filter((rule) => rule.threshold > 0 && rule.owned < rule.threshold);
      if (lowAmmoRules.length) {
        const detail = lowAmmoRules.map((rule) => `${ITEM_LABELS[rule.itemKey] || rule.itemKey} ${rule.owned}/${rule.threshold}`).join('、');
        stop(`已勾選箭矢低於各自門檻（${detail}），停止掛機並回村補箭`);
        potionResupplyPromise = replenishItemsAtShop(lowAmmoRules.map((rule) => ({
          itemKey: rule.itemKey,
          buyAmount: CONFIG.ammoBuyAmount || 100
        })));
        return;
      }
      if (CONFIG.autoAmmoBuyEnabled && CONFIG.ammoKey && ammoOwned < Number(CONFIG.ammoMinStock || 0)) {
        if (Date.now() - (lastBuyAt[CONFIG.ammoKey] || 0) > 5000) {
          lastBuyAt[CONFIG.ammoKey] = Date.now();
          buyItem(CONFIG.ammoKey, CONFIG.ammoBuyAmount || 1);
        }
      }
      updateInventoryFullState(state);

      const current = currentTargetId ? state.monsters.find((monster) => monster.id === currentTargetId) : null;
      if (currentTargetId && (!current || Number(current.hp) <= 0)) {
        if (lastDeadTargetLoggedId !== String(currentTargetId)) {
          log(`目標 ${currentTargetId} 已死亡`);
          lastDeadTargetLoggedId = String(currentTargetId);
        }
        if (kiteTargetId === currentTargetId) { kiteTargetId = null; kiteMovedTargetId = null; kiteResumeAttackAt = 0; lastAttackTargetId = null; }
        if (chasingTargetId === currentTargetId) {
          moveTo(state.player.x, state.player.y);
          chasingTargetId = null;
        }
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
        } else if (inventoryFull) {
          return;
        }
        currentTargetId = null;
        basicAttackDoneTargetId = null;
        lastAttackTargetId = null;
        lastDeadTargetLoggedId = null;
      }

      if (!CONFIG.fixedSpotEnabled) returningToFixedSpot = false;
      if (CONFIG.fixedSpotEnabled && !currentTargetId) {
        const spotX = Number(CONFIG.fixedSpotX);
        const spotY = Number(CONFIG.fixedSpotY);
        if (!Number.isFinite(spotX) || !Number.isFinite(spotY)) {
          log('定點打怪座標無效，已停止掛機');
          stop('定點打怪座標無效，已停止掛機');
          return;
        }
        if (state.player.x === null || state.player.y === null) {
          stop('定點模式無法讀取玩家座標，已停止掛機');
          return;
        }
        const spotDistance = Math.hypot(state.player.x - spotX, state.player.y - spotY);
        if (spotDistance > 40) {
          if (!returningToFixedSpot) {
            moveTo(spotX, spotY);
            returningToFixedSpot = true;
            log(`返回定點 (${spotX}, ${spotY})，距離 ${Math.round(spotDistance)}`);
          }
          return;
        }
        if (returningToFixedSpot) log(`已回到定點 (${spotX}, ${spotY})`);
        returningToFixedSpot = false;
      }

      if (!currentTargetId) {
        const target = state.target;
        if (!target) {
          log('沒有可攻擊的同地圖怪物');
          return;
        }
        currentTargetId = target.id;
        lastDeadTargetLoggedId = null;
        if (kiteTargetId !== target.id) { kiteTargetId = target.id; kiteMovedTargetId = null; kiteResumeAttackAt = 0; lastAttackTargetId = null; }
        log(`選定目標 ${target.id}，HP ${target.hp}/${target.maxHp}，距離 ${Math.round(target.distance ?? 0)}`);
      }

      const target = state.monsters.find((monster) => monster.id === currentTargetId);
      if (!target || Number(target.hp) <= 0) return;
      const distance = Math.hypot(target.x - state.player.x, target.y - state.player.y);
      const distanceText = Number.isFinite(distance) ? Math.round(distance) : '?';
      const engageRange = Math.max(1, Number(CONFIG.engageRange) || 260);
      if (distance > engageRange) {
        if (CONFIG.chaseMonsters !== false) {
          moveTo(target.x, target.y);
          chasingTargetId = target.id;
          if (target.id !== lastRangeNoticeTargetId || Date.now() - lastRangeNoticeAt > 10000) {
            log(`追怪中：${target.id} 距離 ${Math.round(distance)}，目標射程 ${Math.round(engageRange)}`);
            lastRangeNoticeTargetId = target.id;
            lastRangeNoticeAt = Date.now();
          }
        } else {
          if (chasingTargetId === target.id) {
            moveTo(state.player.x, state.player.y);
            chasingTargetId = null;
          }
          if (target.id !== lastRangeNoticeTargetId || Date.now() - lastRangeNoticeAt > 10000) {
            log(`追怪已停用：${target.id} 距離 ${Math.round(distance)}，等待進入攻擊距離 ${Math.round(engageRange)}`);
            lastRangeNoticeTargetId = target.id;
            lastRangeNoticeAt = Date.now();
          }
        }
        return;
      }
      lastRangeNoticeTargetId = null;
      if (chasingTargetId === target.id) {
        moveTo(state.player.x, state.player.y);
        chasingTargetId = null;
        log(`已進入攻擊距離 ${Math.round(engageRange)}，停止追近並攻擊 ${target.id}；目標距離 ${distanceText}`);
      }
      const kiteTriggerDistance = Number.isFinite(Number(CONFIG.kiteTriggerDistance)) ? Math.max(0, Number(CONFIG.kiteTriggerDistance)) : 50;
      if (CONFIG.kiteEnabled && lastAttackTargetId === target.id && distance < kiteTriggerDistance && kiteMovedTargetId !== target.id && state.player.x !== null && state.player.y !== null) {
        const configuredMax = Math.max(0, Number(CONFIG.kiteMaxDistance) || 0);
        const safeRangeMargin = Math.min(25, engageRange / 10);
        const availableRange = Math.max(0, engageRange - distance - safeRangeMargin);
        const retreatDistance = Math.min(configuredMax, availableRange);
        if (retreatDistance > 0) {
          const awayX = (state.player.x - target.x) / distance;
          const awayY = (state.player.y - target.y) / distance;
          const retreatX = state.player.x + awayX * retreatDistance;
          const retreatY = state.player.y + awayY * retreatDistance;
          moveTo(retreatX, retreatY);
          kiteMovedTargetId = target.id;
          const attackDelayMs = Math.max(0, Number(CONFIG.kiteAttackDelayMs) || 0);
          kiteResumeAttackAt = Date.now() + attackDelayMs;
          log(`攻擊後反向退位：${target.id} 距離 ${Math.round(distance)} < ${kiteTriggerDistance}；移動 ${Math.round(retreatDistance)}（上限 ${configuredMax}），${attackDelayMs}ms 後續攻`);
        } else {
          kiteMovedTargetId = target.id;
          log(`反向退位略過：${target.id} 距離已接近攻擊距離上限`);
        }
      }
      if (kiteResumeAttackAt > Date.now()) {
        updateStatus(state);
        return;
      }
      kiteResumeAttackAt = 0;
      if (CONFIG.combatMode === 'basic_then_skill' && CONFIG.basicAttackFirst && basicAttackDoneTargetId !== target.id) {
        attackMonster(target.id, false);
        lastAttackTargetId = target.id;
        basicAttackDoneTargetId = target.id;
        log(`先普攻 ${target.id}，HP ${target.hp}/${target.maxHp}，距離 ${distanceText}`);
      } else {
        const skill = chooseSkill(state, target);
        if (skill) {
          lastSkillAt[skillCooldownKey(skill)] = Date.now();
          if (skillMode(skill) === 'keyboard') {
            const hotkey = skill.hotkey || { key: String(skill.skillKey), code: `Digit${skill.skillKey}` };
            pressGameKey(hotkey);
            lastAttackTargetId = target.id;
            log(`鍵盤熱鍵 ${hotkeyLabel(hotkey)} → ${target.id}，距離 ${distanceText}`);
          } else {
            castSkill(skill.skillKey, target, distance);
            lastAttackTargetId = target.id;
          }
        } else if (CONFIG.combatMode === 'basic_then_skill') {
          attackMonster(target.id, false);
          lastAttackTargetId = target.id;
          log(`Attack ${target.id}，HP ${target.hp}/${target.maxHp}，距離 ${distanceText}`);
        } else {
          const activeSkillConditions = CONFIG.skillConditions.filter((item) => item.enabled !== false);
          const distanceLimited = activeSkillConditions.filter((item) => Number(item.maxDistance) > 0 && distance >= Number(item.maxDistance));
          log(activeSkillConditions.length
            ? (distanceLimited.length
              ? `技能距離條件未達：目標距離 ${distanceText}；距離上限 ${distanceLimited.map((item) => Number(item.maxDistance)).join('／')}`
              : `只使用技能：目前沒有符合 MP > ${activeSkillConditions.map((item) => item.minMpPct).join('／') || '?'}% 的技能；目標距離 ${distanceText}`)
            : '所有技能條件均已停用；只使用技能模式下不會改用普攻');
        }
      }
      updateStatus(state);
    } catch (error) {
      log(`封包錯誤：${error.message}`);
    }
  }

  function start() {
    if (running) return;
    pickupFailureCounts.clear();
    skippedLootItemIds.clear();
    pendingPickup = null;
    lastDeadTargetLoggedId = null;
    if (!attachedRoom) {
      log('無法開始：尚未 attach room');
      return;
    }
    if (CONFIG.fixedSpotEnabled && (!Number.isFinite(Number(CONFIG.fixedSpotX)) || !Number.isFinite(Number(CONFIG.fixedSpotY)) || CONFIG.fixedSpotX === null || CONFIG.fixedSpotY === null)) {
      log('無法開始定點打怪：請先輸入有效的 X／Y 座標');
      return;
    }
    returningToFixedSpot = false;
    running = true;
    if (inventoryMonitorTimer) window.clearInterval(inventoryMonitorTimer);
    inventoryMonitorTimer = window.setInterval(() => {
      if (!running) return;
      const state = getRoomState();
      if (!state?.player) return;
      updateInventoryFullState(state);
      updateStatus(state);
    }, 1000);
    log('戰鬥已開始：直接封包 Attack／MoveTo／PickUp／UseConsumable');
    battleTick();
    if (!running) return;
    timer = window.setInterval(battleTick, CONFIG.intervalMs);
    updateStatus();
  }

  function stop(message = '戰鬥已停止') {
    running = false;
    if (timer) window.clearInterval(timer);
    timer = null;
    if (inventoryMonitorTimer) window.clearInterval(inventoryMonitorTimer);
    inventoryMonitorTimer = null;
    currentTargetId = null;
    basicAttackDoneTargetId = null;
    returningToFixedSpot = false;
    kiteTargetId = null;
    kiteMovedTargetId = null;
    kiteResumeAttackAt = 0;
    lastAttackTargetId = null;
    log(message);
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
    else status.textContent = `${running ? '戰鬥中' : '已停止'}｜HP ${state.player.hp ?? '?'}／${state.player.maxHp ?? '?'}｜MP ${state.player.mp ?? '?'}／${state.player.maxMp ?? '?'}｜目標 ${currentTargetId || '無'}${inventoryFull ? '｜背包滿（每秒檢查）' : ''}`;
    refreshPotionSelectOptions();
    refreshAmmoReturnCounts();
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
    refreshAmmoReturnCatalog();
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
      const selectedTypes = CONFIG.allowedMonsterTypes.map(String);
      const selectedIds = CONFIG.allowedMonsterIds.map(String);
      const scrollTop = container.scrollTop;
      const expandedIds = new Set([...container.querySelectorAll('.wi-monster-instance')].filter((row) => !row.querySelector('.wi-grid-detail')?.hidden).map((row) => row.dataset.monsterId));
      const search = (document.querySelector('#wi-monster-search')?.value || '').toLowerCase();
      const grouped = new Map();
      raw.filter((monster) => `${monster.id} ${monster.typeKey} ${monster.nameZh || ''} ${monster.nameEn || ''} ${monster.category || ''}`.toLowerCase().includes(search))
        .forEach((monster) => {
          const key = String(monster.typeKey || monster.nameEn || monster.nameZh || 'unknown');
          if (!grouped.has(key)) grouped.set(key, []);
          grouped.get(key).push(monster);
        });
      const sortMode = document.querySelector('#wi-monster-sort')?.value || CONFIG.monsterSort || 'level_asc';
      const monsterDistance = (monster) => state?.player && monster.x !== null && monster.y !== null
        ? Math.hypot(monster.x - state.player.x, monster.y - state.player.y) : null;
      const compareNumber = (left, right, descending = false) => {
        if (left === null || left === undefined || !Number.isFinite(Number(left))) return right === null || right === undefined || !Number.isFinite(Number(right)) ? 0 : 1;
        if (right === null || right === undefined || !Number.isFinite(Number(right))) return -1;
        return (Number(left) - Number(right)) * (descending ? -1 : 1);
      };
      const compareMonster = (a, b) => {
        let compared = 0;
        if (sortMode.startsWith('level_')) compared = compareNumber(a.level, b.level, sortMode === 'level_desc');
        else if (sortMode.startsWith('distance_')) compared = compareNumber(monsterDistance(a), monsterDistance(b), sortMode === 'distance_desc');
        if (compared) return compared;
        return String(a.nameZh || a.typeKey || a.id).localeCompare(String(b.nameZh || b.typeKey || b.id)) || String(a.id).localeCompare(String(b.id));
      };
      const groups = [...grouped.entries()];
      groups.forEach(([, monsters]) => monsters.sort(compareMonster));
      const groupIsSelected = ([key, monsters]) => selectedTypes.includes(key)
        || (selectedIds.length > 0 && monsters.every((monster) => selectedIds.includes(String(monster.id))));
      groups.sort((a, b) => Number(groupIsSelected(b)) - Number(groupIsSelected(a))
        || compareMonster(a[1][0], b[1][0])
        || String(a[0]).localeCompare(String(b[0])));
      const unrestricted = selectedTypes.length === 0 && selectedIds.length === 0;
      const allGroupKeys = new Set(raw.map((monster) => String(monster.typeKey || monster.nameEn || monster.nameZh || 'unknown')));
      const groupHtml = groups.map(([key, monsters]) => {
        const checked = unrestricted || selectedTypes.includes(key) || (selectedIds.length > 0 && monsters.every((monster) => selectedIds.includes(String(monster.id))));
        const first = monsters[0];
        const rows = monsters.map((monster) => {
          const id = String(monster.id);
          const distance = state?.player && monster.x !== null && monster.y !== null ? Math.hypot(monster.x - state.player.x, monster.y - state.player.y).toFixed(0) : '?';
          const detail = `ID ${id}｜位置 (${monster.x ?? '?'}, ${monster.y ?? '?'})｜類型 ${monster.category || '?'}｜攻擊 ${monster.attack ?? '?'}｜攻擊冷卻 ${monster.attackCooldown || '?'}`;
          return `<div class="wi-monster-instance" data-monster-id="${escapeHtml(id)}"><span>${escapeHtml(id)}</span><span>Lv ${monster.level ?? '?'}</span><span>HP ${monster.hp ?? '?'}/${monster.maxHp ?? '?'}</span><span>距離 ${distance}</span><button class="wi-expand" type="button" aria-label="展開怪物詳細資料">＋</button><div class="wi-grid-detail" hidden>${escapeHtml(detail)}</div></div>`;
        }).join('');
        return `<section class="wi-monster-group"><label class="wi-monster-group-head"><input class="wi-monster-group-pick" type="checkbox" value="${escapeHtml(key)}" ${checked ? 'checked' : ''}><strong>${escapeHtml(`${first.nameZh || key} / ${first.nameEn || key}`)}</strong><small>${monsters.length} 隻</small></label><div class="wi-monster-instances">${rows}</div></section>`;
      }).join('');
      container.innerHTML = `<div class="wi-monster-groups">${groupHtml || '<span class="wi-empty">目前尚未觀測到怪物，請先連接 Room 並刷新</span>'}</div>`;
      container.scrollTop = scrollTop;
      container.querySelectorAll('.wi-monster-instance').forEach((row) => {
        if (expandedIds.has(row.dataset.monsterId)) { const detail = row.querySelector('.wi-grid-detail'); if (detail) { detail.hidden = false; row.querySelector('.wi-expand').textContent = '－'; } }
      });
      container.querySelectorAll('.wi-monster-group-pick').forEach((input) => input.addEventListener('change', () => {
        const wasUnrestricted = CONFIG.allowedMonsterTypes.length === 0 && CONFIG.allowedMonsterIds.length === 0;
        const types = new Set(wasUnrestricted
          ? [...allGroupKeys]
          : CONFIG.allowedMonsterTypes.map(String).filter((key) => key !== '__NONE__'));
        if (input.checked) types.add(String(input.value)); else types.delete(String(input.value));
        CONFIG.allowedMonsterIds = [];
        if (types.size > 0 && types.size >= allGroupKeys.size) CONFIG.allowedMonsterTypes = [];
        else CONFIG.allowedMonsterTypes = types.size ? [...types] : ['__NONE__'];
        localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
        renderFilterList('monster');
      }));
      container.querySelectorAll('.wi-expand').forEach((button) => button.addEventListener('click', () => {
        const detail = button.closest('.wi-monster-instance')?.querySelector('.wi-grid-detail');
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

  function refreshPotionSelectOptions() {
    document.querySelectorAll('#wi-potion-conditions .wi-condition').forEach((row) => {
      const resource = row.querySelector('.wi-condition-resource');
      const item = row.querySelector('.wi-condition-item');
      if (!resource || !item) return;
      const selectedKey = item.value;
      const nextOptions = consumableOptions(resource.value, selectedKey);
      if (item.innerHTML !== nextOptions) item.innerHTML = nextOptions;
    });
  }

  function renderPotionConditions() {
    const container = document.querySelector('#wi-potion-conditions');
    if (!container) return;
    container.innerHTML = CONFIG.potionConditions.map((condition, index) => `
      <div class="wi-condition" data-condition-index="${index}">
        <label class="wi-condition-toggle" title="獨立啟用／停用此藥水條件"><input class="wi-condition-enabled" type="checkbox" ${condition.enabled !== false ? 'checked' : ''}>啟用</label>
        <select class="wi-condition-resource"><option value="hp" ${condition.resource === 'hp' ? 'selected' : ''}>HP</option><option value="mp" ${condition.resource === 'mp' ? 'selected' : ''}>MP</option></select>
        <span>低於</span><input class="wi-condition-threshold" type="number" min="1" max="100" value="${Number(condition.threshold) || 50}"><span>%</span>
        <select class="wi-condition-item" aria-label="消耗品 itemKey">${consumableOptions(condition.resource, condition.itemKey)}</select>
        <input class="wi-condition-min" type="number" min="0" title="最低庫存" placeholder="最低" value="${Number(condition.minStock) || 0}">
        <input class="wi-condition-buy" type="number" min="1" title="每次購買數量" placeholder="購買數" value="${Number(condition.buyAmount) || 1}">
        <button class="wi-btn wi-condition-remove" type="button">刪</button>
      </div>
    `).join('') || '<div class="wi-empty">尚未新增條件</div>';
    container.querySelectorAll('.wi-condition-resource').forEach((select) => select.addEventListener('change', () => {
      const item = select.closest('.wi-condition')?.querySelector('.wi-condition-item');
      if (!item) return;
      const match = select.value === 'hp' ? /(hp|health|heal|治療|治癒|生命)/i : /(mp|mana|magic|魔力|法力)/i;
      const currentKey = match.test(item.value) ? item.value : '';
      item.innerHTML = consumableOptions(select.value, currentKey);
    }));
    container.querySelectorAll('.wi-condition-remove').forEach((button) => button.onclick = () => {
      const index = Number(button.closest('.wi-condition').dataset.conditionIndex);
      CONFIG.potionConditions.splice(index, 1);
      renderPotionConditions();
      container.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  function readPotionConditions() {
    CONFIG.potionConditionsCustom = true;
    const rows = [...document.querySelectorAll('#wi-potion-conditions .wi-condition')];
    CONFIG.potionConditions = rows.map((row) => ({
      enabled: row.querySelector('.wi-condition-enabled').checked,
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
    CONFIG.skillConditions = CONFIG.skillConditions.map((condition) => {
      if (!condition.hotkey && /^[0-9]$/.test(String(condition.skillKey || ''))) {
        condition.hotkey = { key: String(condition.skillKey), code: `Digit${condition.skillKey}`, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false };
      }
      condition.mode = skillMode(condition);
      return condition;
    });
    container.innerHTML = CONFIG.skillConditions.map((condition, index) => {
      const mode = skillMode(condition);
      const hotkey = condition.hotkey || null;
      const hotkeyData = hotkey ? escapeHtml(JSON.stringify(hotkey)) : '';
      return `
      <div class="wi-condition" data-skill-index="${index}">
        <label class="wi-condition-toggle" title="獨立啟用／停用此技能條件"><input class="wi-condition-enabled" type="checkbox" ${condition.enabled !== false ? 'checked' : ''}>啟用</label>
        <select class="wi-skill-mode" aria-label="技能輸入方式"><option value="keyboard" ${mode === 'keyboard' ? 'selected' : ''}>鍵盤熱鍵</option><option value="packet" ${mode === 'packet' ? 'selected' : ''}>Skill Key 封包</option></select>
        <button class="wi-btn wi-skill-capture" type="button" data-hotkey="${hotkeyData}" ${mode !== 'keyboard' ? 'hidden' : ''}>${escapeHtml(hotkeyLabel(hotkey))}</button>
        <input class="wi-skill-key" placeholder="伺服器 skillKey" value="${escapeHtml(condition.skillKey || '')}" ${mode !== 'packet' ? 'hidden' : ''}>
        <span>MP &gt;</span><input class="wi-skill-mp" type="number" min="0" max="100" value="${Number(condition.minMpPct) || 0}"><span>%</span><span>距離 &lt;</span><input class="wi-skill-range" type="number" min="0" step="1" title="距離小於此值才施放技能；0 表示不限" value="${Math.max(0, Number(condition.maxDistance) || 0)}"><span>0不限</span><span>冷卻ms</span><input class="wi-skill-cooldown" type="number" min="250" value="${Number(condition.cooldownMs) || 1000}">
        <button class="wi-btn wi-skill-remove" type="button">刪</button>
      </div>`;
    }).join('') || '<div class="wi-empty">尚未新增技能條件</div>';

    container.querySelectorAll('.wi-skill-mode').forEach((select) => select.addEventListener('change', () => {
      const row = select.closest('.wi-condition');
      row.querySelector('.wi-skill-capture').hidden = select.value !== 'keyboard';
      row.querySelector('.wi-skill-key').hidden = select.value !== 'packet';
    }));
    container.querySelectorAll('.wi-skill-capture').forEach((button) => button.addEventListener('click', () => {
      const previous = button.textContent;
      button.textContent = '請按鍵盤熱鍵…';
      button.classList.add('recording');
      const capture = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault(); event.stopPropagation(); document.removeEventListener('keydown', capture, true);
          button.textContent = previous; button.classList.remove('recording'); return;
        }
        if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
        event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
        const hotkey = { key: event.key, code: event.code, keyCode: event.keyCode || event.which || 0, ctrlKey: event.ctrlKey, altKey: event.altKey, shiftKey: event.shiftKey, metaKey: event.metaKey };
        button.dataset.hotkey = JSON.stringify(hotkey);
        button.dispatchEvent(new Event('change', { bubbles: true }));
        button.textContent = hotkeyLabel(hotkey);
        button.classList.remove('recording');
        document.removeEventListener('keydown', capture, true);
      };
      document.addEventListener('keydown', capture, true);
    }));
    container.querySelectorAll('.wi-skill-remove').forEach((button) => button.onclick = () => {
      CONFIG.skillConditions.splice(Number(button.closest('.wi-condition').dataset.skillIndex), 1);
      renderSkillConditions();
      container.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  function readSkillConditions() {
    CONFIG.skillConditions = [...document.querySelectorAll('#wi-skill-conditions .wi-condition')].map((row) => {
      const mode = row.querySelector('.wi-skill-mode').value;
      let hotkey = null;
      try { hotkey = JSON.parse(row.querySelector('.wi-skill-capture').dataset.hotkey || 'null'); } catch (_) {}
      return {
        enabled: row.querySelector('.wi-condition-enabled').checked,
        mode,
        hotkey: mode === 'keyboard' ? hotkey : null,
        skillKey: mode === 'packet' ? row.querySelector('.wi-skill-key').value.trim() : '',
        minMpPct: Math.max(0, Math.min(100, Number(row.querySelector('.wi-skill-mp').value) || 0)),
        maxDistance: Math.max(0, Number(row.querySelector('.wi-skill-range').value) || 0),
        cooldownMs: Math.max(250, Number(row.querySelector('.wi-skill-cooldown').value) || 1000)
      };
    }).filter((condition) => condition.mode === 'keyboard' ? Boolean(condition.hotkey?.code) : Boolean(condition.skillKey));
  }

  function addUI() {
    if (document.querySelector('#wi-integrated-panel')) return;
    const style = document.createElement('style');
    style.textContent = `
      #wi-integrated-panel{position:fixed;right:16px;bottom:16px;z-index:2147483647;width:50px;height:50px;color:#e5e7eb;background:#111827;border:1px solid #64748b;border-radius:10px;box-shadow:0 8px 24px #0008;font:13px/1.4 system-ui,sans-serif;overflow:hidden;transition:width .15s,height .15s}
      #wi-integrated-panel.wi-open{width:var(--wi-panel-width,430px);height:min(560px,calc(100vh - 24px));border-radius:12px;overflow:hidden}#wi-integrated-panel.wi-fullscreen{inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;border-radius:0!important}#wi-integrated-panel.wi-open #wi-integrated-body{height:calc(100% - 52px);min-height:0}#wi-integrated-panel.wi-fullscreen #wi-integrated-body{height:calc(100vh - 52px)!important;max-height:calc(100vh - 52px)}
      #wi-integrated-panel *{box-sizing:border-box}.wi-icon{width:50px;height:50px;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;font-size:22px;background:#1e293b}.wi-icon:active{cursor:grabbing}.wi-open .wi-icon{display:none}
      #wi-integrated-head{display:flex;justify-content:space-between;align-items:center;gap:6px;padding:9px 8px;background:#1e293b;font-weight:700}#wi-integrated-body{padding:10px;height:508px;overflow:auto}.wi-window-controls{display:flex;gap:3px;align-items:center;flex-shrink:0}.wi-window-controls .wi-btn{padding:3px 5px;font-size:10px;line-height:1.2;white-space:nowrap}
      .wi-combat-topbar{position:sticky;top:-10px;z-index:20;display:flex;gap:8px;align-items:center;margin:-10px -10px 8px;padding:8px 10px;background:#111827;border-bottom:1px solid #475569;box-shadow:0 3px 8px #0008}.wi-combat-topbar .wi-btn{flex:1}.wi-combat-topbar label{display:flex;align-items:center;gap:6px;white-space:nowrap}.wi-combat-topbar input{width:auto}
      #wi-integrated-status{margin-bottom:8px;color:#93c5fd;font-size:12px}.wi-tabs{display:flex;gap:4px;margin-bottom:8px}.wi-tab-select{width:100%;padding:7px;color:#fff;background:#0f172a;border:1px solid #64748b;border-radius:6px}.wi-page[hidden]{display:none}.wi-row{display:flex;gap:6px;align-items:center;margin:6px 0}.wi-row label{flex:1}.wi-row input{width:78px;padding:4px;color:#e5e7eb;background:#0f172a;border:1px solid #475569;border-radius:5px}.wi-row input.wide{width:125px}.wi-btn{padding:6px 9px;color:#fff;background:#334155;border:1px solid #64748b;border-radius:6px;cursor:pointer}.wi-btn:hover{background:#475569}.wi-btn.green{background:#166534}.wi-btn.red{background:#991b1b}.wi-actions{display:flex;gap:6px;margin:8px 0}.wi-actions .wi-btn{flex:1}.wi-title{margin:8px 0 4px;color:#fbbf24;font-weight:700}.wi-title-toggle{display:flex;justify-content:space-between;align-items:center}.wi-title-toggle label{color:#cbd5e1;font-size:11px;font-weight:400;white-space:nowrap}.wi-title-toggle input{width:auto;vertical-align:middle}.wi-note{color:#94a3b8;font-size:11px}.wi-log{height:190px;margin:6px 0 0;padding:7px;overflow:auto;white-space:pre-wrap;background:#020617;border:1px solid #334155;border-radius:6px;font:11px/1.35 ui-monospace,monospace}.wi-search{width:100%!important;margin:4px 0}.wi-list{height:170px;overflow:auto;padding:5px;background:#020617;border:1px solid #334155;border-radius:6px}.wi-check{display:flex;gap:5px;align-items:center;padding:4px;border-bottom:1px solid #1e293b;cursor:pointer}.wi-check input{width:auto}.wi-check.selected{order:-1;background:#172554}.wi-check small{color:#94a3b8;margin-left:auto}.wi-empty{color:#94a3b8;font-size:11px}.wi-condition{display:flex;gap:4px;align-items:center;flex-wrap:wrap;padding:6px;margin:5px 0;background:#020617;border:1px solid #334155;border-radius:6px}.wi-condition select,.wi-condition input{min-width:0;padding:4px;color:#e5e7eb;background:#0f172a;border:1px solid #475569;border-radius:4px}.wi-condition .wi-condition-toggle{display:inline-flex;align-items:center;gap:3px;color:#cbd5e1;font-size:10px;white-space:nowrap}.wi-condition .wi-condition-toggle input{width:auto!important;min-width:0;padding:0!important;accent-color:#22c55e}.wi-condition-threshold{width:48px}.wi-condition-item{width:105px}.wi-condition-key{width:55px}.wi-condition-action{width:70px}.wi-skill-capture.recording{background:#92400e;border-color:#f59e0b}.wi-condition-remove{padding:4px 6px}.wi-grid{display:grid;grid-template-columns:32px minmax(130px,1fr) 35px 75px 55px 30px;gap:3px;align-items:center;font-size:11px}.wi-grid-head{display:contents;color:#fbbf24;font-weight:700}.wi-grid-head>*{padding:4px;background:#1e293b}.wi-grid-row{display:contents}.wi-grid-row>*{padding:4px;border-bottom:1px solid #1e293b;background:#020617}.wi-grid-row.selected>*{background:#172554}.wi-grid-detail{grid-column:1/-1!important;color:#94a3b8;font-size:10px!important;padding:5px 8px!important}.wi-expand{padding:1px 4px;color:#fff;background:#334155;border:1px solid #64748b;border-radius:3px}.wi-monster-group{margin:4px 0;border:1px solid #334155;border-radius:5px;overflow:hidden}.wi-monster-group-head{display:flex;align-items:center;gap:7px;padding:6px;background:#1e293b;cursor:pointer}.wi-monster-group-head input{width:auto}.wi-monster-group-head small{margin-left:auto;color:#94a3b8}.wi-monster-instances{padding:2px 5px;background:#020617}.wi-monster-instance{display:grid;grid-template-columns:minmax(55px,1fr) 44px 85px 65px 24px;gap:4px;align-items:center;padding:4px;border-bottom:1px solid #1e293b;font-size:10px}.wi-monster-instance .wi-grid-detail{grid-column:1/-1;color:#94a3b8;font-size:10px;padding:4px}
    `;
    document.head.appendChild(style);
    const panel = document.createElement('section');
    panel.id = 'wi-integrated-panel';
    panel.innerHTML = `
      <div class="wi-icon" title="開啟 Whisper Isle 戰鬥控制">⚔</div>
      <div id="wi-integrated-head"><span>Whisper Isle 戰鬥 v${VERSION}</span><div class="wi-window-controls"><button id="wi-width-1" class="wi-btn" type="button" title="原始寬度 ×1">×1</button><button id="wi-width-2" class="wi-btn" type="button" title="寬度 ×2">×2</button><button id="wi-width-3" class="wi-btn" type="button" title="寬度 ×3">×3</button><button id="wi-fullscreen" class="wi-btn" type="button" title="切換全螢幕">全螢幕</button><button id="wi-hide" class="wi-btn" type="button" title="關閉面板">×</button></div></div>
      <div id="wi-integrated-body">
        <div id="wi-integrated-status">讀取中…</div>
        <div class="wi-tabs"><select id="wi-page-select" class="wi-tab-select" aria-label="功能分頁"><option value="afk">開始掛機</option><option value="combat">戰鬥設定</option><option value="return">回村設定</option><option value="filters">怪物設定</option><option value="test">測試</option></select></div>
        <div id="wi-page-afk" class="wi-page">
          <div class="wi-actions"><button id="wi-start" class="wi-btn green">開始戰鬥</button><button id="wi-stop" class="wi-btn red">停止</button></div>
          <div class="wi-actions"><button id="wi-room-connect" class="wi-btn">連接 Room／讀取資訊</button></div>
          <pre id="wi-room-info" class="wi-log" style="height:150px">尚未讀取 Room 資訊</pre>
          <div class="wi-note">開始掛機後會依照「戰鬥設定」、「喝水設定」及「怪物設定」自動執行。</div>
          <pre id="wi-integrated-log" class="wi-log">尚未運作</pre>
        </div>
        <div id="wi-page-combat" class="wi-page" hidden>
          <div class="wi-title">戰鬥設定</div>
          <div class="wi-combat-topbar"><button id="wi-save-combat" class="wi-btn green" type="button">儲存戰鬥設定</button><label><input id="wi-packet-log-enabled" type="checkbox"> 啟動封包 Log</label></div>
          <div class="wi-row"><label>攻擊距離 <input id="wi-engage-range" type="number" min="1"></label><label>拾取距離 <input id="wi-loot-range" type="number" min="1"></label></div>
          <div class="wi-row"><label><input id="wi-stop-on-death" type="checkbox"> 角色死亡時停止掛機（預設啟用）</label></div>
          <div class="wi-note">藥水條件、箭矢補給、回村路線與負重回村，請至「回村設定」分頁管理。</div>
          <div class="wi-row"><label>戰鬥模式 <select id="wi-combat-mode"><option value="basic_then_skill">普攻／技能</option><option value="skills_only">只使用技能</option></select></label><label><input id="wi-basic-first" type="checkbox"> 先普攻</label></div>
          <div class="wi-row"><label><input id="wi-chase-monsters" type="checkbox"> 追怪（預設啟用）</label></div>
          <div class="wi-row"><label><input id="wi-extreme-ranged" type="checkbox"> 極限遠攻（超出攻擊距離不追怪，進入距離才攻擊）</label></div>
          <div class="wi-row"><label><input id="wi-fixed-spot-enabled" type="checkbox"> 定點打怪（打完並拾取後返回座標）</label></div>
          <div class="wi-row"><label>已存定點 <select id="wi-fixed-spot-select"><option value="">選擇地點…</option></select></label><button id="wi-add-fixed-location" class="wi-btn" type="button">加入／更新地點</button></div>
          <div class="wi-row"><label>地點名稱 <input id="wi-fixed-spot-name" type="text" placeholder="自行輸入名稱"></label><label>定點 X <input id="wi-fixed-spot-x" type="number" step="1" placeholder="X"></label><label>定點 Y <input id="wi-fixed-spot-y" type="number" step="1" placeholder="Y"></label><button id="wi-capture-fixed-xy" class="wi-btn" type="button">擷取目前 XY</button></div>
          <div class="wi-row"><label><input id="wi-kite-enabled" type="checkbox"> 反方向退位（風箏）</label></div>
          <div class="wi-row"><label>怪距離小於 <input id="wi-kite-trigger" type="number" min="0" step="1"></label><label>退位最大距離 <input id="wi-kite-max" type="number" min="0" step="1"></label></div>
          <div class="wi-row"><label>續攻延遲 ms <input id="wi-kite-attack-delay" type="number" min="0" step="100"></label></div>
          <div class="wi-note">定點模式開始時會先走到指定座標；擊殺並拾取完掉落物後再走回定點。風箏勾選時，先對怪物發出攻擊後，距離小於門檻（預設 50）才會往反方向退位；最大退位距離預設 200。送出移動後等待續攻延遲（預設 1000ms），再繼續攻擊；若移動尚未完成，遊戲會持續執行移動目標。</div>
          <div class="wi-note">追怪勾選時，距離超過設定射程會追蹤目標；進入射程後停止追近並攻擊。未勾選追怪時會停在原地等待目標進入射程。極限遠攻會避免在設定射程外發送攻擊。</div>
          <div class="wi-title">技能條件（每項獨立啟用，依序判斷）</div>
          <div class="wi-note">每一列左側的「啟用」勾選框獨立控制該技能條件。每筆技能可設定「距離 <」門檻；距離小於設定值才會觸發，填 0 表示不限。技能仍須符合 MP 門檻及冷卻。可選「鍵盤熱鍵」或「Skill Key 封包」；鍵盤模式使用瀏覽器合成事件。</div>
          <div id="wi-skill-conditions"></div>
          <div class="wi-actions"><button id="wi-add-skill" class="wi-btn">＋新增技能條件</button></div>
          <div class="wi-title">封包 Log</div>
          <div id="wi-packet-log-panel" hidden>
            <div class="wi-note">只記錄此功能啟用期間送出的封包，以及收到的 EconomyResult；與戰鬥訊息分開。</div>
            <pre id="wi-packet-log" class="wi-log" style="height:150px">封包 Log 未啟動</pre>
            <div class="wi-actions"><button id="wi-packet-log-clear" class="wi-btn" type="button">清除封包 Log</button></div>
          </div>
          <div class="wi-actions"><button id="wi-clear" class="wi-btn">清除 Log</button><button id="wi-export" class="wi-btn">匯出 TXT</button></div>
          <div class="wi-note">喝水固定使用封包：UseConsumable。首次使用若 room 在 closure，請在 breakpoint 執行 __whisperIsleIntegrated.attach(e.room)。</div>
        </div>
        <div id="wi-page-return" class="wi-page" hidden>
          <div class="wi-title">回村條件與補給</div>
          <div class="wi-combat-topbar"><button id="wi-save-return" class="wi-btn green" type="button">儲存回村設定</button></div>
          <div class="wi-title">戰鬥回村條件</div>
          <div class="wi-row"><label><input id="wi-return-overweight" type="checkbox"> 負重達上限時回村（預設未勾選）</label></div>
          <div class="wi-note">開啟後，若遊戲回報超載，或可讀取到的目前負重達到負重上限，會停止掛機並只移動到設定的回村入口。負重條件本身不會進商店或補貨；各項補貨都要另外勾選。若遊戲未提供負重/上限資料，此條件不會觸發。</div>
          <div class="wi-row"><label><input id="wi-auto-buy" type="checkbox"> 藥水低於最低庫存時回村補貨（勾選才會進店購買）</label></div>
          <div class="wi-title">箭種低庫存回村（各箭種獨立設定）</div>
          <div class="wi-note">勾選要監控的箭種並設定各自門檻；持有量低於門檻時回村。若多種同時低於門檻，會逐一購買這些已勾選箭種，每種購買數量使用下方「自動買」數量。未勾選的箭種不會觸發回村或購買。</div>
          <div id="wi-ammo-return-rules"></div>
          <div class="wi-title">藥水使用與庫存補給條件</div>
          <div class="wi-note">每列可獨立啟用 HP／MP 喝水條件；「最低庫存」是回村補給門檻，「購買數」是每次購買量。低庫存回村功能須勾選上方藥水回村選項。</div>
          <div id="wi-potion-conditions"></div>
          <div class="wi-actions"><button id="wi-add-condition" class="wi-btn">＋新增藥水條件</button></div>
          <div class="wi-title">箭矢補給</div>
          <div class="wi-row"><label>箭矢 <select id="wi-ammo-key">${ammoOptions(CONFIG.ammoKey)}</select></label><label><input id="wi-auto-ammo" type="checkbox"> 自動補箭</label></div>
          <div class="wi-row"><label>少於 <input id="wi-ammo-min" type="number" min="0"></label><label>自動買 <input id="wi-ammo-buy" type="number" min="1"></label></div>
          <div class="wi-note">「自動補箭」會依最低庫存直接購買；勾選「箭矢少於…回村補箭」則使用下方回村路線，到商店按設定購買數量，完成後留在商店並停止掛機。</div>
          <div class="wi-title">回村路線與商店</div>
          <div class="wi-row"><label>回村方式 <select id="wi-potion-shop-route"><option value="walk">商店入口（預設）</option><option value="scroll_return">使用回城卷軸 scroll_return</option></select></label></div>
          <div class="wi-row"><label>入口 X <input id="wi-potion-entrance-x" type="number" step="1"></label><label>入口 Y <input id="wi-potion-entrance-y" type="number" step="1"></label><button id="wi-capture-entrance-xy" class="wi-btn" type="button">擷取目前 XY</button></div><div class="wi-note">入口預設 4591, 2490；按鈕會擷取目前玩家座標並立即保存。</div>
          <div class="wi-row"><label>購買訊息 <input id="wi-buy-type" class="wide" type="text" value="buy"></label><label>商店 Key <input id="wi-shop-key" class="wide" type="text" placeholder="可留空"></label></div>
          <div class="wi-note">回城卷軸模式使用 1 個 scroll_return 並等待 5 秒，再步行至入口。不論補貨條件是否符合，目前均不會進店或送出購買封包；觸發回村時只移動至入口並停止掛機。手動前往入口仍可使用。</div>
          <div id="wi-potion-resupply-status" class="wi-note">尚未觸發回村流程</div>
          <div class="wi-title">全部參數設定檔</div>
          <div class="wi-note">匯出包含目前所有 UserScript 設定，例如技能/喝水條件、怪物/物品篩選、回村補給及面板寬度。JSON 檔只下載到你的裝置，不會上傳。</div>
          <div class="wi-actions"><button id="wi-export-config" class="wi-btn">匯出全部設定 JSON</button><button id="wi-import-config" class="wi-btn">匯入設定 JSON</button></div>
          <input id="wi-import-config-file" type="file" accept=".json,application/json" hidden>
          <div id="wi-config-status" class="wi-note" role="status">尚未匯入設定</div>
        </div>
        <div id="wi-page-test" class="wi-page" hidden>
          <div class="wi-title">商店購買測試</div>
          <div class="wi-note">購買功能目前已暫停：不會送出 buy 封包；此測試按鈕亦已停用。</div>
          <div class="wi-row"><label>木箭購買數量 <input id="wi-test-arrow-amount" type="number" min="1" step="1" value="1"></label></div>
          <div class="wi-actions"><button id="wi-test-buy-arrows" class="wi-btn" type="button" disabled>購買測試已暫停</button></div>
          <div id="wi-test-buy-status" class="wi-note" role="status">尚未執行購買</div>
          <div class="wi-note">自動補貨、直接補箭及測試購買均不會發送購買封包；回村功能保留，但只移動至入口。</div>
        </div>
        <div id="wi-page-filters" class="wi-page" hidden>
          <div class="wi-title">依怪物名稱分組；勾選群組會追打該種類全部怪物</div>
          <div class="wi-note">未勾選任何群組＝攻擊全部；勾選怪物名稱群組後，只追打該名稱的所有怪物。點擊「＋」可展開座標、分類與攻擊冷卻。</div>
          <select id="wi-target-select" class="wi-search" size="3" aria-label="目前怪物資訊"><option>尚未偵測到怪物</option></select>
          <input id="wi-monster-search" class="wi-search" placeholder="搜尋怪物中文／English／類型">
          <label class="wi-note" for="wi-monster-sort">排序：</label><select id="wi-monster-sort" class="wi-search"><option value="distance_asc">距離：近到遠</option><option value="distance_desc">距離：遠到近</option><option value="level_asc">等級：低到高</option><option value="level_desc">等級：高到低</option><option value="name">名稱</option></select>
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
    normalizeFixedSpotLocations(saved || {});
    if (saved?.panelScale === undefined) CONFIG.panelScale = Number(localStorage.getItem('wi-integrated-panel-scale')) || 1;
    if (!saved?.monsterSortUserSet) CONFIG.monsterSort = 'level_asc';
    if (!Array.isArray(CONFIG.allowedMonsterIds)) CONFIG.allowedMonsterIds = [];
    if (!Array.isArray(CONFIG.potionConditions) || !Array.isArray(saved?.potionConditions)) CONFIG.potionConditions = [
      { resource: 'hp', threshold: CONFIG.hpThreshold, itemKey: CONFIG.hpPotionItemKey, enabled: true, key: '', action: 'packet' },
      { resource: 'mp', threshold: CONFIG.mpThreshold, itemKey: CONFIG.mpPotionItemKey, enabled: true, key: '', action: 'packet' }
    ];
    if (CONFIG.potionConditions.length === 0 && !CONFIG.potionConditionsCustom) CONFIG.potionConditions = [
      { resource: 'hp', threshold: CONFIG.hpThreshold, itemKey: CONFIG.hpPotionItemKey, enabled: true, key: '', action: 'packet' },
      { resource: 'mp', threshold: CONFIG.mpThreshold, itemKey: CONFIG.mpPotionItemKey, enabled: true, key: '', action: 'packet' }
    ];
    if (!Array.isArray(CONFIG.skillConditions)) CONFIG.skillConditions = [];
    if (saved?.skillEnabled === false) CONFIG.skillConditions = CONFIG.skillConditions.map((condition) => ({ ...condition, enabled: false }));
    if (saved?.potionEnabled === false) CONFIG.potionConditions = CONFIG.potionConditions.map((condition) => ({ ...condition, enabled: false }));
    delete CONFIG.skillEnabled; delete CONFIG.potionEnabled;
    const setValue = (id, value) => { document.querySelector(id).value = value; };
    setValue('#wi-engage-range', CONFIG.engageRange); setValue('#wi-loot-range', CONFIG.lootRange);
    document.querySelector('#wi-ammo-key').value = CONFIG.ammoKey || 'arrow_training';
    document.querySelector('#wi-auto-ammo').checked = Boolean(CONFIG.autoAmmoBuyEnabled);
    normalizeAmmoReturnRules(saved || {});
    renderAmmoReturnRules();
    document.querySelector('#wi-ammo-min').value = Number(CONFIG.ammoMinStock) || 20;
    document.querySelector('#wi-ammo-buy').value = Number(CONFIG.ammoBuyAmount) || 100;
    document.querySelector('#wi-combat-mode').value = CONFIG.combatMode || 'basic_then_skill';
    document.querySelector('#wi-basic-first').checked = CONFIG.basicAttackFirst !== false;
    document.querySelector('#wi-extreme-ranged').checked = Boolean(CONFIG.extremeRanged);
    document.querySelector('#wi-chase-monsters').checked = CONFIG.chaseMonsters !== false;
    document.querySelector('#wi-fixed-spot-enabled').checked = Boolean(CONFIG.fixedSpotEnabled);
    document.querySelector('#wi-fixed-spot-x').value = CONFIG.fixedSpotX ?? '';
    document.querySelector('#wi-fixed-spot-y').value = CONFIG.fixedSpotY ?? '';
    renderFixedSpotLocations();
    document.querySelector('#wi-kite-enabled').checked = Boolean(CONFIG.kiteEnabled);
    document.querySelector('#wi-kite-trigger').value = Number.isFinite(Number(CONFIG.kiteTriggerDistance)) ? CONFIG.kiteTriggerDistance : 50;
    if (saved && Number(saved.kiteMaxDistance) === 100) CONFIG.kiteMaxDistance = 200;
    document.querySelector('#wi-kite-max').value = Number.isFinite(Number(CONFIG.kiteMaxDistance)) ? CONFIG.kiteMaxDistance : 200;
    document.querySelector('#wi-kite-attack-delay').value = Number.isFinite(Number(CONFIG.kiteAttackDelayMs)) ? CONFIG.kiteAttackDelayMs : 1000;
    document.querySelector('#wi-monster-sort').value = CONFIG.monsterSort || 'level_asc';
    document.querySelector('#wi-auto-buy').checked = Boolean(CONFIG.autoBuyEnabled);
    document.querySelector('#wi-return-overweight').checked = Boolean(CONFIG.returnOnOverweight);
    if (!CONFIG.potionShopRoute || CONFIG.potionShopRoute === 'mela_store') CONFIG.potionShopRoute = 'walk';
    document.querySelector('#wi-potion-shop-route').value = CONFIG.potionShopRoute;
    document.querySelector('#wi-potion-entrance-x').value = Number(CONFIG.potionShopEntranceX) || 4591;
    document.querySelector('#wi-potion-entrance-y').value = Number(CONFIG.potionShopEntranceY) || 2490;
    document.querySelector('#wi-buy-type').value = CONFIG.buyMessageType || 'buy';
    document.querySelector('#wi-shop-key').value = CONFIG.shopKey || '';
    document.querySelector('#wi-packet-log-enabled').checked = Boolean(CONFIG.packetLogEnabled);
    document.querySelector('#wi-stop-on-death').checked = CONFIG.stopOnDeath !== false;
    document.querySelector('#wi-packet-log-panel').hidden = !CONFIG.packetLogEnabled;
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
      if (panel.classList.contains('wi-fullscreen') || event.target.closest('button')) return;
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
    let panelScale = Number(localStorage.getItem('wi-integrated-panel-scale'));
    if (![1, 2, 3].includes(panelScale)) panelScale = 1;
    const applyPanelScale = (scale) => {
      panelScale = scale;
      const width = Math.max(50, Math.min(430 * scale, window.innerWidth - 24));
      panel.style.setProperty('--wi-panel-width', `${width}px`);
      localStorage.setItem('wi-integrated-panel-scale', String(scale));
      CONFIG.panelScale = scale;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      [1, 2, 3].forEach((value) => document.querySelector(`#wi-width-${value}`).classList.toggle('green', value === scale));
    };
    applyPanelScale(panelScale);
    [1, 2, 3].forEach((scale) => { document.querySelector(`#wi-width-${scale}`).onclick = () => applyPanelScale(scale); });
    window.addEventListener('resize', () => applyPanelScale(panelScale));
    const fullscreenButton = document.querySelector('#wi-fullscreen');
    fullscreenButton.onclick = () => {
      panel.classList.add('wi-open');
      const full = panel.classList.toggle('wi-fullscreen');
      fullscreenButton.textContent = full ? '退出全螢幕' : '全螢幕';
    };
    document.querySelector('#wi-hide').onclick = () => {
      panel.classList.remove('wi-open', 'wi-fullscreen');
      fullscreenButton.textContent = '全螢幕';
    };
    document.querySelector('#wi-start').onclick = start; document.querySelector('#wi-stop').onclick = stop;
    document.querySelector('#wi-room-connect').onclick = refreshRoomInfo;
    document.querySelector('#wi-test-buy-arrows').onclick = testBuyWoodArrows;
    document.querySelector('#wi-clear').onclick = clearLogs; document.querySelector('#wi-export').onclick = exportLogs;
    document.querySelector('#wi-packet-log-enabled').addEventListener('change', (event) => {
      CONFIG.packetLogEnabled = event.target.checked;
      document.querySelector('#wi-packet-log-panel').hidden = !CONFIG.packetLogEnabled;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      if (CONFIG.packetLogEnabled) renderPacketLog();
    });
    document.querySelector('#wi-packet-log-clear').onclick = () => { packetLogs.length = 0; renderPacketLog(); };
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
      readAmmoReturnRulesFromUI();
      CONFIG.ammoMinStock = Math.max(0, Number(document.querySelector('#wi-ammo-min').value) || 0);
      CONFIG.ammoBuyAmount = Math.max(1, Number(document.querySelector('#wi-ammo-buy').value) || 1);
      CONFIG.combatMode = document.querySelector('#wi-combat-mode').value;
      CONFIG.basicAttackFirst = document.querySelector('#wi-basic-first').checked;
      CONFIG.stopOnDeath = document.querySelector('#wi-stop-on-death').checked;
      CONFIG.extremeRanged = document.querySelector('#wi-extreme-ranged').checked;
      CONFIG.chaseMonsters = document.querySelector('#wi-chase-monsters').checked;
      CONFIG.fixedSpotEnabled = document.querySelector('#wi-fixed-spot-enabled').checked;
      syncFixedSpotFromInputs();
      CONFIG.kiteEnabled = document.querySelector('#wi-kite-enabled').checked;
      CONFIG.kiteTriggerDistance = document.querySelector('#wi-kite-trigger').value === '' ? 50 : Math.max(0, Number(document.querySelector('#wi-kite-trigger').value) || 0);
      CONFIG.kiteMaxDistance = document.querySelector('#wi-kite-max').value === '' ? 200 : Math.max(0, Number(document.querySelector('#wi-kite-max').value) || 0);
      CONFIG.kiteAttackDelayMs = Math.max(0, Number(document.querySelector('#wi-kite-attack-delay').value) || 0);
      CONFIG.autoBuyEnabled = document.querySelector('#wi-auto-buy').checked;
      CONFIG.returnOnOverweight = document.querySelector('#wi-return-overweight').checked;
      CONFIG.potionShopRoute = document.querySelector('#wi-potion-shop-route').value || 'walk';
      CONFIG.potionShopEntranceX = Number(document.querySelector('#wi-potion-entrance-x').value) || 4591;
      CONFIG.potionShopEntranceY = Number(document.querySelector('#wi-potion-entrance-y').value) || 2490;
      CONFIG.buyMessageType = document.querySelector('#wi-buy-type').value.trim() || 'buy';
      CONFIG.shopKey = document.querySelector('#wi-shop-key').value.trim();
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); log('設定已儲存');
    };
    document.querySelector('#wi-add-condition').onclick = () => {
      CONFIG.potionConditions.push({ resource: 'hp', threshold: 50, itemKey: '', enabled: true, key: '', action: 'packet' });
      renderPotionConditions();
      persistConditionEditors();
    };
    document.querySelector('#wi-add-skill').onclick = () => {
      CONFIG.skillConditions.push({ mode: 'keyboard', hotkey: null, skillKey: '', enabled: true, minMpPct: 0, maxDistance: 0, cooldownMs: 1000 });
      renderSkillConditions();
      persistConditionEditors();
    };
    const captureCurrentXY = (xSelector, ySelector, configXKey, configYKey, label) => {
      const player = getRoomState()?.player;
      if (!player || !Number.isFinite(Number(player.x)) || !Number.isFinite(Number(player.y)) || player.x === null || player.y === null) {
        log(`無法擷取${label}座標：尚未連接 Room 或目前沒有有效玩家座標`);
        return false;
      }
      const x = Number(player.x);
      const y = Number(player.y);
      document.querySelector(xSelector).value = String(x);
      document.querySelector(ySelector).value = String(y);
      CONFIG[configXKey] = x;
      CONFIG[configYKey] = y;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      log(`${label}座標已擷取並保存：X ${x}，Y ${y}`);
      return true;
    };
    document.querySelector('#wi-capture-fixed-xy').onclick = () => {
      if (!captureCurrentXY('#wi-fixed-spot-x', '#wi-fixed-spot-y', 'fixedSpotX', 'fixedSpotY', '定點')) return;
      CONFIG.fixedSpotSelected = '';
      document.querySelector('#wi-fixed-spot-select').value = '';
      document.querySelector('#wi-fixed-spot-name').value = '';
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    };
    document.querySelector('#wi-capture-entrance-xy').onclick = () => captureCurrentXY('#wi-potion-entrance-x', '#wi-potion-entrance-y', 'potionShopEntranceX', 'potionShopEntranceY', '回村入口');
    document.querySelector('#wi-fixed-spot-select').addEventListener('change', (event) => selectFixedSpotLocation(event.target.value));
    document.querySelector('#wi-add-fixed-location').addEventListener('click', addOrUpdateFixedSpotLocation);
    document.querySelector('#wi-save-combat').onclick = saveSettings;
    document.querySelector('#wi-save-return').onclick = saveSettings;
    document.querySelector('#wi-export-config').onclick = () => {
      saveSettings();
      const blob = new Blob([JSON.stringify(CONFIG, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `whisper-isle-settings-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
      document.querySelector('#wi-config-status').textContent = '已匯出全部設定 JSON';
    };
    const importFileInput = document.querySelector('#wi-import-config-file');
    document.querySelector('#wi-import-config').onclick = () => importFileInput.click();
    importFileInput.addEventListener('change', async () => {
      const file = importFileInput.files?.[0];
      if (!file) return;
      const status = document.querySelector('#wi-config-status');
      try {
        const imported = JSON.parse(await file.text());
        if (!imported || typeof imported !== 'object' || Array.isArray(imported) || !Object.keys(CONFIG).some((key) => Object.prototype.hasOwnProperty.call(imported, key))) {
          throw new Error('檔案不是有效的 Whisper Isle 設定 JSON');
        }
        if (running) stop('匯入設定前已停止掛機');
        for (const key of Object.keys(CONFIG)) {
          if (Object.prototype.hasOwnProperty.call(imported, key)) CONFIG[key] = imported[key];
        }
        if (imported.skillEnabled === false && Array.isArray(CONFIG.skillConditions)) CONFIG.skillConditions = CONFIG.skillConditions.map((condition) => ({ ...condition, enabled: false }));
        if (imported.potionEnabled === false && Array.isArray(CONFIG.potionConditions)) CONFIG.potionConditions = CONFIG.potionConditions.map((condition) => ({ ...condition, enabled: false }));
        if (!Array.isArray(CONFIG.potionConditions)) CONFIG.potionConditions = [];
        if (!Array.isArray(CONFIG.skillConditions)) CONFIG.skillConditions = [];
        if (!Array.isArray(CONFIG.allowedMonsterTypes)) CONFIG.allowedMonsterTypes = [];
        if (!Array.isArray(CONFIG.allowedMonsterIds)) CONFIG.allowedMonsterIds = [];
        if (!Array.isArray(CONFIG.allowedItemKeys)) CONFIG.allowedItemKeys = [];
        normalizeAmmoReturnRules(imported);
        normalizeFixedSpotLocations(imported);
        if (!CONFIG.itemPolicies || typeof CONFIG.itemPolicies !== 'object' || Array.isArray(CONFIG.itemPolicies)) CONFIG.itemPolicies = {};
        delete CONFIG.skillEnabled; delete CONFIG.potionEnabled;
        const setValue = (selector, value) => { const element = document.querySelector(selector); if (element) element.value = value ?? ''; };
        const setChecked = (selector, value) => { const element = document.querySelector(selector); if (element) element.checked = Boolean(value); };
        setValue('#wi-engage-range', CONFIG.engageRange); setValue('#wi-loot-range', CONFIG.lootRange);
        setValue('#wi-ammo-key', CONFIG.ammoKey || 'arrow_training'); setChecked('#wi-auto-ammo', CONFIG.autoAmmoBuyEnabled);
        setValue('#wi-ammo-min', CONFIG.ammoMinStock ?? 20); setValue('#wi-ammo-buy', CONFIG.ammoBuyAmount ?? 100);
        setValue('#wi-combat-mode', CONFIG.combatMode || 'basic_then_skill'); setChecked('#wi-basic-first', CONFIG.basicAttackFirst !== false);
        setChecked('#wi-stop-on-death', CONFIG.stopOnDeath !== false); setChecked('#wi-extreme-ranged', CONFIG.extremeRanged);
        setChecked('#wi-chase-monsters', CONFIG.chaseMonsters !== false); setChecked('#wi-fixed-spot-enabled', CONFIG.fixedSpotEnabled);
        setValue('#wi-fixed-spot-x', CONFIG.fixedSpotX); setValue('#wi-fixed-spot-y', CONFIG.fixedSpotY);
        renderFixedSpotLocations();
        setChecked('#wi-kite-enabled', CONFIG.kiteEnabled); setValue('#wi-kite-trigger', CONFIG.kiteTriggerDistance ?? 50);
        setValue('#wi-kite-max', CONFIG.kiteMaxDistance ?? 200); setValue('#wi-kite-attack-delay', CONFIG.kiteAttackDelayMs ?? 1000);
        setChecked('#wi-auto-buy', CONFIG.autoBuyEnabled); setChecked('#wi-return-overweight', CONFIG.returnOnOverweight);
        setValue('#wi-potion-shop-route', CONFIG.potionShopRoute || 'walk');
        setValue('#wi-potion-entrance-x', CONFIG.potionShopEntranceX ?? 4591); setValue('#wi-potion-entrance-y', CONFIG.potionShopEntranceY ?? 2490);
        setValue('#wi-buy-type', CONFIG.buyMessageType || 'buy'); setValue('#wi-shop-key', CONFIG.shopKey || '');
        setValue('#wi-monster-sort', CONFIG.monsterSort || 'level_asc'); setChecked('#wi-packet-log-enabled', CONFIG.packetLogEnabled);
        document.querySelector('#wi-packet-log-panel').hidden = !CONFIG.packetLogEnabled;
        refreshAmmoReturnCatalog();
        renderSkillConditions(); renderPotionConditions(); renderFilters(); applyPanelScale([1,2,3].includes(Number(CONFIG.panelScale)) ? Number(CONFIG.panelScale) : 1);
        localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
        status.textContent = `已匯入 ${file.name}；新設定已套用，掛機維持停止`;
        log(`設定已匯入：${file.name}`);
      } catch (error) {
        status.textContent = `匯入失敗：${error?.message || error}`;
      } finally { importFileInput.value = ''; }
    });
    const saveAmmoReturnSettings = () => {
      CONFIG.ammoKey = document.querySelector('#wi-ammo-key').value;
      readAmmoReturnRulesFromUI();
      CONFIG.ammoBuyAmount = Math.max(1, Number(document.querySelector('#wi-ammo-buy').value) || 100);
      CONFIG.autoAmmoBuyEnabled = document.querySelector('#wi-auto-ammo').checked;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    };
    ['#wi-ammo-key', '#wi-ammo-buy', '#wi-auto-ammo'].forEach((selector) => document.querySelector(selector).addEventListener('change', saveAmmoReturnSettings));
    const ammoReturnRulesContainer = document.querySelector('#wi-ammo-return-rules');
    ammoReturnRulesContainer.addEventListener('change', saveAmmoReturnSettings);
    ammoReturnRulesContainer.addEventListener('input', saveAmmoReturnSettings);
    document.querySelector('#wi-auto-buy').addEventListener('change', (event) => { CONFIG.autoBuyEnabled = event.target.checked; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); });
    document.querySelector('#wi-return-overweight').addEventListener('change', (event) => { CONFIG.returnOnOverweight = event.target.checked; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); });
    document.querySelector('#wi-potion-shop-route').addEventListener('change', (event) => { CONFIG.potionShopRoute = event.target.value; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); });
    const savePotionRoute = () => {
      CONFIG.potionShopRoute = document.querySelector('#wi-potion-shop-route').value || 'walk';
      CONFIG.potionShopEntranceX = Number(document.querySelector('#wi-potion-entrance-x').value) || 4591;
      CONFIG.potionShopEntranceY = Number(document.querySelector('#wi-potion-entrance-y').value) || 2490;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    };
    document.querySelector('#wi-potion-entrance-x').addEventListener('change', savePotionRoute);
    document.querySelector('#wi-potion-entrance-y').addEventListener('change', savePotionRoute);
    const saveMovementSettings = () => {
      CONFIG.fixedSpotEnabled = document.querySelector('#wi-fixed-spot-enabled').checked;
      syncFixedSpotFromInputs();
      CONFIG.kiteEnabled = document.querySelector('#wi-kite-enabled').checked;
      CONFIG.kiteTriggerDistance = document.querySelector('#wi-kite-trigger').value === '' ? 50 : Math.max(0, Number(document.querySelector('#wi-kite-trigger').value) || 0);
      CONFIG.kiteMaxDistance = document.querySelector('#wi-kite-max').value === '' ? 200 : Math.max(0, Number(document.querySelector('#wi-kite-max').value) || 0);
      CONFIG.kiteAttackDelayMs = Math.max(0, Number(document.querySelector('#wi-kite-attack-delay').value) || 0);
      CONFIG.chaseMonsters = document.querySelector('#wi-chase-monsters').checked;
      CONFIG.extremeRanged = document.querySelector('#wi-extreme-ranged').checked;
      CONFIG.engageRange = Math.max(1, Number(document.querySelector('#wi-engage-range').value) || 260);
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
    };
    ['#wi-fixed-spot-enabled', '#wi-fixed-spot-x', '#wi-fixed-spot-y', '#wi-kite-enabled', '#wi-kite-trigger', '#wi-kite-max', '#wi-kite-attack-delay', '#wi-chase-monsters', '#wi-extreme-ranged', '#wi-engage-range'].forEach((selector) => document.querySelector(selector).addEventListener('change', saveMovementSettings));
    document.querySelector('#wi-stop-on-death').addEventListener('change', (event) => {
      CONFIG.stopOnDeath = event.target.checked;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      log(`角色死亡停止掛機${CONFIG.stopOnDeath ? '啟用' : '停用'}`);
    });
    const persistConditionEditors = () => {
      try {
        readSkillConditions();
        readPotionConditions();
        localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      } catch (error) { log(`條件自動儲存失敗：${error.message}`); }
    };
    document.querySelector('#wi-skill-conditions').addEventListener('change', persistConditionEditors);
    document.querySelector('#wi-potion-conditions').addEventListener('change', persistConditionEditors);
    const saveRangeMode = () => {
      CONFIG.engageRange = Math.max(1, Number(document.querySelector('#wi-engage-range').value) || 260);
      CONFIG.extremeRanged = document.querySelector('#wi-extreme-ranged').checked;
      CONFIG.chaseMonsters = document.querySelector('#wi-chase-monsters').checked;
      localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG));
      log(`攻擊距離設定：${CONFIG.engageRange}；極限遠攻 ${CONFIG.extremeRanged ? '啟用' : '停用'}`);
    };
    document.querySelector('#wi-engage-range').addEventListener('change', saveRangeMode);
    document.querySelector('#wi-extreme-ranged').addEventListener('change', saveRangeMode);
    document.querySelector('#wi-chase-monsters').addEventListener('change', saveRangeMode);
    document.querySelector('#wi-page-select').onchange = (event) => {
      const pageName = event.target.value;
      document.querySelectorAll('.wi-page').forEach((page) => { page.hidden = page.id !== `wi-page-${pageName}`; });
      if (pageName === 'filters') renderFilters();
    };
    document.querySelector('#wi-monster-search').oninput = () => renderFilterList('monster'); document.querySelector('#wi-item-search').oninput = () => renderFilterList('item');
    document.querySelector('#wi-monster-sort').addEventListener('change', (event) => { CONFIG.monsterSort = event.target.value; CONFIG.monsterSortUserSet = true; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('monster'); });
    document.querySelector('#wi-refresh-filters').onclick = renderFilters;
    document.querySelector('#wi-monster-all').onclick = () => { CONFIG.allowedMonsterIds = []; CONFIG.allowedMonsterTypes = []; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('monster'); };
    document.querySelector('#wi-monster-none').onclick = () => { CONFIG.allowedMonsterIds = ['__NONE__']; CONFIG.allowedMonsterTypes = ['__NONE__']; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('monster'); };
    document.querySelector('#wi-item-all').onclick = () => { CONFIG.allowedItemKeys = []; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('item'); };
    document.querySelector('#wi-item-none').onclick = () => { CONFIG.allowedItemKeys = ['__NONE__']; localStorage.setItem('wi-integrated-config', JSON.stringify(CONFIG)); renderFilterList('item'); };
    renderSkillConditions(); renderPotionConditions(); renderLog(); updateStatus(); renderFilters();
    window.setInterval(() => { if (document.querySelector('#wi-monster-list')) renderFilterList('monster'); }, 1000);
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
