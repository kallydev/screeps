const harvester = (creep: Creep): void => {
  const source = creep.pos.findClosestByPath(FIND_SOURCES);
  const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_EXTENSION ||
        s.structureType === STRUCTURE_SPAWN ||
        s.structureType === STRUCTURE_TOWER) &&
      s.energy < s.energyCapacity
  });
  if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
    creep.memory.working = true;
  }
  if (creep.memory.working && creep.store.energy === 0) {
    creep.memory.working = false;
  }
  if (!creep.memory.working && source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
  if (creep.memory.working && structure) {
    if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
};

export default harvester;
