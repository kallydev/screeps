import upgrader from "./upgrader";

const builder = (creep: Creep): void => {
  let constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
  const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: s => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy > 10
  });
  for (const flagName in Game.flags) {
    const flag = Game.flags[flagName];
    if (flag.name.startsWith("buidler_")) {
      constructionSite = flag.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    }
  }
  if (!creep.memory.working && creep.store.energy === creep.store.getCapacity() && constructionSite) {
    creep.memory.working = true;
  }
  if (creep.memory.working && creep.store.energy === 0) {
    creep.memory.working = false;
  }
  if (!constructionSite) {
    upgrader(creep);
    return;
  }
  if (!creep.memory.working && structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
  if (creep.memory.working && constructionSite) {
    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
};

export default builder;
