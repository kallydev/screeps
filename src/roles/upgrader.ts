const upgrader = (creep: Creep): void => {
  const working = creep.memory.working;
  const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: s => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy > 10
  });
  if (!creep.memory.working && creep.store.energy === creep.store.getCapacity()) {
    creep.memory.working = true;
  }
  if (creep.memory.working && creep.store.energy === 0) {
    creep.memory.working = false;
  }
  if (!working && structure) {
    if (creep.withdraw(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
  if (working && creep.room.controller) {
    if (!creep.room.controller.safeMode) {
      creep.room.controller.activateSafeMode();
    }
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: {
          stroke: "#FFFFFF"
        }
      });
    }
    return;
  }
};

export default upgrader;
